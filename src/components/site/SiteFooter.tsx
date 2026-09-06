import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { Logo } from "./Logo";
import { P } from "@/lib/paths";
import { emailLink, phoneLink, siteConfig, whatsappLink } from "@/config/site";
import { categories } from "@/data/categories";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t bg-primary text-primary-foreground">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo withText={false} size="lg" className="rounded-sm bg-card p-1 w-fit" />
          <p className="mt-6 max-w-sm font-display text-2xl leading-snug text-primary-foreground/90">
            {siteConfig.tagline}
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/60">
            {siteConfig.description}
          </p>
        </div>

        <div className="lg:col-span-2">
          <p className="eyebrow">Explore</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link to={P.properties} className="text-primary-foreground/75 transition-colors hover:text-primary-foreground">Properties</Link></li>
            <li><Link to={P.developments} className="text-primary-foreground/75 transition-colors hover:text-primary-foreground">Developments</Link></li>
            <li><Link to={P.estates} className="text-primary-foreground/75 transition-colors hover:text-primary-foreground">Estates</Link></li>
            <li><Link to={P.about} className="text-primary-foreground/75 transition-colors hover:text-primary-foreground">About</Link></li>
            <li><Link to={P.team} className="text-primary-foreground/75 transition-colors hover:text-primary-foreground">Team</Link></li>
            <li><Link to={P.community} className="text-primary-foreground/75 transition-colors hover:text-primary-foreground">Community</Link></li>
            <li><Link to={P.login} className="text-primary-foreground/75 transition-colors hover:text-primary-foreground">Client Login</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="eyebrow">Property categories</p>
          <ul className="mt-5 space-y-3 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  to={`${siteConfig.basePath}${c.href}`}
                  search={c.search}
                  className="text-primary-foreground/75 transition-colors hover:text-primary-foreground"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="eyebrow">Contact</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li><a href={phoneLink()} className="text-primary-foreground/75 transition-colors hover:text-primary-foreground">{siteConfig.contact.phone}</a></li>
            <li><a href={emailLink()} className="text-primary-foreground/75 transition-colors hover:text-primary-foreground">{siteConfig.contact.email}</a></li>
            <li className="text-primary-foreground/60">{siteConfig.contact.address}</li>
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary-foreground/75 transition-colors hover:text-primary-foreground">
                <WhatsAppIcon className="size-4" /> WhatsApp
              </a>
            </li>
          </ul>
          <div className="mt-6 flex items-center gap-3">
            {[
              { href: siteConfig.social.facebook, label: "Facebook", Icon: Facebook },
              { href: siteConfig.social.instagram, label: "Instagram", Icon: Instagram },
              { href: siteConfig.social.linkedin, label: "LinkedIn", Icon: Linkedin },
              { href: siteConfig.social.youtube, label: "YouTube", Icon: Youtube },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-primary-foreground/20 text-primary-foreground/70 transition-colors hover:border-gold hover:text-gold"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-primary-foreground/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
          <p>Registered with the PPRA — details to be confirmed.</p>
        </div>
      </div>
      <div className="heritage-rule" aria-hidden="true" />
    </footer>
  );
}
