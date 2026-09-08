import React, { useState, useMemo } from 'react';
import { listings, Listing } from '../../data/listings';
import Link from 'next/link';

const parsePrice = (price: string) => Number(price.replace(/[^0-9]/g, '')) || 0;
const getTransactionType = (l: Listing) => (l.listingUrl.includes('/to-rent/') ? 'Rent' : 'Buy');

const parseLocation = (l: Listing) => {
  try {
    const url = new URL(l.listingUrl);
    const parts = url.pathname.split('/').filter(Boolean);
    // find 'for-sale' or 'to-rent' then take next segment as area
    const idx = parts.findIndex(p => p === 'for-sale' || p === 'to-rent');
    if (idx >= 0 && parts.length > idx + 1) return decodeURIComponent(parts[idx + 1]).replace(/-/g, ' ');
    return '';
  } catch (e) {
    return '';
  }
};

const formatNumber = (n: number) => n.toLocaleString();

export default function PropertiesPage() {
  const [transaction, setTransaction] = useState<'All' | 'Buy' | 'Rent'>('All');
  const [type, setType] = useState('All');
  const [location, setLocation] = useState('All');
  const [minPrice, setMinPrice] = useState('0');
  const [maxPrice, setMaxPrice] = useState('0');
  const [bedrooms, setBedrooms] = useState('All');
  const [visible, setVisible] = useState(8);

  const enriched = useMemo(() =>
    listings.map(l => ({ ...l, _priceNum: parsePrice(l.price), _transaction: getTransactionType(l), _location: parseLocation(l) })),
    []);

  const propertyTypes = useMemo(() => ['All', ...Array.from(new Set(enriched.map(e => e.propertyType).filter(Boolean)))], [enriched]);
  const locations = useMemo(() => ['All', ...Array.from(new Set(enriched.map(e => e._location).filter(Boolean)))], [enriched]);
  const bedroomOptions = useMemo(() => ['All', ...Array.from(new Set(enriched.map(e => e.bedrooms).filter(Boolean)))], [enriched]);

  const prices = enriched.map(e => e._priceNum).filter(Boolean).sort((a,b)=>a-b);
  const minAvailable = prices[0] || 0;
  const maxAvailable = prices[prices.length - 1] || 0;

  const filtered = useMemo(() => {
    return enriched.filter(e => {
      if (transaction !== 'All' && e._transaction !== transaction) return false;
      if (type !== 'All' && e.propertyType !== type) return false;
      if (location !== 'All' && e._location !== location) return false;
      const min = Number(minPrice) || 0;
      const max = Number(maxPrice) || Infinity;
      if (min && e._priceNum < min) return false;
      if (max && e._priceNum > max) return false;
      if (bedrooms !== 'All' && e.bedrooms !== bedrooms) return false;
      return true;
    });
  }, [enriched, transaction, type, location, minPrice, maxPrice, bedrooms]);

  return (
    <div style={{ fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial', padding: 24 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div style={{ fontWeight: 700, fontSize: 20 }}>Madulo Properties — Preview</div>
        <nav style={{ display: 'flex', gap: 12 }}>
          <Link href="/preview">Home</Link>
          <Link href="/preview/properties">Properties</Link>
          <Link href="/preview/calculators">Calculators</Link>
          <Link href="/preview/developments">Developments</Link>
          <Link href="/preview/estates">Estates</Link>
          <Link href="/preview/about">About</Link>
          <Link href="/preview/team">Team</Link>
          <Link href="/preview/community">Community</Link>
          <Link href="/preview/contact">Contact</Link>
        </nav>
      </header>

      <main>
        <h1 style={{ margin: '0 0 8px 0' }}>Properties</h1>
        <p style={{ color: '#555', marginTop: 0 }}>{filtered.length} results</p>

        <section style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
          <label>
            Transaction<br/>
            <select value={transaction} onChange={e => setTransaction(e.target.value as any)}>
              <option>All</option>
              <option>Buy</option>
              <option>Rent</option>
            </select>
          </label>

          <label>
            Property type<br/>
            <select value={type} onChange={e => setType(e.target.value)}>
              {propertyTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </label>

          <label>
            Location<br/>
            <select value={location} onChange={e => setLocation(e.target.value)}>
              {locations.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </label>

          <label>
            Min price<br/>
            <select value={minPrice} onChange={e => setMinPrice(e.target.value)}>
              <option value={0}>Any</option>
              <option value={50000}>{'R ' + formatNumber(50000)}</option>
              <option value={200000}>{'R ' + formatNumber(200000)}</option>
              <option value={500000}>{'R ' + formatNumber(500000)}</option>
              <option value={1000000}>{'R ' + formatNumber(1000000)}</option>
            </select>
          </label>

          <label>
            Max price<br/>
            <select value={maxPrice} onChange={e => setMaxPrice(e.target.value)}>
              <option value={0}>Any</option>
              <option value={500000}>{'R ' + formatNumber(500000)}</option>
              <option value={1000000}>{'R ' + formatNumber(1000000)}</option>
              <option value={5000000}>{'R ' + formatNumber(5000000)}</option>
              <option value={10000000}>{'R ' + formatNumber(10000000)}</option>
            </select>
          </label>

          <label>
            Bedrooms<br/>
            <select value={bedrooms} onChange={e => setBedrooms(e.target.value)}>
              {bedroomOptions.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </label>

          <div style={{ display: 'flex', alignItems: 'end', gap: 8 }}>
            <button onClick={() => { setTransaction('All'); setType('All'); setLocation('All'); setMinPrice('0'); setMaxPrice('0'); setBedrooms('All'); }}>Clear</button>
          </div>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {filtered.slice(0, visible).map(item => (
            <article key={item.id} style={{ border: '1px solid #eee', borderRadius: 8, overflow: 'hidden', background: '#fff', display: 'flex', flexDirection: 'column' }}>
              <a href={item.listingUrl} style={{ display: 'block' }} aria-label={`View property ${item.listingNumber}`}>
                <div style={{ height: 180, background: '#f6f6f6', backgroundImage: `url(${item.galleryImgs[0]})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              </a>

              <div style={{ padding: 12, flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                  <div style={{ fontWeight: 700 }}>{item.price}</div>
                  <div style={{ fontSize: 12, color: '#666' }}>{item.propertyType}</div>
                </div>

                <div style={{ marginTop: 8, color: '#444', fontSize: 14, flex: 1 }}>{item.abbreviated}</div>

                <div style={{ marginTop: 12, display: 'flex', gap: 12, color: '#666', fontSize: 13, flexWrap: 'wrap' }}>
                  {item.bedrooms && <div>{item.bedrooms} Bed{item.bedrooms !== '1' ? 's' : ''}</div>}
                  {item.bathrooms && <div>{item.bathrooms} Bath{item.bathrooms !== '1' ? 's' : ''}</div>}
                  {item.parkingSpaces && <div>{item.parkingSpaces} Parking</div>}
                  {item.erfSize && <div>{item.erfSize}</div>}
                </div>

                <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <a href={item.listingUrl} style={{ background: '#0b8457', color: '#fff', padding: '8px 12px', borderRadius: 6, textDecoration: 'none' }}>View Property</a>
                  <div style={{ fontSize: 12, color: '#999' }}>#{item.listingNumber}</div>
                </div>
              </div>
            </article>
          ))}
        </section>

        {filtered.length === 0 && (
          <div style={{ marginTop: 28, padding: 18, border: '1px dashed #ccc', borderRadius: 8 }}>
            <p style={{ margin: 0 }}>No properties found.</p>
            <button style={{ marginTop: 8 }} onClick={() => { setTransaction('All'); setType('All'); setLocation('All'); setMinPrice('0'); setMaxPrice('0'); setBedrooms('All'); }}>Clear filters</button>
          </div>
        )}

        {visible < filtered.length && (
          <div style={{ textAlign: 'center', marginTop: 18 }}>
            <button onClick={() => setVisible(v => v + 8)}>Load more</button>
          </div>
        )}
      </main>

      <footer style={{ marginTop: 40, color: '#666' }}>
        <p style={{ margin: 0 }}>Madulo Properties — Preview</p>
      </footer>

      <div style={{ position: 'fixed', right: 18, bottom: 18 }}>
        <a href="https://wa.me/27000000000" aria-label="Chat with us on WhatsApp" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25D366', color: '#fff', padding: '10px 12px', borderRadius: 999, boxShadow: '0 6px 18px rgba(0,0,0,0.12)', textDecoration: 'none' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.52 3.48A11.94 11.94 0 0012 0C5.373 0 0 5.373 0 12c0 2.115.55 4.145 1.596 5.938L0 24l6.294-1.648A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12 0-3.2-1.246-6.177-3.48-8.52z" fill="#25D366"/><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.672.15-.198.297-.768.967-.94 1.166-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.884-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.173.198-.297.298-.495.099-.198.05-.372-.025-.52-.074-.148-.672-1.612-.92-2.206-.242-.579-.487-.5-.672-.51l-.573-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.064 2.876 1.213 3.074c.149.198 2.1 3.2 5.074 4.487 3.0 1.304 3.0 0.869 3.546 0.814.546-.05 1.758-.718 2.006-1.41.248-.693.248-1.287.173-1.41-.074-.124-.272-.198-.57-.347z" fill="#fff"/></svg>
          <span style={{ fontWeight: 700 }}>Chat with us on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
