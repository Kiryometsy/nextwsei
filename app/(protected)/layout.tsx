// app/(protected)/layout.tsx

"use client";

import { useAuth } from "@/lib/firebase/AuthContext"; // Adjust the path if needed // Import the useAuth hook
import { useLayoutEffect } from "react";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";

function Protected({ children }: { children: React.ReactNode }) {
	const { user } = useAuth(); // Get user from the auth context
	const returnUrl = usePathname(); // Get the current URL path

	useLayoutEffect(() => {
		// If user is not logged in, redirect them to the login page
		if (!user) {
			redirect(`/user/signin?returnUrl=${returnUrl}`); // Pass the current path to returnUrl
		}
	}, [user, returnUrl]); // Re-run when user or returnUrl changes

	return <>{children}</>; // Render the protected content if the user is authenticated
}

export default Protected;
