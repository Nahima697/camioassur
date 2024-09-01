import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from 'mongoose';

@Schema({ collection: 'Booking' })
export class Booking {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Truck' })
  truck: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  startTime: string;

  @Prop({ required: true })
  endTime: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Bridge' })
  bridgeId: mongoose.Schema.Types.ObjectId;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
