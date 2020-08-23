import { Controller } from '@nestjs/common';
import { ClaseGenericaController } from '../clases-genericas/clase-generica-component/clase-generica.controller';
import { TurnoEntity } from './turno.entity';
import { CrearTurnoDto } from './turno-dto/crear-turno.dto';
import { EditarTurnoDto } from './turno-dto/editar-turno.dto';
import { TurnoService } from './turno.service';

@Controller('turno')
export class TurnoController extends ClaseGenericaController<TurnoEntity> {
  crearDto = CrearTurnoDto;
  editarDto = EditarTurnoDto;

  constructor(private readonly _turnoService: TurnoService) {
    super(_turnoService);
  }
}
