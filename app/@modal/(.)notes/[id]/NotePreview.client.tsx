"use client";

// import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";

function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const closeModal = () => router.back();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <>
      {isLoading && <p>Loading, please wait...</p>}
      {error || !note ? (
        <p>Something went wrong.</p>
      ) : (
        <Modal onClose={closeModal}>
          <div className={css.container}>
            <div className={css.item}>
              <div className={css.header}>
                <h2>{note?.title}</h2>
              </div>
              <p className={css.content}>{note?.content}</p>
              <p className={css.date}>{note?.createdAt}</p>
            </div>
            <button className={css.button} onClick={closeModal} type="button">
              Close
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default NotePreviewClient;
