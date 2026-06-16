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
      visibility: "public" | "private";
      events: EventItem[];
    }

  | {
      id: string;
      title: string;
      type: "periods";
      visibility: "public" | "private";
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
      visibility: "public" | "private";
      events: EventItem[];
      periods: {
        id: string;
        title: string;
        startYear: number;
        endYear: number;
      }[];
    };
