export interface Stat {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sublabel: string;
}

export const stats: Stat[] = [
  {
    id: "years",
    value: 12,
    label: "years advising",
    sublabel: "across two banks and independent",
  },
  {
    id: "clients",
    value: 214,
    suffix: "+",
    label: "clients served",
    sublabel: "professionals and business owners",
  },
  {
    id: "retention",
    value: 96,
    suffix: "%",
    label: "client retention",
    sublabel: "over a five-year horizon",
  },
  {
    id: "assets",
    prefix: "€",
    value: 40,
    suffix: "M",
    label: "assets advised",
    sublabel: "under active planning",
  },
];
