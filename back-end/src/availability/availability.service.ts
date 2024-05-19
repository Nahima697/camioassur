import { Injectable } from '@nestjs/common';
import AvailabilitySchedule = require('availability-schedule');
import { Bridge } from 'src/schemas/Bridge.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AvailabilityService {
  private openingHours: AvailabilitySchedule;

  constructor(@InjectModel(Bridge.name) private readonly bridgeModel: Model<Bridge>) {
    this.openingHours = new AvailabilitySchedule('2024-05-15T00:00:00Z', '2024-05-21T00:00:00Z');
    this.openingHours.addWeeklyRecurringAvailability('2024-05-15T08:00:00Z', '2024-05-21T12:00:00Z', [1, 2, 3, 4, 5, 6]);
    this.openingHours.addWeeklyRecurringAvailability('2024-05-21T13:00:00Z', '2024-05-21T18:00:00Z', [1, 2, 3, 4, 5, 6]);
  }

  getOpeningHours(): { start: Date, end: Date }[] {
    const availabilities = this.openingHours.getAvailabilities('+000');
    console.log(`Availabilities for opening hours: ${JSON.stringify(availabilities)}`);
    return availabilities.map(({ start, end }) => ({ start: new Date(start), end: new Date(end) }));
  }

  async isSlotAvailable(bridgeId: string, startDate: Date, endDate: Date): Promise<boolean> {
    console.log(`Received slot: ${startDate} to ${endDate}`);

    const availabilities = this.openingHours.getAvailabilities('+000');
    console.log(`Availabilities for opening hours: ${JSON.stringify(availabilities)}`);

    if (!availabilities || availabilities.length === 0) {
      console.log('No availabilities for the requested slot');
      return false;
    }

    const bridges = await this.bridgeModel.find({
      _id: bridgeId,
      'appointments.startDate': { $lt: endDate },
      'appointments.endDate': { $gt: startDate },
    }).exec();

    console.log(`Bridges with overlapping appointments: ${JSON.stringify(bridges)}`);

    const hasOverlap = bridges.some((bridge) =>
      bridge.appointments.some((appointment) =>
        startDate < appointment.endDate && endDate > appointment.startDate
      )
    );

    console.log(`Is there an overlap: ${hasOverlap}`);

    return !hasOverlap;
  }

  async isNotAvailable(bridgeId: string, startTime: Date, endTime: Date): Promise<boolean> {
    const existingBookings = await this.bridgeModel.find({
      _id: bridgeId,
      'appointments.startDate': { $lt: endTime },
      'appointments.endDate': { $gt: startTime },
    }).exec();

    return existingBookings.length !== 0;
  }
}
