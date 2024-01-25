import { BeforeInsert, Column, Index, ManyToOne, JoinColumn } from "typeorm"
import { SoftDeletableEntity } from "../interfaces"
import AnalyticsFeatureFlag from "../loaders/feature-flags/analytics"
import { generateEntityId } from "../utils"
import { FeatureFlagEntity } from "../utils/feature-flag-decorators"
import {Store} from "./store";

@FeatureFlagEntity(AnalyticsFeatureFlag.key)
export class AnalyticsConfig extends SoftDeletableEntity {
  @Column()
  store_id: string
  @ManyToOne(()=> Store)
  @JoinColumn({name:"store_id", referencedColumnName:"id"})

  @Index({ unique: true, where: "deleted_at IS NULL" })
  @Column()
  user_id: string

  @Column({ default: false })
  opt_out: boolean

  @Column({ default: false })
  anonymize: boolean

  /**
   * @apiIgnore
   */
  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "acfg")
  }
}
