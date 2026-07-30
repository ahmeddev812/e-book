import { bookDatabase } from "@/data/books";
import { createSlug } from "./slug";
import type { Book } from "@/types";

export function searchBooks(query: string): Book[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return Object.values(bookDatabase).filter(
    (book) =>
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q) ||
      book.category.toLowerCase().includes(q) ||
      book.description.toLowerCase().includes(q)
  );
}

export function getBookBySlug(slug: string): Book | undefined {
  return Object.values(bookDatabase).find(
    (book) => createSlug(book.title) === slug
  );
}

export function getRelatedBooks(book: Book, count = 4): Book[] {
  return Object.values(bookDatabase)
    .filter((b) => b.id !== book.id && b.category === book.category)
    .slice(0, count);
}
