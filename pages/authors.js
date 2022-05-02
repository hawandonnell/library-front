import Link from "next/link";
import useSWR, { useSWRConfig } from "swr";
import styles from "../styles/Home.module.css";

import Header from "../components/Header";
import CustomHead from "../components/CustomHead";

async function deleteAuthor(id) {
	await fetch(`https://sheltered-beach-31872.herokuapp.com/author/${id}`, {
		method: "DELETE",
	});
}

export default function Authors() {
	const { mutate } = useSWRConfig();
	const { data: authors, error } = useSWR(
		"https://sheltered-beach-31872.herokuapp.com/authors",
		(url) => fetch(url).then((res) => res.json())
	);

	if (error) return <h1>Error: {error}</h1>;
	if (!authors)
		return (
			<>
				<CustomHead pageName="Loading" />
				<h1>Loading</h1>
			</>
		);

	return (
		<>
			<CustomHead pageName="Авторы" />
			<Header pageName="Авторы"></Header>
			<main>
				<div className="container">
					{authors.map((author) => (
						<>
							<article key={author.id}>
								<header className={styles.books__header}>
									<h3 className={styles.books__title}>
										{author.firstName} {author.lastName}
									</h3>
									<button>
										<Link href={`/change-author/${author.id}`}>Изменить</Link>
									</button>
									<button
										onClick={() =>
											deleteAuthor(author.id).then(() =>
												mutate(
													"https://sheltered-beach-31872.herokuapp.com/authors"
												)
											)
										}
									>
										Удалить
									</button>
								</header>
								<p>
									<b>Год рождения:</b> {author.birthAt}
								</p>
							</article>
							<hr />
						</>
					))}
				</div>
			</main>
		</>
	);
}
