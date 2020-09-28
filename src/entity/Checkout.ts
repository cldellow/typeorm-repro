import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  RelationId
} from 'typeorm';

import { Flow } from './Flow';
import { BaseCustomIdEntity } from './BaseCustomIdEntity';

@Entity()
export class Checkout extends BaseCustomIdEntity {
  @ManyToOne(
    _type => Flow,
    flow => flow.checkouts,
    {
      onDelete: 'SET NULL',
      onUpdate: 'RESTRICT',
      eager: true,
      nullable: true
    }
  )
  @JoinColumn({ name: 'flowId' })
  @Index()
  public flow: Flow | null;

  @Column('text', { nullable: true })
  public flowId: string | null;
}
