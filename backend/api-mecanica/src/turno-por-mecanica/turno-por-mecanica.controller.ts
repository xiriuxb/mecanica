import { Controller } from '@nestjs/common';
import { ClaseGenericaController } from '../clases-genericas/clase-generica-component/clase-generica.controller';
import { TurnoPorMecanicaEntity } from './turno-por-mecanica.entity';
import { TurnoPorMecanicaService } from './turno-por-mecanica.service';

@Controller('turno-por-mecanica')
export class TurnoPorMecanicaController extends ClaseGenericaController<
  TurnoPorMecanicaEntity
> {
  constructor(
    private readonly _turnoPorMecanicaService: TurnoPorMecanicaService,
  ) {
    super(_turnoPorMecanicaService);
  }
}
