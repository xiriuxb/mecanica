import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicioPorUsuarioEntity } from './servicio-por-usuario.entity';
import { ServicioPorUsuarioService } from './servicio-por-usuario.service';
import { ServicioPorUsuarioController } from './servicio-por-usuario.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ServicioPorUsuarioEntity], 'default')],
  controllers: [ServicioPorUsuarioController],
  providers: [ServicioPorUsuarioService],
  exports: [ServicioPorUsuarioService],
})
export class ServicioPorUsuarioModule {}
