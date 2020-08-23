import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';

@Injectable()
export class ActividadService {

  url;
  path;

  constructor(
    private readonly _httpClient: HttpClient
  ) {
    this.url = environment.actividad;
  }

  consultarActividades(skip, take) {
    return this._httpClient.get(`${this.url}?skip=${skip}&take=${take}`);
  }

  guardarActividad(datos) {
    return this._httpClient.post(`${this.url}`, datos);
  }

  actividadePorMecanico(idMecanico: number, skip: number, take: number) {
    return this._httpClient.get(`${this.url}/actividad/${idMecanico}?skip=${skip}&take=${take}`);
  }

}
