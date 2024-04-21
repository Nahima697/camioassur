import { Controller, Get } from '@nestjs/common';
import { CalendarService } from './calendar.service';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get('/available-slots')
  async getAvailableSlotsForAllBridges(): Promise<any> {
    return this.calendarService.getAvailableSlotsForAllBridges(new Date(), new Date());
  }

  @Get('/available-slots/count')
  async countAvailableSlotsForAllBridges(): Promise<number> {
    const availableSlots = await this.calendarService.getAvailableSlotsForAllBridges(new Date(), new Date());
    let count = 0;
    availableSlots.forEach(bridge => {
      count += bridge.availableSlots.length;
    });
    return count;
  }
}
