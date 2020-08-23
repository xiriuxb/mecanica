import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadPorMecanicaEntity } from './actividad-por-mecanica.entity';
import { ActividadPorMecanicaController } from './actividad-por-mecanica.controller';
import { ActividadPorMecanicaService } from './actividad-por-mecanica.service';

@Module({
  imports: [TypeOrmModule.forFeature([ActividadPorMecanicaEntity], 'default')],
  controllers: [ActividadPorMecanicaController],
  providers: [ActividadPorMecanicaService],
  exports: [ActividadPorMecanicaService],
})
export class ActividadPorMecanicaModule {}
