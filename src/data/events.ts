import { Timeline } from "../types";

export const timelines: Timeline[] = [
  {
    id: "periods",
    title: "Historiske perioder",
    type: "periods",
    visibility: "public",
    periods: [
      {
        id: "p1",
        title: "Opplysningstiden",
        startYear: 1700,
        endYear: 1800,
      },
      {
        id: "p2",
        title: "Mellomkrigstiden",
        startYear: 1918,
        endYear: 1939,
      }
    ]
  },
  
  {
    id: "world",
    title: "Verdenshistorie",
    type: "events",
    visibility: "public",
    events: [
      { id: "1", title: "Den franske revolusjon", year: 1789 },
      { id: "2", title: "1. verdenskrig", year: 1914 },
    ]
  },

 
  {
    id: "norway",
    title: "Norge",
    type: "events",
    visibility: "public",
    events: [
      { id: "4", title: "Grunnloven", year: 1814 },
      { id: "5", title: "Union med Sverige avsluttes", year: 1905 },
    ],
  }


  
];