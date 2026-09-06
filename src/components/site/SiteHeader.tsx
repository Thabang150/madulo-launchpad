import { Link } from "@tanstack/react-router";
import { Menu, Phone, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { P } from "@/lib/paths";
import { phoneLink, siteConfig, whatsappLink } from "@/config/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

export const navItems = [
  { label: "Properties", to: P.properties },
  { label: "Developments", to: P.developments },
  { label: "Estates", to: P.estates },
  { label: "About", to: P.about },
  { label: "Team", to: P.team },
  { label: "Community", to: P.community },
  { label: "Contact", to: P.contact },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-background/95 backdrop-blur-sm transition-[box-shadow,border-color] duration-300 ${
        scrolled ? "border-border shadow-card" : "border-transparent"
      }`}
    >
      <div className="heritage-rule" aria-hidden="true" />
      <div className="container-site flex h-[72px] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: false }}
              className="nav-underline text-[13.5px] font-medium tracking-wide text-foreground/80 transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="ghost" size="sm">
            <Link to={P.login}>
              <UserRound />
              Client Login
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link to={P.contact}>Enquire</Link>
          </Button>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <Button asChild variant="ghost" size="icon" aria-label="Call us">
            <a href={phoneLink()}>
              <Phone />
            </a>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="size-5!" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-[88vw] max-w-sm flex-col gap-0 p-0">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="border-b px-6 py-5">
                <Logo to={P.home} size="sm" />
              </div>
              <nav aria-label="Mobile" className="flex flex-col px-6 py-4">
                {navItems.map((item, i) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="animate-rise border-b border-border/70 py-4 font-display text-2xl text-foreground last:border-0"
                    style={{ animationDelay: `${i * 40}ms` }}
                    activeProps={{ className: "text-gold" }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto space-y-3 border-t px-6 py-6">
                <Button asChild className="w-full" onClick={() => setOpen(false)}>
                  <Link to={P.contact}>Enquire</Link>
                </Button>
                <Button asChild variant="whatsapp" className="w-full">
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon className="size-4" />
                    WhatsApp us
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full" onClick={() => setOpen(false)}>
                  <Link to={P.login}>
                    <UserRound />
                    Client Login
                  </Link>
                </Button>
                <p className="pt-2 text-center text-xs text-muted-foreground">{siteConfig.tagline}</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
