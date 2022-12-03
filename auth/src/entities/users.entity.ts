import { Column, Entity,PrimaryGeneratedColumn} from "typeorm";


@Entity('users')
export class Users {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text',{unique:true})
    address:string;

    @Column('bool',{
        default:true
    })
    isActive:boolean;
}
