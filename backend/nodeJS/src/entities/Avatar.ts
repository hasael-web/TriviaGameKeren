import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Entity({ name: "Avatar" })
export class Avatar {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  img_src: string;
  @Column({ nullable: true, type: "float" })
  price: number;
  @OneToMany(() => Users, (user) => user.avatar_id, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  user_id: Users[];
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
}
