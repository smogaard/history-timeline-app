export type EventItem = {
  id: string;
  title: string;
  year: number;
};

export type Timeline =
  | {
      id: string;
      title: string;
      type: "events";
      events: EventItem[];
    }
  | {
      id: string;
      title: string;
      type: "periods";
      periods: {
        id: string;
        title: string;
        startYear: number;
        endYear: number;
      }[];
    }

  | {
      id: string;
      title: string;
      type: "combo";
      events: EventItem[];
      periods: {
        id: string;
        title: string;
        startYear: number;
        endYear: number;
      }[];
    };
