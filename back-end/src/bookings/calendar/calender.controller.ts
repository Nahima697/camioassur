import { Controller, Get, Query, UsePipes, ValidationPipe, BadRequestException } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { AvailableSlotsQueryDto } from '../dto/AvailableSlotsQuery.dto';

import { Logger } from '@nestjs/common';

@Controller('calendar')
export class CalendarController {
  private readonly logger = new Logger(CalendarController.name);

  constructor(private readonly calendarService: CalendarService) {}

  @Get('/appointments')
  async getExistingAppointmentsForAllBridges(): Promise<any[]> {
    return this.calendarService.getExistingAppointmentsForAllBridges();
  }

  @Get('/available-slots')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async countAvailableSlotsForAllBridges(
    @Query() query: AvailableSlotsQueryDto,
  ): Promise<boolean> {
    this.logger.debug(`Received query: ${JSON.stringify(query)}`);

    const startDate = new Date(query.start);
    const endDate = new Date(query.end);

    this.logger.debug(`Parsed dates - Start: ${startDate.toISOString()}, End: ${endDate.toISOString()}`);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new BadRequestException('Invalid date format');
    }

    return this.calendarService.countAvailableSlotsForAllBridges(startDate, endDate);
  }
}
