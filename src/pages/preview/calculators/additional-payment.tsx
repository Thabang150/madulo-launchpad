import React from 'react';
import Link from 'next/link';

export default function AdditionalPayment() {
  return (
    <div style={{ fontFamily: 'Inter, system-ui, -apple-system', padding: 24 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div style={{ fontWeight: 700, fontSize: 20 }}>Additional Payment Calculator</div>
        <nav style={{ display: 'flex', gap: 12 }}>
          <Link href="/preview/calculators">Back</Link>
          <Link href="/preview">Home</Link>
        </nav>
      </header>

      <main>
        <h1>Additional Payment</h1>
        <p style={{ color: '#555' }}>Plan extra bond repayments to shorten your loan. (UI only for now.)</p>

        <form style={{ display: 'grid', gap: 12, maxWidth: 640 }} onSubmit={e => e.preventDefault()}>
          <label>
            Current outstanding balance
            <input placeholder="R 1 000 000" />
          </label>
          <label>
            Additional payment amount
            <input placeholder="R 1 000" />
          </label>

          <div style={{ padding: 12, border: '1px dashed #ddd', borderRadius: 8 }}>
            <strong>Results</strong>
            <p style={{ color: '#777' }}>(Results will appear here once calculations are implemented.)</p>
          </div>

          <div>
            <button type="submit">Simulate (disabled)</button>
          </div>
        </form>
      </main>
    </div>
  );
}
