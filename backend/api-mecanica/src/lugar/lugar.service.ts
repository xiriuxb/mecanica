import { Injectable } from '@nestjs/common';
import { ClaseGenericaService } from '../clases-genericas/clase-generica-component/clase-generica.service';
import { LugarEntity } from './lugar.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MecanicaEntity } from '../mecanica/mecanica.entity';

@Injectable()
export class LugarService extends ClaseGenericaService<LugarEntity> {
  constructor(
    @InjectRepository(LugarEntity)
    private readonly _lugarRepository: Repository<LugarEntity>,
  ) {
    super(_lugarRepository);
  }

  async buscarMecanicasPorCiudad(skip: number, take: number) {
    const query = await this._lugarRepository;
    return query
      .createQueryBuilder('lugar')
      .innerJoinAndSelect(
        'lugar.mecanica',
        'mecanica',
        'mecanica.lugar = lugar.id',
      )
      .skip(skip)
      .take(take)
      .orderBy('lugar.id', 'DESC')
      .getManyAndCount();
  }
}
