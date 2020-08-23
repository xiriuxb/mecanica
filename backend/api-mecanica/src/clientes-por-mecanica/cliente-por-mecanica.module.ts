import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientePorMecanicaEntity } from './cliente-por-mecanica.entity';
import { ClientePorMecanicaController } from './cliente-por-mecanica.controller';
import { ClientePorMecanicaService } from './cliente-por-mecanica.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClientePorMecanicaEntity], 'default')],
  controllers: [ClientePorMecanicaController],
  providers: [ClientePorMecanicaService],
  exports: [ClientePorMecanicaService],
})
export class ClientePorMecanicaModule {}
