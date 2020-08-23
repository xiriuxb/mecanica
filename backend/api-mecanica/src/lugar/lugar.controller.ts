import {
  Controller,
  Get,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { ClaseGenericaController } from '../clases-genericas/clase-generica-component/clase-generica.controller';
import { LugarEntity } from './lugar.entity';
import { CrearLugarDto } from './lugar-dto/crear-lugar.dto';
import { EditarLugarDto } from './lugar-dto/editar-lugar.dto';
import { LugarService } from './lugar.service';
import { ConsultaInterface } from '../clases-genericas/clase-generica-component/consulta.interface';

@Controller('lugar')
export class LugarController extends ClaseGenericaController<LugarEntity> {
  crearDto = CrearLugarDto;
  editarDto = EditarLugarDto;

  constructor(private readonly _lugarService: LugarService) {
    super(_lugarService);
  }

  @Get('mecanicas-por-ciudad')
  async mecanicasPorCiudad(@Query() parametros: ConsultaInterface) {
    parametros.skip = Number(parametros.skip);
    parametros.take = Number(parametros.take);
    try {
      const resultado = await this._lugarService.buscarMecanicasPorCiudad(
        parametros.skip,
        parametros.take,
      );
      return {
        data: resultado[0],
        cantidad: resultado[1],
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
