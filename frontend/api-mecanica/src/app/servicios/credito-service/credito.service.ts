import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CreditoInterface} from '../../interfaces/credito.interface';
import {environment} from '../../../environments/environment.prod';

@Injectable()
export class CreditoService {

  url;
  path;

  constructor(
    private readonly _httpClient: HttpClient
  ) {
    this.url = environment.credito;
  }

  guardarCredito(datos: CreditoInterface) {
    return this._httpClient.post(`${this.url}`, datos);
  }

  obtnerHistorialPorCliente(idCliente: number, skip: number, take: number) {
    return this._httpClient.get(`${this.url}/historia/${idCliente}?skip=${skip}&take=${take}`);
  }
}
