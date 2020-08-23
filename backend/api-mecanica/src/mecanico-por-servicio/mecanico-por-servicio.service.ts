import { Injectable } from '@nestjs/common';
import { ClaseGenericaService } from '../clases-genericas/clase-generica-component/clase-generica.service';
import { MecanicoPorServicioEntity } from './mecanico-por-servicio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MecanicoPorServicioService extends ClaseGenericaService<
  MecanicoPorServicioEntity
> {
  constructor(
    @InjectRepository(MecanicoPorServicioEntity)
    private readonly _mecanicoPorServicioRepository: Repository<
      MecanicoPorServicioEntity
    >,
  ) {
    super(_mecanicoPorServicioRepository);
  }
}
