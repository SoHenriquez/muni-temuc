import { Module } from '@nestjs/common';
import { BeneficioService } from './beneficio.service';
import { BeneficioController } from './beneficio.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Beneficio, BeneficioSchema } from './entities/beneficio.entity';

@Module({
  controllers: [BeneficioController],
  providers: [BeneficioService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Beneficio.name,
        schema: BeneficioSchema
      }
    ])
  ]
})
export class BeneficioModule {}
