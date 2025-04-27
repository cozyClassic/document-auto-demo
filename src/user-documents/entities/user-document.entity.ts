import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Document } from '../../documents/entities/document.entity';
import { UserDocumentTagStatus } from './user-document-tag-status.entity';

@Entity()
export class UserDocument {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filePath: string;

  @Column()
  fileContentType: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.userDocuments)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  documentId: number;

  @ManyToOne(() => Document, (document) => document.userDocuments)
  @JoinColumn({ name: 'documentId' })
  document: Document;

  @Column({ default: 'in_progress' })
  status: string; // in_progress, completed 등

  @OneToMany(() => UserDocumentTagStatus, (tagStatus) => tagStatus.userDocument)
  tagStatuses: UserDocumentTagStatus[];
}
