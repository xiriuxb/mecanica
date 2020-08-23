import { Injectable } from '@nestjs/common';
import { ClaseGenericaService } from '../clases-genericas/clase-generica-component/clase-generica.service';
import { UsuarioEntity } from './usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService extends ClaseGenericaService<UsuarioEntity> {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly _usuarioRepository: Repository<UsuarioEntity>,
  ) {
    super(_usuarioRepository);
  }

  async obtenerClientes(
    skip: number,
    take: number,
    rolDeUsuario: string,
  ): Promise<[UsuarioEntity[], number] | string> {
    try {
      const query = await this._usuarioRepository;
      return (
        query
          .createQueryBuilder('usuario')
          .innerJoinAndSelect(
            'usuario.rolPorUsuario',
            'rolPorUsuario',
            'usuario.id = rolPorUsuario.usuario',
          )
          .innerJoinAndSelect(
            'rolPorUsuario.rol',
            'rol',
            'rolPorUsuario.rol = rol.id',
          )
          //  .innerJoinAndSelect('usuario.vehiculo', 'vehiculo', 'usuario.id = vehiculo.usuario')
          .where('rol.tipo = :rol', { rol: rolDeUsuario })
          .skip(skip)
          .take(take)
          .orderBy('usuario.id', 'DESC')
          .getManyAndCount()
      );
    } catch (e) {
      return new Promise((resolve, reject) => {
        reject('No se encontraron datos');
      });
    }
  }

  async obtnerDatosDeUsuario(
    cedulaUsuario: string,
    password: string,
  ): Promise<[UsuarioEntity[], number] | string> {
    try {
      const query = await this._usuarioRepository;
      return await query
        .createQueryBuilder('usuario')
        .innerJoinAndSelect(
          'usuario.rolPorUsuario',
          'rolPorUsuario',
          'usuario.id = rolPorUsuario.usuario',
        )
        .innerJoinAndSelect(
          'rolPorUsuario.rol',
          'rol',
          'rolPorUsuario.rol = rol.id',
        )
        .where('usuario.cedulaUsuario = :cedula', { cedula: cedulaUsuario })
        .andWhere('usuario.password = :pasword', { pasword: password })
        .getManyAndCount();
    } catch (e) {
      return new Promise((resolve, reject) => {
        reject('No se encontro conicedencia.');
      });
    }
  }
}
