import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorialDeCreditoEntity } from './historial-de-credito.entity';
import { HistoriaDeCreditoController } from './historia-de-credito.controller';
import { HistoriaDeCreditoService } from './historia-de-credito.service';

@Module({
  imports: [TypeOrmModule.forFeature([HistorialDeCreditoEntity], 'default')],
  controllers: [HistoriaDeCreditoController],
  providers: [HistoriaDeCreditoService],
  exports: [HistoriaDeCreditoService],
})
export class HistoriaDeCreditoModule {}
