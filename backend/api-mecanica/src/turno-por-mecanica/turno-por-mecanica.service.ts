import { Injectable } from '@nestjs/common';
import { ClaseGenericaService } from '../clases-genericas/clase-generica-component/clase-generica.service';
import { TurnoPorMecanicaEntity } from './turno-por-mecanica.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TurnoPorMecanicaService extends ClaseGenericaService<
  TurnoPorMecanicaEntity
> {
  constructor(
    @InjectRepository(TurnoPorMecanicaEntity)
    private readonly _turnoPorMecanicaRepository: Repository<
      TurnoPorMecanicaEntity
    >,
  ) {
    super(_turnoPorMecanicaRepository);
  }
}
