import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserOrder } from "./UserOrder";

@Entity({ name: "payments" })
export class Payments {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => UserOrder, (userorder) => userorder.payments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user_id: UserOrder;
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
}
