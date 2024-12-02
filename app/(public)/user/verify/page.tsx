"use client";

import { useAuth } from "@/lib/firebase/AuthContext";
import { signOut, getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";

export default function VerifyEmail() {
	const { user } = useAuth();
	const [registeredEmail, setRegisteredEmail] = useState("");

	useEffect(() => {
		if (user?.email) {
			setRegisteredEmail(user.email);
		}

		signOut(getAuth())
			.then(() => {
				console.log("User signed out successfully.");
			})
			.catch((error) => {
				console.error("Error signing out:", error);
			});
	}, [user]);

	return (
		<div className="flex h-screen w-full items-center justify-center px-4">
			<Card className="mx-auto max-w-md">
				<CardHeader>
					<CardTitle>Email Verification Required</CardTitle>
					<CardDescription>
						Please verify your email to continue.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-gray-600">
						An email verification link has been sent to your registered email
						address: <strong>{registeredEmail}</strong>. Please click the link
						in the email to verify your account.
					</p>
					<p className="text-sm text-gray-600 mt-4">
						After verification, you can log in to access your account.
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
