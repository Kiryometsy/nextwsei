import WordSearch from "@/components/WordSearch";

const words = ["APPLE", "BANANA", "CHERRY", "DATE"];
export default function Home() {
	return (
		<div className="min-h-screen bg-gray-100 flex justify-center items-center">
			<WordSearch gridSize={10} words={words} />
		</div>
	);
}
