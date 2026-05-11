// theme.js — Shared design tokens matching the HTML prototype
export const LIGHT_COLORS = {
  primary: '#5B4FCF',
  primaryLight: '#7B6FEF',
  primaryBg: '#EEF0FF',
  bg: '#F5F6FA',
  card: '#FFFFFF',
  text: '#1a1a2e',
  muted: '#64748b',
  border: '#e2e8f0',
  green: '#16a34a',
  red: '#dc2626',
  amber: '#d97706',
  pink: '#e8365d',
  teal: '#0d9488',
};

export const DARK_COLORS = {
  primary: '#7B6FEF',
  primaryLight: '#5B4FCF',
  primaryBg: '#1e1e2d',
  bg: '#0f172a',
  card: '#1e293b',
  text: '#f8fafc',
  muted: '#94a3b8',
  border: '#334155',
  green: '#22c55e',
  red: '#ef4444',
  amber: '#f59e0b',
  pink: '#f43f5e',
  teal: '#14b8a6',
};

// Keeping original COLORS for backward compatibility or as default
export const COLORS = LIGHT_COLORS;

export const FONTS = {
  bold: 'System',
  regular: 'System',
};

export const SUBJECTS = [
  { name: 'Design & Analysis of Algorithms', icon: '🧠', color: '#5B4FCF', topics: 14, done: 8 },
  { name: 'Multivariable Calculus', icon: '📐', color: '#e8365d', topics: 12, done: 5 },
  { name: 'Mobile App Development', icon: '📱', color: '#0d9488', topics: 10, done: 7 },
  { name: 'Web Development', icon: '🌐', color: '#d97706', topics: 11, done: 6 },
  { name: 'Machine Learning', icon: '🤖', color: '#7c3aed', topics: 13, done: 4 },
];

export const ICONS = ['💻', '🧠', '📐', '📱', '🌐', '🤖', '⚡', '🔬', '📊', '🎯'];
export const PALETTE = ['#5B4FCF', '#e8365d', '#0d9488', '#d97706', '#7c3aed', '#2563eb'];
