import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from 'mongoose';

@Schema()
export class Booking extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: string;


  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Bridge' }) 
  bridge: string;


  @Prop({ required: true })
  startDate: Date; 

  @Prop({ required: true })
  endDate: Date;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
