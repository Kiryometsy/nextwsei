"use client";
import { auth } from "@/lib/firebase";
import {
	signInWithEmailAndPassword,
	setPersistence,
	browserSessionPersistence,
} from "firebase/auth";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect } from "react";

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
		<form
			onSubmit={onSubmit}
			className="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-50 dark:text-gray-800"
			noValidate
		>
			<div className="mb-8 text-center">
				<h1 className="my-3 text-4xl font-bold">Sign in</h1>
				<p className="text-sm dark:text-gray-600">
					Sign in to access your account
				</p>
			</div>
			<div className="space-y-12">
				<div className="space-y-4">
					<div>
						<label htmlFor="email" className="block mb-2 text-sm">
							Email address
						</label>
						<input
							type="email"
							name="email"
							id="email"
							placeholder="leroy@jenkins.com"
							className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
						/>
					</div>
					<div>
						<div className="flex justify-between mb-2">
							<label htmlFor="password" className="text-sm">
								Password
							</label>
							<a
								rel="noopener noreferrer"
								href="#"
								className="text-xs hover:underline dark:text-gray-600"
							>
								Forgot password?
							</a>
						</div>
						<input
							type="password"
							name="password"
							id="password"
							placeholder="*****"
							className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
						/>
					</div>
				</div>
				{error && ( // Display error message if it exists
					<div className="text-red-600 text-sm text-center">{error}</div>
				)}
				<div className="space-y-2">
					<div>
						<button
							type="submit"
							className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50"
						>
							Sign in
						</button>
					</div>
					<p className="px-6 text-sm text-center dark:text-gray-600">
						Don&apos;t have an account yet?{" "}
						<a
							rel="noopener noreferrer"
							href="#"
							className="hover:underline dark:text-violet-600"
						>
							Sign up
						</a>
						.
					</p>
				</div>
			</div>
		</form>
	);
}

export default function SignInForm() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<SignInFormContent />
		</Suspense>
	);
}
