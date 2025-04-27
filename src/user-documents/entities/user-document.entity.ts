import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Document } from '../../documents/entities/document.entity';
import { UserDocumentTagStatus } from './user-document-tag-status.entity';

@Entity()
export class UserDocument {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fildPath: string;

  @Column()
  fileContentType: string;

  @ManyToOne(() => User, (user) => user.userDocuments)
  user: User;

  @ManyToOne(() => Document, (document) => document.userDocuments)
  document: Document;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  uploadedAt: Date;

  @Column({ default: 'in_progress' })
  status: string; // in_progress, completed 등

  @OneToMany(() => UserDocumentTagStatus, (tagStatus) => tagStatus.userDocument)
  tagStatuses: UserDocumentTagStatus[];
}
