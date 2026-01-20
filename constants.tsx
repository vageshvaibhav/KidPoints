
import React from 'react';
import { RewardCategory, RewardItem } from './types';

export const DEFAULT_CATEGORIES: RewardCategory[] = [
  { id: '1', name: 'Homework', value: 10, icon: '📚', color: 'bg-blue-100 text-blue-600' },
  { id: '2', name: 'Chores', value: 15, icon: '🧹', color: 'bg-green-100 text-green-600' },
  { id: '3', name: 'Kindness', value: 20, icon: '💖', color: 'bg-pink-100 text-pink-600' },
  { id: '4', name: 'Reading', value: 5, icon: '📖', color: 'bg-purple-100 text-purple-600' },
  { id: '5', name: 'Sports', value: 10, icon: '⚽', color: 'bg-orange-100 text-orange-600' },
];

export const CHORE_SUGGESTIONS: Partial<RewardCategory>[] = [
  { name: 'Make Bed', value: 5, icon: '🛏️', color: 'bg-amber-100 text-amber-600' },
  { name: 'Brush Teeth', value: 5, icon: '🪥', color: 'bg-cyan-100 text-cyan-600' },
  { name: 'Help Sibling', value: 15, icon: '🤝', color: 'bg-emerald-100 text-emerald-600' },
  { name: 'Read 20 Mins', value: 10, icon: '📖', color: 'bg-indigo-100 text-indigo-600' },
  { name: 'Clean Room', value: 20, icon: '✨', color: 'bg-purple-100 text-purple-600' },
  { name: 'Set Table', value: 5, icon: '🍽️', color: 'bg-rose-100 text-rose-600' },
  { name: 'Walk Dog', value: 20, icon: '🐕', color: 'bg-lime-100 text-lime-600' },
  { name: 'Pack Lunch', value: 10, icon: '🍱', color: 'bg-orange-100 text-orange-600' },
];

export const INITIAL_REWARDS: RewardItem[] = [
  { id: 'r1', name: 'Extra Screen Time', description: '30 minutes of tablet or TV time', cost: 50, image: 'https://picsum.photos/seed/screen/200/200' },
  { id: 'r2', name: 'Ice Cream Treat', description: 'One scoop of your favorite flavor', cost: 100, image: 'https://picsum.photos/seed/icecream/200/200' },
  { id: 'r3', name: 'New Small Toy', description: 'A small LEGO set or similar toy', cost: 300, image: 'https://picsum.photos/seed/toy/200/200' },
];

export const AVATARS = [
  '🦁', '🐼', '🦊', '🦄', '🦖', '🐨', '🐯', '🐰'
];
