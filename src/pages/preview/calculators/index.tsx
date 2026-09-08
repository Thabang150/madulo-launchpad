import React from 'react';
import Link from 'next/link';

export default function CalculatorsIndex() {
  const cards = [
    { href: '/preview/calculators/bond-transfer-costs', title: 'Bond & Transfer Costs Calculator' },
    { href: '/preview/calculators/additional-payment', title: 'Additional Payment Calculator' },
    { href: '/preview/calculators/affordability', title: 'Affordability Calculator' },
    { href: '/preview/calculators/home-loan-repayment', title: 'Home Loan Repayment Calculator' },
  ];

  return (
    <div style={{ fontFamily: 'Inter, system-ui, -apple-system', padding: 24 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div style={{ fontWeight: 700, fontSize: 20 }}>Calculators — Madulo Preview</div>
        <nav style={{ display: 'flex', gap: 12 }}>
          <Link href="/preview">Home</Link>
        </nav>
      </header>

      <main>
        <h1>Calculators</h1>
        <p style={{ color: '#555' }}>Tools to help you understand bond costs, repayments and affordability. (Calculations will be implemented later.)</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12, marginTop: 18 }}>
          {cards.map(c => (
            <Link key={c.href} href={c.href}><a style={{ display: 'block', padding: 18, borderRadius: 8, border: '1px solid #eee', textDecoration: 'none', color: 'inherit' }}>
              <h3 style={{ margin: '0 0 8px 0' }}>{c.title}</h3>
              <p style={{ margin: 0, color: '#555' }}>Open the calculator page (UI only).</p>
            </a></Link>
          ))}
        </div>
      </main>
    </div>
  );
}
