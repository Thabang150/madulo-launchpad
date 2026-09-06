import { whatsappLink } from "@/config/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

/** Floating WhatsApp button — fixed bottom-right, visible on every page. */
export function WhatsAppButton({ message }: { message?: string }) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-float transition-transform duration-300 ease-premium hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:bottom-7 md:right-7"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <WhatsAppIcon className="h-8 w-8" />
    </a>
  );
}
