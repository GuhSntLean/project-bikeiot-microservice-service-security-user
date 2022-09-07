import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";

@Entity("refresh_token")
class RefreshToken {
  @PrimaryColumn()
  id: string;

  @Column({ name: "refresh_token"})
  refreshToken: string;

  @Column({ name: "expire_in", type: "date" })
  expireIn: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { RefreshToken };
