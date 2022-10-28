import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BeneficioService } from './beneficio.service';
import { CreateBeneficioDto } from './dto/create-beneficio.dto';
import { UpdateBeneficioDto } from './dto/update-beneficio.dto';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';

@Controller('beneficio')
export class BeneficioController {
  constructor(private readonly beneficioService: BeneficioService) {}

  @Post()
  create(@Body() createBeneficioDto: CreateBeneficioDto) {
    return this.beneficioService.create(createBeneficioDto);
  }

  @Get()
  findAll() {
    return this.beneficioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.beneficioService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBeneficioDto: UpdateBeneficioDto) {
    return this.beneficioService.update( id, updateBeneficioDto );
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe ) id: string) {
    return this.beneficioService.remove( id );
  }
}
