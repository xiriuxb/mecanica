import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TurnoPorUsuarioEntity } from './turno-por-usuario.entity';
import { TurnoPorUsuarioController } from './turno-por-usuario.controller';
import { TurnoPorUsuarioService } from './turno-por-usuario.service';

@Module({
  imports: [TypeOrmModule.forFeature([TurnoPorUsuarioEntity], 'default')],
  controllers: [TurnoPorUsuarioController],
  providers: [TurnoPorUsuarioService],
  exports: [TurnoPorUsuarioService],
})
export class TurnoPorUsuarioModule {}
