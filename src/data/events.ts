import { Timeline } from "../types";

export const timelines: Timeline[] = [
  {
    id: "world",
    title: "Verdenshistorie",
    events: [
      { id: "1", title: "Den franske revolusjon", year: 1789 },
      { id: "2", title: "1. verdenskrig", year: 1914 },
      { id: "3", title: "2. verdenskrig", year: 1939 },
    ],
  },
  {
    id: "norway",
    title: "Norge",
    events: [
      { id: "4", title: "Grunnloven", year: 1814 },
      { id: "5", title: "Union med Sverige avsluttes", year: 1905 },
    ],
  },
];