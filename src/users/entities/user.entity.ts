import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserDocument } from 'src/user-documents/entities/user-document.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'worker' })
  role: string;

  @OneToMany(() => UserDocument, (userDocument) => userDocument.user)
  userDocuments: UserDocument[];
}
