import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("refresh_token")
class RefreshToken {
  @PrimaryColumn()
  id: string;

  @Column({ type: "number" })
  expireIn: number;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { RefreshToken };
