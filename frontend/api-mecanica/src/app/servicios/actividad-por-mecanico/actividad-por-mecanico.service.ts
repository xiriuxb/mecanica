import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';

@Injectable()
export class ActividadPorMecanicoService {

  url;
  path;

  constructor(
    private readonly _httpClient: HttpClient
  ) {
    this.url = environment.actividadPorMecanico;
  }

  guardarActividadPorMecanico(datos) {
    return this._httpClient.post(`${this.url}`, datos);
  }

  actividadesPorMecanico(idMecanico: number, skip: number, take: number) {
    return this._httpClient.get(`${this.url}/actividad/${idMecanico}?skip=${skip}&take=${take}`);
  }

  eliminarActividadPorMecanico(idActividadPorMecanico: number) {
    return this._httpClient.delete(`${this.url}/${idActividadPorMecanico}`);
  }
}
