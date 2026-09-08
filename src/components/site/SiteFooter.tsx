import { Link } from "@tanstack/react-router";
import { siteConfig, emailLink, phoneLink } from "@/config/site";
import { P } from "@/lib/paths";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Properties", to: P.properties },
      { label: "Developments", to: P.developments },
      { label: "Estates", to: P.estates },
      { label: "Calculators", to: P.calculators },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: P.about },
      { label: "Team", to: P.team },
      { label: "Community", to: P.community },
      { label: "Contact", to: P.contact },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-card">
      <div className="container-site grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="text-[15px] font-semibold tracking-[0.18em] text-foreground">MADULO</p>
          <p className="mt-1 text-[9px] font-medium tracking-[0.34em] text-muted-foreground">PROPERTIES</p>
          <div className="heritage-rule mt-5 w-24" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">{siteConfig.tagline}</p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h2 className="eyebrow">{col.title}</h2>
            <ul className="mt-5 space-y-3">
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>{siteConfig.contact.address}</p>
          <p className="flex gap-4">
            <a href={phoneLink()} className="hover:text-foreground">
              {siteConfig.contact.phone}
            </a>
            <a href={emailLink()} className="hover:text-foreground">
              {siteConfig.contact.email}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
