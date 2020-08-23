import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Query,
} from '@nestjs/common';
import { ClaseGenericaController } from '../clases-genericas/clase-generica-component/clase-generica.controller';
import { CreditoEntity } from './credito.entity';
import { CrearCreditoDto } from './credito-dto/crear-credito.dto';
import { EditarCreditoDto } from './credito-dto/editar-credito.dto';
import { CreditoService } from './credito.service';
import { ConsultaInterface } from '../clases-genericas/clase-generica-component/consulta.interface';

@Controller('credito')
export class CreditoController extends ClaseGenericaController<CreditoEntity> {
  crearDto = CrearCreditoDto;
  editarDto = EditarCreditoDto;

  constructor(private readonly _creditoService: CreditoService) {
    super(_creditoService);
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
      const respuesta = await this._creditoService.historialDeCreditoPorCliente(
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
