import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TurnoPorMecanicaEntity } from './turno-por-mecanica.entity';
import { TurnoPorMecanicaController } from './turno-por-mecanica.controller';
import { TurnoPorMecanicaService } from './turno-por-mecanica.service';

@Module({
  imports: [TypeOrmModule.forFeature([TurnoPorMecanicaEntity], 'default')],
  controllers: [TurnoPorMecanicaController],
  providers: [TurnoPorMecanicaService],
  exports: [TurnoPorMecanicaService],
})
export class TurnoPorMecanicaModule {}
