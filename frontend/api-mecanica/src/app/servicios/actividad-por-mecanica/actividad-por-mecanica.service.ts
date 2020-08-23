import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';


@Injectable()
export class ActividadPorMecanicaService {

  url;
  path;

  constructor(
    private readonly _httpClient: HttpClient
  ) {
    this.url = environment.actividadPorMecanica;
  }

  guardarActividadPorMecanica(datos) {
    return this._httpClient.post(`${this.url}`, datos);
  }

  eliminarActividadPorMecanica(idActividadPorMecanica: number) {
    return this._httpClient.delete(`${this.url}/${idActividadPorMecanica}`);
  }

  actividadesPorMecanica(idMecanica: number, skip: number, take: number) {
    return this._httpClient.get(`${this.url}/actividad/${idMecanica}?skip=${skip}&take=${take}`);
  }

  agregarActividadPorMecanica() {

  }
}
