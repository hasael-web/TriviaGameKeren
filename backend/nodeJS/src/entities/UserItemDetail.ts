// src/entities/UserItemDetail.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { UserOrder } from "./UserOrder";

@Entity()
export class UserItemDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  id_item: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "decimal" })
  price: number;

  @Column({ type: "int" })
  quantity: number;

  @Column({ type: "varchar", length: 255 })
  brand: string;

  @Column({ type: "varchar", length: 255 })
  category: string;

  @Column({ type: "varchar", length: 255 })
  merchant_name: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
  @ManyToOne(() => UserOrder, (userOrder) => userOrder.order_id, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  user_id: UserOrder;
}
