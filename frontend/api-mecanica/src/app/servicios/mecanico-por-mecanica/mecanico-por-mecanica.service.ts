import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';

@Injectable()
export class MecanicoPorMecanicaService {

  url;
  path;

  constructor(
    private readonly _httpClient: HttpClient
  ) {
    this.url = environment.mecanicoPorMecanica;
  }

  obtenerMecanicoPorMecanica(idMecanica: number, skip: number, take: number) {
    return this._httpClient.get(`${this.url}/listar/${idMecanica}?skip=${skip}&take=${take}`);
  }

  guardarMecanicoPorMecanica(datos) {
    return this._httpClient.post(`${this.url}`, datos);
  }

  eliminarMecanicoPorMecanica(idMecanico: number) {
    return this._httpClient.delete(`${this.url}/eliminar/${idMecanico}`);
  }
}
