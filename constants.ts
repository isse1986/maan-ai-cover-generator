import { PublishingTemplates } from './types';

export const GENRES: string[] = [
  "Science Fiction",
  "Fantasy",
  "Romance",
  "Thriller",
  "Mystery",
  "Horror",
  "Historical Fiction",
  "Young Adult",
  "Children's",
  "Non-Fiction",
  "Biography",
  "Self-Help",
];

export const PUBLISHING_TEMPLATES: PublishingTemplates = {
  kdpPaperback: {
    name: "KDP Paperback (6x9)",
    width: 600,
    height: 900,
    aspectRatio: "3:4", // Closest standard aspect ratio
  },
  kdpHardcover: {
    name: "KDP Hardcover (6x9)",
    width: 612,
    height: 936,
    aspectRatio: "3:4",
  },
  ingramSparkPaperback: {
    name: "IngramSpark (5.5x8.5)",
    width: 550,
    height: 850,
    aspectRatio: "3:4",
  },
  ebook: {
    name: "Standard E-Book",
    width: 625,
    height: 1000,
    aspectRatio: "9:16", // Close enough
  },
};

export const FONTS = [
    { value: 'font-display', label: 'Oswald' },
    { value: 'font-serif', label: 'Merriweather' },
    { value: 'font-sans', label: 'Inter' }
];
