import { Module } from '@nestjs/common';
import { ServicioGateway } from './servicio.gateway';
import { ServicioModule } from '../servicio/servicio.module';

@Module({
  imports: [ServicioModule],
  providers: [ServicioGateway],
  exports: [ServicioGateway],
})
export class WebsocketModule {}
