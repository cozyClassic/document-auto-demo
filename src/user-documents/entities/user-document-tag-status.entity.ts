import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserDocument } from './user-document.entity';
import { Tag } from '../../tag/entities/tag.entity';

@Entity()
export class UserDocumentTagStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userDocumentId: number;

  @ManyToOne(() => UserDocument, (userDocument) => userDocument.tagStatuses)
  @JoinColumn({ name: 'userDocumentId' })
  userDocument: UserDocument;

  @Column()
  tagId: number;

  @ManyToOne(() => Tag, (tag) => tag.userDocumentTagStatuses)
  @JoinColumn({ name: 'tagId' })
  tag: Tag;

  @Column({ default: 'in_progress' })
  status: string; // in_progress, completed 등
}
