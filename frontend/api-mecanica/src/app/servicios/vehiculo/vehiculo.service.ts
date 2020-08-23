import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {VehiculoInterface} from '../../interfaces/vehiculo.interface';
import {environment} from '../../../environments/environment.prod';

@Injectable()
export class VehiculoService {

  url;
  path;

  constructor(
    private readonly _httpClient: HttpClient
  ) {
    this.url = environment.vehhiculo;
  }

  obtenerVehiculoPorCliente(skip: number, take: number, idCliente: object) {
    return this._httpClient.put(`${this.url}/vehiculo/cliente?skip=${skip}&take=${take}`, idCliente);
  }

  actualizarVehiculo(datosNuevos: VehiculoInterface, idVehiculo: number) {
    return this._httpClient.put(`${this.url}/${idVehiculo}`, datosNuevos);
  }

  guardarVehiculoPorCliente(datos: VehiculoInterface) {
    return this._httpClient.post(`${this.url}/`, datos);
  }

  eliminarVehiculo(idVehiculo: number) {
    return this._httpClient.delete(`${this.url}/${idVehiculo}`);
  }

  obtenerVehiculoPorId(idVehiuclo: number) {
    return this._httpClient.get(`${this.url}/${idVehiuclo}`);
  }

}
