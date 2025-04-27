import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
