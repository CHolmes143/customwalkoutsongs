import type { Metadata } from "next";
import { AppHeader } from "@/components/AppHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "Custom Walkout Song",
  description: "Internal dashboard for youth baseball walkout song production.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="shell">
          <AppHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
