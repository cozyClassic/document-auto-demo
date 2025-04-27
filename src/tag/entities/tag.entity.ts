import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Document } from '../../documents/entities/document.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  step: number;

  @Column()
  isInstant: boolean;

  @Column()
  cronExpression: string;

  @Column()
  isActive: boolean;

  @ManyToMany(() => Document, (document) => document.tags)
  @JoinTable()
  documents: Document[];
}
