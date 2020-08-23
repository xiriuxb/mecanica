import {
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Query,
} from '@nestjs/common';
import { ClaseGenericaController } from '../clases-genericas/clase-generica-component/clase-generica.controller';
import { MecanicaEntity } from './mecanica.entity';
import { CrearMecanicaDto } from './mecanica-dto/crear-mecanica.dto';
import { EditarMecanicaDto } from './mecanica-dto/editar-mecanica.dto';
import { MecanicaService } from './mecanica.service';
import { ConsultaInterface } from '../clases-genericas/clase-generica-component/consulta.interface';

@Controller('mecanica')
export class MecanicaController extends ClaseGenericaController<
  MecanicaEntity
> {
  crearDto = CrearMecanicaDto;
  editarDto = EditarMecanicaDto;

  constructor(private readonly _mecanicaService: MecanicaService) {
    super(_mecanicaService);
  }

  @Delete('eliminar-lugar/:idLugar')
  async eliminarIdLugarEnMecanica(@Param('idLugar') idLugar) {
    idLugar = Number(idLugar);
    try {
      return this._mecanicaService.eliminarIdDeLugarEnMecanica(idLugar);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @Get('listar/lugar')
  async lisatMecanicaConLugar(@Query() parametros: ConsultaInterface) {
    parametros.skip = Number(parametros.skip);
    parametros.take = Number(parametros.take);

    try {
      const respuesta = await this._mecanicaService.listarMecanicas(
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
