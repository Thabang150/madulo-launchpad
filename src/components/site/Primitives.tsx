import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { P } from "@/lib/paths";
import { whatsappLink } from "@/config/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

/* ---------- Scroll reveal ---------- */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "li";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} data-visible={visible} className={cn("reveal", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

/* ---------- Section heading ---------- */
export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: { label: string; to: string };
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="mt-3 text-3xl leading-tight md:text-4xl">{title}</h2>
        {description && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>}
      </div>
      {action && (
        <Button asChild variant="link" className="group shrink-0 gap-2 text-sm">
          <Link to={action.to}>
            {action.label}
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>
      )}
    </div>
  );
}

/* ---------- Page hero ---------- */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <section className={cn("border-b", tone === "dark" ? "bg-primary text-primary-foreground" : "bg-secondary/60")}>
      <div className="container-site py-16 md:py-24">
        <div className="max-w-3xl animate-rise">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="mt-4 text-4xl leading-[1.05] md:text-6xl">{title}</h1>
          {description && (
            <p className={cn("mt-6 max-w-2xl text-base leading-relaxed md:text-lg", tone === "dark" ? "text-primary-foreground/70" : "text-muted-foreground")}>
              {description}
            </p>
          )}
        </div>
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}

/* ---------- Conversion band ---------- */
export function CtaBand({
  title = "Ready to talk property?",
  description = "Tell us what you're looking for and a member of the Madulo Properties team will be in touch.",
  whatsappMessage,
}: {
  title?: string;
  description?: string;
  whatsappMessage?: string;
}) {
  return (
    <section className="container-site mt-24">
      <div className="relative overflow-hidden rounded-sm bg-primary px-8 py-14 text-primary-foreground md:px-16 md:py-20">
        <div className="heritage-rule absolute inset-x-0 top-0" aria-hidden="true" />
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow">Enquire</p>
            <h2 className="mt-3 text-3xl md:text-4xl">{title}</h2>
            <p className="mt-4 max-w-md text-primary-foreground/70">{description}</p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Button asChild size="lg" variant="gold">
              <Link to={P.contact}>Send an enquiry</Link>
            </Button>
            <Button asChild size="lg" variant="outline-light">
              <a href={whatsappLink(whatsappMessage)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="size-4" />
                WhatsApp us
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Placeholder notice (visible reminder that content is mock) ---------- */
export function PlaceholderNote({ children }: { children: ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-sm border border-dashed border-gold/60 bg-gold/5 px-3 py-1.5 text-xs text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
      {children}
    </p>
  );
}

/* ---------- Stat / spec ---------- */
export function Spec({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="border-l border-border pl-4">
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <p className="mt-1 text-base font-medium text-foreground">{value}</p>
    </div>
  );
}
