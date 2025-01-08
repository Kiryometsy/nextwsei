"use client";

import {
	Folder,
	Forward,
	MoreHorizontal,
	Trash2,
	type LucideIcon,
} from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useState } from "react";

export function NavProjects({
	projects,
}: {
	projects: {
		author: string;
		name: string;
		url: string;
		icon: LucideIcon;
	}[];
}) {
	const { isMobile } = useSidebar();
	const [copied, setCopied] = useState(false);

	// Handle copying the project link
	const handleCopyLink = (url: string) => {
		navigator.clipboard.writeText(url).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000); // Hide after 2 seconds
		});
	};

	return (
		<SidebarGroup className="group-data-[collapsible=icon]:hidden">
			<SidebarGroupLabel>Projects</SidebarGroupLabel>
			<SidebarMenu>
				{projects.map((item) => (
					<SidebarMenuItem key={item.name}>
						<SidebarMenuButton asChild>
							<a href={item.author}>
								<item.icon />
								<span>{item.name}</span>
							</a>
						</SidebarMenuButton>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuAction showOnHover>
									<MoreHorizontal />
									<span className="sr-only">More</span>
								</SidebarMenuAction>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="w-48 rounded-lg"
								side={isMobile ? "bottom" : "right"}
								align={isMobile ? "end" : "start"}
							>
								<Link href={item.url} passHref>
									<DropdownMenuItem>
										<Folder className="text-muted-foreground" />
										<span>View Project</span>
									</DropdownMenuItem>
								</Link>
								<DropdownMenuItem onClick={() => handleCopyLink(item.url)}>
									<Forward className="text-muted-foreground" />
									<span>Copy Project Link</span>
								</DropdownMenuItem>
								{copied && (
									<div className="absolute top-0 right-0 p-2 bg-green-500 text-white rounded-md">
										Link copied!
									</div>
								)}
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<Trash2 className="text-muted-foreground" />
									<span>Delete Project</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				))}
				<SidebarMenuItem>
					<Link href="https://github.com/Kiryometsy?tab=repositories">
						<SidebarMenuButton className="text-sidebar-foreground/70">
							<MoreHorizontal className="text-sidebar-foreground/70" />
							<span>More</span>
						</SidebarMenuButton>
					</Link>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarGroup>
	);
}
