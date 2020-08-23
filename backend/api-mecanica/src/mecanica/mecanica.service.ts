import { Injectable } from '@nestjs/common';
import { ClaseGenericaService } from '../clases-genericas/clase-generica-component/clase-generica.service';
import { MecanicaEntity } from './mecanica.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MecanicaService extends ClaseGenericaService<MecanicaEntity> {
  constructor(
    @InjectRepository(MecanicaEntity)
    private readonly _mecanicaRepository: Repository<MecanicaEntity>,
  ) {
    super(_mecanicaRepository);
  }

  async eliminarIdDeLugarEnMecanica(idLugar: number) {
    const query = await this._mecanicaRepository;
    return query
      .createQueryBuilder('mecanica')
      .delete()
      .where('lugar = :id', { id: idLugar })
      .execute();
  }

  async listarMecanicas(
    skip: number,
    take: number,
  ): Promise<[MecanicaEntity[], number] | string> {
    try {
      const query = await this._mecanicaRepository;
      return query
        .createQueryBuilder('mecanica')
        .innerJoinAndSelect(
          'mecanica.lugar',
          'lugar',
          'lugar.id = mecanica.lugar',
        )
        .skip(skip)
        .take(take)
        .orderBy('mecanica.id', 'DESC')
        .getManyAndCount();
    } catch (e) {
      return new Promise((resolve, reject) => {
        reject(e);
      });
    }
  }
}
