import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OpeningHoursService } from 'src/openingHours/openingHours.service';
import { Booking } from 'src/schemas/Booking.schema';
import { Bridge } from 'src/schemas/Bridge.schéma';
import AvailabilitySchedule = require('availability-schedule');

@Injectable()
export class AvailabilityService {
  private bridgeAvailabilities: { [bridgeId: string]: AvailabilitySchedule } = {};

  constructor(
    @InjectModel(Booking.name) private readonly bookingModel: Model<Booking>,
    @InjectModel(Bridge.name) private readonly bridgeModel: Model<Bridge>,
    private readonly openingHoursService: OpeningHoursService,
  ) {}

  async updateAvailabilities(): Promise<void> {
    try {
      const allBridges = await this.bridgeModel.find().exec();
      for (const bridge of allBridges) {
        if (!this.bridgeAvailabilities[bridge._id]) {
          const openingHours = this.openingHoursService.getOpeningHours();
          const startDateISO = openingHours[0].start.toISOString();
          const endDateISO = openingHours[openingHours.length - 1].end.toISOString();
          this.bridgeAvailabilities[bridge._id] = new AvailabilitySchedule(startDateISO, endDateISO);
          
        }
      }

      const allBookings = await this.bookingModel.find().exec();
      for (const booking of allBookings) {
        const bridgeId = booking.bridgeId; 
        const startDateISO = booking.startTime.toISOString();
        const endDateISO = booking.endTime.toISOString();
        if (this.bridgeAvailabilities[bridgeId]) {
            this.bridgeAvailabilities[bridgeId].removeAvailability(startDateISO, endDateISO);
        }
    }
    
    } catch (error) {
      console.error('Error updating availabilities:', error);
    }
  }

  async isAvailable(startDate: Date, endDate: Date): Promise<boolean> {
    const allBridges = await this.bridgeModel.find().exec();
    for (const bridge of allBridges) {
      const bridgeAvailability = this.bridgeAvailabilities[bridge._id];
      if (bridgeAvailability && bridgeAvailability.isAvailable(startDate, endDate)) {
        return true;
      }
    }
    return false;
  }
}
