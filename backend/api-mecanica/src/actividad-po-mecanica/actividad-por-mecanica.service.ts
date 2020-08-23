import { Injectable } from '@nestjs/common';
import { ClaseGenericaService } from '../clases-genericas/clase-generica-component/clase-generica.service';
import { ActividadPorMecanicaEntity } from './actividad-por-mecanica.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ActividadPorMecanicaService extends ClaseGenericaService<
  ActividadPorMecanicaEntity
> {
  constructor(
    @InjectRepository(ActividadPorMecanicaEntity)
    private readonly _actividadPorMecanicaRepository: Repository<
      ActividadPorMecanicaEntity
    >,
  ) {
    super(_actividadPorMecanicaRepository);
  }

  async actividadesPorMecanica(
    idMecanica: number,
    skip: number,
    take: number,
  ): Promise<[ActividadPorMecanicaEntity[], number] | string> {
    try {
      const query = await this._actividadPorMecanicaRepository;
      return query
        .createQueryBuilder('actividadPorMecanica')
        .innerJoinAndSelect(
          'actividadPorMecanica.actividad',
          'actividad',
          'actividad.id = actividadPorMecanica.actividad',
        )
        .where('actividadPorMecanica.mecanica = :id', { id: idMecanica })
        .skip(skip)
        .take(take)
        .getManyAndCount();
    } catch (e) {
      return new Promise((resolve, reject) => {
        reject('No se encontro resultados');
      });
    }
  }
}
