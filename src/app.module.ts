import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';

import { BeneficioModule } from './beneficio/beneficio.module';
import { CommonModule } from './common/common.module';


@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname,'..','public'),
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/mantenedor'),
    BeneficioModule,
    CommonModule
  ]
})
export class AppModule {}
