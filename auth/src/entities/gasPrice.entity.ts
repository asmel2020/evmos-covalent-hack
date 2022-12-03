import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('gasPrice')
export class GasPrice {
  @PrimaryColumn()
  chainId: string;

  @Column('text')
  slow: string;

  @Column('text')
  normal: string;

  @Column('text')
  fast: string;

  @CreateDateColumn({ name: 'created_at', precision: 3 })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', precision: 3 })
  updatedAt?: Date;
}
