import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicioEntity } from './servicio.entity';
import { ServicioController } from './servicio.controller';
import { ServicioService } from './servicio.service';

@Module({
  imports: [TypeOrmModule.forFeature([ServicioEntity], 'default')],
  controllers: [ServicioController],
  providers: [ServicioService],
  exports: [ServicioService],
})
export class ServicioModule {}
