export interface OpeningHoursTrait {
    // addWeeklyRecurringAvailability(startDate: Date, endDate: Date, repeatWeekdays: number[]): void;
    getOpeningHours(): { start: Date, end: Date }[];
    isAvailable(startDate: Date, endDate: Date): boolean;
}
