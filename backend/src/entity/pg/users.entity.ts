import {
    BeforeInsert,
    Column,
    Entity,
    PrimaryColumn,
    Unique,
    OneToMany,
  } from 'typeorm';
  import { v4 } from 'uuid';
  import * as bcrypt from 'bcrypt';
import { OrdersEntity } from './orders.entity';
  
  @Entity('users')
  @Unique(['id'])
  export class UsersEntity {
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
  
    @Column({ default: '' })
    phone?: string;
  
  
    @BeforeInsert()
    addId() {
      this.id = v4();
    }
    
  
    @Column({ default: new Date().toISOString() })
    createdAt: string;
  
    async hashPassword(password: string, saltOrRounds: number) {
      return await bcrypt.hash(password, saltOrRounds);
    }

    @OneToMany(() => OrdersEntity,orders => orders.id, { onDelete: 'CASCADE' })
    orders: OrdersEntity;
  }
  