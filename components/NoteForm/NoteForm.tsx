"use client";

import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
import type { NewNote, NoteTag } from "../../types/note";
import { createNote } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useNoteDraftStore } from "@/lib/store/noteStore";

// interface NoteFormProps {
//   onSuccess: () => void;
// }

// const ValidNoteSchema = Yup.object().shape({
//   title: Yup.string()
//     .min(3, "Title must be at least 3 characters")
//     .max(50, "Title is too long")
//     .required("Title is required"),
//   content: Yup.string().max(500, "Content is too long"),
//   tag: Yup.mixed<NoteTag>()
//     .oneOf(["Work", "Personal", "Meeting", "Shopping", "Todo"])
//     .required(),
// });

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const { mutate: createNoteM, isPending } = useMutation({
    mutationFn: (NewNote: NewNote) => createNote(NewNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.push("/notes/filter/all");
    },
  });

  const handleSubmit = (formData: FormData) => {
    const payload = {
      title: formData.get("title") as string,
      content: (formData.get("content") as string) || "",
      tag: formData.get("tag") as NoteTag,
    };

    createNoteM(payload);
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setDraft({ [name]: value });
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <input
        type="text"
        name="title"
        className={css.input}
        onChange={handleChange}
        defaultValue={draft.title}
        required
      />

      <textarea
        name="content"
        rows={8}
        className={css.textarea}
        onChange={handleChange}
        defaultValue={draft.content}
      />

      <select
        name="tag"
        className={css.select}
        onChange={handleChange}
        defaultValue={draft.tag}
      >
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
      </select>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
}
