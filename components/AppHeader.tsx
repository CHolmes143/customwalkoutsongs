"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppHeader() {
  const pathname = usePathname();
  const isPublicPage = pathname === "/" || pathname === "/samples";
  const isPublicHome = pathname === "/";

  return (
    <header className={isPublicPage ? "topbar public-topbar" : "topbar"}>
      <Link className="brand" href={isPublicPage ? "/" : "/teams"}>
        Custom Walkout Song
      </Link>
      {isPublicHome ? (
        <nav className="nav">
          <a href="#samples">Samples</a>
          <a href="#order">Order</a>
        </nav>
      ) : isPublicPage ? (
        <nav className="nav">
          <Link href="/">Home</Link>
        </nav>
      ) : (
        <nav className="nav">
          <Link href="/teams">Teams</Link>
          <Link href="/deliveries">Deliveries</Link>
        </nav>
      )}
    </header>
  );
}
