"use client";
import { useState } from "react";
import WordSearchGame from "@/components/WordSearch";

const wordSets = [
	["APPLE", "BANANA", "CHERRY", "DATE", "ELDERBERRY"],
	["LION", "TIGER", "BEAR", "CUB", "ELEPHANT"],
	["COMPUTER", "KEYBOARD", "MOUSE", "SCREEN", "DESK"],
	// Add more word sets as needed
];

export default function Home() {
	const [selectedWords, setSelectedWords] = useState<string[]>(wordSets[0]);
	const [gridSize, setGridSize] = useState<number>(10);
	const [fontSize, setFontSize] = useState<number>(20);
	const [isInGame, setIsInGame] = useState<boolean>(false);

	const handleWordSetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedWords(wordSets[parseInt(event.target.value)]);
	};

	const handleGridSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setGridSize(Math.min(Math.max(parseInt(event.target.value), 10), 20)); // Restrict size between 5 and 20
	};

	const handleFontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFontSize(Math.min(Math.max(parseInt(event.target.value), 10), 36)); // Restrict size between 10 and 36
	};

	const handleStartGame = () => {
		setIsInGame(true);
	};

	const handleBackToMenu = () => {
		setIsInGame(false);
	};

	return (
		<div className="min-h-screen bg-gray-100 flex justify-center items-center pt-24">
			<div className="p-4">
				{!isInGame ? (
					// Settings Menu
					<div className="space-y-6">
						<h1 className="text-3xl font-bold mb-4">
							Word Search Game Settings
						</h1>

						{/* Word Set Selector */}
						<div className="mb-4">
							<label htmlFor="wordSet" className="mr-2">
								Word Set:
							</label>
							<select
								id="wordSet"
								onChange={handleWordSetChange}
								className="p-2 border"
							>
								{wordSets.map((_, index) => (
									<option key={index} value={index}>
										Set {index + 1}
									</option>
								))}
							</select>
						</div>

						{/* Grid Size */}
						<div className="mb-4">
							<label htmlFor="gridSize" className="mr-2">
								Grid Size:
							</label>
							<input
								type="number"
								id="gridSize"
								value={gridSize}
								onChange={handleGridSizeChange}
								className="p-2 border w-20"
								min="5"
								max="20"
							/>
						</div>

						{/* Font Size */}
						<div className="mb-4">
							<label htmlFor="fontSize" className="mr-2">
								Font Size:
							</label>
							<input
								type="number"
								id="fontSize"
								value={fontSize}
								onChange={handleFontSizeChange}
								className="p-2 border w-20"
								min="10"
								max="36"
							/>
						</div>

						{/* Start Game Button */}
						<button
							className="w-full bg-blue-500 text-white py-2 rounded-lg"
							onClick={handleStartGame}
						>
							Start Game
						</button>
					</div>
				) : (
					// Word Search Game
					<div className="space-y-6">
						{/* Button to go back to Menu */}
						<button
							className="w-full bg-gray-500 text-white py-2 rounded-lg"
							onClick={handleBackToMenu}
						>
							Back to Menu
						</button>

						{/* Game Component */}
						<WordSearchGame
							gridSize={gridSize}
							words={selectedWords}
							fontSize={fontSize}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
