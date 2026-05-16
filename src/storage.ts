import { GameProgress } from './types';

const STORAGE_KEY = 'code_unlock_progress';

export function loadProgress(): GameProgress | null {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data) as GameProgress;
  } catch {
    return null;
  }
}

export function saveProgress(progress: GameProgress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function clearProgress(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function createInitialProgress(): GameProgress {
  return {
    currentLevel: 1,
    usedHints: [],
    isCompleted: false,
    lastPlayed: new Date().toISOString(),
  };
}