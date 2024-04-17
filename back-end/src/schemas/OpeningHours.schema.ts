

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class OpeningHours {
  @Prop({ required: true })
  day: Date;

  @Prop({ required: true })
 startTime: Date;

  @Prop({ required: true })
  endTime: Date  ;
}

export const OpeningHoursSchema = SchemaFactory.createForClass(OpeningHours);
