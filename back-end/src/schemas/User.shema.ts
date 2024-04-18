import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Truck } from './Truck.schema';

@Schema()
export class User {
   @Prop()
   _id: string;
   @Prop({required:true})
   lastName:string;

   @Prop({required:true})
   firstName:string;

   @Prop({required:true})
   email:string;

   @Prop({required:false})
   phone:string;

   
   @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Truck' }] })
   truck: Truck;

}

export const UserSchema = SchemaFactory.createForClass(User);