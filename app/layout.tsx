import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "SurfSync AI Assistant", description: "Business assistant for SurfSync Infotech" };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
