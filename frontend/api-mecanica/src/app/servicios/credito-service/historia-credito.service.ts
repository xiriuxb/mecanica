import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HistoriaDeCreditoInterface} from '../../interfaces/historia-de-credito.interface';
import {environment} from '../../../environments/environment.prod';

@Injectable()
export class HistoriaCreditoService {

  url;
  path;

  constructor(
    private readonly _httpCliente: HttpClient
  ) {
    this.url = environment.historialDeCredito;
  }

  obtnerHistorialPorCliente(idCliente: number, skip: number, take: number) {
    return this._httpCliente.get(`${this.url}/historia/${idCliente}?skip=${skip}&take=${take}`);
  }

  guardarHistoriaDeCredito(datos: HistoriaDeCreditoInterface) {
    return this._httpCliente.post(`${this.url}`, datos);
  }
}
