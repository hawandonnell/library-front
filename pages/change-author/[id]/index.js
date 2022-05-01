import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import Header from "../../../components/Header";

export default function ChangeAuthor({ author }) {
	const [firstName, setFirstName] = useState(author.firstName);
	const [lastName, setLastName] = useState(author.lastName);
	const [birthAt, setBirthAt] = useState(author.birthAt);

	const router = useRouter();
	return (
		<div className="container">
			<style jsx>{`
				.form__buttons {
					margin-top: 2rem;
				}
			`}</style>
			<Header pageName="Изменить автора"></Header>
			<form onSubmit={(e) => e.preventDefault()}>
				<label htmlFor="firstName">Имя: </label>
				<input
					type="text"
					name="firstName"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
				/>
				<br />
				<label htmlFor="lastName">Фамилия: </label>
				<input
					type="text"
					name="lastName"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
				/>
				<br />
				<label htmlFor="birthAt">Дата рождения: </label>
				<input
					type="number"
					name="birthAt"
					value={birthAt}
					onChange={(e) => setBirthAt(e.target.value)}
				/>
				<div className="form__buttons">
					<button onClick={() => router.push("/authors")}>Отмена</button>
					<button
						type="submit"
						onClick={async () => {
							await axios({
								method: "put",
								url: `https://sheltered-beach-31872.herokuapp.com/author/${author.id}`,
								data: {
									firstName,
									lastName,
									birthAt: Number(birthAt),
								},
							});
							router.push("/authors");
						}}
					>
						Изменить
					</button>
				</div>
			</form>
		</div>
	);
}

export async function getStaticPaths() {
	const res = await fetch(
		"https://sheltered-beach-31872.herokuapp.com/authors"
	);
	const authors = await res.json();

	const paths = authors.map((author) => ({
		params: { id: author.id.toString() },
	}));

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const resAuthor = await fetch(
		`https://sheltered-beach-31872.herokuapp.com/author/${params.id}`
	);
	const author = await resAuthor.json();

	return {
		props: { author },
	};
}
