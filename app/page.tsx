import type { Metadata } from "next"
import ClientHomePage from "./client-page"

// Generate metadata for SEO
export const metadata: Metadata = {
  title: "SUKOON - Premium Workspace Solutions for Professionals",
  description:
    "Discover premium coworking spaces designed for freelancers, students, and professionals. Flexible memberships, modern amenities, and vibrant community at SUKOON.",
  keywords: ["coworking space", "workspace", "freelancer", "office rental", "business center", "SUKOON"],
}

export default function HomePage() {
  return <ClientHomePage />
}
