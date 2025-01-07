import React, { useState, useEffect, useMemo } from "react";

type MatrixItem = {
	row: number;
	col: number;
};

type WordSearchGameProps = {
	gridSize: number;
	words: string[];
	fontSize: number;
};

const WordSearchGame: React.FC<WordSearchGameProps> = ({
	gridSize,
	words,
	fontSize,
}) => {
	const [selectedCells, setSelectedCells] = useState<MatrixItem[]>([]);
	const [foundWords, setFoundWords] = useState<string[]>([]);
	const [success, setSuccess] = useState<boolean>(false);
	const [selectFrom, setSelectFrom] = useState<MatrixItem | null>(null);
	const [foundCells, setFoundCells] = useState<MatrixItem[]>([]);
	const [grid, setGrid] = useState<string[][]>(generateGrid(gridSize, words)); // Store grid state
	const [error, setError] = useState<string | null>(null); // Track error state

	const wordList = words;

	const wordSet = useMemo(() => new Set(wordList), [wordList]); // Store words in a set for O(1) lookup

	useEffect(() => {
		// Check if all words are present in the grid when it's generated
		if (!areAllWordsPresent(grid, wordList)) {
			setError("Not all words were placed in the grid. Please try again.");
		}
	}, [grid, wordList]);

	useEffect(() => {
		if (foundWords.length === wordList.length) {
			setSuccess(true);
		}
	}, [foundWords, wordList.length]);

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
		if (wordSet.has(selectedWord) && !foundWords.includes(selectedWord)) {
			setFoundWords((prev) => [...prev, selectedWord]);
			markAsFound(selected);
		}
	};

	const markAsFound = (selected: MatrixItem[]) => {
		setFoundCells((prev) => [...prev, ...selected]);
		displayScore();
	};

	const getItems = (
		startRow: number,
		startCol: number,
		endRow: number,
		endCol: number
	): MatrixItem[] | null => {
		const items: MatrixItem[] = [];

		const rowDiff = endRow - startRow;
		const colDiff = endCol - startCol;

		const rowDir = rowDiff === 0 ? 0 : rowDiff / Math.abs(rowDiff);
		const colDir = colDiff === 0 ? 0 : colDiff / Math.abs(colDiff);

		if (
			!(rowDir === 0 || colDir === 0 || Math.abs(rowDiff) === Math.abs(colDiff))
		) {
			return null;
		}

		let row = startRow;
		let col = startCol;
		while (row !== endRow || col !== endCol) {
			items.push({ row, col });
			row += rowDir;
			col += colDir;

			if (row < 0 || row >= gridSize || col < 0 || col >= gridSize) break;
		}

		if (row === endRow && col === endCol) {
			items.push({ row: endRow, col: endCol });
		}

		return items;
	};

	const displayScore = () => {
		console.log(`Score: ${foundWords.length + 1} out of ${wordList.length}`);
	};

	const generateNewGrid = () => {
		const newGrid = generateGrid(gridSize, wordList);
		setGrid(newGrid);
		setFoundWords([]);
		setFoundCells([]);
		setSelectedCells([]);
		setSelectFrom(null);
		setSuccess(false);
		setError(null); // Clear any error messages
	};

	const areAllWordsPresent = (grid: string[][], words: string[]) => {
		return words.every((word) => isWordInGrid(grid, word));
	};

	const isWordInGrid = (grid: string[][], word: string) => {
		// Check for word existence in the grid (this assumes words are placed horizontally, vertically, or diagonally)
		for (let row = 0; row < grid.length; row++) {
			for (let col = 0; col < grid[row].length; col++) {
				if (checkWordAt(grid, word, row, col)) {
					return true;
				}
			}
		}
		return false;
	};

	const checkWordAt = (
		grid: string[][],
		word: string,
		startRow: number,
		startCol: number
	) => {
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

		for (const direction of directions) {
			let found = true;
			for (let i = 0; i < word.length; i++) {
				const x = startRow + i * direction.dx;
				const y = startCol + i * direction.dy;
				if (
					x < 0 ||
					x >= grid.length ||
					y < 0 ||
					y >= grid.length ||
					grid[x][y] !== word[i]
				) {
					found = false;
					break;
				}
			}
			if (found) {
				return true;
			}
		}
		return false;
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
			<div className="text-lg font-medium mb-4">
				Score: {foundWords.length} out of {wordList.length}
			</div>
			{error && (
				<div className="text-red-500 font-semibold text-xl">{error}</div>
			)}
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
							style={{ fontSize: `${fontSize}px` }}
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
					{wordList.map((word) => (
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
			<button
				onClick={generateNewGrid}
				className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg"
			>
				Generate New Grid
			</button>
		</div>
	);
};

// Grid generation logic
const generateGrid = (gridSize: number, words: string[]): string[][] => {
	const grid: string[][] = Array(gridSize)
		.fill(null)
		.map(() => Array(gridSize).fill(""));

	words.forEach((word) => {
		placeWordInGrid(grid, word);
	});

	// Fill the grid with random letters
	for (let i = 0; i < gridSize; i++) {
		for (let j = 0; j < gridSize; j++) {
			if (grid[i][j] === "") {
				grid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
			}
		}
	}

	return grid;
};

// Helper function to place a word in the grid
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
	let attempts = 0;
	const maxAttempts = 100;

	while (!placed && attempts < maxAttempts) {
		attempts++;
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

// Helper function to check if a word can be placed
const canPlaceWord = (
	grid: string[][],
	word: string,
	startX: number,
	startY: number,
	direction: { dx: number; dy: number }
): boolean => {
	const gridSize = grid.length;
	for (let i = 0; i < word.length; i++) {
		const x = startX + i * direction.dx;
		const y = startY + i * direction.dy;
		if (x < 0 || x >= gridSize || y < 0 || y >= gridSize || grid[x][y] !== "") {
			return false;
		}
	}
	return true;
};

export default WordSearchGame;
