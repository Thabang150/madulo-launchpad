import { createFileRoute, redirect } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import logo from "@/assets/madulo-logo.jpg";
import { CountdownTimer } from "@/components/site/CountdownTimer";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { emailLink, phoneLink, siteConfig, whatsappLink } from "@/config/site";
import { P } from "@/lib/paths";

const title = "Madulo Properties — Something New Is Coming";
const description =
  "We're building a new digital home for Madulo Properties. Launching 14 September 2026.";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    if (siteConfig.isLaunched) throw redirect({ to: P.home });
  },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: ComingSoon,
});

function ComingSoon() {
  return (
    <main className="coming-soon relative flex min-h-dvh flex-col overflow-hidden bg-background text-foreground">
      {/* heritage hairline — echoes the mark */}
      <div className="heritage-rule absolute inset-x-0 top-0" aria-hidden="true" />

      <div className="coming-soon-line coming-soon-line-left" aria-hidden="true" />
      <div className="coming-soon-line coming-soon-line-right" aria-hidden="true" />

      <div className="container-site relative z-10 flex flex-1 flex-col items-center justify-center py-10 text-center sm:py-14">
        <div className="animate-rise">
          <div className="logo-breathe mx-auto flex h-40 w-40 items-center justify-center sm:h-48 sm:w-48">
            <img
              src={logo}
              alt="Madulo Properties logo"
              width={220}
              height={220}
              className="h-full w-full object-contain mix-blend-multiply"
            />
          </div>

          <p className="eyebrow mt-7">Launching soon</p>
          <h1 className="mt-4 font-display text-4xl leading-[1.08] sm:text-5xl md:text-6xl">
            Something New
            <br />
            Is Coming.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            We're building a new digital home for Madulo Properties — designed to make
            discovering property and connecting with our team easier.
          </p>
        </div>

        <div className="animate-rise delay-120 mt-9 w-full max-w-2xl">
          <CountdownTimer dark={false} />
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
            Launching 14 September 2026
          </p>
        </div>

        <div
          className="animate-rise delay-240 mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Button asChild size="lg">
            <a href={emailLink("Enquiry — Madulo Properties")}>
              Get in touch
              <ArrowRight />
            </a>
          </Button>
          <Button asChild size="lg" variant="whatsapp">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-4" />
              WhatsApp us
            </a>
          </Button>
        </div>

        <div className="animate-rise delay-360 mt-8 flex max-w-2xl flex-col items-center gap-3 text-xs text-muted-foreground sm:flex-row sm:gap-5">
          <a href={phoneLink()} className="transition-colors hover:text-foreground">
            {siteConfig.contact.phone}
          </a>
          <span aria-hidden="true" className="hidden h-3 w-px bg-border sm:block" />
          <a href={emailLink()} className="transition-colors hover:text-foreground">
            {siteConfig.contact.email}
          </a>
          <span aria-hidden="true" className="hidden h-3 w-px bg-border sm:block" />
          <span>{siteConfig.contact.hours}</span>
        </div>

        <p className="animate-rise delay-360 mt-4 flex max-w-xl items-start justify-center gap-2 text-xs leading-relaxed text-muted-foreground">
          <MapPin className="mt-0.5 size-3.5 shrink-0 text-gold" aria-hidden="true" />
          <span>{siteConfig.contact.address}</span>
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-between gap-2 px-5 pb-6 text-center text-[10px] uppercase tracking-[0.24em] text-muted-foreground sm:flex-row sm:px-10">
        <span>{siteConfig.tagline}</span>
        <span>{siteConfig.domain}</span>
      </div>
    </main>
  );
}
