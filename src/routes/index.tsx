import { createFileRoute, redirect } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
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
    ],
  }),
  component: ComingSoon,
});

function ComingSoon() {
  return (
    <main className="relative flex min-h-dvh flex-col bg-primary text-primary-foreground">
      {/* heritage hairline — echoes the mark */}
      <div className="heritage-rule absolute inset-x-0 top-0" aria-hidden="true" />

      {/* quiet grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="container-site relative z-10 flex flex-1 flex-col items-center justify-center py-16 text-center">
        <div className="animate-rise">
          <img
            src={logo}
            alt="Madulo Properties logo"
            width={220}
            height={220}
            className="mx-auto h-36 w-36 rounded-sm object-contain md:h-44 md:w-44"
          />

          <p className="eyebrow mt-10">Madulo Properties</p>
          <h1 className="mt-4 font-display text-4xl leading-[1.08] sm:text-5xl md:text-6xl">
            Something New
            <br />
            Is Coming.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/70">
            We're building a new digital home for Madulo Properties — designed to make
            discovering property and connecting with our team easier.
          </p>
        </div>

        <div className="animate-rise mt-12 w-full max-w-2xl" style={{ animationDelay: "120ms" }}>
          <CountdownTimer />
          <p className="mt-5 text-xs font-medium uppercase tracking-[0.24em] text-primary-foreground/50">
            Launching 14 September 2026
          </p>
        </div>

        <div
          className="animate-rise mt-12 flex flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: "240ms" }}
        >
          <Button asChild size="lg" variant="gold">
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

        <p className="mt-10 text-sm text-primary-foreground/50">
          <a href={phoneLink()} className="transition-colors hover:text-primary-foreground">
            {siteConfig.contact.phone}
          </a>
          <span aria-hidden="true" className="mx-3">
            ·
          </span>
          <a href={emailLink()} className="transition-colors hover:text-primary-foreground">
            {siteConfig.contact.email}
          </a>
        </p>
      </div>

      <p className="relative z-10 pb-6 text-center text-[11px] uppercase tracking-[0.3em] text-primary-foreground/40">
        {siteConfig.tagline}
      </p>
    </main>
  );
}
