import React from 'react';
import Link from 'next/link';

export default function BondTransfer() {
  return (
    <div style={{ fontFamily: 'Inter, system-ui, -apple-system', padding: 24 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div style={{ fontWeight: 700, fontSize: 20 }}>Bond & Transfer Costs Calculator</div>
        <nav style={{ display: 'flex', gap: 12 }}>
          <Link href="/preview/calculators">Back</Link>
          <Link href="/preview">Home</Link>
        </nav>
      </header>

      <main>
        <h1>Bond & Transfer Costs</h1>
        <p style={{ color: '#555' }}>This tool will help estimate bond registration and transfer costs. (Form UI only — calculations will be added later.)</p>

        <form style={{ display: 'grid', gap: 12, maxWidth: 640 }} onSubmit={e => e.preventDefault()}>
          <label>
            Purchase price
            <input placeholder="R 1 000 000" />
          </label>
          <label>
            Deposit
            <input placeholder="R 200 000" />
          </label>
          <label>
            Transfer attorney fees (estimate)
            <input placeholder="Optional" />
          </label>

          <div style={{ padding: 12, border: '1px dashed #ddd', borderRadius: 8 }}>
            <strong>Results</strong>
            <p style={{ color: '#777' }}>(Results will appear here once calculations are implemented.)</p>
          </div>

          <div>
            <button type="submit">Calculate (disabled)</button>
          </div>
        </form>
      </main>
    </div>
  );
}
