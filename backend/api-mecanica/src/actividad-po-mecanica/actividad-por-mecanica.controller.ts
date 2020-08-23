import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Query,
} from '@nestjs/common';
import { ClaseGenericaController } from '../clases-genericas/clase-generica-component/clase-generica.controller';
import { ActividadPorMecanicaEntity } from './actividad-por-mecanica.entity';
import { ActividadPorMecanicaService } from './actividad-por-mecanica.service';
import { CrearActividadPorMecanicaDto } from './actividad-po-mecanica-dto/crear-actividad-por-mecanica.dto';
import { EditarActividadPorMecanicaDto } from './actividad-po-mecanica-dto/editar-actividad-por-mecanica.dto';
import { ConsultaInterface } from '../clases-genericas/clase-generica-component/consulta.interface';

@Controller('actividad-por-mecanica')
export class ActividadPorMecanicaController extends ClaseGenericaController<
  ActividadPorMecanicaEntity
> {
  crearDto = CrearActividadPorMecanicaDto;
  editarDto = EditarActividadPorMecanicaDto;

  constructor(
    private readonly _actividadPorMecanicaService: ActividadPorMecanicaService,
  ) {
    super(_actividadPorMecanicaService);
  }

  @Get('actividad/:idMecanica')
  async listarActividadPorMecanica(
    @Param('idMecanica') idMecanica,
    @Query() parametros: ConsultaInterface,
  ) {
    parametros.skip = Number(parametros.skip);
    parametros.take = Number(parametros.take);
    idMecanica = Number(idMecanica);

    try {
      const respuesta = await this._actividadPorMecanicaService.actividadesPorMecanica(
        idMecanica,
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
