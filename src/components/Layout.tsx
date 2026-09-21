import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { event } from "../site";

const links = [
  { to: "/", label: "Welcome", end: true },
  { to: "/agenda", label: "Weekend agenda" },
  { to: "/travel", label: "Travel & stay" },
  { to: "/costs", label: "Cost breakdown" },
  { to: "/girls", label: "the girlsssss" },
  { to: "/planning", label: "Planning", lock: true },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="shell">
      <header className="mast">
        <div className="mast-mark">
          <span className="script">{event.title}</span>
          <span className="mast-meta">
            {event.place}
            <span className="dot">·</span>
            {event.dates}
          </span>
        </div>
        <nav className="nav" aria-label="Main">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? "nav-link on" : "nav-link")}
            >
              {link.label}
              {link.lock ? <span className="lock" aria-hidden="true" /> : null}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="page">{children}</main>
      <footer className="colophon">
        <p>Private — don't share.</p>
      </footer>
    </div>
  );
}
