import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { ListingFilters } from "@/lib/listings";
import { propertyTypeOptions } from "@/lib/listings";

const ANY = "__any";

const priceBands = [
  { label: "Any price", min: undefined, max: undefined },
  { label: "Up to R 750 000", min: undefined, max: 750000 },
  { label: "R 750 000 – R 1 500 000", min: 750000, max: 1500000 },
  { label: "R 1 500 000 – R 3 000 000", min: 1500000, max: 3000000 },
  { label: "R 3 000 000 +", min: 3000000, max: undefined },
];

interface Props {
  value: ListingFilters;
  onChange: (next: ListingFilters) => void;
  onReset?: () => void;
  /** Compact hero variant used on the homepage. */
  variant?: "panel" | "bar";
  onSubmit?: () => void;
}

export function PropertyFilters({ value, onChange, onReset, variant = "panel", onSubmit }: Props) {
  const set = (patch: Partial<ListingFilters>) => onChange({ ...value, ...patch });

  const bandLabel =
    priceBands.find((b) => b.min === value.minPrice && b.max === value.maxPrice)?.label ?? priceBands[0]!.label;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      className={
        variant === "bar"
          ? "grid gap-3 border border-border bg-card p-4 shadow-card sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_auto]"
          : "grid gap-4 border border-border bg-card p-5 shadow-card sm:grid-cols-2 lg:grid-cols-3"
      }
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="location" className="eyebrow">
          Location
        </label>
        <Input
          id="location"
          placeholder="Suburb, city or province"
          value={value.location}
          onChange={(e) => set({ location: e.target.value })}
          className="h-11 rounded-sm"
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="eyebrow">Property type</span>
        <Select
          value={value.propertyType || ANY}
          onValueChange={(v) => set({ propertyType: v === ANY ? "" : v })}
        >
          <SelectTrigger className="h-11 rounded-sm">
            <SelectValue placeholder="Any type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ANY}>Any type</SelectItem>
            {propertyTypeOptions.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <span className="eyebrow">Buy or rent</span>
        <Select
          value={value.transaction}
          onValueChange={(v) => set({ transaction: v as ListingFilters["transaction"] })}
        >
          <SelectTrigger className="h-11 rounded-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All listings</SelectItem>
            <SelectItem value="sale">Buy</SelectItem>
            <SelectItem value="rent">Rent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {variant === "panel" && (
        <>
          <div className="flex flex-col gap-2">
            <span className="eyebrow">Price</span>
            <Select
              value={bandLabel}
              onValueChange={(label) => {
                const band = priceBands.find((b) => b.label === label)!;
                set({ minPrice: band.min, maxPrice: band.max });
              }}
            >
              <SelectTrigger className="h-11 rounded-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {priceBands.map((b) => (
                  <SelectItem key={b.label} value={b.label}>
                    {b.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <span className="eyebrow">Bedrooms</span>
            <Select
              value={value.bedrooms ? String(value.bedrooms) : ANY}
              onValueChange={(v) => set({ bedrooms: v === ANY ? undefined : Number(v) })}
            >
              <SelectTrigger className="h-11 rounded-sm">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ANY}>Any</SelectItem>
                {[1, 2, 3, 4, 5].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n}+ bedrooms
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <span className="eyebrow">Bathrooms</span>
            <Select
              value={value.bathrooms ? String(value.bathrooms) : ANY}
              onValueChange={(v) => set({ bathrooms: v === ANY ? undefined : Number(v) })}
            >
              <SelectTrigger className="h-11 rounded-sm">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ANY}>Any</SelectItem>
                {[1, 2, 3, 4].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n}+ bathrooms
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end gap-3">
            <Button type="submit" className="h-11 flex-1">
              Search Properties
            </Button>
            {onReset && (
              <Button type="button" variant="ghost" className="h-11" onClick={onReset}>
                Clear
              </Button>
            )}
          </div>
        </>
      )}

      {variant === "bar" && (
        <div className="flex items-end">
          <Button type="submit" className="h-11 w-full lg:w-auto lg:px-8">
            Search Properties
          </Button>
        </div>
      )}
    </form>
  );
}
