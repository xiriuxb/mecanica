import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClaseGenericaEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
