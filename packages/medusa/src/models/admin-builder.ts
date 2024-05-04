import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from "typeorm"

import { BaseEntity } from "../interfaces"

@Entity()
export class AdminBuilder extends BaseEntity {
  @Index()
  @Column({ type: "varchar", nullable: true })
  property_id: string

  @Column({ type: "varchar", nullable: true })
  type: string

  @Column({ type: "varchar", nullable: true })
  value: string
}
