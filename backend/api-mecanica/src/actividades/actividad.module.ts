import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadEntity } from './actividad.entity';
import { ActividadController } from './actividad.controller';
import { ActividadService } from './actividad.service';

@Module({
  imports: [TypeOrmModule.forFeature([ActividadEntity], 'default')],
  controllers: [ActividadController],
  providers: [ActividadService],
  exports: [ActividadService],
})
export class ActividadModule {}
