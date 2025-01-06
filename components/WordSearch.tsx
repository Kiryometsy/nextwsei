"use client";
import React, { useState, useEffect } from "react";

type MatrixItem = {
	row: number;
	col: number;
};

type WordSearchGameProps = {
	gridSize: number;
	words: string[];
};

const WordSearchGame: React.FC<WordSearchGameProps> = ({ gridSize, words }) => {
	const [grid, setGrid] = useState<string[][]>([]);
	const [selectedCells, setSelectedCells] = useState<MatrixItem[]>([]);
	const [foundWords, setFoundWords] = useState<string[]>([]);
	const [success, setSuccess] = useState<boolean>(false);
	const [selectFrom, setSelectFrom] = useState<MatrixItem | null>(null);
	const [foundCells, setFoundCells] = useState<MatrixItem[]>([]); // New state for found cells

	useEffect(() => {
		setGrid(generateGrid(gridSize, words));
	}, [gridSize, words]);

	useEffect(() => {
		if (foundWords.length === words.length) {
			setSuccess(true);
		}
	}, [foundWords]);

	const handleSelect = (item: MatrixItem) => (event: React.MouseEvent) => {
		event.preventDefault();

		if (!selectFrom) {
			// If no starting point, set the first cell as start
			setSelectFrom(item);
			highlightItem(item);
			return;
		}

		// If a start cell exists, calculate the entire selection
		const selected = getItems(
			selectFrom.row,
			selectFrom.col,
			item.row,
			item.col
		);
		if (selected) {
			setSelectedCells(selected);
			setSelectFrom(null); // Reset selection origin
			clearHighlight();
			validateSelection(selected);
		}
	};

	const handleMouseover = (item: MatrixItem) => {
		if (!selectFrom) return;

		// Update selection on hover while dragging
		const selected = getItems(
			selectFrom.row,
			selectFrom.col,
			item.row,
			item.col
		);
		if (selected) {
			setSelectedCells(selected);
			clearHighlight();
			selected.forEach((cell) => highlightItem(cell));
		}
	};

	const highlightItem = (item: MatrixItem) => {
		const el = document.querySelector(
			`.ws-row:nth-child(${item.row + 1}) .ws-col:nth-child(${item.col + 1})`
		);
		if (el) el.classList.add("ws-selected");
	};

	const clearHighlight = () => {
		const selectedEls = document.querySelectorAll(".ws-selected");
		selectedEls.forEach((el) => el.classList.remove("ws-selected"));
	};

	const validateSelection = (selected: MatrixItem[]) => {
		const selectedWord = selected
			.map(({ row, col }) => grid[row][col])
			.join("");
		if (words.includes(selectedWord) && !foundWords.includes(selectedWord)) {
			setFoundWords((prev) => [...prev, selectedWord]);
			markAsFound(selected, selectedWord);
		}
	};

	const markAsFound = (selected: MatrixItem[], word: string) => {
		setFoundCells((prev) => [...prev, ...selected]); // Update foundCells state
		displayScore();
	};

	const getItems = (
		startRow: number,
		startCol: number,
		endRow: number,
		endCol: number
	): MatrixItem[] | null => {
		const items: MatrixItem[] = [];

		// Oblicz różnicę w wierszach i kolumnach
		const rowDiff = endRow - startRow;
		const colDiff = endCol - startCol;

		// Normalizuj kierunki na wartości -1, 0 lub 1
		let rowDir = rowDiff === 0 ? 0 : rowDiff / Math.abs(rowDiff);
		let colDir = colDiff === 0 ? 0 : colDiff / Math.abs(colDiff);

		// Jeśli zaznaczenie nie jest w linii prostej ani ukośnej, zwracamy null
		if (
			!(rowDir === 0 || colDir === 0 || Math.abs(rowDiff) === Math.abs(colDiff))
		) {
			return null;
		}

		// Generuj pola na trasie między startem a końcem
		let row = startRow;
		let col = startCol;
		while (row !== endRow || col !== endCol) {
			items.push({ row, col });
			row += rowDir;
			col += colDir;

			// Zatrzymaj, jeśli wyjdziemy poza granice tablicy
			if (row < 0 || row >= gridSize || col < 0 || col >= gridSize) break;
		}

		// Dodaj ostatnie pole, jeśli jest w granicach
		if (row === endRow && col === endCol) {
			items.push({ row: endRow, col: endCol });
		}

		return items;
	};

	const displayScore = () => {
		// Implement score display logic (if needed)
		console.log(`Score: ${foundWords.length + 1} out of ${words.length}`);
	};

	return (
		<div
			className="flex flex-col items-center gap-6 p-4 select-none"
			onMouseLeave={() => {
				setSelectedCells([]);
				setSelectFrom(null);
			}}
		>
			<h1 className="text-2xl font-bold">Word Search Game</h1>

			{/* Score Display */}
			<div className="text-lg font-medium mb-4">
				Score: {foundWords.length} out of {words.length}
			</div>

			{/* Grid */}
			<div
				className="grid gap-1 border-2 border-gray-600"
				style={{
					gridTemplateColumns: `repeat(${gridSize}, minmax(40px, 1fr))`,
				}}
			>
				{grid.map((row, rowIndex) =>
					row.map((letter, colIndex) => (
						<div
							key={`${rowIndex}-${colIndex}`}
							className={`flex items-center justify-center w-10 h-10 border border-gray-400 cursor-pointer text-lg font-medium ${
								selectedCells.some(
									(cell) => cell.row === rowIndex && cell.col === colIndex
								)
									? "bg-blue-300"
									: foundCells.some(
											(cell) => cell.row === rowIndex && cell.col === colIndex
									  )
									? "bg-yellow-300"
									: "bg-white"
							}`}
							onMouseDown={handleSelect({ row: rowIndex, col: colIndex })}
							onMouseEnter={() =>
								handleMouseover({ row: rowIndex, col: colIndex })
							}
						>
							{letter}
						</div>
					))
				)}
			</div>

			<div className="w-full text-center">
				<h3 className="text-lg font-semibold mb-2">Words to Find:</h3>
				<ul className="list-none flex flex-wrap justify-center gap-4">
					{words.map((word) => (
						<li
							key={word}
							className={`text-lg ${
								foundWords.includes(word)
									? "text-green-500 line-through"
									: "text-gray-800"
							}`}
						>
							{word}
						</li>
					))}
				</ul>
			</div>

			{success && (
				<div className="text-green-500 font-semibold text-xl">
					🎉 Congratulations! You found all the words!
				</div>
			)}
		</div>
	);
};

