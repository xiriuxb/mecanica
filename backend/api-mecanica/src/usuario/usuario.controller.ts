import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Query,
} from '@nestjs/common';
import { ClaseGenericaController } from '../clases-genericas/clase-generica-component/clase-generica.controller';
import { UsuarioEntity } from './usuario.entity';
import { CrearUsuarioDto } from './usuario-dto/crear-usuario.dto';
import { EditarUsuarioDto } from './usuario-dto/editar-usuario.dto';
import { UsuarioService } from './usuario.service';
import { ConsultaInterface } from '../clases-genericas/clase-generica-component/consulta.interface';
import { TipoUsuarioEnum } from '../constantes/enums/tipo-usuario.enum';

@Controller('usuario')
export class UsuarioController extends ClaseGenericaController<UsuarioEntity> {
  crearDto = CrearUsuarioDto;
  editarDto = EditarUsuarioDto;

  constructor(private readonly _usuarioService: UsuarioService) {
    super(_usuarioService);
  }

  @Get('rol/cliente')
  async obtenerClientes(@Query() parametros: ConsultaInterface) {
    parametros.skip = Number(parametros.skip);
    parametros.take = Number(parametros.take);
    const cliente = TipoUsuarioEnum.cliente;

    try {
      const respuesta = await this._usuarioService.obtenerClientes(
        parametros.skip,
        parametros.take,
        cliente,
      );
      return {
        data: respuesta[0],
        cantidad: respuesta[1],
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @Post('verificar/credenciales')
  async obtenerDatosDeUsuario(@Body() parametros: UsuarioEntity) {
    const cedulaUsuario: string = parametros.cedulaUsuario;
    const password: string = parametros.password;
    try {
      const respuesta = await this._usuarioService.obtnerDatosDeUsuario(
        cedulaUsuario,
        password,
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
