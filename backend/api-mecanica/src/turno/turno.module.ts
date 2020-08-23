import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TurnoEntity } from './turno.entity';
import { TurnoController } from './turno.controller';
import { TurnoService } from './turno.service';

@Module({
  imports: [TypeOrmModule.forFeature([TurnoEntity], 'default')],
  controllers: [TurnoController],
  providers: [TurnoService],
  exports: [TurnoService],
})
export class TurnoModule {}
