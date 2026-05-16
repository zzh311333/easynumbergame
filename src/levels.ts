import { Level } from './types';

export const levels: Level[] = [
  {
    id: 1,
    hint: '数字序列：1 - 3 - 5 - 7 - ?\n请问 ? 处应该填入哪个数字？',
    pattern: '这是一组奇数',
    answer: '9',
  },
  {
    id: 2,
    hint: '数字序列：2 - 4 - 6 - 8 - 10 - ?\n请问 ? 处应该填入哪个数字？',
    pattern: '这是一组递增的偶数',
    answer: '12',
  },
  {
    id: 3,
    hint: '数字序列：1 - 2 - 3 - 2 - ?\n请问 ? 处应该填入哪个数字？',
    pattern: '左右对称的回文数列',
    answer: '1',
  },
  {
    id: 4,
    hint: '数字序列：1 - 1 - 2 - 3 - 5 - ?\n请问 ? 处应该填入哪个数字？',
    pattern: '前两个数字之和等于下一个（斐波那契数列）',
    answer: '8',
  },
  {
    id: 5,
    hint: '数字序列：3 - 6 - 9 - 12 - 15 - ?\n请问 ? 处应该填入哪个数字？',
    pattern: '这是一组3的倍数',
    answer: '18',
  },
];

export const TOTAL_LEVELS = levels.length;