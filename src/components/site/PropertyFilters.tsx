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

interface Props {
  value: ListingFilters;
  onChange: (next: ListingFilters) => void;
  onReset?: () => void;
  /** Compact hero variant used on the homepage. */
  variant?: "panel" | "bar";
  onSubmit?: () => void;
}

const priceValue = (n?: number | undefined) => (n === undefined ? "" : String(n));
const parsePrice = (raw: string) => {
  const digits = raw.replace(/[^\d]/g, "");
  return digits ? Number.parseInt(digits, 10) : undefined;
};

export function PropertyFilters({ value, onChange, onReset, variant = "panel", onSubmit }: Props) {
  const set = (patch: Partial<ListingFilters>) => onChange({ ...value, ...patch });

  const locationField = (
    <Field label="Location" htmlFor="f-location">
      <Input
        id="f-location"
        placeholder="Suburb, city or province"
        value={value.location}
        onChange={(e) => set({ location: e.target.value })}
        className="h-12 rounded-sm"
      />
    </Field>
  );

  const typeField = (
    <Field label="Property type">
      <Select
        value={value.propertyType || ANY}
        onValueChange={(v) => set({ propertyType: v === ANY ? "" : v })}
      >
        <SelectTrigger className="h-12 rounded-sm">
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
    </Field>
  );

  const bedsField = (
    <Field label="Beds">
      <Select
        value={value.bedrooms ? String(value.bedrooms) : ANY}
        onValueChange={(v) => set({ bedrooms: v === ANY ? undefined : Number(v) })}
      >
        <SelectTrigger className="h-12 rounded-sm">
          <SelectValue placeholder="Any" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ANY}>Any</SelectItem>
          {[1, 2, 3, 4, 5].map((n) => (
            <SelectItem key={n} value={String(n)}>
              {n}+
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );

  const bathsField = (
    <Field label="Baths">
      <Select
        value={value.bathrooms ? String(value.bathrooms) : ANY}
        onValueChange={(v) => set({ bathrooms: v === ANY ? undefined : Number(v) })}
      >
        <SelectTrigger className="h-12 rounded-sm">
          <SelectValue placeholder="Any" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ANY}>Any</SelectItem>
          {[1, 2, 3, 4].map((n) => (
            <SelectItem key={n} value={String(n)}>
              {n}+
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );

  const minPriceField = (
    <Field label="Min price" htmlFor="f-min">
      <Input
        id="f-min"
        inputMode="numeric"
        placeholder="R 0"
        value={priceValue(value.minPrice)}
        onChange={(e) => set({ minPrice: parsePrice(e.target.value) })}
        className="h-12 rounded-sm"
      />
    </Field>
  );

  const maxPriceField = (
    <Field label="Max price" htmlFor="f-max">
      <Input
        id="f-max"
        inputMode="numeric"
        placeholder="No maximum"
        value={priceValue(value.maxPrice)}
        onChange={(e) => set({ maxPrice: parsePrice(e.target.value) })}
        className="h-12 rounded-sm"
      />
    </Field>
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      className="border border-border bg-card p-5 shadow-card sm:p-6"
    >
      {variant === "bar" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.6fr_1.2fr_0.7fr_auto] lg:items-end">
          {locationField}
          {typeField}
          {bedsField}
          <Button type="submit" className="h-12 w-full lg:w-auto lg:px-10">
            Search Properties
          </Button>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {locationField}
            {typeField}
            <div className="grid grid-cols-2 gap-4">
              {minPriceField}
              {maxPriceField}
            </div>
            <div className="grid grid-cols-2 gap-4 sm:col-span-2 sm:max-w-md lg:col-span-1 lg:max-w-none">
              {bedsField}
              {bathsField}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end lg:col-span-2 lg:justify-end">
              <Button type="submit" className="h-12 sm:px-10">
                Search Properties
              </Button>
              {onReset && (
                <Button type="button" variant="outline" className="h-12" onClick={onReset}>
                  Clear
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      {htmlFor ? (
        <label htmlFor={htmlFor} className="eyebrow">
          {label}
        </label>
      ) : (
        <span className="eyebrow">{label}</span>
      )}
      {children}
    </div>
  );
}
