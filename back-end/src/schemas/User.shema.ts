import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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

}

export const UserSchema = SchemaFactory.createForClass(User);