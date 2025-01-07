import React from "react";

const AuthorPage: React.FC = () => {
	return (
		<div className="flex flex-col items-center justify-center pt-16 min-h-screen bg-white">
			{/* Container for Content */}
			<div className="max-w-4xl w-full bg-white p-10 rounded-xl shadow-2xl">
				{/* Header Section */}
				<h1 className="text-4xl font-extrabold text-center text-black mb-4">
					Michał (Kiryometsy)
				</h1>
				<p className="text-lg text-center text-gray-600 mb-6">
					Passionate Developer | Open-Source Contributor | Software Gourmet 🍳💻
				</p>
				<p className="text-xl text-gray-800 mb-6">
					As a third-year Applied Computer Science student, I&apos;m always
					eager to learn new skills, tackle challenges, and grow both
					professionally and personally. When I&apos;m in the coding room, I
					bring the heat – developing innovative solutions in software and IT
					systems management. Ready to taste some challenges? I sure am!
				</p>

				{/* Projects Section */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Web Development Projects */}
					<div className="flex flex-col bg-gray-100 text-black rounded-lg shadow-lg p-6">
						<h3 className="text-xl font-semibold text-indigo-700 mb-2">
							Web Development Projects
						</h3>
						<ul className="list-disc list-inside space-y-2">
							<li>
								<a
									href="https://mefka.com.pl/index.php"
									className="text-indigo-700 hover:underline"
									target="_blank"
									rel="noopener noreferrer"
								>
									MeFKA
								</a>
								- Online shop specializing in energy solutions like
								photovoltaics, air conditioning, and batteries.
							</li>
							<li>
								<a
									href="https://fsgroupkrakow.com/"
									className="text-indigo-700 hover:underline"
									target="_blank"
									rel="noopener noreferrer"
								>
									FSGroupKraków
								</a>
								- Website for a construction and renovation firm showcasing
								their portfolio and services.
							</li>
						</ul>
					</div>

					{/* Gaming Projects */}
					<div className="flex flex-col bg-gray-100 text-black rounded-lg shadow-lg p-6">
						<h3 className="text-xl font-semibold text-indigo-700 mb-2">
							Gaming Projects
						</h3>
						<ul className="list-disc list-inside space-y-2">
							<li>
								<a
									href="https://www.l2temida.pl/"
									className="text-indigo-700 hover:underline"
									target="_blank"
									rel="noopener noreferrer"
								>
									L2Temida
								</a>
								- A private Lineage II server with custom gameplay and events
								for MMORPG enthusiasts.
							</li>
						</ul>
					</div>
				</div>

				{/* GitHub Projects Section */}
				<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="flex flex-col bg-gray-100 text-black rounded-lg shadow-lg p-6">
						<h3 className="text-xl font-semibold text-indigo-700 mb-2">
							GitHub Projects
						</h3>
						<ul className="list-disc list-inside space-y-2">
							<li>
								<a
									href="https://github.com/Kiryometsy/GravityBookstore"
									className="text-indigo-700 hover:underline"
									target="_blank"
									rel="noopener noreferrer"
								>
									Gravity Bookstore
								</a>
								- A bookstore management system built with C# demonstrating
								backend development skills.
							</li>
							<li>
								<a
									href="https://github.com/Kiryometsy/Szyfry"
									className="text-indigo-700 hover:underline"
									target="_blank"
									rel="noopener noreferrer"
								>
									Szyfry
								</a>
								- A cryptography algorithms repository, demonstrating encryption
								and decryption techniques.
							</li>
							<li>
								<a
									href="https://github.com/Kiryometsy/Algorytmy"
									className="text-indigo-700 hover:underline"
									target="_blank"
									rel="noopener noreferrer"
								>
									Algorytmy
								</a>
								- A collection of algorithms for various computational problems,
								implemented in different languages.
							</li>
						</ul>
					</div>
				</div>

				{/* GitHub Profile Link */}
				<div className="mt-8 text-center">
					<a
						href="https://github.com/Kiryometsy"
						className="bg-indigo-700 text-white hover:bg-indigo-600 px-6 py-3 rounded-full text-lg"
						rel="noopener noreferrer"
					>
						Visit GitHub Profile
					</a>
				</div>
			</div>
		</div>
	);
};

export default AuthorPage;
