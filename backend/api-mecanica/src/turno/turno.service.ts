import { Injectable } from '@nestjs/common';
import { ClaseGenericaService } from '../clases-genericas/clase-generica-component/clase-generica.service';
import { TurnoEntity } from './turno.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TurnoService extends ClaseGenericaService<TurnoEntity> {
  constructor(
    @InjectRepository(TurnoEntity)
    private readonly _turnoRepository: Repository<TurnoEntity>,
  ) {
    super(_turnoRepository);
  }
}
