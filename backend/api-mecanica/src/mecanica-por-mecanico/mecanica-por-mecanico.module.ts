import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MecanicaPorMecanicoEntity } from './mecanica-por-mecanico.entity';
import { MecanicaPorMecanicoController } from './mecanica-por-mecanico.controller';
import { MecanicaPorMecanicoService } from './mecanica-por-mecanico.service';

@Module({
  imports: [TypeOrmModule.forFeature([MecanicaPorMecanicoEntity], 'default')],
  controllers: [MecanicaPorMecanicoController],
  providers: [MecanicaPorMecanicoService],
  exports: [MecanicaPorMecanicoService],
})
export class MecanicaPorMecanicoModule {}
