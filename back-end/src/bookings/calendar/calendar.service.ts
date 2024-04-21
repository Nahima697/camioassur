import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bridge } from 'src/schemas/Bridge.schéma';

@Injectable()
export class CalendarService {
  constructor(
    @InjectModel(Bridge.name) private readonly bridgeModel: Model<Bridge>,
  ) {}

  async getAvailableSlotsForAllBridges(startDate: Date, endDate: Date): Promise<any> {
    const bridges = await this.bridgeModel.find().exec();
    const availableSlotsForAllBridges = [];

    for (const bridge of bridges) {
      const existingAppointments = bridge.appointments.map(availability => {
        return {
          startDate: new Date(availability.startDate),
          endDate: new Date(availability.endDate)
        };
      });

      const availableSlots = [];

      for (let i = 0; i < existingAppointments.length; i++) {
        const appointment = existingAppointments[i];
        const appointmentEndDate = new Date(appointment.endDate);
        const nextAppointmentStartDate = i < existingAppointments.length - 1 ? new Date(existingAppointments[i + 1].startDate) : new Date(endDate);

        const duration = (appointmentEndDate.getTime() - appointment.startDate.getTime()) / (1000 * 60 * 60);
        if (duration >= 2) {
          availableSlots.push({
            startDate: appointment.startDate,
            endDate: appointmentEndDate
          });
        }

        const currentAppointmentEndTime = new Date(appointment.startDate.getTime() + (2 * 60 * 60 * 1000));

        while (currentAppointmentEndTime < nextAppointmentStartDate) {
          availableSlots.push({
            startDate: currentAppointmentEndTime,
            endDate: new Date(currentAppointmentEndTime.getTime() + (2 * 60 * 60 * 1000))
          });

          currentAppointmentEndTime.setHours(currentAppointmentEndTime.getHours() + 2);
        }
      }

      availableSlotsForAllBridges.push({
        bridgeId: bridge._id,
        availableSlots: availableSlots
      });
    }

    return availableSlotsForAllBridges;
  }
}
