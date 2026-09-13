type SocialPlatform = "facebook" | "tiktok";

export function SocialIcon({ platform, className }: { platform: SocialPlatform; className?: string }) {
  if (platform === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className} fill="currentColor">
        <path d="M13.5 21v-8h2.75l.4-3h-3.15V8.08c0-.87.24-1.46 1.5-1.46h1.8V3.94c-.31-.04-1.37-.14-2.6-.14-2.57 0-4.33 1.57-4.33 4.46V10H7.1v3h2.77v8h3.63Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className} fill="currentColor">
      <path d="M14.2 3c.17 1.48 1 2.38 2.43 2.48v2.4a6.04 6.04 0 0 1-2.4-.55v5.1c0 3.97-4.33 5.2-6.8 2.96-1.58-1.43-1.72-4.72.77-6.04.7-.37 1.5-.53 2.36-.34v2.48c-1.82-.56-2.35 1.34-1.46 2.2 1.27 1.22 3.03.1 3.03-1.37V3h2.07Z" />
    </svg>
  );
}