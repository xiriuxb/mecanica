import { Injectable } from '@nestjs/common';
import { ClaseGenericaService } from '../clases-genericas/clase-generica-component/clase-generica.service';
import { ServicioEntity } from './servicio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ServicioService extends ClaseGenericaService<ServicioEntity> {
  constructor(
    @InjectRepository(ServicioEntity)
    private readonly _servicioRepository: Repository<ServicioEntity>,
  ) {
    super(_servicioRepository);
  }

  async servicioPorUsuario(
    idUsuario: number,
    skip: number,
    take: number,
  ): Promise<[ServicioEntity[], number] | string> {
    try {
      const query = await this._servicioRepository;
      return query
        .createQueryBuilder('servicio')
        .where('servicio.usuario = :id', { id: idUsuario })
        .skip(skip)
        .take(take)
        .orderBy('servicio.id', 'DESC')
        .getManyAndCount();
    } catch (e) {
      return new Promise((resolve, reject) => {
        reject(e);
      });
    }
  }

  async servicioPorMecanica(
    idMecanica: number,
    skip: number,
    take: number,
  ): Promise<[ServicioEntity[], number] | string> {
    try {
      const query = await this._servicioRepository;
      return query
        .createQueryBuilder('servicio')
        .where('servicio.mecanica = :id', { id: idMecanica })
        .skip(skip)
        .take(take)
        .orderBy('servicio.id', 'DESC')
        .getManyAndCount();
    } catch (e) {
      return new Promise((resolve, reject) => {
        reject(e);
      });
    }
  }

  async recuperarIdClientePorServicio(
    idServicio: number,
  ): Promise<ServicioEntity | string> {
    try {
      const query = await this._servicioRepository;
      return query
        .createQueryBuilder('servicio')
        .innerJoinAndSelect(
          'servicio.usuario',
          'usuario',
          'usuario.id = servicio.usuario',
        )
        .where('servicio.id = :id', { id: idServicio })
        .getOne();
    } catch (e) {
      return e;
    }
  }

  async recuperarIdMecanicaPorServicio(
    idServicio: number,
  ): Promise<ServicioEntity | string> {
    try {
      const query = await this._servicioRepository;
      return query
        .createQueryBuilder('servicio')
        .innerJoinAndSelect(
          'servicio.mecanica',
          'mecanica',
          'mecanica.id = servicio.mecanica',
        )
        .where('servicio.id = :id', { id: idServicio })
        .getOne();
    } catch (e) {
      return e;
    }
  }
}
