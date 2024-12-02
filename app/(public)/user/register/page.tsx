// app/(public)/user/register/page.tsx

"use client";

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
import {
	getAuth,
	createUserWithEmailAndPassword,
	sendEmailVerification,
	signOut,
} from "firebase/auth";
import { useAuth } from "@/lib/firebase/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
	const { user } = useAuth();
	const auth = getAuth();
	const router = useRouter();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [registerError, setRegisterError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Handle form input changes
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	// Handle form submission
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setRegisterError(""); // Reset error messages
		setIsSubmitting(true);

		const { email, password, confirmPassword } = formData;

		// Validate password match
		if (password !== confirmPassword) {
			setRegisterError("Passwords do not match.");
			setIsSubmitting(false);
			return;
		}

		try {
			// Create user with email and password
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			console.log("User registered!");

			// Send email verification
			await sendEmailVerification(userCredential.user);
			console.log("Email verification sent!");

			// Redirect to verify page
			router.push("/user/verify");
		} catch (error: any) {
			setRegisterError(error.message); // Capture registration errors
			console.dir(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	if (user) {
		return null; // Prevent access to the registration form if already logged in
	}

	return (
		<div className="flex h-screen w-full items-center justify-center px-4">
			<Card className="mx-auto max-w-sm">
				<CardHeader>
					<CardTitle className="text-3xl">Register</CardTitle>
					<CardDescription>
						Enter your information to create an account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="me@example.com"
								value={formData.email}
								onChange={handleChange}
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
								value={formData.password}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="confirmPassword">Confirm Password</Label>
							<Input
								id="confirmPassword"
								name="confirmPassword"
								type="password"
								placeholder="Repeat your password"
								value={formData.confirmPassword}
								onChange={handleChange}
								required
							/>
						</div>

						{registerError && (
							<div className="text-red-500 text-sm">{registerError}</div>
						)}

						<Button type="submit" className="w-full" disabled={isSubmitting}>
							{isSubmitting ? "Registering..." : "Register"}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
