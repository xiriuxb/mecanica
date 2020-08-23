import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Query,
} from '@nestjs/common';
import { ClaseGenericaController } from '../clases-genericas/clase-generica-component/clase-generica.controller';
import { ActividadPorMecanicoEntity } from './actividad-por-mecanico.entity';
import { ActividadPorMecanicoService } from './actividad-por-mecanico.service';
import { CrearActividadPorMecanicoDto } from './actividad-por-mecanico/crear-actividad-por-mecanico.dto';
import { ConsultaInterface } from '../clases-genericas/clase-generica-component/consulta.interface';

@Controller('actividad-por-mecanico')
export class ActividadPorMecanicoController extends ClaseGenericaController<
  ActividadPorMecanicoEntity
> {
  crearDto = CrearActividadPorMecanicoDto;

  constructor(
    private readonly _actividadPorMecanicoService: ActividadPorMecanicoService,
  ) {
    super(_actividadPorMecanicoService);
  }

  @Get('actividad/:idMecanico')
  async listarActividadPorMecanico(
    @Param('idMecanico') idMecanico,
    @Query() parametros: ConsultaInterface,
  ) {
    idMecanico = Number(idMecanico);
    parametros.skip = Number(parametros.skip);
    parametros.take = Number(parametros.take);
    try {
      const respuesta = await this._actividadPorMecanicoService.actividadesPorMecanico(
        idMecanico,
        parametros.skip,
        parametros.take,
      );
      return {
        data: respuesta[0],
        cantidad: respuesta[1],
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
