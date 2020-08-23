import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Query,
} from '@nestjs/common';
import { ClaseGenericaController } from '../clases-genericas/clase-generica-component/clase-generica.controller';
import { ActividadEntity } from './actividad.entity';
import { ActividadService } from './actividad.service';
import { ConsultaInterface } from '../clases-genericas/clase-generica-component/consulta.interface';
import { CrearActividadDto } from './actividad-dto/crear-actividad.dto';
import { EditarActividadDto } from './actividad-dto/editar-actividad.dto';

@Controller('actividad')
export class ActividadController extends ClaseGenericaController<
  ActividadEntity
> {
  crearDto = CrearActividadDto;
  editarDto = EditarActividadDto;

  constructor(private readonly _actividadService: ActividadService) {
    super(_actividadService);
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
      const respuesta = await this._actividadService.actividadesPorMecanico(
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
