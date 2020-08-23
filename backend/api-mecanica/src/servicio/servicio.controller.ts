import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Query,
} from '@nestjs/common';
import { ClaseGenericaController } from '../clases-genericas/clase-generica-component/clase-generica.controller';
import { ServicioEntity } from './servicio.entity';
import { CrearServicioDto } from './servicio-dto/crear-servicio.dto';
import { EditarServicioDto } from './servicio-dto/editar-servicio.dto';
import { ServicioService } from './servicio.service';
import { ConsultaInterface } from '../clases-genericas/clase-generica-component/consulta.interface';

@Controller('servicio')
export class ServicioController extends ClaseGenericaController<
  ServicioEntity
> {
  crearDto = CrearServicioDto;
  editarDto = EditarServicioDto;

  constructor(private readonly _servicioService: ServicioService) {
    super(_servicioService);
  }

  @Get('listar/:idUsuario')
  async listarServicioUsuario(
    @Param('idUsuario') idUsuario: number,
    @Query() parametros: ConsultaInterface,
  ) {
    idUsuario = Number(idUsuario);
    parametros.skip = Number(parametros.skip);
    parametros.take = Number(parametros.take);
    try {
      const respuesta = await this._servicioService.servicioPorUsuario(
        idUsuario,
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

  @Get('listar-por-mecanica/:idMecanica')
  async listarServicioMecanica(
    @Param('idMecanica') idMecanica: number,
    @Query() parametros: ConsultaInterface,
  ) {
    idMecanica = Number(idMecanica);
    parametros.skip = Number(parametros.skip);
    parametros.take = Number(parametros.take);
    try {
      const respuesta = await this._servicioService.servicioPorMecanica(
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

  @Get('recuperar-cliente/:idServicio')
  async recuperarIdCliente(@Param('idServicio') idServicio: number) {
    idServicio = Number(idServicio);
    return await this._servicioService.recuperarIdClientePorServicio(
      idServicio,
    );
  }

  @Get('recuperar-mecanica/:idServicio')
  async recuperarIdMecanica(@Param('idServicio') idServicio: number) {
    idServicio = Number(idServicio);
    return await this._servicioService.recuperarIdMecanicaPorServicio(
      idServicio,
    );
  }
}
