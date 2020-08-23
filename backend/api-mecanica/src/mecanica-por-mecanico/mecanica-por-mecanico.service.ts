import { Injectable } from '@nestjs/common';
import { ClaseGenericaService } from '../clases-genericas/clase-generica-component/clase-generica.service';
import { MecanicaPorMecanicoEntity } from './mecanica-por-mecanico.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MecanicaPorMecanicoService extends ClaseGenericaService<
  MecanicaPorMecanicoEntity
> {
  constructor(
    @InjectRepository(MecanicaPorMecanicoEntity)
    private readonly _mecanicaPorMecanicoRepository: Repository<
      MecanicaPorMecanicoEntity
    >,
  ) {
    super(_mecanicaPorMecanicoRepository);
  }

  async listarMecanicoPorMecanica(
    idMecanica: number,
    skip: number,
    take: number,
  ): Promise<[MecanicaPorMecanicoEntity[], number] | string> {
    try {
      const query = await this._mecanicaPorMecanicoRepository;
      return query
        .createQueryBuilder('mecanicoPorMecanica')
        .innerJoinAndSelect(
          'mecanicoPorMecanica.mecanico',
          'mecanico',
          'mecanico.id = mecanicoPorMecanica.mecanico',
        )
        .where('mecanicoPorMecanica.mecanica = :id', { id: idMecanica })
        .skip(skip)
        .take(take)
        .getManyAndCount();
    } catch (e) {
      return new Promise((resolve, reject) => {
        reject('No se encontro resultados.');
      });
    }
  }

  async eliminarMecanicoPorMecanica(idMecanico: number) {
    try {
      const query = this._mecanicaPorMecanicoRepository;
      return query
        .createQueryBuilder()
        .delete()
        .where('mecanico = :id', { id: idMecanico })
        .execute();
    } catch (e) {
      return e;
    }
  }
}
