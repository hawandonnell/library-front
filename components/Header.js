import Link from "next/link";
import Head from "next/head";

export default function Header({ pageName }) {
	return (
		<>
			<Head>
				<title>{pageName}</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<header>
				<style jsx>{`
					header {
						display: flex;
						align-items: center;
						justify-content: space-between;
					}
					nav {
						display: flex;
						align-items: center;
					}
					nav h2 {
						margin-left: 2rem;
					}
					nav h2:first-child {
						margin-left: 0;
					}
					@media screen and (max-width: 900px) {
						header {
							flex-flow: column;
						}
						nav {
							flex-direction: column;
						}
						nav h2 {
							margin-left: 0;
						}
					}
				`}</style>
				<h1>{pageName}</h1>
				<nav>
					<h2>
						<Link href="/">Книги</Link>
					</h2>
					<h2>
						<Link href="/authors">Авторы</Link>
					</h2>
					<h2>
						<Link href="/add-book">Добавить книгу</Link>
					</h2>
					<h2>
						<Link href="/add-author">Добавить автора</Link>
					</h2>
				</nav>
			</header>
		</>
	);
}