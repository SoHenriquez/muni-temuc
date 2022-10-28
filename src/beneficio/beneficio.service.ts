import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { error } from 'console';
import { Model, isValidObjectId } from 'mongoose';
import { CreateBeneficioDto } from './dto/create-beneficio.dto';
import { UpdateBeneficioDto } from './dto/update-beneficio.dto';
import { Beneficio } from './entities/beneficio.entity';

@Injectable()
export class BeneficioService {
constructor(
  @InjectModel( Beneficio.name )
  private readonly beneficioModel: Model<Beneficio>

){}

  async create(createBeneficioDto: CreateBeneficioDto) {
    
    createBeneficioDto.name = createBeneficioDto.name.toLocaleUpperCase();
    
    try {

      const beneficio = await this.beneficioModel.create( createBeneficioDto );
      return beneficio;

    } catch (error) {
        this.handleExceptions(error);
    }
    
  }

  findAll() {
    return this.beneficioModel.find();
  }

  //Find by Id-Codigo
  async findOne(id: string) {
    let beneficio: Beneficio;
     
    if( !isNaN(+id) ) beneficio = await this.beneficioModel.findOne({ codigo: id});
    
    //Find by MongoID
    if ( !beneficio && isValidObjectId( id )) beneficio = await this.beneficioModel.findById ( id );
      
    //Find by name  
    if ( !beneficio) beneficio = await this.beneficioModel.findOne({ name: id.toLocaleUpperCase()});

    if ( !beneficio ) 
      throw new NotFoundException(`Beneficio with id, name or code "${ id }" not found`);

    return beneficio;
  }

  async update(id: string, updateBeneficioDto: UpdateBeneficioDto) {
    const beneficio = await this.findOne( id );
    
    if ( updateBeneficioDto.name )
      updateBeneficioDto.name = updateBeneficioDto.name.toLocaleUpperCase();

    try {
      await beneficio.updateOne( updateBeneficioDto );
      //retornamos el beneficio con el update agregado
      return { ...beneficio.toJSON(), ...updateBeneficioDto };
    } catch (error) {
        this.handleExceptions(error);
    }
      
    
  }

  async remove(id: string) {
    //const beneficio = await this.findOne( id );
    //await beneficio.deleteOne();
    //return { id };
    //const result = await this.beneficioModel.findByIdAndDelete( id );
    const { deletedCount } = await this.beneficioModel.deleteOne({ _id: id});
    if ( deletedCount === 0)
      throw new BadRequestException(`Beneficio with id "${ id }" not found`);
    
    return;
  }

  //metodo para manjear errores de duplicado
  private handleExceptions( error: any ){
    //Error 11000 es por objeto duplicado en bd
    if ( error.code === 11000)
    throw new BadRequestException(`Beneficio exists in db ${ JSON.stringify( error.keyValue )}`);

    console.log(error);
    throw new InternalServerErrorException(`Can´t create Beneficio - Check server logs`);
  }

}
