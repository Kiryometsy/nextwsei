"use client"
import Image from "next/image";
import { useState } from "react";
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
import { updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import { db } from '@/lib/firebase'
import { collection, addDoc, setDoc, doc } from 'firebase/firestore'

export default function ProfileForm() {
	const { user } = useAuth();
	const [formData, setFormData] = useState({
		displayName: user?.displayName || "",
		photoURL: user?.photoURL || "",
	});
    const [addressData, setAddressData] = useState({
        city: "",
        street: "",
        zipCode: ""
    })
	const [profileImage, setProfileImage] = useState(user?.photoURL || ""); // State for displayed image
	const [error, setError] = useState("");
	const [submitError, setSubmitError] = useState(""); // To show errors only after submit
	const [isSubmitting, setIsSubmitting] = useState(false);

	const router = useRouter();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

    const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		setSubmitError("");
		setIsSubmitting(true);

		try {
			// Validate photoURL
			if (formData.photoURL && !isValidHttpUrl(formData.photoURL)) {
				setSubmitError("Invalid photo URL. Please provide a valid image link.");
				setIsSubmitting(false);
				return;
			}

			// Update profile
			await updateProfile(user, {
				displayName: formData.displayName,
				photoURL: formData.photoURL,
			});

			// Update the displayed profile image
			setProfileImage(formData.photoURL);

			// Reload user data
			router.refresh();
		} catch (err: any) {
			setSubmitError(err.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	// Function to validate URLs
	const isValidHttpUrl = (url: string) => {
		try {
			const parsedUrl = new URL(url);
			return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
		} catch (_) {
			return false;
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
					{/* Display current profile image */}
					<div className="flex justify-center mb-4">
						{profileImage ? (
							<Image
								src={profileImage}
								alt="Profile Picture"
								width={100}
								height={100}
								className="rounded-full"
							/>
						) : (
							<div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
								<span className="text-gray-500">No Photo</span>
							</div>
						)}
					</div>
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

                        <div className="space-y-2">
							<Label htmlFor="city">city</Label>
							<Input
								id="city"
								name="city"
								type="text"
								placeholder="city"
								value={addressData?.city}
								onChange={handleChange}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="street">street</Label>
							<Input
								id="street"
								name="street"
								type="text"
								placeholder="street"
								value={addressData?.street}
                                onChange={handleChange}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="zipCode">zipCode</Label>
							<Input
								id="zipCode"
								name="zipCode"
								type="text"
								placeholder="zipCode"
								value={addressData?.zipCode}
								onChange={handleChange}
							/>
						</div>

						{/* Show submission error if any */}
						{submitError && (
							<div className="text-red-500 text-sm">{submitError}</div>
						)}

						<Button type="submit" className="w-full" disabled={isSubmitting}>
							{isSubmitting ? "Updating..." : "Update Profile"}
						</Button>
					</form>
				</CardContent>
				<CardFooter>
					<p className="text-gray-500 text-sm">
						Changes will be reflected immediately after submission.
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
