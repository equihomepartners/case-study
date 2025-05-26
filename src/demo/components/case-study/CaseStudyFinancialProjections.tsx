import React from 'react';
import { DollarSign, TrendingUp, BarChart2, Calculator, Target, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Area, AreaChart } from 'recharts';

const CaseStudyFinancialProjections: React.FC = () => {
  // A. Deal Terms (Day 0 – 1 Jan 2020)
  const dealTerms = {
    advance: 483000, // Monies Released
    faceLoanAmount: 500000, // incl. origination
    originationFee: 15000, // 3% GP revenue, day-0
    legalDocFee: 2000, // passed through
    simpleInterestRate: 5.0, // % p.a. (non-compounding)
    equitySharePercent: 18.8, // % of appreciation
    baselineAVM: 2800000, // PropTrack
    haircutAdjustedValue: 2660000, // for LTV
    initialLTV: 18.8 // %
  };

  // B. Property Value Path
  const propertyValuePath = [
    { year: 0, date: '2020-01-01', projected: 2800000, actual: 2800000, label: 'Year 0' },
    { year: 1, date: '2021-01-01', projected: 3523281, actual: 3200000, label: 'Year 1' },
    { year: 2, date: '2022-01-01', projected: 3986900, actual: 3900000, label: 'Year 2' },
    { year: 3.4167, date: '2023-05-31', projected: 4093093, actual: 4500000, label: 'Year 3.4 (Exit)' },
    { year: 4, date: '2024-01-01', projected: 4711446, actual: null, label: 'Year 4' },
    { year: 10, date: '2030-01-01', projected: 6705810, actual: null, label: 'Year 10' }
  ];

  // C. Cash-flow Waterfall – Early Exit (31 May 2023)
  const cashflowWaterfall = {
    salePrice: 4500000,
    capitalRepayment: 500000,
    accruedInterest: 85417, // 5% × 3.4167 yrs
    equityShare: 319549, // 18.8% × (4,500,000 – 2,800,000)
    netToBorrower: 3595034,
    upfrontOriginationFee: 15000, // already booked
    proceedsToEquihome: 404966,
    moicToEquihome: 0.81, // on 0.50m commitment
    actualIRR: 20.7,
    baseCaseIRR: 13.6
  };

  // D. Portfolio Impact
  const portfolioImpact = {
    before: {
      gav: 10.50, // m
      var95: 12.0, // %
      weightedAvgLTV: 33, // %
      fundBeta: 0.97,
      netIRR: 13.2 // %
    },
    after: {
      gav: 10.96, // m
      var95: 11.8, // %
      weightedAvgLTV: 32, // %
      fundBeta: 0.95,
      netIRR: 13.4 // %
    }
  };

  // Waterfall chart data
  const waterfallData = [
    { name: 'Sale Price', value: cashflowWaterfall.salePrice, cumulative: cashflowWaterfall.salePrice },
    { name: 'Capital Repayment', value: -cashflowWaterfall.capitalRepayment, cumulative: cashflowWaterfall.salePrice - cashflowWaterfall.capitalRepayment },
    { name: 'Interest', value: -cashflowWaterfall.accruedInterest, cumulative: cashflowWaterfall.salePrice - cashflowWaterfall.capitalRepayment - cashflowWaterfall.accruedInterest },
    { name: 'Equity Share', value: -cashflowWaterfall.equityShare, cumulative: cashflowWaterfall.netToBorrower },
    { name: 'Net to Borrower', value: cashflowWaterfall.netToBorrower, cumulative: cashflowWaterfall.netToBorrower }
  ];

  // Returns comparison data
  const returnsComparison = [
    { name: 'Projected (Base Case)', irr: cashflowWaterfall.baseCaseIRR, proceeds: 340000, color: '#9ca3af' },
    { name: 'Actual (Early Exit)', irr: cashflowWaterfall.actualIRR, proceeds: cashflowWaterfall.proceedsToEquihome, color: '#10b981' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-md border border-neutral-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-neutral-200 bg-neutral-50">
          <div className="flex items-center">
            <div className="p-2 rounded-md bg-white border border-neutral-200 mr-3">
              <TrendingUp className="h-4 w-4 text-neutral-600" />
            </div>
            <h3 className="text-sm font-medium text-neutral-900 uppercase tracking-wider">Financial Projections</h3>
          </div>
        </div>
        <div className="p-6">
          <div className="text-center">
            <div className="text-lg font-semibold text-neutral-900">Projected vs Actual Outcome</div>
            <div className="text-sm text-neutral-600 mt-1">Mosman loan: Jan 2020 underwriting → May 2023 early exit</div>
          </div>
        </div>
      </div>

      {/* Deal Terms */}
      <div className="bg-white rounded-md border border-neutral-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-neutral-200 bg-neutral-50">
          <div className="flex items-center">
            <div className="p-2 rounded-md bg-white border border-neutral-200 mr-3">
              <DollarSign className="h-4 w-4 text-neutral-600" />
            </div>
            <h3 className="text-sm font-medium text-neutral-900 uppercase tracking-wider">Deal Terms (Day 0 – 1 Jan 2020)</h3>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Advance (Monies Released)</div>
                <div className="text-lg font-semibold text-neutral-900 mt-1">A${dealTerms.advance.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Face Loan Amount</div>
                <div className="text-lg font-semibold text-neutral-900 mt-1">A${dealTerms.faceLoanAmount.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Up-front Origination Fee (3%)</div>
                <div className="text-lg font-semibold text-neutral-900 mt-1">A${dealTerms.originationFee.toLocaleString()}</div>
                <div className="text-xs text-neutral-500">(GP revenue, day-0)</div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Simple Interest Rate</div>
                <div className="text-lg font-semibold text-neutral-900 mt-1">{dealTerms.simpleInterestRate}% p.a.</div>
                <div className="text-xs text-neutral-500">(non-compounding)</div>
              </div>
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Equity-share %</div>
                <div className="text-lg font-semibold text-neutral-900 mt-1">{dealTerms.equitySharePercent}%</div>
                <div className="text-xs text-neutral-500">(of appreciation)</div>
              </div>
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Baseline AVM (PropTrack)</div>
                <div className="text-lg font-semibold text-neutral-900 mt-1">A${dealTerms.baselineAVM.toLocaleString()}</div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Haircut-adjusted Value</div>
                <div className="text-lg font-semibold text-neutral-900 mt-1">A${dealTerms.haircutAdjustedValue.toLocaleString()}</div>
                <div className="text-xs text-neutral-500">(for LTV)</div>
              </div>
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Initial LTV</div>
                <div className="text-lg font-semibold text-neutral-900 mt-1">{dealTerms.initialLTV}%</div>
              </div>
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Legal & Doc Fee</div>
                <div className="text-lg font-semibold text-neutral-900 mt-1">A${dealTerms.legalDocFee.toLocaleString()}</div>
                <div className="text-xs text-neutral-500">(passed through)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Value Path & Returns Fan Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-md border border-neutral-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-neutral-200 bg-neutral-50">
            <div className="flex items-center">
              <div className="p-2 rounded-md bg-white border border-neutral-200 mr-3">
                <BarChart2 className="h-4 w-4 text-neutral-600" />
              </div>
              <h3 className="text-sm font-medium text-neutral-900 uppercase tracking-wider">Property Value Path</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={propertyValuePath}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis
                    dataKey="year"
                    stroke="#9ca3af"
                    fontSize={10}
                    tick={{ fontSize: 10 }}
                    label={{ value: 'Year', position: 'insideBottom', offset: -5, style: { fontSize: '10px' } }}
                  />
                  <YAxis
                    stroke="#9ca3af"
                    fontSize={10}
                    tick={{ fontSize: 10 }}
                    tickFormatter={(value) => `A$${(value / 1000000).toFixed(1)}M`}
                    label={{ value: 'Value', angle: -90, position: 'insideLeft', style: { fontSize: '10px' } }}
                  />
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      `A$${value.toLocaleString()}`,
                      name === 'projected' ? 'Projected AVM' : 'Actual AVM/Sale'
                    ]}
                    labelFormatter={(label) => `Year ${label}`}
                    labelStyle={{ color: '#374151', fontSize: '12px' }}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '12px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="projected"
                    stroke="#9ca3af"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ r: 3, fill: '#9ca3af' }}
                    name="projected"
                  />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#374151"
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#374151' }}
                    name="actual"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-xs text-neutral-600">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-4 h-0.5 bg-gray-400 mr-2" style={{ borderTop: '2px dashed #9ca3af' }}></div>
                  <span>Projected</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-0.5 bg-neutral-700 mr-2"></div>
                  <span>Actual</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md border border-neutral-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-neutral-200 bg-neutral-50">
            <div className="flex items-center">
              <div className="p-2 rounded-md bg-white border border-neutral-200 mr-3">
                <TrendingUp className="h-4 w-4 text-neutral-600" />
              </div>
              <h3 className="text-sm font-medium text-neutral-900 uppercase tracking-wider">Projected vs Actual Returns</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={returnsComparison}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis
                    dataKey="name"
                    stroke="#9ca3af"
                    fontSize={10}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis
                    stroke="#9ca3af"
                    fontSize={10}
                    tick={{ fontSize: 10 }}
                    tickFormatter={(value) => `${value}%`}
                    label={{ value: 'IRR (%)', angle: -90, position: 'insideLeft', style: { fontSize: '10px' } }}
                  />
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      name === 'irr' ? `${value}%` : `A$${value.toLocaleString()}`,
                      name === 'irr' ? 'IRR' : 'Proceeds'
                    ]}
                    labelStyle={{ color: '#374151', fontSize: '12px' }}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="irr" fill="#9ca3af" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-neutral-700">{cashflowWaterfall.baseCaseIRR}%</div>
                <div className="text-xs text-neutral-500">Projected IRR</div>
              </div>
              <div>
                <div className="text-lg font-bold text-neutral-900">{cashflowWaterfall.actualIRR}%</div>
                <div className="text-xs text-neutral-500">Actual IRR</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cash-flow Waterfall & Portfolio Impact */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-md border border-neutral-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-neutral-200 bg-neutral-50">
            <div className="flex items-center">
              <div className="p-2 rounded-md bg-white border border-neutral-200 mr-3">
                <Calculator className="h-4 w-4 text-neutral-600" />
              </div>
              <h3 className="text-sm font-medium text-neutral-900 uppercase tracking-wider">Cash-flow Waterfall – Early Exit (31 May 2023)</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-neutral-600">Sale price</span>
                <span className="text-sm font-medium text-neutral-900">A${cashflowWaterfall.salePrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-neutral-600">(-) Capital repayment</span>
                <span className="text-sm font-medium text-neutral-900">(A${cashflowWaterfall.capitalRepayment.toLocaleString()})</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-neutral-600">(-) Accrued simple interest</span>
                <span className="text-sm font-medium text-neutral-900">(A${cashflowWaterfall.accruedInterest.toLocaleString()})</span>
              </div>
              <div className="text-xs text-neutral-500 ml-4 -mt-2">5% × 3.4167 yrs</div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-neutral-600">(-) Equihome equity share</span>
                <span className="text-sm font-medium text-neutral-900">(A${cashflowWaterfall.equityShare.toLocaleString()})</span>
              </div>
              <div className="text-xs text-neutral-500 ml-4 -mt-2">18.8% × (A$4,500,000 – A$2,800,000)</div>
              <div className="border-t border-neutral-200 pt-3 mt-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-neutral-700">Net to borrower</span>
                  <span className="text-sm font-bold text-neutral-900">A${cashflowWaterfall.netToBorrower.toLocaleString()}</span>
                </div>
              </div>
              <div className="border-t border-neutral-200 pt-3 mt-4">
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm text-neutral-600">Up-front origination fee (already booked)</span>
                  <span className="text-sm font-medium text-neutral-900">A${cashflowWaterfall.upfrontOriginationFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm font-medium text-neutral-700">Proceeds to Equihome (total)</span>
                  <span className="text-sm font-bold text-neutral-900">A${cashflowWaterfall.proceedsToEquihome.toLocaleString()}</span>
                </div>
                <div className="text-xs text-neutral-500 mt-1">↳ of which: interest A${cashflowWaterfall.accruedInterest.toLocaleString()} • equity share A${cashflowWaterfall.equityShare.toLocaleString()}</div>
              </div>
              <div className="border-t border-neutral-200 pt-3 mt-4">
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm font-medium text-neutral-700">MoIC to Equihome</span>
                  <span className="text-sm font-bold text-neutral-900">{cashflowWaterfall.moicToEquihome}× on A$0.50m commitment</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm font-medium text-neutral-700">IRR to Equihome (actual)</span>
                  <span className="text-sm font-bold text-neutral-900">{cashflowWaterfall.actualIRR}%</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-xs text-neutral-600">IRR if held full 10 yrs (base case)</span>
                  <span className="text-xs text-neutral-700">{cashflowWaterfall.baseCaseIRR}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md border border-neutral-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-neutral-200 bg-neutral-50">
            <div className="flex items-center">
              <div className="p-2 rounded-md bg-white border border-neutral-200 mr-3">
                <Activity className="h-4 w-4 text-neutral-600" />
              </div>
              <h3 className="text-sm font-medium text-neutral-900 uppercase tracking-wider">Portfolio Impact</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-2 text-neutral-500 uppercase tracking-wider font-medium">Metric</th>
                    <th className="text-center py-2 text-neutral-500 uppercase tracking-wider font-medium">Before Sale</th>
                    <th className="text-center py-2 text-neutral-500 uppercase tracking-wider font-medium">After Sale</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 text-neutral-700">GAV</td>
                    <td className="py-3 text-center font-medium text-neutral-900">A${portfolioImpact.before.gav}m</td>
                    <td className="py-3 text-center font-medium text-neutral-900">A${portfolioImpact.after.gav}m</td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 text-neutral-700">VaR (95%, 1y)</td>
                    <td className="py-3 text-center font-medium text-neutral-900">{portfolioImpact.before.var95}%</td>
                    <td className="py-3 text-center font-medium text-neutral-900">{portfolioImpact.after.var95}%</td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 text-neutral-700">Weighted-avg LTV</td>
                    <td className="py-3 text-center font-medium text-neutral-900">{portfolioImpact.before.weightedAvgLTV}%</td>
                    <td className="py-3 text-center font-medium text-neutral-900">{portfolioImpact.after.weightedAvgLTV}%</td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 text-neutral-700">Fund β</td>
                    <td className="py-3 text-center font-medium text-neutral-900">{portfolioImpact.before.fundBeta}</td>
                    <td className="py-3 text-center font-medium text-neutral-900">{portfolioImpact.after.fundBeta}</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-neutral-700">Net IRR (modelled)</td>
                    <td className="py-3 text-center font-medium text-neutral-900">{portfolioImpact.before.netIRR}%</td>
                    <td className="py-3 text-center font-medium text-neutral-900">{portfolioImpact.after.netIRR}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-3 border border-neutral-200 rounded text-xs text-neutral-600">
              <strong>Key Insight:</strong> Early exit crystallised gains, improving fund IRR by 20bp and reducing portfolio risk metrics across the board.
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CaseStudyFinancialProjections;
