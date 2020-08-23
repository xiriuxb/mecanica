import { Injectable } from '@nestjs/common';
import { ClaseGenericaService } from '../clases-genericas/clase-generica-component/clase-generica.service';
import { TurnoPorUsuarioEntity } from './turno-por-usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TurnoPorUsuarioService extends ClaseGenericaService<
  TurnoPorUsuarioEntity
> {
  constructor(
    @InjectRepository(TurnoPorUsuarioEntity)
    private readonly _turnoPorUsuarioRepository: Repository<
      TurnoPorUsuarioEntity
    >,
  ) {
    super(_turnoPorUsuarioRepository);
  }
}
