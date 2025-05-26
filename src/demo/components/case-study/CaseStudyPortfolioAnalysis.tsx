import React from 'react';
import { BarChart2, TrendingUp, Target, Activity, DollarSign, PieChart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';

const CaseStudyPortfolioAnalysis: React.FC = () => {
  // ACTUAL Portfolio Analysis – "Tranche 0 Launch Fund" (A$25m closed-end sleeve)

  // 1. Capital snapshot
  const capitalSnapshot = {
    committedCapital: 25000000, // A$25m
    deployedPreMosman: 10000000, // A$10m
    mosmanAdvance: 500000, // A$0.50m (Loan #11)
    deployedNow: 10500000, // A$10.50m
    dryPowderRemaining: 14500000 // A$14.50m
  };

  // 2. Zone-colour exposure
  const zoneExposure = [
    {
      zone: 'Green',
      cap: 70,
      preAmount: 5500000,
      prePercent: 55.0,
      postAmount: 6000000,
      postPercent: 57.1,
      delta: 2.1,
      headroom: 12.9,
      color: '#10b981'
    },
    {
      zone: 'Yellow',
      cap: 25,
      preAmount: 3500000,
      prePercent: 35.0,
      postAmount: 3500000,
      postPercent: 33.3,
      delta: -1.7,
      headroom: -8.3,
      color: '#f59e0b'
    },
    {
      zone: 'Red',
      cap: 10,
      preAmount: 1000000,
      prePercent: 10.0,
      postAmount: 1000000,
      postPercent: 9.5,
      delta: -0.5,
      headroom: 0.5,
      color: '#ef4444'
    }
  ];

  // 3. Key risk & return metrics
  const riskReturnMetrics = {
    before: {
      weightedAvgLTV: 34,
      portfolioBeta: 0.94,
      oneYrVaR95: 11.8,
      oneYrCVaR95: 15.3,
      expectedNetIRR: 13.0,
      sharpe: 1.46,
      loansUniqueZones: '10 / 7'
    },
    after: {
      weightedAvgLTV: 33,
      portfolioBeta: 0.97,
      oneYrVaR95: 12.0,
      oneYrCVaR95: 15.5,
      expectedNetIRR: 13.2,
      sharpe: 1.47,
      loansUniqueZones: '11 / 8'
    },
    mandate: {
      weightedAvgLTV: '≤ 45%',
      portfolioBeta: '0.90 – 1.10',
      oneYrVaR95: '< 15%',
      oneYrCVaR95: '< 20%',
      expectedNetIRR: '12 – 14%',
      sharpe: '> 1.3',
      loansUniqueZones: 'Target ≥ 50 / 20'
    }
  };

  // 4. Top-5 suburb concentrations (post-loan)
  const suburbConcentrations = [
    { rank: 1, suburb: 'Mosman', zoneColor: 'Green', exposure: 0.50, percentGAV: 4.8, color: '#10b981' },
    { rank: 2, suburb: 'Randwick', zoneColor: 'Green', exposure: 0.45, percentGAV: 4.3, color: '#10b981' },
    { rank: 3, suburb: 'Cronulla', zoneColor: 'Yellow', exposure: 0.40, percentGAV: 3.8, color: '#f59e0b' },
    { rank: 4, suburb: 'Parramatta', zoneColor: 'Yellow', exposure: 0.35, percentGAV: 3.3, color: '#f59e0b' },
    { rank: 5, suburb: 'Campbelltown', zoneColor: 'Red', exposure: 0.30, percentGAV: 2.9, color: '#ef4444' }
  ];

  // 5. Efficient-frontier context
  const efficientFrontier = [
    { name: 'Existing (pre)', expReturn: 13.0, vol: 9.0, sharpe: 1.46 },
    { name: 'Post-Mosman', expReturn: 13.2, vol: 9.1, sharpe: 1.47 },
    { name: 'Frontier (same VaR)', expReturn: 13.9, vol: 9.3, sharpe: 1.50 }
  ];

  // 6. Three-stage LTV clip – loan #11
  const ltvClipStages = [
    { layer: 'Baseline Green cap', multiplier: '–', runningMaxLTV: 70 },
    { layer: 'Property-risk factor (unit score 0.32)', multiplier: '× 0.84', runningMaxLTV: 59 },
    { layer: 'Zone-liquidity factor (score 0.18)', multiplier: '× 0.90', runningMaxLTV: 53 },
    { layer: 'Portfolio VaR buffer (current risk head-room)', multiplier: '× 0.95', runningMaxLTV: 50 }
  ];

  // Chart data for zone exposure bars
  const zoneChartData = zoneExposure.map(zone => ({
    zone: zone.zone,
    pre: zone.prePercent,
    post: zone.postPercent,
    cap: zone.cap,
    color: zone.color
  }));

  return (
    <div className="p-6 space-y-6">
      {/* Portfolio Overview */}
      <div className="bg-white rounded-md border border-neutral-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-neutral-200 bg-neutral-50">
          <div className="flex items-center">
            <div className="p-2 rounded-md bg-white border border-neutral-200 mr-3">
              <DollarSign className="h-4 w-4 text-neutral-600" />
            </div>
            <h3 className="text-sm font-medium text-neutral-900 uppercase tracking-wider">Portfolio Analysis</h3>
          </div>
        </div>
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="text-lg font-semibold text-neutral-900">Tranche 0 Launch Fund</div>
            <div className="text-sm text-neutral-600 mt-1">A$25M Closed-End Sleeve</div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Committed Capital</div>
              <div className="text-2xl font-semibold text-neutral-900 mt-1">A${(capitalSnapshot.committedCapital / 1000000).toFixed(0)}M</div>
              <div className="text-xs text-neutral-500 mt-1">100%</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Deployed pre-Mosman</div>
              <div className="text-2xl font-semibold text-neutral-900 mt-1">A${(capitalSnapshot.deployedPreMosman / 1000000).toFixed(1)}M</div>
              <div className="text-xs text-neutral-500 mt-1">40%</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Mosman advance (Loan #11)</div>
              <div className="text-2xl font-semibold text-neutral-900 mt-1">A${(capitalSnapshot.mosmanAdvance / 1000000).toFixed(2)}M</div>
              <div className="text-xs text-neutral-500 mt-1">2%</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Deployed now</div>
              <div className="text-2xl font-semibold text-neutral-900 mt-1">A${(capitalSnapshot.deployedNow / 1000000).toFixed(1)}M</div>
              <div className="text-xs text-neutral-500 mt-1">42%</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Dry powder remaining</div>
              <div className="text-2xl font-semibold text-neutral-900 mt-1">A${(capitalSnapshot.dryPowderRemaining / 1000000).toFixed(1)}M</div>
              <div className="text-xs text-neutral-500 mt-1">58%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout: Left (Capital + Top-5) + Centre (Zone bars) + Right (Bullet gauges) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left panel: Capital bar-meter + Top-5 suburb table */}
        <div className="space-y-6">
          {/* Capital bar-meter */}
          <div className="bg-white rounded-md border border-neutral-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-neutral-200 bg-neutral-50">
              <div className="flex items-center">
                <div className="p-2 rounded-md bg-white border border-neutral-200 mr-3">
                  <BarChart2 className="h-4 w-4 text-neutral-600" />
                </div>
                <h3 className="text-sm font-medium text-neutral-900 uppercase tracking-wider">Capital Deployment</h3>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">10 → 10.5 → 25 M</div>
                <div className="relative h-8 bg-neutral-200 rounded">
                  <div
                    className="absolute h-full bg-blue-500 rounded"
                    style={{ width: `${(capitalSnapshot.deployedPreMosman / capitalSnapshot.committedCapital) * 100}%` }}
                  ></div>
                  <div
                    className="absolute h-full bg-green-500 rounded"
                    style={{
                      left: `${(capitalSnapshot.deployedPreMosman / capitalSnapshot.committedCapital) * 100}%`,
                      width: `${(capitalSnapshot.mosmanAdvance / capitalSnapshot.committedCapital) * 100}%`
                    }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                    A${(capitalSnapshot.deployedNow / 1000000).toFixed(1)}M / A${(capitalSnapshot.committedCapital / 1000000).toFixed(0)}M
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                    <span>Pre-Mosman</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                    <span>Mosman</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-neutral-200 rounded mr-2"></div>
                    <span>Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top-5 suburb table */}
          <div className="bg-white rounded-md border border-neutral-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-neutral-200 bg-neutral-50">
              <div className="flex items-center">
                <div className="p-2 rounded-md bg-white border border-neutral-200 mr-3">
                  <Target className="h-4 w-4 text-neutral-600" />
                </div>
                <h3 className="text-sm font-medium text-neutral-900 uppercase tracking-wider">Top-5 Suburb Concentrations</h3>
              </div>
            </div>
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-2 text-neutral-500 uppercase tracking-wider font-medium">Rank</th>
                      <th className="text-left py-2 text-neutral-500 uppercase tracking-wider font-medium">Suburb</th>
                      <th className="text-center py-2 text-neutral-500 uppercase tracking-wider font-medium">Zone</th>
                      <th className="text-right py-2 text-neutral-500 uppercase tracking-wider font-medium">Exposure</th>
                      <th className="text-right py-2 text-neutral-500 uppercase tracking-wider font-medium">% GAV</th>
                    </tr>
                  </thead>
                  <tbody>
                    {suburbConcentrations.map((item) => (
                      <tr key={item.rank} className="border-b border-neutral-100">
                        <td className="py-2 text-neutral-700">{item.rank}</td>
                        <td className="py-2 font-medium text-neutral-900">{item.suburb}</td>
                        <td className="py-2 text-center">
                          <span
                            className="inline-block w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                          ></span>
                        </td>
                        <td className="py-2 text-right text-neutral-700">{item.exposure.toFixed(2)}m</td>
                        <td className="py-2 text-right font-medium text-neutral-900">{item.percentGAV}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 text-xs text-neutral-600">
                Single-suburb cap = 7% → plenty of head-room.
              </div>
            </div>
          </div>
        </div>

        {/* Centre panel: Zone-colour stacked bars (Pre vs Post vs Caps) */}
        <div className="bg-white rounded-md border border-neutral-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-neutral-200 bg-neutral-50">
            <div className="flex items-center">
              <div className="p-2 rounded-md bg-white border border-neutral-200 mr-3">
                <PieChart className="h-4 w-4 text-neutral-600" />
              </div>
              <h3 className="text-sm font-medium text-neutral-900 uppercase tracking-wider">Zone-colour Exposure</h3>
            </div>
          </div>
          <div className="p-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={zoneChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis
                    dataKey="zone"
                    stroke="#9ca3af"
                    fontSize={10}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis
                    stroke="#9ca3af"
                    fontSize={10}
                    tick={{ fontSize: 10 }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip
                    formatter={(value: number, name: string) => [`${value}%`, name]}
                    labelStyle={{ color: '#374151', fontSize: '12px' }}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="pre" fill="#9ca3af" name="Pre-Mosman" />
                  <Bar dataKey="post" fill="#14b8a6" name="Post-Mosman" />
                  <Bar dataKey="cap" fill="#ef4444" name="Cap" fillOpacity={0.3} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Zone exposure table */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-2 text-neutral-500 uppercase tracking-wider font-medium">Zone</th>
                    <th className="text-right py-2 text-neutral-500 uppercase tracking-wider font-medium">Cap</th>
                    <th className="text-right py-2 text-neutral-500 uppercase tracking-wider font-medium">Pre</th>
                    <th className="text-right py-2 text-neutral-500 uppercase tracking-wider font-medium">Post</th>
                    <th className="text-right py-2 text-neutral-500 uppercase tracking-wider font-medium">Δ (pp)</th>
                  </tr>
                </thead>
                <tbody>
                  {zoneExposure.map((zone) => (
                    <tr key={zone.zone} className="border-b border-neutral-100">
                      <td className="py-2 font-medium text-neutral-900">{zone.zone}</td>
                      <td className="py-2 text-right text-neutral-700">{zone.cap}%</td>
                      <td className="py-2 text-right text-neutral-700">{(zone.preAmount / 1000000).toFixed(2)}m / {zone.prePercent}%</td>
                      <td className="py-2 text-right font-medium text-neutral-900">{(zone.postAmount / 1000000).toFixed(2)}m / {zone.postPercent}%</td>
                      <td className="py-2 text-right font-medium" style={{ color: zone.delta > 0 ? '#10b981' : '#ef4444' }}>
                        {zone.delta > 0 ? '+' : ''}{zone.delta}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-3 text-xs text-neutral-600">
              Head-room (post-loan) – Green {zoneExposure[0].headroom} pp, Yellow {zoneExposure[1].headroom} pp, Red {zoneExposure[2].headroom} pp under their respective caps.
            </div>
          </div>
        </div>

        {/* Right panel: Bullet gauges */}
        <div className="space-y-6">
          {/* LTV cascade */}
          <div className="bg-white rounded-md border border-neutral-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-neutral-200 bg-neutral-50">
              <div className="flex items-center">
                <div className="p-2 rounded-md bg-white border border-neutral-200 mr-3">
                  <Activity className="h-4 w-4 text-neutral-600" />
                </div>
                <h3 className="text-sm font-medium text-neutral-900 uppercase tracking-wider">Three-stage LTV Clip</h3>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Loan #11</div>
                {ltvClipStages.map((stage, index) => (
                  <div key={index} className="flex justify-between text-xs">
                    <span className="text-neutral-600">{stage.layer}</span>
                    <span className="font-medium text-neutral-900">{stage.multiplier}</span>
                  </div>
                ))}
                <div className="border-t border-neutral-200 pt-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-600">Final clip</span>
                    <span className="font-medium text-neutral-900">50%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-600">Advance funded</span>
                    <span className="font-medium text-neutral-900">18.8% LTV</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 text-xs text-neutral-600">
                31 pp of spare LTV capacity retained.
              </div>
            </div>
          </div>

          {/* VaR bar */}
          <div className="bg-white rounded-md border border-neutral-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-neutral-200 bg-neutral-50">
              <div className="flex items-center">
                <div className="p-2 rounded-md bg-white border border-neutral-200 mr-3">
                  <TrendingUp className="h-4 w-4 text-neutral-600" />
                </div>
                <h3 className="text-sm font-medium text-neutral-900 uppercase tracking-wider">VaR Analysis</h3>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">1-yr 95% VaR</div>
                <div className="relative h-6 bg-neutral-200 rounded">
                  <div
                    className="absolute h-full bg-orange-500 rounded"
                    style={{ width: `${(riskReturnMetrics.after.oneYrVaR95 / 15) * 100}%` }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                    {riskReturnMetrics.after.oneYrVaR95}% vs 15% limit
                  </div>
                </div>
                <div className="text-xs text-neutral-600">
                  Risk outputs from Simulation Engine, 10,000 Monte-Carlo paths.
                </div>
              </div>
            </div>
          </div>

          {/* Mini frontier plot + Scorecard */}
          <div className="bg-white rounded-md border border-neutral-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-neutral-200 bg-neutral-50">
              <div className="flex items-center">
                <div className="p-2 rounded-md bg-white border border-neutral-200 mr-3">
                  <Target className="h-4 w-4 text-neutral-600" />
                </div>
                <h3 className="text-sm font-medium text-neutral-900 uppercase tracking-wider">Efficient Frontier & Scorecard</h3>
              </div>
            </div>
            <div className="p-4">
              {/* Mini frontier plot */}
              <div className="h-32 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart data={efficientFrontier}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis
                      dataKey="vol"
                      stroke="#9ca3af"
                      fontSize={10}
                      tick={{ fontSize: 10 }}
                      tickFormatter={(value) => `${value}%`}
                      label={{ value: 'Vol σ', position: 'insideBottom', offset: -5, style: { fontSize: '10px' } }}
                    />
                    <YAxis
                      dataKey="expReturn"
                      stroke="#9ca3af"
                      fontSize={10}
                      tick={{ fontSize: 10 }}
                      tickFormatter={(value) => `${value}%`}
                      label={{ value: 'Return', angle: -90, position: 'insideLeft', style: { fontSize: '10px' } }}
                    />
                    <Tooltip
                      formatter={(value: number, name: string) => [`${value}%`, name]}
                      labelFormatter={(label: any, payload: any) => {
                        if (payload && payload.length > 0) {
                          return payload[0].payload.name;
                        }
                        return label;
                      }}
                      labelStyle={{ color: '#374151', fontSize: '12px' }}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '12px'
                      }}
                    />
                    <Scatter dataKey="expReturn" fill="#14b8a6" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>

              {/* Scorecard */}
              <div className="space-y-2 text-xs">
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Key Metrics (After Mosman)</div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Portfolio β</span>
                    <span className="font-medium text-neutral-900">{riskReturnMetrics.after.portfolioBeta}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Expected IRR</span>
                    <span className="font-medium text-neutral-900">{riskReturnMetrics.after.expectedNetIRR}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Sharpe</span>
                    <span className="font-medium text-neutral-900">{riskReturnMetrics.after.sharpe}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Loans/Zones</span>
                    <span className="font-medium text-neutral-900">{riskReturnMetrics.after.loansUniqueZones}</span>
                  </div>
                </div>
                <div className="text-xs text-neutral-600 mt-2">
                  Mosman pushes the fund upwards along the return axis with a minimal volatility uptick.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyPortfolioAnalysis;
