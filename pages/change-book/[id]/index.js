import { useRouter } from "next/router";

import { useState } from "react";

import axios from "axios";

import Header from "../../../components/Header";

async function changeBook(id, title, publishedAt, authorId) {
	let res = await axios({
		method: "put",
		url: `https://sheltered-beach-31872.herokuapp.com/book/${id}`,
		data: {
			title,
			publishedAt: Number(publishedAt),
			authorId: Number(authorId),
		},
	});
	return res;
}

function ChangeBook({ book, authors }) {
	const [title, setTitle] = useState(book.title);
	const [publishedAt, setPublishedAt] = useState(book.publishedAt);
	const [authorId, setAuthorId] = useState(book.authorId);

	const router = useRouter();
	return (
		<div className="container">
			<style jsx>{`
				.form__buttons {
					margin-top: 2rem;
				}
			`}</style>
			<Header pageName="Изменить книгу"></Header>
			<form onSubmit={(e) => e.preventDefault()}>
				<label htmlFor="title">Название: </label>
				<input
					type="text"
					name="title"
					value={title}
					onChange={(e) => {
						setTitle(e.target.value);
					}}
				/>
				<br />
				<label htmlFor="publishedAt">Год публикации: </label>
				<input
					type="number"
					name="publishedAt"
					value={publishedAt}
					onChange={(e) => {
						setPublishedAt(e.target.value);
					}}
				/>
				<br />
				<label htmlFor="author">Автор: </label>
				<select
					name="author"
					value={authorId}
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
				<br />
				<div className="form__buttons">
					<button onClick={() => router.push("/")}>Отмена</button>
					<button
						type="submit"
						onClick={() =>
							changeBook(book.id, title, publishedAt, authorId).then(() =>
								router.push("/")
							)
						}
					>
						Сохранить
					</button>
				</div>
			</form>
		</div>
	);
}

export async function getStaticPaths() {
	const res = await fetch("https://sheltered-beach-31872.herokuapp.com/books");
	const books = await res.json();

	const paths = books.map((book) => ({
		params: { id: book.id.toString() },
	}));

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const resBook = await fetch(
		`https://sheltered-beach-31872.herokuapp.com/book/${params.id}`
	);
	const resAuthors = await fetch(
		"https://sheltered-beach-31872.herokuapp.com/authors"
	);
	const book = await resBook.json();
	const authors = await resAuthors.json();

	return {
		props: { book, authors },
	};
}

export default ChangeBook;
