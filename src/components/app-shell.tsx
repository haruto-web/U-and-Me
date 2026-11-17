"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { signOut } from "@/app/actions";

const navigation = [
  { href: "/", label: "Home", icon: "⌂" },
  { href: "/memories", label: "Our memories", icon: "♡" },
  { href: "/letters", label: "Letters", icon: "✉" },
  { href: "/garden", label: "The garden", icon: "✿" },
  { href: "/surprises", label: "Little surprises", icon: "✧" },
  { href: "/special", label: "Our story", icon: "∞" },
  { href: "/photobooth", label: "Photobooth", icon: "▣", soon: true },
];

const pageTitles: Record<string, string> = {
  "/": "Home",
  "/memories": "Our memories",
  "/memories/new": "Add a memory",
  "/letters": "Letters",
  "/letters/new": "Write a letter",
  "/garden": "The garden",
  "/surprises": "Little surprises",
  "/special": "Our story",
  "/photobooth": "Photobooth",
  "/admin": "Admin corner",
};

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? "A Little World";

  if (pathname === "/login") {
    return children;
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="brand" href="/" aria-label="A Little World home">
          <span className="brand-mark" aria-hidden="true">u&amp;e</span>
          <span className="brand-copy">
            <strong>A little world</strong>
            <small>made by us, for us</small>
          </span>
        </Link>

        <div className="space-label">YOUR SHARED SPACE</div>
        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                className={`nav-link${active ? " active" : ""}`}
                href={item.href}
                key={item.href}
                aria-current={active ? "page" : undefined}
              >
                <span className="nav-icon" aria-hidden="true">{item.icon}</span>
                <span>{item.label}</span>
                {item.soon && <span className="nav-soon">SOON</span>}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="members-card">
            <div className="member-avatars" aria-hidden="true">
              <span className="avatar avatar-you">Y</span>
              <span className="avatar avatar-eunice">E</span>
            </div>
            <div>
              <strong>You & Eunice</strong>
              <small>your little world</small>
            </div>
            <span className="private-dot" title="Private shared space" />
          </div>
          <Link
            className={`admin-link${pathname === "/admin" ? " active" : ""}`}
            href="/admin"
          >
            <span aria-hidden="true">⚙</span>
            Admin corner
          </Link>
          <form action={signOut}>
            <button className="sign-out-button" type="submit">Sign out</button>
          </form>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div>
            <h1>{title}</h1>
          </div>
          <div className="topbar-right">
            <span className="preview-badge"><span /> Private · local</span>
            <div className="topbar-avatars" aria-label="You and Eunice">
              <span className="avatar avatar-you">Y</span>
              <span className="avatar avatar-eunice">E</span>
            </div>
          </div>
        </header>
        <div className="page-content">{children}</div>
        <footer className="site-footer">
          <span>Small moments, kept close.</span>
          <span>Made with love <span aria-hidden="true">♡</span></span>
        </footer>
      </main>
    </div>
  );
}
