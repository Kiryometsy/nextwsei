"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
	collection,
	query,
	where,
	getDocs,
	doc,
	Timestamp,
	DocumentReference,
} from "firebase/firestore";
import { useAuth } from "@/lib/firebase/AuthContext";
import { Card } from "@/components/ui/card";

// Define the user type explicitly (use `User` from Firebase if available)
interface User {
	uid: string;
	email: string;
	displayName?: string;
	photoURL?: string;
}

interface Article {
	title: string;
	content: string;
	date: Timestamp; // The 'date' is a Timestamp in Firestore
	user: DocumentReference; // The 'user' field is a reference to the 'users' collection
}

// This is the function to fetch articles for a user
async function DbCollectionArtGet(user: User): Promise<Article[]> {
	const articlesRef = collection(db, "articles");

	const userRef = doc(db, "users", user?.uid);

	// Adjusted query to get documents where 'user' is not empty
	const q = query(articlesRef, where("user", "==", userRef));

	const querySnapshot = await getDocs(q);

	const tab: Article[] = [];

	querySnapshot.forEach((doc) => {
		tab.push(doc.data() as Article); // Collect article data
	});

	return tab;
}

// Helper function to format the Firestore Timestamp
function formatDate(timestamp: Timestamp): string {
	const date = timestamp.toDate(); // Convert Timestamp to Date
	return date.toLocaleString(); // You can adjust the format as needed
}

export default function ArticlesPage() {
	const { user } = useAuth(); // Access the logged-in user's data
	const [articles, setArticles] = useState<Article[]>([]); // State to store articles
	const [loading, setLoading] = useState<boolean>(true); // Loading state

	useEffect(() => {
		if (user) {
			// Fetch articles only if the user is logged in
			const fetchArticles = async () => {
				try {
					const articlesData = await DbCollectionArtGet(user); // Fetch articles
					console.log("Fetched articles:", articlesData);
					setArticles(articlesData); // Set fetched articles in state
				} catch (error) {
					console.error("Error fetching articles:", error);
				} finally {
					setLoading(false); // Stop loading once data is fetched
				}
			};

			fetchArticles(); // Call the function to fetch articles
		}
	}, [user]); // Effect runs whenever `user` changes

	if (loading) {
		return <div>Loading articles...</div>; // Display loading state
	}

	return (
		<div className="flex flex-col items-center space-y-4 p-4">
			<h1 className="text-2xl font-semibold">Your Articles</h1>

			{articles.length === 0 ? (
				<div>No articles found</div> // Display if no articles are found
			) : (
				<div className="space-y-4 w-full">
					{articles.map((article, index) => (
						<Card key={index} className="w-full max-w-md mx-auto p-4">
							<h2 className="text-xl font-medium">{article.title}</h2>
							<p className="text-sm text-gray-600">{article.content}</p>
							<p className="text-xs text-gray-400">
								{formatDate(article.date)} {/* Format the date here */}
							</p>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}
