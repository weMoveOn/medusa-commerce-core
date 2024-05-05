import { BeforeInsert, Column, Entity, Index } from "typeorm"
import { BaseEntity } from "../interfaces"
import { generateEntityId } from "../utils"
@Entity()
export class AdminBuilder extends BaseEntity {
  @Index()
  @Column({ type: "varchar", nullable: true })
  property_id: string

  @Column({ type: "varchar", nullable: true })
  type: string

  @Column({ type: "varchar", nullable: true })
  value: string

  @BeforeInsert()
  generateId() {
    // Generate the id using the generateEntityId function
    this.id = generateEntityId(this.id, "adminBuilder")
  }
}
