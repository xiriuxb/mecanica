import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Query,
} from '@nestjs/common';
import { ClaseGenericaController } from '../clases-genericas/clase-generica-component/clase-generica.controller';
import { HistorialDeCreditoEntity } from './historial-de-credito.entity';
import { CrearHistorialDeCreditoDto } from './historial-de-credito-dto/crear-historial-de-credito.dto';
import { EditarHistorialDeCreditoDto } from './historial-de-credito-dto/editar-historial-de-credito.dto';
import { HistoriaDeCreditoService } from './historia-de-credito.service';
import { ConsultaInterface } from '../clases-genericas/clase-generica-component/consulta.interface';

@Controller('historia-de-credito')
export class HistoriaDeCreditoController extends ClaseGenericaController<
  HistorialDeCreditoEntity
> {
  crearDto = CrearHistorialDeCreditoDto;
  editarDto = EditarHistorialDeCreditoDto;

  constructor(
    private readonly _historiaDeCreditoService: HistoriaDeCreditoService,
  ) {
    super(_historiaDeCreditoService);
  }

  @Get('historia/:idCliente')
  async historialDeCreditoPorCliente(
    @Query() parametros: ConsultaInterface,
    @Param('idCliente') idCliente,
  ) {
    parametros.skip = Number(parametros.skip);
    parametros.take = Number(parametros.take);
    idCliente = Number(idCliente);
    try {
      const respuesta = await this._historiaDeCreditoService.historialDeCreditoPorCliente(
        idCliente,
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
