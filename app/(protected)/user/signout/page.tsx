"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";

export default function LogoutForm() {
	const router = useRouter();

	const onSubmit = async () => {
		try {
			await signOut(auth); // Ensure signOut completes before redirect
			router.push("/"); // Redirect to the homepage after signing out
		} catch (error) {
			console.error("Error signing out:", error);
		}
	};

	return (
		<div className="flex h-screen w-full items-center justify-center px-4">
			<Card className="mx-auto max-w-sm">
				<CardHeader>
					<CardTitle className="text-3xl">Sign out</CardTitle>
					<CardDescription>
						Are you sure you want to sign out of your account?
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Button
						onClick={onSubmit}
						className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
					>
						Sign out
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
