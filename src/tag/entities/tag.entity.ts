import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

import { Document } from '../../documents/entities/document.entity';
import { UserDocumentTagStatus } from '../../user-documents/entities/user-document-tag-status.entity';
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

  @OneToMany(
    () => UserDocumentTagStatus,
    (userDocumentTagStatus) => userDocumentTagStatus.tag,
  )
  userDocumentTagStatuses: UserDocumentTagStatus[];
}
