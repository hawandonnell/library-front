import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import Header from "../components/Header";

export default function AddBook({ authors }) {
	const [title, setTitle] = useState("");
	const [publishedAt, setPublishedAt] = useState("");
	const [authorId, setAuthorId] = useState(authors[0].id);

	const router = useRouter();
	return (
		<div className="container">
			<Header pageName="Добавить книгу" isPageLoaded></Header>
			<form onSubmit={(e) => e.preventDefault()}>
				<label htmlFor="title">Название: </label>
				<input
					type="text"
					name="title"
					onChange={(e) => setTitle(e.target.value)}
				/>
				<br />
				<label htmlFor="publishedAt">Год публикации: </label>
				<input
					type="number"
					name="publishedAt"
					onChange={(e) => setPublishedAt(e.target.value)}
				/>
				<br />
				<label htmlFor="author">Автор: </label>
				<select
					name="author"
					onChange={(e) => {
						setAuthorId(e.target.value);
					}}
				>
					{authors.map((author) => (
						<option key={author.id} value={author.id}>
							{author.firstName} {author.lastName}
						</option>
					))}
				</select>
				<div className="form__buttons">
					<button onClick={() => router.push("/")}>Отмена</button>
					<button
						type="submit"
						onClick={async () => {
							await axios({
								method: "post",
								url: "https://sheltered-beach-31872.herokuapp.com/book",
								data: {
									title,
									publishedAt: Number(publishedAt),
									authorId: Number(authorId),
								},
							});
							router.push("/");
						}}
					>
						Добавить
					</button>
				</div>
			</form>
		</div>
	);
}

export async function getStaticProps() {
	const res = await fetch(
		"https://sheltered-beach-31872.herokuapp.com/authors"
	);
	const authors = await res.json();
	return {
		props: {
			authors,
		},
		revalidate: 10,
	};
}
