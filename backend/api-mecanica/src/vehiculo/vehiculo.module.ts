import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiculoEntity } from './vehiculo.entity';
import { VehiculoController } from './vehiculo.controller';
import { VehiculoService } from './vehiculo.service';

@Module({
  imports: [TypeOrmModule.forFeature([VehiculoEntity], 'default')],
  controllers: [VehiculoController],
  providers: [VehiculoService],
  exports: [VehiculoService],
})
export class VehiculoModule {}
