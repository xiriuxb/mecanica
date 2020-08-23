import { Injectable } from '@nestjs/common';
import { ClaseGenericaService } from '../clases-genericas/clase-generica-component/clase-generica.service';
import { CreditoEntity } from './credito.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CreditoService extends ClaseGenericaService<CreditoEntity> {
  constructor(
    @InjectRepository(CreditoEntity)
    private readonly _creditoRepository: Repository<CreditoEntity>,
  ) {
    super(_creditoRepository);
  }

  async historialDeCreditoPorCliente(
    idCliente: number,
    skip: number,
    take: number,
  ): Promise<[CreditoEntity[], number] | string> {
    try {
      const query = await this._creditoRepository;
      return query
        .createQueryBuilder('credito')
        .innerJoinAndSelect(
          'credito.historialDeCredito',
          'historialDeCredito',
          'credito.id = historialDeCredito.credito',
        )
        .where('historialDeCredito.usuario = :idUsuario', {
          idUsuario: idCliente,
        })
        .skip(skip)
        .take(take)
        .orderBy('credito.id', 'DESC')
        .getManyAndCount();
    } catch (e) {
      return new Promise((resolve, reject) => {
        reject('No se encontro resultados');
      });
    }
  }
}
