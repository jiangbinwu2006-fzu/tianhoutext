import mazuLots from '../data/mazu_lots.json';

export interface Lot {
  number: number;
  hexagram: string;
  level: string;
  poem: string[];
  meaning: string;
  interpretation: string;
  omen: string;
  story?: string;
  storyText?: string;
}

export const LOTS: Lot[] = mazuLots.signs.map((sign: any) => ({
  number: sign.id,
  hexagram: sign.hexagram,
  level: sign.heading,
  poem: sign.poem_lines,
  meaning: Array.isArray(sign.meaning) ? sign.meaning.join('\n') : sign.meaning,
  interpretation: sign.interpretation,
  omen: sign.omen,
  story: sign.stories?.[0]?.title,
  storyText: sign.stories?.[0]?.text,
}));

export const getRandomLot = () => LOTS[Math.floor(Math.random() * LOTS.length)];
