import { Metadata } from "next";
import css from "./page.module.css";
export const metadata: Metadata = {
  title: "Помилка 404 - сторінка не знайдена",
  description:
    "Ця сторінка не знайдена. Можливо ви перейшли за неправильним посиланням",
  openGraph: {
    title: "Помилка 404 - сторінка не знайдена",
    description:
      "Ця сторінка не знайдена. Можливо ви перейшли за неправильним посиланням",
    url: "/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub OpenGrahh Image",
      },
    ],
  },
};

function NotFound() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}

export default NotFound;
