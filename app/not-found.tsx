import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
				<h1 className="text-2xl font-semibold text-gray-800">Page Not Found</h1>
				<p className="text-gray-600 mt-2">
					Sorry, the page you are looking for does not exist or has been moved.
				</p>
				<div className="mt-4">
					<Link href="/" passHref>
						<button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
							Return to Home
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
