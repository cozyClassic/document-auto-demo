import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserDocument } from './user-document.entity';
import { Tag } from '../../tag/entities/tag.entity';

@Entity()
export class UserDocumentTagStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserDocument, (userDocument) => userDocument.tagStatuses)
  userDocument: UserDocument;

  @ManyToOne(() => Tag, (tag) => tag.userDocumentTagStatuses)
  tag: Tag;

  @Column({ default: 'in_progress' })
  status: string; // in_progress, completed 등
}
