import { Injectable } from '@nestjs/common';
import { ClaseGenericaService } from '../clases-genericas/clase-generica-component/clase-generica.service';
import { RolEntity } from './rol.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolService extends ClaseGenericaService<RolEntity> {
  constructor(
    @InjectRepository(RolEntity)
    private readonly _rolRepository: Repository<RolEntity>,
  ) {
    super(_rolRepository);
  }
}
