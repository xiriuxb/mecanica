import {Injectable} from '@angular/core';
import io from 'socket.io-client';
import {ServicioInterface} from '../../interfaces/servicio.interface';
import {from, Observable} from 'rxjs';
import {environment} from '../../../environments/environment.prod';

@Injectable()
export class WebsocketService {

  readonly servidorServicio = io(environment.websocket);
  datos: any;
  constructor() {
    this.servidorServicio.on('connect', () => {
    });
  }

  enviarDatos(datos: ServicioInterface, idServicio: number): Observable<any> {
    const data = {
      idServicio,
      datos
    };
    const promesa = new Promise((resolve, reject) => {
      this.servidorServicio.emit('actualizar-campo-servicio-cliente', data, (resp) => {
        resolve(resp);
      });
    });
    return from(promesa);
  }
}
