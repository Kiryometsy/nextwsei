"use client";

import * as React from "react";
import { GalleryVerticalEnd } from "lucide-react";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link"; // Import Link from next/link

export function TeamSwitcher() {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton size="lg" asChild>
					<Link href="/">
						{" "}
						{/* Replace the <a> tag with <Link> */}
						<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
							<GalleryVerticalEnd className="size-4" />
						</div>
						<div className="flex flex-col gap-0.5 leading-none">
							<span className="font-semibold">NextWsei</span>
							<span className="">v1.0.0</span>
						</div>
					</Link>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
