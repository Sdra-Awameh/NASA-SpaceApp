import { PropsWithChildren } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, SunMedium, Github, PanelsTopLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { BrandIcon } from "@/components/icons/BrandIcon";
import { useTheme } from "next-themes";

export function AppLayout({ children }: PropsWithChildren<{}>) {
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const NavLink = ({ to, label }: { to: string; label: string }) => (
    <Link
      to={to}
      className={cn(
        "nav-link",
        location.pathname === to && "nav-link-active"
      )}
    >
      {label}
    </Link>
  );

  return (
    <div id="app-layout" className="app-layout" style={{ position: "relative", overflow: "hidden" }}>
      <header id="main-header" className="main-header">
        <div id="header-container" className="header-container">
          <Link to="/" id="brand-link" className="brand-link">
            <BrandIcon />
            <span id="brand-title" className="brand-title">
              CHRONOCAST
            </span>
          </Link>

          <nav id="main-nav" className="main-nav">
            <NavLink to="/" label="Home" />
            <NavLink to="/dashboard" label="Dashboard" />
            <NavLink to="/about" label="About" />
            <a
              id="github-link"
              className="github-link"
              href="https://github.com/rasha-2k/ChronoCast"
              target="_blank"
              rel="noreferrer"
            >
              <Github className="github-icon h-4 w-4" />
              Star
            </a>
          </nav>

          <div id="header-actions" className="header-actions">
            <button
              id="theme-toggle"
              className="theme-toggle"
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <SunMedium className="theme-icon h-4 w-4" />
              ) : (
                <Moon className="theme-icon h-4 w-4" />
              )}
            </button>
            <div id="menu-toggle" className="menu-toggle">
              <PanelsTopLeft className="menu-icon h-5 w-5" />
            </div>
          </div>
        </div>
      </header>

      <main id="main-content" className="main-content">
        {children}
      </main>

      <footer id="main-footer" className="main-footer">
        <div id="footer-container" className="footer-container">
          <p id="footer-copyright" className="footer-copyright">
            © {new Date().getFullYear()} ChronoCast • NASA Space Apps
          </p>
          <p id="footer-builtwith" className="footer-builtwith">
            Built with React, Tailwind, Recharts
          </p>
        </div>
      </footer>
    </div>
  );
}
