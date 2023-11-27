// src/entities/UserOrder.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { UserItemDetail } from "./UserItemDetail";
import { Payments } from "./Payments";

@Entity()
export class UserOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  order_id: string;

  @Column({ type: "varchar", length: 255 })
  first_name: string;

  @Column({ type: "varchar", length: 255 })
  last_name: string;

  @Column({ type: "varchar", length: 255 })
  email: string;

  @Column({ type: "varchar", length: 15 })
  phone: string;
  @Column({ type: "varchar", nullable: false })
  status: string;
  @OneToMany(() => UserItemDetail, (userItemDetail) => userItemDetail.user_id, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  userItemDetail: UserItemDetail[];

  @OneToMany(() => Payments, (payment) => payment.user_id, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  payments: Payments[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
}
