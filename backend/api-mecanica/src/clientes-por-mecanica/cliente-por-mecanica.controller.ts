import { Controller } from '@nestjs/common';
import { ClaseGenericaController } from '../clases-genericas/clase-generica-component/clase-generica.controller';
import { ClientePorMecanicaEntity } from './cliente-por-mecanica.entity';
import { ClientePorMecanicaService } from './cliente-por-mecanica.service';

@Controller('cliente-por-mecanica')
export class ClientePorMecanicaController extends ClaseGenericaController<
  ClientePorMecanicaEntity
> {
  constructor(
    private readonly _clientePorMecanicaService: ClientePorMecanicaService,
  ) {
    super(_clientePorMecanicaService);
  }
}
