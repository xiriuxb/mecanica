import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';

@Injectable()
export class MecanicoPorServicioService {

  url;
  path;

  constructor(
    private readonly _httpClient: HttpClient
  ) {
    this.url = environment.mecanicoPorServicio;
  }

  guardar(datos) {
    return this._httpClient.post(`${this.url}`, datos);
  }
}
