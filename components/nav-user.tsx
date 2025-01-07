"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/firebase/AuthContext"; // Use the useAuth hook
import {
	BadgeCheck,
	ChevronsUpDown,
	LogIn,
	LogOut,
	UserPlus,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavUser() {
	const { user, loading } = useAuth(); // Get user and loading state from context
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Local state to track login status
	const { isMobile } = useSidebar();
	const [avatarKey, setAvatarKey] = useState<number>(0); // Key to force Avatar re-render

	// Update local state based on auth changes
	useEffect(() => {
		setIsLoggedIn(!!user); // If user exists, set as logged in, otherwise logged out
		setAvatarKey((prevKey) => prevKey + 1); // Increment key to force Avatar re-render
	}, [user]); // Run effect when user state changes (e.g., on sign in/out)

	if (loading) return <div>Loading...</div>; // Show a loading indicator while user state is being fetched

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							name="SideBarMenuUser"
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							{/* Avatar Image */}
							<Avatar className="h-8 w-8 rounded-lg" key={avatarKey}>
								{/* Show gray placeholder if user is not logged in or has no photo */}
								{isLoggedIn ? (
									<AvatarImage
										src={user?.photoURL || null}
										alt={user?.displayName}
									/>
								) : (
									<AvatarFallback className="bg-gray-400">U</AvatarFallback>
								)}
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								{/* Show user's name or "Login" if not signed in */}
								<span className="truncate font-semibold">
									{isLoggedIn ? user?.displayName : "Login"}
								</span>
								<span className="truncate text-xs">
									{isLoggedIn ? user?.email : ""}
								</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						{/* User's profile */}
						{isLoggedIn ? (
							<DropdownMenuLabel className="p-0 font-normal">
								<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
									<Avatar className="h-8 w-8 rounded-lg">
										<AvatarImage
											src={user?.photoURL || ""}
											alt={user?.displayName}
										/>
										<AvatarFallback className="rounded-lg">
											{user?.displayName?.charAt(0)}
										</AvatarFallback>
									</Avatar>
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-semibold">
											{user?.displayName}
										</span>
										<span className="truncate text-xs">{user?.email}</span>
									</div>
								</div>
							</DropdownMenuLabel>
						) : (
							<DropdownMenuLabel className="p-0 font-normal">
								<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
									<Avatar className="h-8 w-8 rounded-lg bg-gray-400">
										{/* Placeholder for non-logged in user */}
										<AvatarFallback className="rounded-lg">U</AvatarFallback>
									</Avatar>
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-semibold">Login</span>
										<span className="truncate text-xs">Not signed in</span>
									</div>
								</div>
							</DropdownMenuLabel>
						)}
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							{/* Links based on whether the user is signed in */}
							{isLoggedIn ? (
								<Link href="/user/profile" passHref>
									<DropdownMenuItem>
										<BadgeCheck />
										Account
									</DropdownMenuItem>
								</Link>
							) : (
								<Link href="/user/signin" passHref>
									<DropdownMenuItem>
										<LogIn /> Log in
									</DropdownMenuItem>
								</Link>
							)}
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						{!isLoggedIn && (
							<Link href="/user/register" passHref>
								<DropdownMenuItem>
									<UserPlus /> Register
								</DropdownMenuItem>
							</Link>
						)}
						<DropdownMenuSeparator />
						{isLoggedIn && (
							<Link href="/user/signout" passHref>
								<DropdownMenuItem>
									<LogOut />
									Log out
								</DropdownMenuItem>
							</Link>
						)}
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
