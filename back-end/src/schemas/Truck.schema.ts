import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema({ collection: 'Truck' })
export class Truck  extends Document{
    @Prop({required:true})
    brand:string;

    @Prop({required:true})
    vehicleModel: string;

    @Prop({required:true})
    registrationNumber:string;
}

 export const TruckSchema = SchemaFactory.createForClass(Truck)