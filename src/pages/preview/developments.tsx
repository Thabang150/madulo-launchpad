import React from 'react';
import Link from 'next/link';

const Placeholder: React.FC<{ title: string }> = ({ title }) => (
  <div style={{ fontFamily: 'Inter, system-ui, -apple-system', padding: 24 }}>
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
      <div style={{ fontWeight: 700, fontSize: 20 }}>{title}</div>
      <nav style={{ display: 'flex', gap: 12 }}>
        <Link href="/preview">Home</Link>
        <Link href="/preview/properties">Properties</Link>
      </nav>
    </header>

    <main>
      <h1>{title}</h1>
      <p style={{ color: '#555' }}>This page is a placeholder for now. We'll build it out in a later stage.</p>
    </main>
  </div>
);

export default function Developments() { return <Placeholder title="Developments" /> }
