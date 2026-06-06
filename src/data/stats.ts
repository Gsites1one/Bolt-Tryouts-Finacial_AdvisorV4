export interface Stat {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

/** TODO:CLIENT_STATS — replace with the advisor's verified figures. */
export const stats: Stat[] = [
  {
    id: "years",
    value: 12,
    label: "Years advising",
  },
  {
    id: "clients",
    value: 214,
    suffix: "+",
    label: "Clients served",
  },
  {
    id: "retention",
    value: 96,
    suffix: "%",
    label: "Five-year retention",
  },
  {
    id: "assets",
    prefix: "€",
    value: 40,
    suffix: "M",
    label: "Assets under planning",
  },
];
