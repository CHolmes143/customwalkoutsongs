"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppHeader() {
  const pathname = usePathname();
  const isPublicPage = pathname === "/" || pathname === "/samples" || pathname === "/order";

  return (
    <header className={isPublicPage ? "topbar public-topbar" : "topbar"}>
      <Link className="brand" href={isPublicPage ? "/" : "/teams"}>
        CustomWalkoutSong.com
      </Link>
      {!isPublicPage ? (
        <nav className="nav">
          <Link href="/teams">Teams</Link>
          <Link href="/deliveries">Deliveries</Link>
        </nav>
      ) : null}
    </header>
  );
}
