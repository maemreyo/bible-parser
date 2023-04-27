export interface BibleVerse {
  language: string;
  chapter: number;
  verse: number;
  content: string;
  translation_id: string;
  book_id: string;
  book_name: string;
}

export type FileLike = string;

export interface FileResult {
  language: string; // two first characters of file name
  translationId: string; // the second word of the first part separated by "_". if it contains one word, translationId is that word
  bookId: string; // "GEN"
  chapter: number; // "01"
  verses: string[]; // lines in the file content, count from the third line
  bookName: string; // the first line of the file content
}