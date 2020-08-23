import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MecanicaInterface} from '../../interfaces/mecanica.interface';
import {environment} from '../../../environments/environment.prod';

@Injectable()
export class MecanicaService {

  url;
  path;

  constructor(
    private readonly _httpClient: HttpClient
  ) {
    this.url = environment.mecanica;
  }

  guardarMecanica(datos: MecanicaInterface) {
    return this._httpClient.post(`${this.url}`, datos);
  }

  editarMecanica(datos: MecanicaInterface) {
    return this._httpClient.put(`${this.url}`, datos);
  }

  obtnerMecanicasConLugar(skip: number, take: number) {
    return this._httpClient.get(`${this.url}/listar/lugar?skip=${skip}&take=${take}`);
  }

  actualizarMecanica(datos: MecanicaInterface, idMecanica: number) {
    return this._httpClient.put(`${this.url}/${idMecanica}`, datos);
  }
}
