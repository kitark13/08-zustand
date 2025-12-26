"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import css from "./Notes.client.module.css";
import { fetchNotes } from "@/lib/api";
import type { FetchNotesResponse } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useDebounce } from "use-debounce";

interface NoteClientProps {
  category: string | undefined;
}

function NoteClient({ category }: NoteClientProps) {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  const { data, isLoading } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", category, page, debouncedSearch],
    queryFn: () => fetchNotes({ search: debouncedSearch, page, tag: category }),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox value={search} onChange={handleSearchChange} />

          <button className={css.button} onClick={() => setIsModalOpen(true)}>
            Create note +
          </button>
        </header>
      </div>

      {isModalOpen && (
        <Modal
          onClose={() => {
            setIsModalOpen(false);
          }}
        >
          <NoteForm
            onSuccess={() => {
              setIsModalOpen(false);
            }}
          />
        </Modal>
      )}
      {notes.length > 0 && !isLoading ? (
        <NoteList notes={notes} />
      ) : (
        <p>No notes found</p>
      )}

      {totalPages > 1 && (
        <Pagination
          countPage={totalPages}
          currentPage={page}
          onChangePage={(p) => setPage(p)}
        />
      )}
    </>
  );
}

export default NoteClient;
