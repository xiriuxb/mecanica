import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MecanicoInterface} from '../../interfaces/mecanico.interface';
import {environment} from '../../../environments/environment.prod';

@Injectable()
export class MecanicoService {

  url;
  path;

  constructor(
    private readonly _httpClient: HttpClient
  ) {
    this.url = environment.mecanico;
  }

  obtenerMecanico(skip: number, take: number) {
    return this._httpClient.get(`${this.url}?skip=${skip}&take=${take}`);
  }

  guardarMecanico(datos: MecanicoInterface) {
    return this._httpClient.post(`${this.url}`, datos);
  }

  actualizarMecanico(datosNuevos: MecanicoInterface, idMecanico: number) {
    return this._httpClient.put(`${this.url}/${idMecanico}`, datosNuevos);
  }

  buscarPorIdMecanico(idMecanico: number) {
    return this._httpClient.get(`${this.url}/${idMecanico}`);
  }

  obtenerMecanicoPorMecanica(idMecanica: number, skip: number, take: number) {
    return this._httpClient.get(`${this.url}/listar/${idMecanica}?skip=${skip}&take=${take}`);
  }

  obtnerMecanicosDisponibles(skip: number, take: number) {
    return this._httpClient.get(`${this.url}/listar/mecanicos/disponibles?skip=${skip}&take=${take}`);
  }
}
