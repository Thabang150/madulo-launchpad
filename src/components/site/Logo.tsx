import { Link } from "@tanstack/react-router";
import logo from "@/assets/madulo-logo.jpg";
import { siteConfig } from "@/config/site";
import { P } from "@/lib/paths";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** Where the logo links to. Defaults to the site home. */
  to?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  withText?: boolean;
}

const sizes = { sm: "h-10 w-10", md: "h-12 w-12", lg: "h-14 w-14" };

export function Logo({ to = P.home, size = "md", className, withText = true }: LogoProps) {
  return (
    <Link to={to} aria-label={`${siteConfig.name} — home`} className={cn("flex items-center gap-3", className)}>
      <img
        src={logo}
        alt={`${siteConfig.name} logo`}
        width={96}
        height={96}
        className={cn("shrink-0 rounded-sm object-contain", sizes[size])}
      />
      {withText && (
        <span className="hidden flex-col leading-none sm:flex">
          <span className="text-[15px] font-semibold tracking-[0.18em] text-foreground">MADULO</span>
          <span className="mt-1 text-[9px] font-medium tracking-[0.34em] text-muted-foreground">PROPERTIES</span>
        </span>
      )}
    </Link>
  );
}

export { logo as logoSrc };
