import { Injectable } from '@nestjs/common';
import { ClaseGenericaService } from '../clases-genericas/clase-generica-component/clase-generica.service';
import { ActividadEntity } from './actividad.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ActividadService extends ClaseGenericaService<ActividadEntity> {
  constructor(
    @InjectRepository(ActividadEntity)
    private readonly _actividadRepository: Repository<ActividadEntity>,
  ) {
    super(_actividadRepository);
  }

  async actividadesPorMecanico(idMecanico: number, skip: number, take: number) {
    console.log('id que llega', idMecanico);
    try {
      const query = await this._actividadRepository;
      return query
        .createQueryBuilder('actividad')
        .innerJoinAndSelect(
          'actividad.actividadPorMecanico',
          'actividadPorMecanico',
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
