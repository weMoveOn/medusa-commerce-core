import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne, BeforeInsert, JoinColumn,
} from "typeorm"
import { Store } from "./store"
import { generateEntityId } from "../utils/generate-entity-id"
import { BaseEntity } from "../interfaces/models/base-entity"

@Entity()
export class StoreTheme extends BaseEntity {
    // new added filed
    @Column({ type: "text", nullable: true })
    store_id: string | null

    @ManyToOne(() => Store, { onDelete: "CASCADE" })
    @JoinColumn({ name: "store_id" })
    store: Store
    // new added filed end
    @Column()
    @Column({ length: 255 })
    name: string

    @Column()
    is_published: boolean

    @Column()
    serving_type: string

    @Column()
    archive_path: string

    @Column()
    serving_path: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

    /**
     * @apiIgnore
     */
    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "sthe")
    }
}
