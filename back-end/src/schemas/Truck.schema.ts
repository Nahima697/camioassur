import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Truck {
    @Prop()
    _id: string;
    @Prop({required:true})
    model:string;
    @Prop({required:true})
    brand:string;

    @Prop({required:true})
    registrationNumber:string;

}

 export const TruckShema = SchemaFactory.createForClass(Truck)