export interface Level {
  id: number;
  hint: string;
  pattern: string;
  answer: string;
}

export interface GameState {
  currentLevel: number;
  usedHints: number[];
  isCompleted: boolean;
}

export interface GameProgress {
  currentLevel: number;
  usedHints: number[];
  isCompleted: boolean;
  lastPlayed: string;
}