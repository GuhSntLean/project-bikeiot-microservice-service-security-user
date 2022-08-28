import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("user")
@Unique(["username", "email"])
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  userName: string;

  @Column({ type: "text" })
  email: string;

  @Column({ type: "text" })
  password: string;
}

export { User };
