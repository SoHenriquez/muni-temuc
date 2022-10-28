import { Min, IsInt, IsString, MinLength,  } from "class-validator";



export class CreateBeneficioDto {
    @IsInt()
    @Min(1)
    codigo: number;
    
    @IsString()
    @MinLength(1)
    name: string;
    @IsString()
    @MinLength(1)
    tipo: string;

    @IsInt()
    @Min(0)
    monto: number;
}
