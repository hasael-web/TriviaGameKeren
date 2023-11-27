import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Avatar } from "./Avatar";

@Entity({ name: "users" })
export class Users {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  email: string;
  @Column({ nullable: false })
  username: string;
  @ManyToOne(() => Avatar, (avatar) => avatar.id, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  avatar_id: Avatar;
  @Column({ default: 0 })
  diamond: number;
  @Column({ default: 0 })
  totalPoints: number;
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
}
