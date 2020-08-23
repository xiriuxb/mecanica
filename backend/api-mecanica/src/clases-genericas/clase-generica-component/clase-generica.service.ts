import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { take } from 'rxjs/operators';

@Injectable()
export class ClaseGenericaService<Entity> {
  constructor(private readonly _repositoryEntity: Repository<Entity>) {}

  crear(datos: Entity): Promise<Entity> {
    return this._repositoryEntity.save(datos);
  }

  async editar(id: number, datos: Entity): Promise<Entity | string> {
    try {
      const datoEncontrado = await this._repositoryEntity.findOne(id);
      if (datoEncontrado) {
        await this._repositoryEntity.update(id, datos);
        return this._repositoryEntity.findOne(id);
      } else {
        return new Promise((resolve, reject) => {
          reject('No se encontraron resultados.');
        });
      }
    } catch (e) {
      console.error('error de servicio', e);
      throw new InternalServerErrorException(e);
    }
  }

  // tslint:disable-next-line:no-shadowed-variable
  async listarTodos(
    skip: number,
    // tslint:disable-next-line:no-shadowed-variable
    take: number,
  ): Promise<[Entity[], number] | string> {
    try {
      const repositorio = await this._repositoryEntity;
      const datos = await repositorio
        .createQueryBuilder()
        .orderBy('id', 'DESC')
        .skip(skip)
        .take(take)
        .getManyAndCount();
      return datos;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async listarPorId(id: number): Promise<Entity | string> {
    try {
      const datoEncontrado = await this._repositoryEntity.findOne(id);
      if (datoEncontrado) {
        return new Promise(resolve => {
          resolve(datoEncontrado);
        });
      } else {
        return new Promise((resolve, reject) => {
          reject('No se encontro resultado');
        });
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async eliminar(id: number): Promise<DeleteResult> {
    try {
      const datoEncontrado = await this._repositoryEntity.findOne(id);
      if (datoEncontrado) {
        return await this._repositoryEntity.delete(id);
      } else {
        return new Promise((resolve, reject) => {
          reject('No se encontro resultados');
        });
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
