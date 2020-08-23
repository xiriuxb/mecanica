import { Injectable } from '@nestjs/common';
import { ClaseGenericaService } from '../clases-genericas/clase-generica-component/clase-generica.service';
import { ClientePorMecanicaEntity } from './cliente-por-mecanica.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClientePorMecanicaService extends ClaseGenericaService<
  ClientePorMecanicaEntity
> {
  constructor(
    @InjectRepository(ClientePorMecanicaEntity)
    private readonly _clientePorMecanicaRepository: Repository<
      ClientePorMecanicaEntity
    >,
  ) {
    super(_clientePorMecanicaRepository);
  }
}
