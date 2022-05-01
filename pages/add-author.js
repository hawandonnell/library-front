import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import Header from "../components/Header";

export default function AddAuthor() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [birthAt, setBirthAt] = useState(0);

	const router = useRouter();
	return (
		<div className="container">
			<style jsx>{`
				.form__buttons {
					margin-top: 2rem;
				}
			`}</style>
			<Header pageName="Добавить автора"></Header>
			<form onSubmit={(e) => e.preventDefault()}>
				<label htmlFor="firstName">Имя: </label>
				<input
					type="text"
					name="firstName"
					onChange={(e) => setFirstName(e.target.value)}
				/>
				<br />
				<label htmlFor="lastName">Фамилия: </label>
				<input
					type="text"
					name="lastName"
					onChange={(e) => setLastName(e.target.value)}
				/>
				<br />
				<label htmlFor="birthAt">Дата рождения: </label>
				<input
					type="number"
					name="birthAt"
					onChange={(e) => setBirthAt(e.target.value)}
				/>
				<div className="form__buttons">
					<button onClick={() => router.push("/authors")}>Отмена</button>
					<button
						type="submit"
						onClick={async () => {
							await axios({
								method: "post",
								url: "https://sheltered-beach-31872.herokuapp.com/author",
								data: {
									firstName,
									lastName,
									birthAt: Number(birthAt),
								},
							});
							router.push("/authors");
						}}
					>
						Добавить
					</button>
				</div>
			</form>
		</div>
	);
}
