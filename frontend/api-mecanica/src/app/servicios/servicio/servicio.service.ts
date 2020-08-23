import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ServicioInterface} from '../../interfaces/servicio.interface';
import io from 'socket.io-client';
import {environment} from '../../../environments/environment.prod';

@Injectable()
export class ServicioService {

  url;
  path;

  servidorServicio = io(environment.websocket);

  constructor(
    private readonly _httpClient: HttpClient
  ) {
    this.url = environment.servicio;
    this.servidorServicio.on('connect', () => {
      this.servidorServicio.on('se-actualizo', data => {
      });
    });
  }

  obtnerServicioPorCliente(idCliente: number, skip: number, take: number) {
    return this._httpClient.get(`${this.url}/listar/${idCliente}?skip=${skip}&take=${take}`);
  }

  obtnerServicioPorMecanica(idMecanica: number, skip: number, take: number) {
    return this._httpClient.get(`${this.url}/listar-por-mecanica/${idMecanica}?skip=${skip}&take=${take}`);
  }

  guardarServicio(datos: ServicioInterface) {
    return this._httpClient.post(`${this.url}`, datos);
  }

  actualizarServicio(datos: ServicioInterface, idServicio: number) {
    return this._httpClient.put(`${this.url}/${idServicio}`, datos);
  }

  eliminarServicio(idServicio: number) {
    return this._httpClient.delete(`${this.url}/${idServicio}`);
  }

  obtenerServicios(skip: number, take: number) {
    return this._httpClient.get(`${this.url}?skip=${skip}&take=${take}`);
  }

  obtenerIdClientePorServicio(idServicio: number) {
    return this._httpClient.get(`${this.url}/recuperar-cliente/${idServicio}`);
  }

  obtnerIdMecanicaPorServicio(idServicio: number) {
    return this._httpClient.get(`${this.url}/recuperar-mecanica/${idServicio}`);
  }
}
