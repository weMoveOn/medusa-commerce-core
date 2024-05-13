import { FindConfig, Selector } from "../types/common"
import { MedusaError, isDefined } from "medusa-core-utils"

import { CreateNoteInput } from "../types/note"
import { EntityManager } from "typeorm"
import EventBusService from "./event-bus"
import { Note } from "../models"
import { NoteRepository } from "../repositories/note"
import { TransactionBaseService } from "../interfaces"
import { buildQuery } from "../utils"

type InjectedDependencies = {
  manager: EntityManager
  noteRepository: typeof NoteRepository
  eventBusService: EventBusService
}

class NoteService extends TransactionBaseService {
  static readonly Events = {
    CREATED: "note.created",
    UPDATED: "note.updated",
    DELETED: "note.deleted",
  }

  protected readonly noteRepository_: typeof NoteRepository
  protected readonly eventBus_: EventBusService

  constructor({ noteRepository, eventBusService }: InjectedDependencies) {
    // eslint-disable-next-line prefer-rest-params
    super(arguments[0])

    this.noteRepository_ = noteRepository
    this.eventBus_ = eventBusService
  }

  /**
   * Retrieves a specific note.
   * @param storeId - the id of the store to retrieve the note from.
   * @param noteId - the id of the note to retrieve.
   * @param config - any options needed to query for the result.
   * @return which resolves to the requested note.
   */
  async retrieve(
    storeId: string,
    noteId: string,
    config: FindConfig<Note> = {}
  ): Promise<Note | never> {
    if (!isDefined(noteId)) {
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        `"noteId" must be defined`
      )
    }

    const noteRepo = this.activeManager_.withRepository(this.noteRepository_)

    const query = buildQuery({ id: noteId }, config)

    const note = await noteRepo.findOne(query)

    if (!note) {
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        `Note with id: ${noteId} was not found.`
      )
    }

    return note
  }

  /** Fetches all notes related to the given selector
   * @param storeId - the id of the store to retrieve the notes from.
   * @param selector - the query object for find
   * @param config - the configuration used to find the objects. contains relations, skip, and take.
   * @return notes related to the given search.
   */
  async list(
    storeId:string,
    selector: Selector<Note>,
    config: FindConfig<Note> = {
      /**
       * How many Notes to skip in the resulting list of Notes.
       */
      skip: 0,
      /**
       * How many Notes to take in the resulting list of Notes.
       */
      take: 50,
      /**
       * Which relations to include in the resulting list of Notes.
       */
      relations: [],
    }
  ): Promise<Note[]> {
    const [result] = await this.listAndCount(storeId,selector, config)

    return result
  }

  /** Fetches all notes related to the given selector
   * @param storeId - the id of the store to retrieve the notes from.
   * @param selector - the query object for find
   * @param config - the configuration used to find the objects. contains relations, skip, and take.
   * @return notes related to the given search.
   */
  async listAndCount(
    storeId:string,
    selector: Selector<Note>,
    config: FindConfig<Note> = {
      /**
       * How many Notes to skip in the resulting list of Notes.
       */
      skip: 0,
      /**
       * How many Notes to take in the resulting list of Notes.
       */
      take: 50,
      /**
       * Which relations to include in the resulting list of Notes.
       */
      relations: [],
    }
  ): Promise<[Note[], number]> {
    const noteRepo = this.activeManager_.withRepository(this.noteRepository_)
    const query = buildQuery(selector, config)

    return noteRepo.findAndCount({ ...query, where: { store_id: storeId } })
  }

  /**
   * Creates a note associated with a given author
   * @param data - the note to create
   * @param config - any configurations if needed, including meta data
   * @return resolves to the creation result
   */
  async create(
    data: CreateNoteInput & {store_id:string},
    config: { metadata: Record<string, unknown> } = { metadata: {} }
  ): Promise<Note> {
    const { metadata } = config

    const { resource_id, resource_type, value, author_id,store_id } = data

    return await this.atomicPhase_(async (manager) => {
      const noteRepo = manager.withRepository(this.noteRepository_)
      console.log('noteRepo',noteRepo)
      const toCreate = {
        resource_id,
        resource_type,
        value,
        author_id,
        metadata,
        store_id,
      }
      console.log('toCreate',toCreate)

      const note = noteRepo.create(toCreate)
      console.log('note',note)
      const result = await noteRepo.save(note)

      await this.eventBus_
        .withTransaction(manager)
        .emit(NoteService.Events.CREATED, { id: result.id })

      return result
    })
  }

  /**
   * Updates a given note with a new value
   * @param storeId - the id of the store to update the note in
   * @param noteId - the id of the note to update
   * @param value - the new value
   * @return resolves to the updated element
   */
  async update(storeId:string,noteId: string, value: string): Promise<Note> {
    return await this.atomicPhase_(async (manager) => {
      const noteRepo = manager.withRepository(this.noteRepository_)

      const note = await this.retrieve(storeId,noteId, { relations: ["author"] })

      note.value = value

      const result = await noteRepo.save(note)

      await this.eventBus_
        .withTransaction(manager)
        .emit(NoteService.Events.UPDATED, { id: result.id })

      return result
    })
  }

  /**
   * Deletes a given note
   * @param storeId - id of the store to delete the note from
   * @param noteId - id of the note to delete
   */
  async delete(storeId:string,noteId: string): Promise<void> {
    return await this.atomicPhase_(async (manager) => {
      const noteRepo = manager.withRepository(this.noteRepository_)

      const note = await this.retrieve(storeId,noteId)

      await noteRepo.softRemove(note)

      await this.eventBus_
        .withTransaction(manager)
        .emit(NoteService.Events.DELETED, { id: noteId })
    })
  }
}

export default NoteService
