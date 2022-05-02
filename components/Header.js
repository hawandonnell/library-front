import Link from "next/link";
import { useState } from "react";

export default function Header({ pageName }) {
	const [isMenuHidden, setMenuHidden] = useState(true);
	return (
		<header className="header">
			<style jsx>{`
				.header__inner {
					display: flex;
					align-items: center;
					justify-content: space-between;
					position: relative;
				}
				.nav__item {
					margin-left: 2rem;
					transition: color 0.5s;
				}
				.nav__item:first-child {
					margin-left: 0;
				}
				.menu-icon {
					display: none;
					text-align: end;
				}
				.menu-icon svg:hover {
					cursor: pointer;
				}
				.nav {
					display: block;
					overflow: hidden;
					transition: max-height 0.5s;
					max-height: 2000px;
				}
				.nav_hidden {
					max-height: 0;
				}

				.nav__item:hover {
					color: #030303;
				}

				@media screen and (max-width: 650px) {
					.menu-icon {
						display: block;
					}
					.header__inner {
						display: grid;
						grid-template-columns: 1fr 1fr;
					}
					.nav {
						display: flex;
						flex-flow: column;
						align-items: center;
						grid-column-start: 1;
						grid-column-end: 3;
					}
					.nav__item {
						margin-left: 0;
						margin-top: 1rem;
					}
					.nav__item:first-child {
						margin-top: 0;
					}
					.nav__item:last-child {
						margin-bottom: 2em;
					}
				}
				@media screen and (min-width: 651px) {
					.header__inner .nav {
						max-height: 2000px;
					}
				}
			`}</style>
			<div className="container">
				<div className="header__inner">
					<h1 className="header__title">{pageName}</h1>
					<i className="menu-icon">
						<svg
							onClick={() => setMenuHidden(!isMenuHidden)}
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
							role="img"
							width="30"
							height="30"
							preserveAspectRatio="xMidYMid meet"
							viewBox="0 0 20 20"
						>
							<path
								fill="currentColor"
								d="M20 5V2H0v3h20zm0 6V8H0v3h20zm0 6v-3H0v3h20z"
							/>
						</svg>
					</i>
					<nav className={isMenuHidden ? "nav nav_hidden" : "nav"}>
						<Link href="/" className="nav__item">
							<a className="nav__item">Книги</a>
						</Link>
						<Link href="/authors">
							<a className="nav__item">Авторы</a>
						</Link>
						<Link href="/add-book">
							<a className="nav__item">Добавить книгу</a>
						</Link>
						<Link href="/add-author" className="nav__item">
							<a className="nav__item">Добавить автора</a>
						</Link>
					</nav>
				</div>
			</div>
			<hr />
		</header>
	);
}
