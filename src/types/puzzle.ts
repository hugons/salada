export interface Puzzle {
  id: string;
  title: string;
  theme: string;
  size: number;
  grid: string;
  words: Word[];
}

export interface Word {
  key: string;
  display: string;
  path: number[][];
}
