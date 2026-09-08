import React, { useState } from 'react';
import Link from 'next/link';
import { listings } from '../../data/listings';

export default function PreviewHome() {
  const heroImage = listings[0]?.galleryImgs?.[0] || '';
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('All');
  const categories = ['All', 'Apartment/Flat', 'House (Standalone)', 'Townhouse', 'Vacant Land', 'Farm', 'Commercial', 'Other'];

  return (
    <div style={{ fontFamily: 'Inter, system-ui, -apple-system', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 24 }}>
        <div style={{ fontWeight: 700, fontSize: 20 }}>Madulo Properties — Preview</div>
        <nav style={{ display: 'flex', gap: 12 }}>
          <Link href="/">Coming Soon</Link>
          <Link href="/preview/properties">Properties</Link>
          <Link href="/preview/calculators">Calculators</Link>
          <Link href="/preview/developments">Developments</Link>
        </nav>
      </header>

      <main style={{ flex: 1 }}>
        <section style={{ position: 'relative', height: 420, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          {heroImage ? (
            <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          ) : (
            <div style={{ position: 'absolute', inset: 0, background: '#f3f4f6' }} />
          )}

          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,10,10,0.18), rgba(8,10,10,0.36))' }} />

          <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 1100, padding: 24, color: '#fff' }}>
            <h1 style={{ margin: '0 0 8px 0', fontSize: 36 }}>Discover Property. Find Your Place.</h1>
            <p style={{ marginTop: 0, marginBottom: 18, color: 'rgba(255,255,255,0.9)' }}>Search curated South African properties sourced from Property24 — click through to view full listings.</p>

            <div style={{ background: 'rgba(255,255,255,0.95)', padding: 16, borderRadius: 10, display: 'flex', gap: 12, alignItems: 'center', color: '#111', boxShadow: '0 8px 30px rgba(2,6,23,0.12)' }}>
              <input aria-label="Location" value={location} onChange={e=>setLocation(e.target.value)} placeholder="Location (e.g. Olifantsvlei, Kibler Park)" style={{ flex: '1 1 240px', padding: '12px 14px', borderRadius: 8, border: '1px solid #e6e6e6' }} />

              <select aria-label="Category" value={category} onChange={e=>setCategory(e.target.value)} style={{ padding: '12px 14px', borderRadius: 8, border: '1px solid #e6e6e6' }}>
                {categories.map(c=> <option key={c} value={c}>{c}</option>)}
              </select>

              <select aria-label="Transaction" defaultValue="All" style={{ padding: '12px 14px', borderRadius: 8, border: '1px solid #e6e6e6' }}>
                <option>All</option>
                <option>Buy</option>
                <option>Rent</option>
              </select>

              <Link href="/preview/properties"><a style={{ background: '#0b8457', color: '#fff', padding: '12px 18px', borderRadius: 8, textDecoration: 'none' }}>Search Properties</a></Link>
            </div>

            <div style={{ marginTop: 12, color: 'rgba(255,255,255,0.85)', fontSize: 13 }}>
              <strong>Quick filters:</strong> Apartments · Houses · Townhouses · Vacant Land · Commercial
            </div>
          </div>
        </section>

        <section style={{ padding: 24 }}>
          <h2 style={{ marginTop: 0 }}>Featured Properties</h2>
          <p style={{ color: '#555', marginTop: 4 }}>A tasteful selection from the current listings.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12, marginTop: 12 }}>
            <Link href="/preview/properties"><a style={{ display: 'block', padding: 18, borderRadius: 8, border: '1px solid #eee', textDecoration: 'none', color: 'inherit' }}>
              View All Properties
            </a></Link>
          </div>
        </section>

        <section style={{ padding: 24 }}>
          <h3>Categories</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {categories.slice(1).map(c => (
              <Link key={c} href="/preview/properties"><a style={{ padding: '10px 14px', borderRadius: 8, background: '#fff', border: '1px solid #eee', textDecoration: 'none' }}>{c}</a></Link>
            ))}
          </div>
        </section>
      </main>

      <footer style={{ padding: 24, color: '#666' }}>
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
