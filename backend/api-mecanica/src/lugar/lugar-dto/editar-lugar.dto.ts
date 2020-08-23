import { IsOptional, IsString } from 'class-validator';
import { LugarEntity } from '../lugar.entity';

export class EditarLugarDto {
  @IsOptional()
  @IsString()
  nombre: string;

  constructor(lugar: LugarEntity) {
    this.nombre = lugar.nombre;
  }
}
