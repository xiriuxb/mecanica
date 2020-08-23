import { IoAdapter } from '@nestjs/platform-socket.io';
import * as redisIoAdapter from 'socket.io-redis';
import { CONFIGURACION_REDIST } from '../constantes/configuraciones-de-inicio/configuracion-redist';

const redisAdapter = redisIoAdapter({
  host: CONFIGURACION_REDIST.host,
  port: CONFIGURACION_REDIST.puerto,
});

export class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);
    server.adapter(redisAdapter);
    return server;
  }
}
