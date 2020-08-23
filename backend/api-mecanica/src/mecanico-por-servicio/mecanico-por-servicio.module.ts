import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MecanicoPorServicioEntity } from './mecanico-por-servicio.entity';
import { MecanicoPorServicioController } from './mecanico-por-servicio.controller';
import { MecanicoPorServicioService } from './mecanico-por-servicio.service';

@Module({
  imports: [TypeOrmModule.forFeature([MecanicoPorServicioEntity], 'default')],
  controllers: [MecanicoPorServicioController],
  providers: [MecanicoPorServicioService],
  exports: [MecanicoPorServicioService],
})
export class MecanicoPorServicioModule {}
