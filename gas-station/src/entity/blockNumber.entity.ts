import { Column, Entity,PrimaryColumn,PrimaryGeneratedColumn} from "typeorm";


@Entity('blockNumber')
export class BlockNumber {
    @PrimaryGeneratedColumn("uuid")
    id:string 

    @Column('text')
    block_number:number;
 
    @Column('text')
    chain_id:string;
}