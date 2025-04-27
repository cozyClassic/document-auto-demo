import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserDocument } from '../../user-documents/entities/user-document.entity';
import { Tag } from '../../tag/entities/tag.entity';

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Tag, (tag) => tag.documents)
  @JoinTable()
  tags: Tag[];

  @OneToMany(() => UserDocument, (userDocument) => userDocument.document)
  userDocuments: UserDocument[];
}
