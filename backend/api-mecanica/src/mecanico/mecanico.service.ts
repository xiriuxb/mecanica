import { Injectable } from '@nestjs/common';
import { ClaseGenericaService } from '../clases-genericas/clase-generica-component/clase-generica.service';
import { MecanicoEntity } from './mecanico.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MecanicoService extends ClaseGenericaService<MecanicoEntity> {
  constructor(
    @InjectRepository(MecanicoEntity)
    private readonly _mecanicoRepository: Repository<MecanicoEntity>,
  ) {
    super(_mecanicoRepository);
  }

  async serviciosPorMecanico(skip: number, take: number) {
    const query = await this._mecanicoRepository;
    const datos = await query
      .createQueryBuilder('mecanico')
      .innerJoinAndSelect(
        'mecanico.actividadPorMecanico',
        'actividadPorMecanico',
        'actividadPorMecanico.mecanico = mecanico.id',
      )
      .innerJoinAndSelect(
        'actividadPorMecanico.actividad',
        'actividad',
        'actividadPorMecanico.actividad = actividad.id',
      )
      .orderBy('mecanico.id', 'DESC')
      .skip(skip)
      .take(take)
      .getManyAndCount();
    const existeDatos = datos.length > 0;
    if (existeDatos) {
      return new Promise(resolve => {
        resolve(datos);
      });
    } else {
      return new Promise((resolve, reject) => {
        reject('No se encontraron resultados');
      });
    }
  }

  async listarMecanicoPorMecanica(
    idMecanica: number,
    skip: number,
    take: number,
  ): Promise<[MecanicoEntity[], number] | string> {
    try {
      const query = await this._mecanicoRepository;
      return query
        .createQueryBuilder('mecanico')
        .innerJoinAndSelect(
          'mecanico.mecanicaPorMecanico',
          'mecanicaPorMecanico',
          'mecanico.id = mecanicaPorMecanico.mecanico',
        )
        .where('mecanicaPorMecanico.mecanica = :id', { id: idMecanica })
        .skip(skip)
        .take(take)
        .getManyAndCount();
    } catch (e) {
      return new Promise((resolve, reject) => {
        reject('No se encontro resultados.');
      });
    }
  }

  async listarMecanicosDisponibles(
    skip: number,
    take: number,
  ): Promise<[MecanicoEntity[], number] | string> {
    try {
      const query = await this._mecanicoRepository;
      return query
        .createQueryBuilder('mecanico')
        .leftJoinAndSelect(
          'mecanico.mecanicaPorMecanico',
          'mecanicaPorMecanico',
          'mecanico.id = mecanicaPorMecanico.mecanico',
        )
        .where('mecanicaPorMecanico.mecanico is null')
        .skip(skip)
        .take(take)
        .getManyAndCount();
    } catch (e) {
      return new Promise((resolve, reject) => {
        reject('No se encontro resultados.');
      });
    }
  }
}
