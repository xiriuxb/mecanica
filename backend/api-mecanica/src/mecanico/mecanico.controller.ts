import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Query,
} from '@nestjs/common';
import { ClaseGenericaController } from '../clases-genericas/clase-generica-component/clase-generica.controller';
import { MecanicoEntity } from './mecanico.entity';
import { CrearMecanicoDto } from './mecanico-dto/crear-mecanico.dto';
import { EditarMecanicoDto } from './mecanico-dto/editar-mecanico.dto';
import { MecanicoService } from './mecanico.service';
import { ConsultaInterface } from '../clases-genericas/clase-generica-component/consulta.interface';

@Controller('mecanico')
export class MecanicoController extends ClaseGenericaController<
  MecanicoEntity
> {
  crearDto = CrearMecanicoDto;
  editarDto = EditarMecanicoDto;

  constructor(private readonly _mecanicoService: MecanicoService) {
    super(_mecanicoService);
  }

  @Get('crear-editar-actividad-por-mecanico')
  async actividadPorMecanico(@Query() parametros: ConsultaInterface) {
    parametros.skip = Number(parametros.skip);
    parametros.take = Number(parametros.take);
    try {
      const resultado = await this._mecanicoService.serviciosPorMecanico(
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

  @Get('listar/:idMecanica')
  async listarMecanicoPorMecanica(
    @Param('idMecanica') idMecanica,
    @Query() parametros: ConsultaInterface,
  ) {
    idMecanica = Number(idMecanica);
    parametros.skip = Number(parametros.skip);
    parametros.take = Number(parametros.take);
    try {
      const respuesta = await this._mecanicoService.listarMecanicoPorMecanica(
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

  @Get('listar/mecanicos/disponibles')
  async listarMecanicosDisponibles(@Query() parametros: ConsultaInterface) {
    parametros.skip = Number(parametros.skip);
    parametros.take = Number(parametros.take);
    try {
      const respuesta = await this._mecanicoService.listarMecanicosDisponibles(
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
