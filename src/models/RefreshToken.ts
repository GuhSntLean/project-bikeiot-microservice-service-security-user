import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity("refresh_token")
class RefreshToken {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type:'number'})
    expireIn: number
    
    user: User
}

export { RefreshToken };
