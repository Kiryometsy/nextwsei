import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
				<h1 className="text-4xl font-bold text-center sm:text-left">
					Welcome to Nextwsei!
				</h1>
				<p className="text-lg text-center sm:text-left">
					A simple app for user authentication and profile management. Follow
					the tutorial below to get started.
				</p>

				<div className="text-lg font-[family-name:var(--font-geist-mono)]">
					<h2 className="text-xl font-bold mb-4">Tutorial</h2>
					<ol className="list-decimal list-inside mb-6">
						<li className="mb-2">
							<b>Step 1:</b> Register a new account.
						</li>
						<li className="mb-2">
							<b>Step 2:</b> Log in with your credentials.
						</li>
						<li className="mb-2">
							<b>Step 3:</b> Access your profile page to manage your settings.
						</li>
						<li className="mb-2">
							<b>Step 4:</b> Play the game!
						</li>
					</ol>

					<div className="flex gap-4 items-center flex-col sm:flex-row">
						<Link
							className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
							href="/game/wordsearch"
						>
							Play the Game
						</Link>
					</div>
				</div>
			</main>
			<footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
				<div className="flex items-center gap-2 hover:underline hover:underline-offset-4">
					<Image
						aria-hidden
						src="/file.svg"
						alt="File icon"
						width={16}
						height={16}
					/>
					<a
						href="https://github.com/Kiryometsy/nextwsei"
						rel="noopener noreferrer"
					>
						GitHub Documentation
					</a>
				</div>
			</footer>
		</div>
	);
}
