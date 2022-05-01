import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import useSWR, { useSWRConfig } from "swr";

import Header from "../components/Header";

export async function deleteBook(id) {
	await fetch(`https://sheltered-beach-31872.herokuapp.com/book/${id}`, {
		method: "DELETE",
	});
}

function Home() {
	const { mutate } = useSWRConfig();
	const { data: books, error } = useSWR(
		"https://sheltered-beach-31872.herokuapp.com/books",
		(url) => fetch(url).then((res) => res.json())
	);

	if (error) return <h1>Error: {error}</h1>;
	if (!books) return <h1>Loading</h1>;

	return (
		<div className="container">
			<Header pageName="Книги"></Header>
			<main>
				{books.map((book) => (
					<article key={book.id}>
						<header className={styles.books__header}>
							<h3 className={styles.books__title}>{book.title}</h3>
							<button>
								<Link href={`/change-book/${book.id}`}>Изменить</Link>
							</button>
							<button
								onClick={() =>
									deleteBook(book.id).then(() =>
										mutate("https://sheltered-beach-31872.herokuapp.com/books")
									)
								}
							>
								Удалить
							</button>
						</header>
						<p>
							<b>Автор:</b> {book.author.firstName} {book.author.lastName}
						</p>
						<p>
							<b>Год публикации:</b> {book.publishedAt}
						</p>
					</article>
				))}
			</main>
		</div>
	);
}

export default Home;
