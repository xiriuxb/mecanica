import { Injectable } from '@nestjs/common';
import { ClaseGenericaService } from '../clases-genericas/clase-generica-component/clase-generica.service';
import { RolPorUsuarioEntity } from './rol-por-usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolPorUsuarioService extends ClaseGenericaService<
  RolPorUsuarioEntity
> {
  constructor(
    @InjectRepository(RolPorUsuarioEntity)
    private readonly _rolPorUsuarioRepository: Repository<RolPorUsuarioEntity>,
  ) {
    super(_rolPorUsuarioRepository);
  }
}
