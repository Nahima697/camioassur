import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User  extends Document{

   @Prop({required:true})
   lastName:string;

   @Prop({required:true})
   firstName:string;

   @Prop({required:true})
   email:string;

   @Prop({required:false})
   phone:string;

}

export const UserSchema = SchemaFactory.createForClass(User);