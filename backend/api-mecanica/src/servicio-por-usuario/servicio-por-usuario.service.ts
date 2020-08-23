import { Injectable } from '@nestjs/common';
import { ClaseGenericaService } from '../clases-genericas/clase-generica-component/clase-generica.service';
import { ServicioPorUsuarioEntity } from './servicio-por-usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ServicioPorUsuarioService extends ClaseGenericaService<
  ServicioPorUsuarioEntity
> {
  constructor(
    @InjectRepository(ServicioPorUsuarioEntity)
    private readonly _servicioPorUsuarioRepository: Repository<
      ServicioPorUsuarioEntity
    >,
  ) {
    super(_servicioPorUsuarioRepository);
  }
}
