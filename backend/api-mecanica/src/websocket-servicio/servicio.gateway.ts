import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ServicioService } from '../servicio/servicio.service';

@WebSocketGateway(3005, { namespace: 'servicio' })
export class ServicioGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly _servicioService: ServicioService) {}

  afterInit(server: any): any {
    // console.log('websocket servicio ha iniciado');
  }

  handleConnection(usuario: any): any {
    // console.log('se conecto', usuario.id);
  }

  handleDisconnect(usuario: any): any {
    // console.log('se desconecto', usuario.id);
  }

  @SubscribeMessage('actualizar-campo-servicio-cliente')
  async conexion(client: any, data: any): Promise<any> {
    try {
      const respuesta = await this._servicioService.editar(
        data.idServicio,
        data.datos,
      );
      client.broadcast.emit('se-actualizo', respuesta);
      return respuesta;
    } catch (e) {
      console.log(e);
    }
  }
}
