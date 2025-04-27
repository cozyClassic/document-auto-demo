import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserDocument } from 'src/user-documents/entities/user-document.entity';
import { Role } from 'src/auth/roles.enum';

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

  @Column({ default: Role.Worker })
  role: string;

  @OneToMany(() => UserDocument, (userDocument) => userDocument.user)
  userDocuments: UserDocument[];
}
