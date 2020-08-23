import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MecanicaEntity } from './mecanica.entity';
import { MecanicaController } from './mecanica.controller';
import { MecanicaService } from './mecanica.service';

@Module({
  imports: [TypeOrmModule.forFeature([MecanicaEntity], 'default')],
  controllers: [MecanicaController],
  providers: [MecanicaService],
  exports: [MecanicaService],
})
export class MecanicaModule {}
