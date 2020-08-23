import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MecanicoEntity } from './mecanico.entity';
import { MecanicoController } from './mecanico.controller';
import { MecanicoService } from './mecanico.service';

@Module({
  imports: [TypeOrmModule.forFeature([MecanicoEntity], 'default')],
  controllers: [MecanicoController],
  providers: [MecanicoService],
  exports: [MecanicoService],
})
export class MecanicoModule {}
