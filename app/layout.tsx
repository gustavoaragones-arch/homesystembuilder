import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { OrganizationSchema } from "@/components/legal/OrganizationSchema";

export const metadata: Metadata = {
  title: "HomeSystemBuilder — Personalized Household Routines & Printable Planners",
  description:
    "Generate personalized household routines and printable planners for your family. Cleaning schedules, chore charts, and kids routines tailored to your home.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <OrganizationSchema />
        <Navigation />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
