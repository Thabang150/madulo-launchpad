import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig, whatsappLink, phoneLink, emailLink } from "@/config/site";

const title = "Contact Madulo Properties — Enquire or Request a Viewing";
const description =
  "Contact Madulo Properties by WhatsApp, phone or email. Send a property enquiry, request a viewing or speak to our team.";

export const Route = createFileRoute("/preview/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const enquiryTypes = [
  "General enquiry",
  "Property enquiry",
  "Request a viewing",
  "Development enquiry",
  "Seller / landlord enquiry",
];

function ContactPage() {
  const [type, setType] = useState(enquiryTypes[0]);
  const [sent, setSent] = useState(false);

  return (
    <>
      <section className="border-b border-border bg-card">
        <div className="container-site py-14 lg:py-16">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-3 max-w-2xl text-4xl leading-tight text-foreground lg:text-5xl">
            Speak to Madulo Properties
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            WhatsApp us, call the office, or send the form below and we will come back to you.
          </p>
        </div>
      </section>

      <section className="container-site grid gap-8 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
        <div className="border border-border bg-card p-6 shadow-card sm:p-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">Send an enquiry</h2>

          <div className="mt-6 flex flex-wrap gap-2">
            {enquiryTypes.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={
                  t === type
                    ? "border border-foreground bg-foreground px-3 py-2 text-xs text-background"
                    : "border border-border px-3 py-2 text-xs text-muted-foreground transition-colors duration-300 ease-premium hover:text-foreground"
                }
              >
                {t}
              </button>
            ))}
          </div>

          <form
            className="mt-8 grid gap-5 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="eyebrow">
                Full name
              </label>
              <Input id="name" required className="h-12 rounded-sm" placeholder="Your name" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="eyebrow">
                Phone
              </label>
              <Input id="phone" className="h-12 rounded-sm" placeholder="Contact number" />
            </div>
            <div className="flex flex-col gap-2 sm:col-span-2">
              <label htmlFor="email" className="eyebrow">
                Email
              </label>
              <Input id="email" type="email" required className="h-12 rounded-sm" placeholder="you@example.com" />
            </div>
            <div className="flex flex-col gap-2 sm:col-span-2">
              <label htmlFor="message" className="eyebrow">
                Message
              </label>
              <Textarea id="message" rows={5} className="rounded-sm" placeholder={`${type} — tell us what you need.`} />
            </div>
            <div className="sm:col-span-2">
              <Button type="submit">Send enquiry</Button>
              {sent && (
                <p className="mt-4 text-xs text-muted-foreground" role="status">
                  Thank you for getting in touch. For an immediate response, please WhatsApp or call us.
                </p>
              )}
            </div>
          </form>
        </div>

        <div className="flex flex-col gap-6">
          <div className="border border-foreground/10 bg-foreground p-6 text-background shadow-card sm:p-8">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-background/70">Talk to us now</h2>
            <div className="mt-6 flex flex-col gap-3">
              <Button asChild variant="secondary">
                <a href={whatsappLink()}>WhatsApp us</a>
              </Button>
              <Button asChild variant="outline" className="border-background/40 text-background hover:bg-background/10">
                <a href={phoneLink()}>Call {siteConfig.contact.phone}</a>
              </Button>
              <Button asChild variant="outline" className="border-background/40 text-background hover:bg-background/10">
                <a href={emailLink("Enquiry via maduloproperties.co.za")}>Email us</a>
              </Button>
            </div>
          </div>

          <div className="border border-border bg-card p-6 sm:p-8">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">Office</h2>
            <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{siteConfig.contact.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <a href={phoneLink()}>{siteConfig.contact.phone}</a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <a href={emailLink()}>{siteConfig.contact.email}</a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{siteConfig.contact.hours}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
