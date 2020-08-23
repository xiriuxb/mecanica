import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadPorMecanicoEntity } from './actividad-por-mecanico.entity';
import { ActividadPorMecanicoController } from './actividad-por-mecanico.controller';
import { ActividadPorMecanicoService } from './actividad-por-mecanico.service';

@Module({
  imports: [TypeOrmModule.forFeature([ActividadPorMecanicoEntity], 'default')],
  controllers: [ActividadPorMecanicoController],
  providers: [ActividadPorMecanicoService],
  exports: [ActividadPorMecanicoService],
})
export class ActividadPorMecanicoModule {}
