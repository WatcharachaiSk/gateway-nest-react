import {
    BeforeInsert,
    Column,
    OneToMany,
    Entity,
    PrimaryColumn,
    Unique,
  } from 'typeorm';
  import { v4 } from 'uuid';
  import * as bcrypt from 'bcrypt';
import { OrdersEntity } from './orders.entity';
  
  @Entity('drivers')
  @Unique(['id'])
  export class DriversEntity {
    @PrimaryColumn('uuid')
    id: string;
  
    @Column()
    username: string;
  
    @Column()
    password: string;

    @Column({ default: '' })
    firstName?: string;
  
    @Column({ default: '' })
    lastName?: string;
  
    @Column({ default: '' })
    middleName?: string;
  
    @Column({ default: '' })
    email?: string;
  
    @Column()
    phone?: string;

    @Column({ default: new Date().toISOString() })
    createdAt: string;

    @BeforeInsert()
    addId() {
      this.id = v4();
    }
    async hashPassword(password: string, saltOrRounds: number) {
      return await bcrypt.hash(password, saltOrRounds);
    }

    @OneToMany(() => OrdersEntity,orders => orders.id, { onDelete: 'CASCADE' })
    orders: OrdersEntity;
  
  }