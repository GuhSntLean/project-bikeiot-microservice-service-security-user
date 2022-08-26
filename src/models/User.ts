import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('user')
@Unique(['publicId', 'username', 'email'])
class User {

  // @PrimaryGeneratedColumn('uuid')
  @Column({primary: true, generated: 'uuid'})
  id: string;

  @Column()
  username: string;
  
  @Column()
  email: string;
  
  @Column()
  password: string;
}

export { User };
