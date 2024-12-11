"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
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
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";

export default function ProfileForm() {
	const { user } = useAuth();
	const [profileImage, setProfileImage] = useState(user?.photoURL || ""); // State for displayed image
	const [isLoading, setIsLoading] = useState(true); // Loading state to disable inputs until data is fetched
	const router = useRouter();

	const {
		register,
		setValue,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: user?.email,
			displayName: user?.displayName,
			photoURL: user?.photoURL,
			city: "",
			street: "",
			zipCode: "",
		},
	});

	useEffect(() => {
		// Fetch user address from Firestore
		const fetchUserData = async () => {
			if (user?.uid) {
				try {
					const snapshot = await getDoc(doc(db, "users", user.uid));
					if (snapshot.exists()) {
						const address = snapshot.data().address;
						// Set values for address fields using setValue
						setValue("city", address.city);
						setValue("zipCode", address.zipCode);
						setValue("street", address.street);
					}
				} catch (err) {
					console.error("Error fetching user data:", err);
				} finally {
					setIsLoading(false); // Set loading state to false after fetching
				}
			}
		};

		fetchUserData();
	}, [user, setValue]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		// This will be handled by react-hook-form via setValue, no need for manual state handling
	};

	const handleSubmitForm = async (data: any) => {
		setIsLoading(true);
		try {
			// Update profile
			await updateProfile(user, {
				displayName: data.displayName,
				photoURL: data.photoURL,
			});

			// Update Firestore document in "users" collection
			await setDoc(
				doc(db, "users", user.uid),
				{
					address: {
						city: data.city,
						street: data.street,
						zipCode: data.zipCode,
					},
				},
				{ merge: true }
			); // Use merge to avoid overwriting other fields

			// Update the displayed profile image
			setProfileImage(data.photoURL);

			// Reload user data
			router.refresh();
		} catch (err: any) {
			console.error("Error updating profile:", err);
		} finally {
			setIsLoading(false);
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
					<form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="displayName">Display Name</Label>
							<Input
								id="displayName"
								{...register("displayName", { required: true })}
								type="text"
								placeholder="Your display name"
								disabled={isLoading} // Disable input until data is loaded
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input id="email" value={user?.email || ""} disabled readOnly />
						</div>
						<div className="space-y-2">
							<Label htmlFor="photoURL">Photo URL</Label>
							<Input
								id="photoURL"
								{...register("photoURL")}
								type="url"
								placeholder="Link to your profile picture"
								disabled={isLoading} // Disable input until data is loaded
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="city">City</Label>
							<Input
								id="city"
								{...register("city")}
								type="text"
								placeholder="City"
								disabled={isLoading} // Disable input until data is loaded
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="street">Street</Label>
							<Input
								id="street"
								{...register("street")}
								type="text"
								placeholder="Street"
								disabled={isLoading} // Disable input until data is loaded
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="zipCode">Zip Code</Label>
							<Input
								id="zipCode"
								{...register("zipCode")}
								type="text"
								placeholder="Zip Code"
								disabled={isLoading} // Disable input until data is loaded
							/>
						</div>

						{/* Show submission error if any */}
						{errors?.displayName && (
							<div className="text-red-500 text-sm">
								Display Name is required.
							</div>
						)}

						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? "Updating..." : "Update Profile"}
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
