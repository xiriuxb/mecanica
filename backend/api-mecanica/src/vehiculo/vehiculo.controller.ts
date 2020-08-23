import {
  Body,
  Controller,
  InternalServerErrorException,
  Put,
  Query,
} from '@nestjs/common';
import { ClaseGenericaController } from '../clases-genericas/clase-generica-component/clase-generica.controller';
import { VehiculoEntity } from './vehiculo.entity';
import { CrearVehiculoDto } from './vehiculo-dto/crear-vehiculo.dto';
import { EditarVehiculoDto } from './vehiculo-dto/editar-vehiculo.dto';
import { VehiculoService } from './vehiculo.service';
import { ConsultaInterface } from '../clases-genericas/clase-generica-component/consulta.interface';

@Controller('vehiculo')
export class VehiculoController extends ClaseGenericaController<
  VehiculoEntity
> {
  crearDto = CrearVehiculoDto;
  editarDto = EditarVehiculoDto;

  constructor(private readonly _vehiculoService: VehiculoService) {
    super(_vehiculoService);
  }

  @Put('vehiculo/cliente')
  async obtenerVehiculo(
    @Query() parametros: ConsultaInterface,
    @Body() idCliente: any,
  ) {
    parametros.skip = Number(parametros.skip);
    parametros.take = Number(parametros.take);
    try {
      const respuesta = await this._vehiculoService.obtenerVehiculoCliente(
        parametros.skip,
        parametros.take,
        idCliente.id,
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
