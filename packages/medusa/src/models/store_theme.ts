import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne
} from "typeorm"
import { Store } from "./store"

@Entity()
export class StoreTheme extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 255 })
    name: string

    @ManyToOne(() => Store)
    store: Store

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
}