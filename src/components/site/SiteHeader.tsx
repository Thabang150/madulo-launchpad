import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { P } from "@/lib/paths";

const nav = [
  { label: "Home", to: P.home },
  { label: "Properties", to: P.properties },
  { label: "Developments", to: P.developments },
  { label: "Estates", to: P.estates },
  { label: "About", to: P.about },
  { label: "Team", to: P.team },
  { label: "Community", to: P.community },
  { label: "Calculators", to: P.calculators },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="container-site flex h-20 items-center justify-between gap-6">
        <Logo size="sm" />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === P.home }}
              className="nav-underline text-[13px] font-medium tracking-wide text-muted-foreground transition-colors duration-300 ease-premium hover:text-foreground data-[status=active]:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild variant="ghost" size="sm">
            <Link to={P.contact}>Contact</Link>
          </Button>
          <Button asChild size="sm">
            <Link to={P.contact}>Enquire</Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-border text-foreground lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container-site flex flex-col py-3" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: item.to === P.home }}
                className="border-b border-border/60 py-3 text-sm text-muted-foreground data-[status=active]:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-3 py-4">
              <Button asChild variant="outline" className="flex-1" onClick={() => setOpen(false)}>
                <Link to={P.contact}>Contact</Link>
              </Button>
              <Button asChild className="flex-1" onClick={() => setOpen(false)}>
                <Link to={P.contact}>Enquire</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
