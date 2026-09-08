import React, { useState } from 'react';
import Link from 'next/link';

function toNumber(v: string) { return Number(v.toString().replace(/[^0-9.]/g, '')) || 0 }

// Bond & Transfer: Transfer duty SA approximate brackets
function calculateTransferDuty(price: number) {
  // brackets (approx as of recent years) - please verify for production
  if (price <= 1000000) return 0;
  if (price <= 1375000) return (price - 1000000) * 0.03;
  if (price <= 1925000) return 11250 + (price - 1375000) * 0.06;
  if (price <= 2475000) return 44250 + (price - 1925000) * 0.08;
  if (price <= 11000000) return 88250 + (price - 2475000) * 0.11;
  return 1026000 + (price - 11000000) * 0.13;
}

// Home loan monthly payment
function monthlyPayment(principal: number, annualRatePercent: number, years: number) {
  const r = (annualRatePercent / 100) / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  const numerator = principal * r * Math.pow(1 + r, n);
  const denom = Math.pow(1 + r, n) - 1;
  return numerator / denom;
}

// simulate amortization with optional additional payment
function simulateAmortization(balance: number, annualRate: number, monthlyPaymentAmount: number, additionalMonthly = 0) {
  const r = (annualRate / 100) / 12;
  let bal = balance;
  let month = 0;
  let totalInterest = 0;
  while (bal > 0 && month < 1000*12) {
    const interest = bal * r;
    let principalPayment = monthlyPaymentAmount - interest + additionalMonthly;
    if (principalPayment <= 0) {
      // payment too small to cover interest
      break;
    }
    if (principalPayment > bal) principalPayment = bal;
    totalInterest += interest;
    bal = bal - principalPayment;
    month++;
  }
  return { months: month, years: month / 12, totalInterest };
}

