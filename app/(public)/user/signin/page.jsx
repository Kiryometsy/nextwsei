"use client";
import { auth } from "@/lib/firebase";
import {
	signInWithEmailAndPassword,
	setPersistence,
	browserSessionPersistence,
} from "firebase/auth";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function SignInFormContent() {
	const [returnUrl, setReturnUrl] = useState(null); // Store returnUrl dynamically
	const [error, setError] = useState(""); // Store error state
	const params = useSearchParams();
	const router = useRouter();

	useEffect(() => {
		// Safely retrieve search parameters after the component is mounted
		if (params) {
			setReturnUrl(params.get("returnUrl"));
		}
	}, [params]);

	const onSubmit = (e) => {
		e.preventDefault();
		const email = e.target["email"].value;
		const password = e.target["password"].value;

		setError(""); // Reset error before attempting login

		setPersistence(auth, browserSessionPersistence)
			.then(() => {
				signInWithEmailAndPassword(auth, email, password)
					.then((userCredential) => {
						if (!userCredential.user.emailVerified) {
							router.push("/user/verify");
						} else {
							router.push(returnUrl || "/"); // Redirect after success
						}
					})
					.catch((error) => {
						const errorCode = error.code;
						const errorMessage = error.message;

						// Set error message based on error code
						if (errorCode === "auth/wrong-password") {
							setError("The password is incorrect. Please try again.");
						} else if (errorCode === "auth/invalid-credential") {
							setError("No account found with this email address.");
						} else {
							setError("An error occurred. Please try again later.");
						}
						console.error("Error code:", errorCode, "Message:", errorMessage);
					});
			})
			.catch((error) => {
				console.error("Persistence error:", error);
				setError("An error occurred while setting session persistence.");
			});
	};

	return (
		<div className="flex h-screen w-full items-center justify-center px-4">
			<Card className="mx-auto max-w-sm">
				<CardHeader>
					<CardTitle className="text-3xl">Sign in</CardTitle>
					<CardDescription>Sign in to access your account</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={onSubmit} className="space-y-4" noValidate>
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="me@example.com"
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								name="password"
								type="password"
								placeholder="Your password"
								required
							/>
						</div>

						{error && <div className="text-red-500 text-sm">{error}</div>}

						<Button type="submit" className="w-full">
							Sign in
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}

export default function SignInForm() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<SignInFormContent />
		</Suspense>
	);
}
