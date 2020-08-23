import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LugarInterface} from '../../interfaces/lugar.interface';
import {environment} from '../../../environments/environment.prod';

@Injectable()
export class LugarService {

  url;
  path;

  constructor(
    private readonly _httpClient: HttpClient
  ) {
    this.url = environment.lugar;
  }

  obtenerLugar(skip: number, take: number) {
    return this._httpClient.get(`${this.url}?skip=${skip}&take=${take}`);
  }

  guardarLugar(datos: LugarInterface) {
    return this._httpClient.post(`${this.url}`, datos);
  }

  actualizarLugar(datosNuevos: LugarInterface, idLugar: number) {
    return this._httpClient.put(`${this.url}/${idLugar}`, datosNuevos);
  }

  buscarPorIdLugar(idLugar: number) {
    return this._httpClient.get(`${this.url}/${idLugar}`);
  }

  eliminarLugar(idLugar: number) {
    return this._httpClient.delete(`${this.url}/${idLugar}`);
  }

 obtenerMecanicasPorLugar(skip: number, take: number) {
    return this._httpClient.get(`${this.url}/mecanicas-por-ciudad?skip=${skip}&take=${take}`);
 }
}
