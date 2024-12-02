// app/(protected)/layout.tsx

"use client";

import { useAuth } from "@/lib/firebase/AuthContext";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";

function Protected({ children }: { children: React.ReactNode }) {
	const { user, loading } = useAuth(); // Get user and loading states from the auth context
	const returnUrl = usePathname(); // Get the current URL path
	const [authChecked, setAuthChecked] = useState(false); // State to track when authentication check is done

	useEffect(() => {
		(async () => {
			// Wait for the loading state to resolve
			if (!loading) {
				if (!user) {
					// Redirect if no user is authenticated
					redirect(`/user/signin?returnUrl=${returnUrl}`);
				} else {
					// Set authChecked to true if user is authenticated
					setAuthChecked(true);
				}
			}
		})();
	}, [user, loading, returnUrl]); // Re-run when user, loading, or returnUrl changes

	// Render a loading indicator while awaiting authentication resolution
	if (!authChecked) {
		return <div>Loading...</div>;
	}

	// Render the protected content if the user is authenticated
	return <>{children}</>;
}

export default function ProtectedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <Protected>{children}</Protected>;
}
