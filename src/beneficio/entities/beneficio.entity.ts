import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Beneficio extends Document {
    @Prop({ unique: true, index: true, type: Number, required: true })
    codigo: number;
    @Prop({ unique: true, index: true, type: String, required: true })
    name: string;

    @Prop({ index: true, type: String, required: true })
    tipo: string;
    
    @Prop({ index: true, })
    monto: number;

}

export const BeneficioSchema = SchemaFactory.createForClass( Beneficio );