import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import useSWR from "swr";

import Header from "../components/Header";
import CustomHead from "../components/CustomHead";

function AddBookContent({ authors }) {
	const [title, setTitle] = useState("");
	const [publishedAt, setPublishedAt] = useState("");
	const [authorId, setAuthorId] = useState(authors[0].id);

	const router = useRouter();

	return (
		<>
			<CustomHead pageName="Добавить книгу" />
			<Header pageName="Добавить книгу" />
			<div className="container" style={{ marginTop: "2rem" }}>
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
		</>
	);
}

export default function AddBook() {
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

	return <AddBookContent authors={authors} />;
}
