import { Injectable } from '@nestjs/common';
import { ClaseGenericaService } from '../clases-genericas/clase-generica-component/clase-generica.service';
import { InjectRepository } from '@nestjs/typeorm';
import { VehiculoEntity } from './vehiculo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VehiculoService extends ClaseGenericaService<VehiculoEntity> {
  constructor(
    @InjectRepository(VehiculoEntity)
    private readonly _vehiculoRepository: Repository<VehiculoEntity>,
  ) {
    super(_vehiculoRepository);
  }

  async obtenerVehiculoCliente(
    skip: number,
    take: number,
    idCliente: number,
  ): Promise<[VehiculoEntity[], number] | string> {
    try {
      const query = await this._vehiculoRepository;
      return query
        .createQueryBuilder('vehiculo')
        .innerJoinAndSelect(
          'vehiculo.usuario',
          'usuario',
          'usuario.id = vehiculo.usuario',
        )
        .where('vehiculo.usuario = :id', { id: idCliente })
        .skip(skip)
        .take(take)
        .orderBy('vehiculo.id', 'DESC')
        .getManyAndCount();
    } catch (e) {
      return new Promise((resolve, reject) => {
        reject('No se encontro resultados');
      });
    }
  }
}
