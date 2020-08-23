import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditoEntity } from './credito.entity';
import { CreditoController } from './credito.controller';
import { CreditoService } from './credito.service';

@Module({
  imports: [TypeOrmModule.forFeature([CreditoEntity], 'default')],
  controllers: [CreditoController],
  providers: [CreditoService],
  exports: [CreditoService],
})
export class CreditoModule {}
