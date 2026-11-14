export type Severity = "warn" | "good";
export type ChipFrom = "top" | "left" | "right" | "bottom";

export type Point = { x: number; y: number };

export type Tip = {
  icon: string;
  title: string;
  body: string;
};

export type Callout = {
  id: string;
  severity: Severity;
  label: string; // short plain-English tag next to the dot
  chip: string; // small supporting number, e.g. "+420ms"
  chipFrom: ChipFrom; // direction the chip flies in from
  dot: Point; // position inside the mockup canvas (288 x 200)
  labelAt: Point;
  chipAt: Point;
  line: { x1: number; y1: number; x2: number; y2: number };
  delay: number; // seconds, staggers the reveal
  tip: Tip;
};

export type Metric = {
  label: string;
  value: string;
  pct: number; // 0-100 bar fill
  severity: Severity;
};

export type ScanResult = {
  site: string;
  score: number; // 0-100 overall
  scoreTitle: string;
  scoreSub: string;
  metrics: Metric[];
  clickability: number; // 0-100
  clickabilitySub: string;
  callouts: Callout[];
};

export const demoScan: ScanResult = {
  site: "ironforge-tools.com",
  score: 61,
  scoreTitle: "Could use some work",
  scoreSub: "Fixing 2 things would really help",
  metrics: [
    { label: "Page speed", value: "2.7s to load", pct: 80, severity: "warn" },
    { label: "Feels responsive", value: "Yes, quick taps", pct: 40, severity: "good" },
  ],
  clickability: 47,
  clickabilitySub: "3 of 4 scanned elements add friction before a click",
  callouts: [
    {
      id: "banner",
      severity: "warn",
      label: "Slow banner",
      chip: "+420ms",
      chipFrom: "top",
      dot: { x: 194, y: 36 },
      labelAt: { x: 236, y: 18 },
      chipAt: { x: 198, y: 4 },
      line: { x1: 198, y1: 40, x2: 236, y2: 26 },
      delay: 0.55,
      tip: {
        icon: "🖥️",
        title: "This banner is slowing things down",
        body: "The big sale image takes an extra moment to show up, so people wait before they see anything else. Shrinking it would get the page moving about 420ms faster.",
      },
    },
    {
      id: "button",
      severity: "good",
      label: "Working well",
      chip: "0%",
      chipFrom: "left",
      dot: { x: 84, y: 116 },
      labelAt: { x: 0, y: 98 },
      chipAt: { x: -10, y: 124 },
      line: { x1: 88, y1: 120, x2: 52, y2: 108 },
      delay: 0.7,
      tip: {
        icon: "✅",
        title: "This button is working great",
        body: "High contrast, easy to spot, no changes needed here. This is a good example for the rest of the page to follow.",
      },
    },
    {
      id: "spec",
      severity: "warn",
      label: "Heavy file",
      chip: "1.2MB",
      chipFrom: "right",
      dot: { x: 184, y: 120 },
      labelAt: { x: 236, y: 104 },
      chipAt: { x: 244, y: 130 },
      line: { x1: 188, y1: 124, x2: 236, y2: 114 },
      delay: 0.85,
      tip: {
        icon: "📄",
        title: "This file is too heavy",
        body: "The spec sheet downloads automatically even if nobody asked for it, adding over a megabyte to the page. Only load it when someone actually opens that tab.",
      },
    },
    {
      id: "trade",
      severity: "warn",
      label: "Pricing hidden",
      chip: "-14%",
      chipFrom: "bottom",
      dot: { x: 136, y: 134 },
      labelAt: { x: 76, y: 168 },
      chipAt: { x: 150, y: 180 },
      line: { x1: 140, y1: 138, x2: 112, y2: 166 },
      delay: 1,
      tip: {
        icon: "🔒",
        title: "This pricing is hidden away",
        body: "Visitors have to sign in just to see trade pricing, so some leave before ever seeing a number. About 14% of them never come back.",
      },
    },
  ],
};
