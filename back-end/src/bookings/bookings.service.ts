import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ClientSession } from 'mongoose';
import { Booking } from 'src/schemas/Booking.schema';
import { Truck } from 'src/schemas/Truck.schema';
import { User } from 'src/schemas/User.shema';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { CreateTruckDto } from 'src/trucks/dto/CreateTruckDto.dto';
import { CreateBookingDto } from './dto/CreateBooking.dto';
import { AvailabilityService } from 'src/availability/availability.service';
import { UpdateBridgeDto } from 'src/bridge/UpdateBridgeDto';
import { Bridge } from 'src/schemas/Bridge.schema';

@Injectable()
export class BookingService {
  private readonly logger = new Logger(BookingService.name);

  constructor(
    @InjectModel(Booking.name) private readonly bookingModel: Model<Booking>,
    @InjectModel(Bridge.name) private readonly bridgeModel: Model<Bridge>,
    @InjectModel(Truck.name) private readonly truckModel: Model<Truck>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly availabilityService: AvailabilityService,
  ) {}

  async createBooking(createBookingDto: CreateBookingDto, createUserDto: CreateUserDto, createTruckDto:CreateTruckDto): Promise<Booking> {
    const session: ClientSession = await this.bookingModel.startSession();
    session.startTransaction();
    try {
      this.logger.log('Début de la transaction pour la création de réservation.');

      // 1. Créer et sauvegarder l'utilisateur
      const user = await this.createUser(session, createUserDto);
      this.logger.log(`Utilisateur créé avec l'ID: ${user._id}`);

      // 2. Créer et sauvegarder le camion
      const truck = await this.createTruck(session, createTruckDto);
      this.logger.log(`Camion créé avec l'ID: ${truck._id}`);

      // 3. Vérifier la disponibilité du pont
      const isAvailable = await this.availabilityService.isAvailable(
        createBookingDto.bridgeId,
        createBookingDto.startTime,
        createBookingDto.endTime
      );
      this.logger.log(`Disponibilité vérifiée: ${isAvailable}`);

      if (!isAvailable) {
        throw new BadRequestException('Le créneau horaire sélectionné n\'est pas disponible.');
      }

      // 4. Créer et sauvegarder la réservation
      const booking = new this.bookingModel({
        ...createBookingDto,
        user: user._id,
        truck: truck._id,
      });
      const savedBooking = await booking.save({ session });
      this.logger.log(`Réservation enregistrée avec l'ID: ${savedBooking._id}`);

      // 5. Mettre à jour la disponibilité du pont
      const updateBridgeDto: UpdateBridgeDto = {
        appointments: [
          {
            startDate: createBookingDto.startTime,
            endDate: createBookingDto.endTime,
          },
        ],
      };

      const updatedBridge = await this.bridgeModel.findByIdAndUpdate(
        createBookingDto.bridgeId,
        { $push: { appointments: { $each: updateBridgeDto.appointments } } },
        { new: true, runValidators: true, session }
      ).exec();

      if (!updatedBridge) {
        throw new BadRequestException(`Pont avec l'ID ${createBookingDto.bridgeId} introuvable`);
      }
      this.logger.log(`Disponibilité du pont mise à jour pour l'ID: ${createBookingDto.bridgeId}`);

      // 6. Valider la transaction
      await session.commitTransaction();
      this.logger.log('Transaction confirmée avec succès.');

      return savedBooking;
    } catch (error) {
      // Annuler la transaction en cas d'erreur
      await session.abortTransaction();
      this.logger.error(`Transaction annulée en raison d'une erreur: ${error.message}`);
      throw error;
    } finally {
      // Terminer la session
      session.endSession();
      this.logger.log('Session terminée.');
    }
  }

  async createUser(session: ClientSession, createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = new this.userModel(createUserDto);
      this.logger.log(`Création de l’utilisateur avec les données: ${JSON.stringify(createUserDto)}`);
      const savedUser = await user.save({ session });
      this.logger.log(`Utilisateur créé avec succès: ${savedUser._id}`);
      return savedUser;
    } catch (error) {
      this.logger.error(`Erreur lors de la création de l'utilisateur: ${error.message}`);
      throw error;
    }
  }

  async createTruck(session: ClientSession, createTruckDto: CreateTruckDto): Promise<Truck> {
    try {
      const truck = new this.truckModel(createTruckDto);
      this.logger.log(`Création du camion avec les données: ${JSON.stringify(createTruckDto)}`);
      const savedTruck = await truck.save({ session });
      this.logger.log(`Camion créé avec succès: ${savedTruck._id}`);
      return savedTruck;
    } catch (error) {
      this.logger.error(`Erreur lors de la création du camion: ${error.message}`);
      throw error;
    }
  }

  async updateBridgeAvailability(bridgeId: string, updateBridgeDto: UpdateBridgeDto, session: ClientSession): Promise<void> {
    try {
      const updatedBridge = await this.bridgeModel.findByIdAndUpdate(
        bridgeId,
        { $push: { appointments: { $each: updateBridgeDto.appointments } } },
        { new: true, runValidators: true, session }
      ).exec();

      if (!updatedBridge) {
        throw new BadRequestException(`Pont avec l'ID ${bridgeId} introuvable`);
      }

      this.logger.log(`Disponibilité du pont mise à jour pour l'ID: ${bridgeId}`);
    } catch (error) {
      this.logger.error(`Erreur lors de la mise à jour de la disponibilité du pont: ${error.message}`);
      throw error;
    }
  }
}