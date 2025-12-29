import { Metadata } from "next";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteClient from "./Notes.client";

interface NotesProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: NotesProps): Promise<Metadata> {
  const { slug } = await params;
  const notesName = slug[slug.length - 1];
  const notesUrl = slug.join("/");
  return {
    title: `Notes: ${notesName}`,
    description: `Filtetred notes: ${notesUrl}`,
    openGraph: {
      title: `Notes: ${notesName}`,
      description: `Filtetred notes: ${notesUrl}`,
      url: `https://08-zustand-five-phi.vercel.app/notes/filter/${notesUrl}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub OpenGraph Image",
        },
      ],
    },
  };
}

async function Notes({ params }: NotesProps) {
  //   const params = await searchParams;
  const page = 1;
  const search = "";
  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0];

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", tag, page, search],
    queryFn: () => fetchNotes({ search, page, tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteClient tag={tag} />
    </HydrationBoundary>
  );
}

export default Notes;
