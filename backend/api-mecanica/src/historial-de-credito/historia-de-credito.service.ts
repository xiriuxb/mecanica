import { Injectable } from '@nestjs/common';
import { ClaseGenericaService } from '../clases-genericas/clase-generica-component/clase-generica.service';
import { HistorialDeCreditoEntity } from './historial-de-credito.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HistoriaDeCreditoService extends ClaseGenericaService<
  HistorialDeCreditoEntity
> {
  constructor(
    @InjectRepository(HistorialDeCreditoEntity)
    private readonly _historiaDeCreditoRepository: Repository<
      HistorialDeCreditoEntity
    >,
  ) {
    super(_historiaDeCreditoRepository);
  }

  async historialDeCreditoPorCliente(
    idCliente: number,
    skip: number,
    take: number,
  ): Promise<[HistorialDeCreditoEntity[], number] | string> {
    try {
      const query = await this._historiaDeCreditoRepository;
      return query
        .createQueryBuilder('historialDeCredito')
        .innerJoinAndSelect(
          'historialDeCredito.credito',
          'credito',
          'credito.id = historialDeCredito.credito',
        )
        .where('historialDeCredito.usuario = :idUsuario', {
          idUsuario: idCliente,
        })
        .skip(skip)
        .take(take)
        .orderBy('historialDeCredito.id', 'DESC')
        .getManyAndCount();
    } catch (e) {
      return new Promise((resolve, reject) => {
        reject('No se encontro resultados');
      });
    }
  }
}
