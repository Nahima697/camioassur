import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from 'mongoose';
import { Truck } from "./Truck.schema";

@Schema({ collection: 'Booking' })
export class Booking  {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user' })
  user: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'truck' })
  truck: Truck;
  @Prop({ required: true })
  startTime: Date; 

  @Prop({ required: true })
  endTime: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'bridgeId' })
  bridgeId: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