export default function BondTransfer() {
  // Bond & Transfer
  const [priceRaw, setPriceRaw] = useState('1000000');
  const [depositRaw, setDepositRaw] = useState('0');
  const [bondAmountRaw, setBondAmountRaw] = useState('1000000');
  const [attorneyFeesRaw, setAttorneyFeesRaw] = useState('15000');

  // Additional payment
  const [outstandingRaw, setOutstandingRaw] = useState('1000000');
  const [annualRateAP, setAnnualRateAP] = useState('10');
  const [termYearsAP, setTermYearsAP] = useState('20');
  const [extraMonthlyRaw, setExtraMonthlyRaw] = useState('0');

  // Affordability
  const [monthlyIncomeRaw, setMonthlyIncomeRaw] = useState('25000');
  const [monthlyExpensesRaw, setMonthlyExpensesRaw] = useState('5000');
  const [interestAffRaw, setInterestAffRaw] = useState('10');
  const [termAffRaw, setTermAffRaw] = useState('20');
  const [depositAffRaw, setDepositAffRaw] = useState('0');

  // Home loan repayment
  const [loanAmountRaw, setLoanAmountRaw] = useState('1000000');
  const [interestHLRRaw, setInterestHLRRaw] = useState('10');
  const [termHLRRaw, setTermHLRRaw] = useState('20');

  // Bond & transfer calculations
  const price = toNumber(priceRaw);
  const deposit = toNumber(depositRaw);
  const bondAmount = toNumber(bondAmountRaw) || Math.max(0, price - deposit);
  const transferDuty = calculateTransferDuty(price);
  const estimatedTransferFees = toNumber(attorneyFeesRaw);
  const totalUpfront = deposit + transferDuty + estimatedTransferFees;

  // Additional payment calculations
  const outstanding = toNumber(outstandingRaw);
  const annualRateAPNum = Number(annualRateAP) || 0;
  const termAP = Number(termYearsAP) || 20;
  const regularPayment = monthlyPayment(outstanding, annualRateAPNum, termAP);
  const extraMonthly = toNumber(extraMonthlyRaw);
  const baseline = simulateAmortization(outstanding, annualRateAPNum, regularPayment, 0);
  const withExtra = simulateAmortization(outstanding, annualRateAPNum, regularPayment, extraMonthly);

  // Affordability
  const monthlyIncome = toNumber(monthlyIncomeRaw);
  const monthlyExpenses = toNumber(monthlyExpensesRaw);
  const disposable = Math.max(0, monthlyIncome - monthlyExpenses);
  const affordPercent = 0.30; // assume 30% of disposable income for repayments
  const maxMonthlyRepayment = disposable * affordPercent;
  const interestAff = Number(interestAffRaw) || 0;
  const termAff = Number(termAffRaw) || 20;
  const maxLoan = (function () {
    const r = (interestAff / 100) / 12;
    const n = termAff * 12;
    if (r === 0) return maxMonthlyRepayment * n;
    return (maxMonthlyRepayment * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
  })();
  const estimatedPurchase = maxLoan + toNumber(depositAffRaw);

  // Home loan repayment
  const loanAmount = toNumber(loanAmountRaw);
  const interestHLR = Number(interestHLRRaw) || 0;
  const termHLR = Number(termHLRRaw) || 20;
  const monthlyRepayment = monthlyPayment(loanAmount, interestHLR, termHLR);

  return (
    <div style={{ fontFamily: 'Inter, system-ui, -apple-system', padding: 24 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div style={{ fontWeight: 700, fontSize: 20 }}>Calculators — Madulo Preview</div>
        <nav style={{ display: 'flex', gap: 12 }}>
          <Link href="/preview">Home</Link>
        </nav>
      </header>

      <main style={{ display: 'grid', gap: 28 }}>
        <section>
          <h2>Bond & Transfer Costs (estimate)</h2>
          <p style={{ color: '#555' }}>Estimate transfer duty and typical attorney fees for a property purchase.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16, alignItems: 'start' }}>
            <form onSubmit={e=>e.preventDefault()} style={{ display: 'grid', gap: 8 }}>
              <label>Purchase price<input value={priceRaw} onChange={e=>setPriceRaw(e.target.value)} /></label>
              <label>Deposit<input value={depositRaw} onChange={e=>setDepositRaw(e.target.value)} /></label>
              <label>Bond amount (if different)<input value={bondAmountRaw} onChange={e=>setBondAmountRaw(e.target.value)} /></label>
              <label>Transfer attorney fees (estimate)<input value={attorneyFeesRaw} onChange={e=>setAttorneyFeesRaw(e.target.value)} /></label>
            </form>

            <div style={{ padding: 12, border: '1px solid #eee', borderRadius: 8 }}>
              <h3 style={{ marginTop: 0 }}>Estimate</h3>
              <p style={{ margin: '6px 0' }}><strong>Transfer duty:</strong> R {Math.round(transferDuty).toLocaleString()}</p>
              <p style={{ margin: '6px 0' }}><strong>Estimated attorney fees:</strong> R {Math.round(estimatedTransferFees).toLocaleString()}</p>
              <p style={{ margin: '6px 0' }}><strong>Deposit:</strong> R {Math.round(deposit).toLocaleString()}</p>
              <hr />
              <p style={{ margin: '6px 0' }}><strong>Total upfront (estimate):</strong> R {Math.round(totalUpfront).toLocaleString()}</p>
              <p style={{ marginTop: 8, color: '#666' }}><em>These are estimates for guidance only — use a conveyancer or financial advisor for final figures.</em></p>
            </div>
          </div>
        </section>

        <section>
          <h2>Additional Payment Simulator</h2>
          <p style={{ color: '#555' }}>See how extra monthly payments affect loan duration and interest paid.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 16 }}>
            <form onSubmit={e=>e.preventDefault()} style={{ display: 'grid', gap: 8 }}>
              <label>Outstanding balance<input value={outstandingRaw} onChange={e=>setOutstandingRaw(e.target.value)} /></label>
              <label>Interest rate (annual %)<input value={annualRateAP} onChange={e=>setAnnualRateAP(e.target.value)} /></label>
              <label>Remaining term (years) — used to calculate base payment<input value={termYearsAP} onChange={e=>setTermYearsAP(e.target.value)} /></label>
              <label>Additional monthly payment<input value={extraMonthlyRaw} onChange={e=>setExtraMonthlyRaw(e.target.value)} /></label>
            </form>

            <div style={{ padding: 12, border: '1px solid #eee', borderRadius: 8 }}>
              <h3 style={{ marginTop: 0 }}>Simulation</h3>
              <p style={{ margin: '6px 0' }}><strong>Base monthly payment:</strong> R {Math.round(regularPayment).toLocaleString()}</p>
              <p style={{ margin: '6px 0' }}><strong>Without extra payments:</strong> {Math.ceil(baseline.months)} months ({baseline.years.toFixed(1)} years), total interest R {Math.round(baseline.totalInterest).toLocaleString()}</p>
              <p style={{ margin: '6px 0' }}><strong>With extra R {toNumber(extraMonthlyRaw).toLocaleString()} / month:</strong> {Math.ceil(withExtra.months)} months ({withExtra.years.toFixed(1)} years), total interest R {Math.round(withExtra.totalInterest).toLocaleString()}</p>
              <p style={{ color: '#666', marginTop: 8 }}><em>Note: results are approximate and assume fixed interest and no additional fees.</em></p>
            </div>
          </div>
        </section>

        <section>
          <h2>Affordability Estimator</h2>
          <p style={{ color: '#555' }}>Estimate how much loan you may qualify for based on income and expenses (30% rule).</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 16 }}>
            <form onSubmit={e=>e.preventDefault()} style={{ display: 'grid', gap: 8 }}>
              <label>Monthly income (gross)<input value={monthlyIncomeRaw} onChange={e=>setMonthlyIncomeRaw(e.target.value)} /></label>
              <label>Monthly expenses<input value={monthlyExpensesRaw} onChange={e=>setMonthlyExpensesRaw(e.target.value)} /></label>
              <label>Interest rate (annual %)<input value={interestAffRaw} onChange={e=>setInterestAffRaw(e.target.value)} /></label>
              <label>Term (years)<input value={termAffRaw} onChange={e=>setTermAffRaw(e.target.value)} /></label>
              <label>Available deposit<input value={depositAffRaw} onChange={e=>setDepositAffRaw(e.target.value)} /></label>
            </form>

            <div style={{ padding: 12, border: '1px solid #eee', borderRadius: 8 }}>
              <h3 style={{ marginTop: 0 }}>Estimate</h3>
              <p style={{ margin: '6px 0' }}><strong>Disposable income:</strong> R {Math.round(disposable).toLocaleString()}</p>
              <p style={{ margin: '6px 0' }}><strong>Max monthly repayment (30%):</strong> R {Math.round(maxMonthlyRepayment).toLocaleString()}</p>
              <p style={{ margin: '6px 0' }}><strong>Estimated maximum loan:</strong> R {Math.round(maxLoan).toLocaleString()}</p>
              <p style={{ margin: '6px 0' }}><strong>Estimated purchase price (loan + deposit):</strong> R {Math.round(estimatedPurchase).toLocaleString()}</p>
              <p style={{ color: '#666', marginTop: 8 }}><em>Affordability rules vary by lender — this is a simple estimate for guidance only.</em></p>
            </div>
          </div>
        </section>

        <section>
          <h2>Home Loan Repayment Calculator</h2>
          <p style={{ color: '#555' }}>Calculate monthly repayments given loan amount, interest rate and term.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 16 }}>
            <form onSubmit={e=>e.preventDefault()} style={{ display: 'grid', gap: 8 }}>
              <label>Loan amount<input value={loanAmountRaw} onChange={e=>setLoanAmountRaw(e.target.value)} /></label>
              <label>Interest rate (annual %)<input value={interestHLRRaw} onChange={e=>setInterestHLRRaw(e.target.value)} /></label>
              <label>Term (years)<input value={termHLRRaw} onChange={e=>setTermHLRRaw(e.target.value)} /></label>
            </form>

            <div style={{ padding: 12, border: '1px solid #eee', borderRadius: 8 }}>
              <h3 style={{ marginTop: 0 }}>Results</h3>
              <p style={{ margin: '6px 0' }}><strong>Monthly repayment:</strong> R {Math.round(monthlyRepayment).toLocaleString()}</p>
              <p style={{ margin: '6px 0' }}><strong>Total payable (approx):</strong> R {Math.round(monthlyRepayment * termHLR * 12).toLocaleString()}</p>
              <p style={{ color: '#666', marginTop: 8 }}><em>This uses a standard amortising loan formula and assumes fixed interest for the term.</em></p>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
