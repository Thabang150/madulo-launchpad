import { useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { ListingFilters } from "@/lib/listings";
import { locationOptions, propertyTypeOptions } from "@/lib/listings";

const ANY = "__any";
const salePrices = [500000, 750000, 1000000, 1500000, 2000000, 2500000, 3000000, 4000000, 5000000, 7500000, 10000000];
const rentPrices = [5000, 7500, 10000, 12500, 15000, 20000, 25000, 30000];

interface Props {
  value: ListingFilters;
  onChange: (next: ListingFilters) => void;
  onReset?: () => void;
  variant?: "panel" | "bar";
  onSubmit?: () => void;
}

const formatPrice = (price: number) => `R${price.toLocaleString("en-ZA")}`;

export function PropertyFilters({ value, onChange, onReset, variant = "panel", onSubmit }: Props) {
  const set = (patch: Partial<ListingFilters>) => onChange({ ...value, ...patch });
  const priceOptions = value.transaction === "rent" ? rentPrices : salePrices;
  const rangeError = value.minPrice !== undefined && value.maxPrice !== undefined && value.minPrice > value.maxPrice;
  const locationId = variant === "bar" ? "homepage-location" : "properties-location";
  const selectValue = (field: keyof ListingFilters) => {
    const current = value[field];
    return current === undefined || current === "" ? ANY : String(current);
  };
  const priceItems = useMemo(
    () => priceOptions.map((price) => <SelectItem key={price} value={String(price)}>{formatPrice(price)}</SelectItem>),
    [priceOptions],
  );

  return (
    <form onSubmit={(event) => { event.preventDefault(); if (!rangeError) onSubmit?.(); }} className="border border-border bg-card p-4 shadow-card sm:p-5">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">I want to</span>
          <div className="inline-grid grid-cols-2 rounded-sm border border-border p-0.5" role="tablist" aria-label="Listing type">
            {(["sale", "rent"] as const).map((transaction) => (
              <button key={transaction} type="button" role="tab" aria-selected={value.transaction === transaction}
                onClick={() => set({ transaction, minPrice: undefined, maxPrice: undefined })}
                className={`h-8 min-w-16 px-3 text-xs font-semibold transition-colors ${value.transaction === transaction ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>
                {transaction === "sale" ? "Buy" : "Rent"}
              </button>
            ))}
          </div>
        </div>

        <Field label="Where?" htmlFor={locationId}>
          <Input id={locationId} list={`${locationId}-options`} placeholder="Search suburb, area or city" value={value.location}
            onChange={(event) => set({ location: event.target.value })} className="h-12 rounded-sm text-base" />
            <datalist id={`${locationId}-options`}>{locationOptions.map((location) => <option key={location} value={location} />)}</datalist>
        </Field>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[1.35fr_repeat(4,minmax(0,0.8fr))_auto]">
          <Field label="Property type">
            <Select value={selectValue("propertyType")} onValueChange={(selected) => set({ propertyType: selected === ANY ? "" : selected })}>
              <SelectTrigger className="h-12 rounded-sm"><SelectValue placeholder="Any property type" /></SelectTrigger>
              <SelectContent><SelectItem value={ANY}>Any property type</SelectItem>{propertyTypeOptions.map((type) => <SelectItem key={type} value={type}>{type}</SelectItem>)}</SelectContent>
            </Select>
          </Field>

          <Field label="Minimum price">
            <Select value={selectValue("minPrice")} onValueChange={(selected) => set({ minPrice: selected === ANY ? undefined : Number(selected) })}>
              <SelectTrigger className="h-12 rounded-sm"><SelectValue placeholder="No minimum" /></SelectTrigger>
              <SelectContent><SelectItem value={ANY}>No minimum</SelectItem>{priceItems}</SelectContent>
            </Select>
          </Field>
          <Field label="Maximum price">
            <Select value={selectValue("maxPrice")} onValueChange={(selected) => set({ maxPrice: selected === ANY ? undefined : Number(selected) })}>
              <SelectTrigger className="h-12 rounded-sm"><SelectValue placeholder="No maximum" /></SelectTrigger>
              <SelectContent><SelectItem value={ANY}>No maximum</SelectItem>{priceItems}</SelectContent>
            </Select>
          </Field>
          <Field label="Beds">
            <Select value={selectValue("bedrooms")} onValueChange={(selected) => set({ bedrooms: selected === ANY ? undefined : Number(selected) })}>
              <SelectTrigger className="h-12 rounded-sm"><SelectValue placeholder="Any" /></SelectTrigger>
              <SelectContent><SelectItem value={ANY}>Any</SelectItem>{[1, 2, 3, 4, 5, 6].map((n) => <SelectItem key={n} value={String(n)}>{n}+</SelectItem>)}</SelectContent>
            </Select>
          </Field>
          <Field label="Baths">
            <Select value={selectValue("bathrooms")} onValueChange={(selected) => set({ bathrooms: selected === ANY ? undefined : Number(selected) })}>
              <SelectTrigger className="h-12 rounded-sm"><SelectValue placeholder="Any" /></SelectTrigger>
              <SelectContent><SelectItem value={ANY}>Any</SelectItem>{[1, 2, 3, 4, 5].map((n) => <SelectItem key={n} value={String(n)}>{n}+</SelectItem>)}</SelectContent>
            </Select>
          </Field>
          <div className="flex items-end">
            <Button type="submit" className="h-12 w-full whitespace-nowrap xl:px-7" disabled={rangeError}>Search Properties</Button>
          </div>
        </div>

        <details className="border-t border-border pt-3">
          <summary className="cursor-pointer text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground">More filters</summary>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <Field label="Parking">
              <Select value={selectValue("parking")} onValueChange={(selected) => set({ parking: selected === ANY ? undefined : Number(selected) })}>
                <SelectTrigger className="h-12 rounded-sm"><SelectValue placeholder="Any" /></SelectTrigger>
                <SelectContent><SelectItem value={ANY}>Any</SelectItem>{[1, 2, 3].map((n) => <SelectItem key={n} value={String(n)}>{n}+</SelectItem>)}</SelectContent>
              </Select>
            </Field>
            <Field label="Minimum size (m²)" htmlFor={`${locationId}-min-size`}>
              <Input id={`${locationId}-min-size`} type="number" min="1" placeholder="No minimum" value={value.minSize ?? ""} onChange={(event) => set({ minSize: event.target.value ? Number(event.target.value) : undefined })} className="h-12 rounded-sm" />
            </Field>
            <Field label="Maximum size (m²)" htmlFor={`${locationId}-max-size`}>
              <Input id={`${locationId}-max-size`} type="number" min="1" placeholder="No maximum" value={value.maxSize ?? ""} onChange={(event) => set({ maxSize: event.target.value ? Number(event.target.value) : undefined })} className="h-12 rounded-sm" />
            </Field>
          </div>
        </details>

        {rangeError && <p className="text-sm text-destructive" role="alert">Minimum price must be less than or equal to maximum price.</p>}
        <div className="flex flex-col gap-3 border-t border-border pt-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">Search by area, type and budget.</p>
          <div className="flex gap-3">
            {onReset && <Button type="button" variant="ghost" className="h-10 px-3 text-xs" onClick={onReset}>Clear filters</Button>}
          </div>
        </div>
      </div>
    </form>
  );
}

function Field({ label, htmlFor, className = "", children }: { label: string; htmlFor?: string; className?: string; children: React.ReactNode }) {
  return <div className={`flex min-w-0 flex-col gap-2 ${className}`}>{htmlFor ? <label htmlFor={htmlFor} className="eyebrow">{label}</label> : <span className="eyebrow">{label}</span>}{children}</div>;
}