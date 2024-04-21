import { Injectable } from '@nestjs/common';
import AvailabilitySchedule = require('availability-schedule');
import { Booking } from 'src/schemas/Booking.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AvailabilityService  {
  private openingHours: AvailabilitySchedule;

  constructor(   @InjectModel(Booking.name) private readonly bookingModel: Model<Booking>,) {
    this.openingHours = new AvailabilitySchedule('2024-04-15T00:00:00Z', '2024-04-21T00:00:00Z');
    this.openingHours.addWeeklyRecurringAvailability('2024-04-15T08:00:00Z', '2024-04-21T12:00:00Z', [1, 2, 3, 4, 5, 6]); // Lundi à samedi, 8h-12h
    this.openingHours.addWeeklyRecurringAvailability('2024-04-21T13:00:00Z', '2024-04-21T18:00:00Z', [1, 2, 3, 4, 5, 6]); // Lundi à samedi, 13h-18h
  }

  getOpeningHours(): { start: Date, end: Date }[] {
    const availabilities = this.openingHours.getAvailabilities();
    return availabilities.map(({ start, end }) => ({ start: new Date(start), end: new Date(end) }));
  }

  async isAvailable(bridgeId: string, startTime: Date, endTime: Date): Promise<boolean> {
    const existingBookings = await this.bookingModel.find({
      bridgeId,
      startTime: { $lte: endTime },
      endTime: { $gte: startTime }
    }).exec();

    return existingBookings.length === 0;
  }
}
