import { Injectable } from '@nestjs/common';
import { ClaseGenericaService } from '../clases-genericas/clase-generica-component/clase-generica.service';
import { ActividadPorMecanicoEntity } from './actividad-por-mecanico.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ActividadPorMecanicoService extends ClaseGenericaService<
  ActividadPorMecanicoEntity
> {
  constructor(
    @InjectRepository(ActividadPorMecanicoEntity)
    private readonly _actividadPorMecanicoRepository: Repository<
      ActividadPorMecanicoEntity
    >,
  ) {
    super(_actividadPorMecanicoRepository);
  }

  async actividadesPorMecanico(idMecanico: number, skip: number, take: number) {
    try {
      const query = await this._actividadPorMecanicoRepository;
      return query
        .createQueryBuilder('actividadPorMecanico')
        .innerJoinAndSelect(
          'actividadPorMecanico.actividad',
          'actividad',
          'actividad.id = actividadPorMecanico.actividad',
        )
        .where('actividadPorMecanico.mecanico = :id', { id: idMecanico })
        .skip(skip)
        .take(take)
        .getManyAndCount();
    } catch (e) {
      console.error(e);
    }
  }
}
