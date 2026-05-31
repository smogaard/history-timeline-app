export type EventItem = {
  id: string;
  title: string;
  year: number;
};

export type Timeline = {
  id: string;
  title: string;
  events: EventItem[];
};