import { Check, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { Checkout } from './Checkout';
import { BaseCustomIdEntity } from './BaseCustomIdEntity';

@Entity()
export class Flow extends BaseCustomIdEntity {
  @OneToMany(
    _type => Checkout,
    checkout => checkout.flow
  )
  public checkouts: Checkout[];
}
