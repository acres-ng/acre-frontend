export interface CalendarEvent {
    id?: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    title: string;
    description?: string;
    location?: string;
  }