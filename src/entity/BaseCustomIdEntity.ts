import nanoid from 'nanoid';
import { BeforeInsert, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';

export abstract class BaseCustomIdEntity extends BaseEntity {
  @PrimaryColumn('text')
  public id: string;

  public generateId() {
    //return nanoid(15);
    return Math.floor(Math.random() * 1e17).toString(36)
  }

  @BeforeInsert()
  public generateAndSetId() {
    // Only set the id if not already set. This allows clients to generate ids.
    if (!this.id) {
      this.id = this.generateId();
    }
  }
}
