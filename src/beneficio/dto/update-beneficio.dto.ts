import { PartialType } from '@nestjs/mapped-types';
import { CreateBeneficioDto } from './create-beneficio.dto';

export class UpdateBeneficioDto extends PartialType(CreateBeneficioDto) {}
