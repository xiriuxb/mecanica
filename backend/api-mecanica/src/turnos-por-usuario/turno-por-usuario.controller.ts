import { Controller } from '@nestjs/common';
import { ClaseGenericaController } from '../clases-genericas/clase-generica-component/clase-generica.controller';
import { TurnoPorUsuarioEntity } from './turno-por-usuario.entity';
import { TurnoPorUsuarioService } from './turno-por-usuario.service';

@Controller('turno-por-usuario')
export class TurnoPorUsuarioController extends ClaseGenericaController<
  TurnoPorUsuarioEntity
> {
  constructor(
    private readonly _turnoPorUsuarioService: TurnoPorUsuarioService,
  ) {
    super(_turnoPorUsuarioService);
  }
}
