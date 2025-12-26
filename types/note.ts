export type NoteTag = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";

export interface Note {
  content: string;
  createdAt: string;
  id: string;
  tag: NoteTag;
  title: string;
  updatedAt: string;
}

export interface NewNote {
  title: string;
  content?: string;
  tag: NoteTag;
}
