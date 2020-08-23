import { IsNotEmpty, IsString } from 'class-validator';
import { LugarEntity } from '../lugar.entity';

export class CrearLugarDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  constructor(lugar: LugarEntity) {
    this.nombre = lugar.nombre;
  }
}
