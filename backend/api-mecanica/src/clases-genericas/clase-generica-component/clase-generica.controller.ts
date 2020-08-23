import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ClaseGenericaService } from './clase-generica.service';
import { validate } from 'class-validator';
import { ConsultaInterface } from './consulta.interface';

@Controller()
export class ClaseGenericaController<Entity> {
  crearDto: any;
  editarDto: any;

  constructor(
    private readonly _claseGenericaService: ClaseGenericaService<Entity>,
  ) {}

  @Post()
  async crear(@Body() datos: Entity) {
    const nuevoDato = new this.crearDto(datos);
    const errores = await validate(nuevoDato);
    const existeErrores = errores.length > 0;
    if (!existeErrores) {
      try {
        const respuesta: any = await this._claseGenericaService.crear(datos);
        return {
          data: respuesta,
          id: respuesta.id,
        };
      } catch (e) {
        throw new InternalServerErrorException(e);
      }
    } else {
      throw new BadRequestException(errores);
    }
  }

  @Put(':id')
  async editar(@Param('id') id: number, @Body() datos: Entity) {
    const datosAActualizar = new this.editarDto(datos);
    const errores = await validate(datosAActualizar);
    const existeErrores = errores.length > 0;
    if (!existeErrores) {
      try {
        return await this._claseGenericaService.editar(id, datos);
      } catch (e) {
        throw new InternalServerErrorException(e);
      }
    } else {
      throw new BadRequestException(errores);
    }
  }

  @Get()
  async listarTodo(@Query() parametros: ConsultaInterface) {
    parametros.skip = Number(parametros.skip);
    parametros.take = Number(parametros.take);
    try {
      const resultado = await this._claseGenericaService.listarTodos(
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

  @Get(':id')
  async listarPorId(@Param('id') id: number) {
    try {
      return await this._claseGenericaService.listarPorId(id);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @Delete(':id')
  async eliminar(@Param('id') id: number) {
    try {
      return await this._claseGenericaService.eliminar(id);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
