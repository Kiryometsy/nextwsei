"use client";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/firebase/AuthContext";
import { updateProfile, reload } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfileForm() {
	const { user } = useAuth();
	const [formData, setFormData] = useState({
		displayName: user?.displayName || "",
		photoURL: user?.photoURL || "",
	});
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

    const router=useRouter()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(""); // Reset error messages
		setIsSubmitting(true);

		try {
			// Update profile
			await updateProfile(user, {
				displayName: formData.displayName,
				photoURL: formData.photoURL,
			});
			console.log("Profile updated successfully!");

			// Reload the updated user
			router.refresh()
			console.log("User data refreshed!");

			// Update form data
			setFormData({
				displayName: user.displayName || "",
				photoURL: user.photoURL || "",
			});
		} catch (err: any) {
			setError(err.message); // Capture errors
			console.dir(err);
		} finally {
			setIsSubmitting(false);
		}
	};

	if (!user) {
		return null; // Ensure only logged-in users can access this form
	}

	return (
		<div className="flex h-screen w-full items-center justify-center px-4">
			<Card className="mx-auto max-w-sm">
				<CardHeader>
					<CardTitle className="text-3xl">Profile</CardTitle>
					<CardDescription>Update your account information</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="displayName">Display Name</Label>
							<Input
								id="displayName"
								name="displayName"
								type="text"
								placeholder="Your display name"
								value={formData.displayName}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="Your email"
								value={user?.email || ""}
								disabled
								readOnly
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="photoURL">Photo URL</Label>
							<Input
								id="photoURL"
								name="photoURL"
								type="url"
								placeholder="Link to your profile picture"
								value={formData.photoURL}
								onChange={handleChange}
							/>
						</div>

						{error && <div className="text-red-500 text-sm">{error}</div>}

						<Button type="submit" className="w-full" disabled={isSubmitting}>
							{isSubmitting ? "Updating..." : "Update Profile"}
						</Button>
					</form>
				</CardContent>
				<CardFooter>
					<p className="text-gray-500 text-sm">
						Changes will be reflected immediately.
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
