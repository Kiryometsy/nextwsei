// components/Navbar.tsx
import { SidebarTrigger } from "@/components/ui/sidebar";

interface NavbarProps {
	className?: string; // Accept className as an optional prop
}

export default function Navbar({ className }: NavbarProps) {
	return (
		<header
			className={`${className} flex items-center justify-between h-16 px-4 bg-muted/10 shadow-sm`}
		>
			<div className="flex items-center gap-4">
				<SidebarTrigger />
				<span className="text-lg font-semibold">My App</span>
			</div>
			<div className="hidden sm:block">
				{/* Placeholder for additional navbar items, e.g., search, profile */}
			</div>
		</header>
	);
}
