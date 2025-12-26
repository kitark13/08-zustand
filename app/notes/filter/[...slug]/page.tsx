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

async function Notes({ params }: NotesProps) {
  //   const params = await searchParams;
  const page = 1;
  const search = "";
  const { slug } = await params;
  const category = slug[0] === "all" ? undefined : slug[0];

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", category, page, search],
    queryFn: () => fetchNotes({ search, page, tag: category }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteClient category={category} />
    </HydrationBoundary>
  );
}

export default Notes;
