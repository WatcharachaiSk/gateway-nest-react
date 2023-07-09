import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryColumn,
  Unique,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { v4 } from 'uuid';
import { UsersEntity } from './users.entity';
import { DriversEntity } from './drivers.entity';

@Entity('orders')
@Unique(['id'])
export class OrdersEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  gate_id: string;

  @Column()
  price: number;

  @Column({ name: 'poo_lat' })
  pooLat: number;

  @Column({ name: 'poo_lon' })
  pooLon: number;

  @Column({ name: 'pod_lat' })
  podLat: number;

  @Column({ name: 'pod_lot' })
  podLon: number;

  @Column({ name: 'oder_success' })
  oderSuccess: boolean;

  @Column({ name: 'oder_status' })
  oderStatus: string;

  @Column({ name: 'oder_success_other', default: false })
  oderSuccessOther?: string;

  @ManyToOne(() => UsersEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: UsersEntity;

  @ManyToOne(() => DriversEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  driver: DriversEntity;

  @BeforeInsert()
  addId() {
    this.id = v4();
    this.gate_id = v4().slice(0, 5);
  }
}
