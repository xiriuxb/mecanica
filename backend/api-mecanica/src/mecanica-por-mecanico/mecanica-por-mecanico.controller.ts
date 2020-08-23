import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { ClaseGenericaController } from '../clases-genericas/clase-generica-component/clase-generica.controller';
import { MecanicaPorMecanicoEntity } from './mecanica-por-mecanico.entity';
import { MecanicaPorMecanicoService } from './mecanica-por-mecanico.service';
import { CrearMecanicoPorMecanicaDto } from './mecanico-por-mecanica-dto/crear-mecanico-por-mecanica.dto';
import { EditarMecanicoPorMecanicaDto } from './mecanico-por-mecanica-dto/editar-mecanico-por-mecanica.dto';
import { ConsultaInterface } from '../clases-genericas/clase-generica-component/consulta.interface';

@Controller('mecanico-por-mecanica')
export class MecanicaPorMecanicoController extends ClaseGenericaController<
  MecanicaPorMecanicoEntity
> {
  crearDto = CrearMecanicoPorMecanicaDto;
  editarDto = EditarMecanicoPorMecanicaDto;

  constructor(
    private readonly _mecanicaPorMecanicoService: MecanicaPorMecanicoService,
  ) {
    super(_mecanicaPorMecanicoService);
  }

  @Get('listar/:idMecanica')
  async listarMecanicoPorMecanica(
    @Param('idMecanica') idMecanica,
    @Query() parametros: ConsultaInterface,
  ) {
    idMecanica = Number(idMecanica);
    parametros.skip = Number(parametros.skip);
    parametros.take = Number(parametros.take);
    try {
      const respuesta = await this._mecanicaPorMecanicoService.listarMecanicoPorMecanica(
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

  @Delete('eliminar/:idMecanico')
  async eliminarMecanicoPorMecanica(@Param('idMecanico') idMecanico) {
    idMecanico = Number(idMecanico);
    try {
      return await this._mecanicaPorMecanicoService.eliminarMecanicoPorMecanica(
        idMecanico,
      );
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
