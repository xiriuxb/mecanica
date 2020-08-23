import { Controller } from '@nestjs/common';
import { ClaseGenericaController } from '../clases-genericas/clase-generica-component/clase-generica.controller';
import { MecanicoPorServicioEntity } from './mecanico-por-servicio.entity';
import { MecanicoPorServicioService } from './mecanico-por-servicio.service';
import { CrearMecanicoPorServicioDto } from './mecanico-por-servicio-dto/crear-mecanico-por-servicio.dto';
import { EditarMecanicoPorServicioDto } from './mecanico-por-servicio-dto/editar-mecanico-por-servicio.dto';

@Controller('mecanico-por-servicio')
export class MecanicoPorServicioController extends ClaseGenericaController<
  MecanicoPorServicioEntity
> {
  crearDto = CrearMecanicoPorServicioDto;
  editarDto = EditarMecanicoPorServicioDto;

  constructor(
    private readonly _mecanicoPorServicioService: MecanicoPorServicioService,
  ) {
    super(_mecanicoPorServicioService);
  }
}
