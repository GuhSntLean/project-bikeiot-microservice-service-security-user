import {
  Column,
  Entity,
  PrimaryColumn,
  Unique,
} from "typeorm";
import { v4 as uuid } from "uuid";
@Entity("user")
@Unique(["username", "email"])
class User {
  @PrimaryColumn()
  id: string;

  @Column({ type: "text" })
  userName: string;

  @Column({ type: "text" })
  email: string;

  @Column({ type: "text" })
  password: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User };
