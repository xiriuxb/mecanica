import { Controller } from '@nestjs/common';
import { ClaseGenericaController } from '../clases-genericas/clase-generica-component/clase-generica.controller';
import { ServicioPorUsuarioEntity } from './servicio-por-usuario.entity';
import { ServicioPorUsuarioService } from './servicio-por-usuario.service';

@Controller('servicio-por-usuario')
export class ServicioPorUsuarioController extends ClaseGenericaController<
  ServicioPorUsuarioEntity
> {
  constructor(
    private readonly _servicioPorUsuarioService: ServicioPorUsuarioService,
  ) {
    super(_servicioPorUsuarioService);
  }
}
