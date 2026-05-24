export type ScreenState = 'envelope' | 'letter' | 'shayari' | 'propose' | 'accepted';

export interface Shayari {
  id: number;
  lines: string[];
  translation: string;
  illustration: string; // lucide icon name
  meter: number; // custom sweet romantic percentage (e.g. 100%, 1000% love)
}

export interface DateMemory {
  id: number;
  title: string;
  emoji: string;
  description: string;
}

export interface ReplyData {
  name: string;
  message: string;
  date: string;
}
