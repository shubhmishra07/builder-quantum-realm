import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, ScanLine, Sprout, CloudSun, MapPin, MessageCircle, IndianRupee } from "lucide-react";
import { useState } from "react";

const nav = [
  { to: "/scan", label: "Scan & Analyze", icon: ScanLine },
  { to: "/advisory", label: "Crop Advisory", icon: CloudSun },
  { to: "/mandi", label: "Mandi Prices", icon: IndianRupee },
  { to: "/storage", label: "Storage Tips", icon: Sprout },
  { to: "/chat", label: "Chatbot", icon: MessageCircle },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-3 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 grid place-items-center shadow-sm">
            <Sprout className="h-5 w-5 text-white" />
          </div>
          <div className="leading-tight">
            <p className="font-extrabold tracking-tight text-xl text-green-700">Kisan AI</p>
            <p className="text-xs text-muted-foreground -mt-0.5">Assistant for Farmers</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive ? "bg-green-600 text-white" : "text-foreground hover:bg-green-100"
                }`
              }
            >
              <n.icon className="h-4 w-4" /> {n.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-muted"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t bg-background">
          <div className="container grid gap-2 px-4 py-3">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-2 ${
                    isActive || location.pathname.startsWith(n.to)
                      ? "bg-green-600 text-white"
                      : "hover:bg-green-100"
                  }`
                }
              >
                <n.icon className="h-5 w-5" /> {n.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
