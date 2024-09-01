import { Controller, Get, Query, UsePipes, ValidationPipe, BadRequestException, Logger } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { AvailabilityService } from 'src/availability/availability.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('calendar')
export class CalendarController {
  private readonly logger = new Logger(CalendarController.name);

  constructor(
    private readonly calendarService: CalendarService,
    private readonly availabilityService: AvailabilityService
  ) {}

  @Get('/appointments')
  async getExistingAppointmentsForAllBridges(): Promise<any[]> {
    try {
      return await this.calendarService.getExistingAppointmentsForAllBridges();
    } catch (error) {
      this.logger.error('Error fetching existing appointments', error.stack);
      throw new BadRequestException('Error fetching existing appointments');
    }
  }

  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Get('available-slots')
  @ApiQuery({
    name: 'bridgeId',
    type: String,
    description: 'ID of the bridge (optional)',
    example: '12345',
    required: false,
  })
  @ApiQuery({
    name: 'start',
    type: String,
    description: 'Start date in ISO 8601 format (e.g., 2024-09-01T00:00:00Z)',
    example: '2024-09-01T00:00:00Z',
  })
  @ApiQuery({
    name: 'end',
    type: String,
    description: 'End date in ISO 8601 format (e.g., 2024-10-01T00:00:00Z)',
    example: '2024-10-01T00:00:00Z',
  })
  async getAvailableSlots(
    @Query('bridgeId') bridgeId: string,
    @Query('start') start: string,
    @Query('end') end: string
  ) {
    const startDate = start;
    const endDate = end;

    try {
      if (bridgeId) {
        // If bridgeId is provided, get availability for that specific bridge
        const isAvailable = await this.availabilityService.isAvailable(bridgeId, startDate, endDate);
        return { isAvailable };
      } else {
        // If no bridgeId is provided, return an error or empty response
        throw new BadRequestException('Bridge ID is required for specific availability');
      }
    } catch (error) {
      this.logger.error('Error fetching available slots', error.stack);
      throw new BadRequestException('Error fetching available slots');
    }
  }

  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Get('available-slots/all')
  @ApiQuery({
    name: 'start',
    type: String,
    description: 'Start date in ISO 8601 format (e.g., 2024-09-01T00:00:00Z)',
    example: '2024-09-01T00:00:00Z',
  })
  @ApiQuery({
    name: 'end',
    type: String,
    description: 'End date in ISO 8601 format (e.g., 2024-10-01T00:00:00Z)',
    example: '2024-10-01T00:00:00Z',
  })
  async getAvailableSlotsForAllBridges(
    @Query('start') start: string,
    @Query('end') end: string
  ) {
    const startDate = start;
    const endDate = end;

    try {
      const slots = await this.availabilityService.getAvailableSlotsForAllBridges(startDate, endDate);
      return { slots };
    } catch (error) {
      this.logger.error('Error fetching available slots for all bridges', error.stack);
      throw new BadRequestException('Error fetching available slots for all bridges');
    }
  }
}
