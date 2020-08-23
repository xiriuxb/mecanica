import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UsuarioInterface} from '../../interfaces/usuario.interface';
import {environment} from '../../../environments/environment.prod';

@Injectable()
export class UsuarioService {

  url;
  path;

  constructor(
    private readonly _httpClient: HttpClient
  ) {
    this.url = environment.usuario;
  }

  obtenerUsuariosClientes(skip: number, take: number) {
    return this._httpClient.get(`${this.url}/rol/cliente?skip=${skip}&take=${take}`);
  }

  actualizarUsuario(datosNuevos: UsuarioInterface, idUsuario: number) {
    return this._httpClient.put(`${this.url}/${idUsuario}`, datosNuevos);
  }

  obtenerUsuarios(skip: number, take: number) {
    return this._httpClient.get(`${this.url}?skip=${skip}&take=${take}`);
  }

  guardarUsuarioCliente(datos: UsuarioInterface) {
    return this._httpClient.post(`${this.url}`, datos);
  }

  obtenerCredencialesDeUsuarioLogeado(datos: UsuarioInterface) {
    return this._httpClient.post(`${this.url}/verificar/credenciales`, datos);
  }
}
