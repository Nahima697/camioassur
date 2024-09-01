import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import AvailabilitySchedule = require('availability-schedule');
import { Bridge } from 'src/schemas/Bridge.schema';

@Injectable()
export class AvailabilityService {
  private readonly logger = new Logger(AvailabilityService.name);

  constructor(@InjectModel(Bridge.name) private readonly bridgeModel: Model<Bridge>) {}

  // Méthode privée pour obtenir les rendez-vous d'un pont via son ID
  private async getBridgeAppointments(bridgeId: string) {
    this.logger.log(`Fetching appointments for Bridge ID: ${bridgeId}`);
    const bridge = await this.bridgeModel.findById(bridgeId).exec();

    if (!bridge) {
      this.logger.error(`Bridge with ID ${bridgeId} not found`);
      throw new Error(`Bridge with ID ${bridgeId} not found`);
    }

    this.logger.log(`Found Bridge: ${JSON.stringify(bridge)}`);
    this.logger.log(`Appointments: ${JSON.stringify(bridge.appointments)}`);
    
    return bridge.appointments;
  }

  // Méthode pour vérifier la disponibilité d'un créneau horaire
  async isAvailable(bridgeId: string, startDate: string, endDate: string): Promise<boolean> {
    try {
      this.logger.log(`Checking availability for Bridge ID ${bridgeId} from ${startDate} to ${endDate}`);
      
      // Récupération des rendez-vous existants pour le pont spécifié
      const bridgeAppointments = await this.getBridgeAppointments(bridgeId);

      // Initialisation du planning de disponibilités avec le créneau demandé
      const schedule = new AvailabilitySchedule(startDate, endDate);

      // Ajout des plages horaires disponibles de manière récurrente
      this.logger.log('Adding weekly recurring availability.');
      schedule.addWeeklyRecurringAvailability('2024-05-15T08:00:00Z', '2024-05-21T12:00:00Z', [1, 2, 3, 4, 5, 6]);
      schedule.addWeeklyRecurringAvailability('2024-05-21T13:00:00Z', '2024-05-21T18:00:00Z', [1, 2, 3, 4, 5, 6]);

      // Exclusion des créneaux déjà réservés
      bridgeAppointments.forEach(appointment => {
        this.logger.log(`Removing unavailable slot: ${appointment.startDate} to ${appointment.endDate}`);
        schedule.removeAvailability(appointment.startDate, appointment.endDate);
      });

      // Vérification de la disponibilité du créneau demandé
      const isSlotAvailable = schedule.isAvailable(new Date(startDate), new Date(endDate));
      this.logger.log(`Checked availability: ${isSlotAvailable}`);

      return isSlotAvailable;
    } catch (error) {
      this.logger.error(`Error checking availability: ${error.message}`);
      throw error;
    }
  }
  async getAvailableSlotsForAllBridges(startDate: string, endDate: string): Promise<any[]> {
    try {
      this.logger.log(`Fetching available slots for all bridges from ${startDate} to ${endDate}`);
      
      const bridges = await this.bridgeModel.find().exec();
      const availableSlots = [];

      for (const bridge of bridges) {
        const isAvailable = await this.isAvailable(bridge._id.toString(), startDate, endDate);
        
        if (isAvailable) {
          availableSlots.push({
            bridgeId: bridge._id,
            available: isAvailable,
          });
        }
      }
      return availableSlots;
    } catch (error) {
      this.logger.error(`Error fetching available slots for all bridges: ${error.message}`);
      throw new Error(`Error fetching available slots for all bridges`);
    }
  }
}