// Utility Functions
const generateGrid = (gridSize: number, words: string[]): string[][] => {
	const grid: string[][] = Array.from({ length: gridSize }, () =>
		Array.from({ length: gridSize }, () => "")
	);

	words.forEach((word) => {
		placeWordInGrid(grid, word);
	});

	// Fill empty cells with random letters
	for (let i = 0; i < gridSize; i++) {
		for (let j = 0; j < gridSize; j++) {
			if (!grid[i][j]) {
				grid[i][j] = randomLetter();
			}
		}
	}

	return grid;
};

const placeWordInGrid = (grid: string[][], word: string): void => {
	const directions = [
		{ dx: 0, dy: 1 }, // Right
		{ dx: 1, dy: 0 }, // Down
		{ dx: 1, dy: 1 }, // Diagonal down-right
		{ dx: -1, dy: 1 }, // Diagonal up-right
		{ dx: 0, dy: -1 }, // Left
		{ dx: -1, dy: 0 }, // Up
		{ dx: -1, dy: -1 }, // Diagonal up-left
		{ dx: 1, dy: -1 }, // Diagonal down-left
	];

	const gridSize = grid.length;
	let placed = false;

	while (!placed) {
		const direction = directions[Math.floor(Math.random() * directions.length)];
		const startX = Math.floor(Math.random() * gridSize);
		const startY = Math.floor(Math.random() * gridSize);
		const endX = startX + direction.dx * (word.length - 1);
		const endY = startY + direction.dy * (word.length - 1);

		if (
			endX >= 0 &&
			endX < gridSize &&
			endY >= 0 &&
			endY < gridSize &&
			canPlaceWord(grid, word, startX, startY, direction)
		) {
			for (let i = 0; i < word.length; i++) {
				grid[startX + i * direction.dx][startY + i * direction.dy] = word[i];
			}
			placed = true;
		}
	}
};

const canPlaceWord = (
	grid: string[][],
	word: string,
	startX: number,
	startY: number,
	direction: { dx: number; dy: number }
): boolean => {
	for (let i = 0; i < word.length; i++) {
		const x = startX + i * direction.dx;
		const y = startY + i * direction.dy;
		if (grid[x][y] && grid[x][y] !== word[i]) {
			return false;
		}
	}
	return true;
};

const randomLetter = (): string => {
	const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	return alphabet[Math.floor(Math.random() * alphabet.length)];
};

export default WordSearchGame;
