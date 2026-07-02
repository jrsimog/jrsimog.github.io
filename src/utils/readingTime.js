const WORDS_PER_MINUTE = 200;

export const readingTimeFromWords = (wordCount) =>
  Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));

export const getReadingTime = (text) =>
  readingTimeFromWords(text.trim().split(/\s+/).filter(Boolean).length);
