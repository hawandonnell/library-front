import Link from "next/link";
import useSWR, { useSWRConfig } from "swr";

import Header from "../components/Header";

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
				<Header pageName="Авторы" isPageLoaded={false}></Header>
				<h1>Loading</h1>
			</>
		);

	return (
		<>
			<Header pageName="Авторы" isPageLoaded={true}></Header>
			<main>
				<div className="container">
					<main>
						{authors.map((author) => (
							<article key={author.id}>
								<header className="article__header">
									<h3 className="article__title">
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
						))}
					</main>
				</div>
			</main>
		</>
	);
}
