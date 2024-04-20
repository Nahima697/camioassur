import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: 'Truck' })
export class Truck {
    
    @Prop({required:true})
    model:string;
    @Prop({required:true})
    brand:string;

    @Prop({required:true})
    registrationNumber:string;


}

 export const TruckSchema = SchemaFactory.createForClass(Truck)