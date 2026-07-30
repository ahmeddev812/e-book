import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBookBySlug, getRelatedBooks } from "@/lib/search";
import { BookDetailsClient } from "./BookDetailsClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) return { title: "Book Not Found - BookHaven" };

  return {
    title: `${book.title} - BookHaven`,
    description: book.description,
    openGraph: {
      title: book.title,
      description: book.description,
      images: [{ url: book.image }],
    },
  };
}

export default async function BookPage({ params }: Props) {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) notFound();

  const relatedBooks = getRelatedBooks(book);

  return <BookDetailsClient book={book} relatedBooks={relatedBooks} />;
}
