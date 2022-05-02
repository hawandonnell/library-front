import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import useSWR, { useSWRConfig } from "swr";

import Header from "../../../components/Header";
import CustomHead from "../../../components/CustomHead";

function ChangeAuthorContent({ author, router }) {
	const [firstName, setFirstName] = useState(author.firstName);
	const [lastName, setLastName] = useState(author.lastName);
	const [birthAt, setBirthAt] = useState(author.birthAt);

	const { mutate } = useSWRConfig();

	return (
		<>
			<CustomHead pageName="Изменить автора" />
			<Header pageName="Изменить автора"></Header>
			<div className="container" style={{ marginTop: "2rem" }}>
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
						defaultValue={author.lastName}
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
								await mutate(
									`https://sheltered-beach-31872.herokuapp.com/author/${author.id}`
								);

								router.push("/authors");
							}}
						>
							Изменить
						</button>
					</div>
				</form>
			</div>
		</>
	);
}
// Wrapper to fetch data
export default function ChangeAuthor() {
	const router = useRouter();
	const { id } = router.query;

	const { data: author, error } = useSWR(
		`https://sheltered-beach-31872.herokuapp.com/author/${id}`,
		(url) => fetch(url).then((res) => res.json())
	);

	if (error) return <h1>Error: {error}</h1>;
	if (!author)
		return (
			<>
				<CustomHead pageName="Loading" />
				<h1>Loading</h1>
			</>
		);

	return <ChangeAuthorContent author={author} router={router} />;
}

// export async function getStaticPaths() {
// 	const res = await fetch(
// 		"https://sheltered-beach-31872.herokuapp.com/authors"
// 	);
// 	const authors = await res.json();

// 	const paths = authors.map((author) => ({
// 		params: { id: author.id.toString() },
// 	}));

// 	return {
// 		paths,
// 		fallback: false,
// 	};
// }

// export async function getStaticProps({ params }) {
// 	const resAuthor = await fetch(
// 		`https://sheltered-beach-31872.herokuapp.com/author/${params.id}`
// 	);
// 	const author = await resAuthor.json();

// 	return {
// 		props: { author },
// 	};
// }
