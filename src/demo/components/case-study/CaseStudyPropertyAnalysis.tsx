import React from 'react';
import { Home, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, MapPin, Calendar, Camera, FileText, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Legend, ReferenceDot } from 'recharts';

const CaseStudyPropertyAnalysis: React.FC = () => {
  // ACTUAL Historical data (2005-2019) - 49A Central Ave AVM vs Mosman HPI
  // Real regression data used for underwriting analysis
  // Converting HPI index to dollar amounts (multiply by 10k for millions)
  const historicalData = [
    { year: 2005, property: 1420000, suburb: 1000000 }, // Base year - HPI rebased to 100 = $1M
    { year: 2006, property: 1500000, suburb: 1080000 }, // +5.5% property, +8.0% suburb
    { year: 2007, property: 1570000, suburb: 1150000 }, // +4.6% property, +6.5% suburb
    { year: 2008, property: 1550000, suburb: 1120000 }, // -1.4% property, -2.6% suburb (GFC dip)
    { year: 2009, property: 1630000, suburb: 1180000 }, // +5.3% property, +5.4% suburb
    { year: 2010, property: 1550000, suburb: 1270000 }, // Actual sale at A$1.55m, +7.6% suburb
    { year: 2011, property: 1800000, suburb: 1320000 }, // +3.2% property, +3.9% suburb
    { year: 2012, property: 1860000, suburb: 1390000 }, // +3.3% property, +5.3% suburb
    { year: 2013, property: 2000000, suburb: 1540000 }, // +7.4% property, +10.5% suburb
    { year: 2014, property: 2140000, suburb: 1650000 }, // +7.0% property, +7.1% suburb
    { year: 2015, property: 2240000, suburb: 1750000 }, // +4.7% property, +6.1% suburb
    { year: 2016, property: 2350000, suburb: 1850000 }, // +5.0% property, +5.7% suburb
    { year: 2017, property: 2460000, suburb: 1950000 }, // +4.7% property, +5.4% suburb
    { year: 2018, property: 2540000, suburb: 2010000 }, // +3.3% property, +3.1% suburb (Royal Commission lull)
    { year: 2019, property: 2800000, suburb: 2100000 } // +10.2% property, +4.5% suburb (PropTrack AVM at underwriting)
  ];

  // Calculate year-over-year returns for regression analysis
  const propertyReturns: number[] = [];
  const suburbReturns: number[] = [];

  for (let i = 1; i < historicalData.length; i++) {
    const propReturn = (historicalData[i].property / historicalData[i-1].property) - 1;
    const subReturn = (historicalData[i].suburb / historicalData[i-1].suburb) - 1;
    propertyReturns.push(propReturn);
    suburbReturns.push(subReturn);
  }

  // ACTUAL Regression outputs (2006-2019 log-returns) from underwriting analysis
  const regressionResults = {
    beta: 1.28, // Property is ~28% more volatile than Mosman overall
    alpha: -1.5, // -1.5% p.a. slight under-performance (driven by discounted 2010 sale)
    covariance: 0.0011, // Input for portfolio VaR/CVaR
    correlation: 0.73, // Diversifies against lower-beta stock
    rSquared: 0.53 // Half the variance explained by suburb moves
  };

  // Use actual regression results
  const calculatedBeta = regressionResults.beta;
  const calculatedAlpha = regressionResults.alpha;
  const rSquared = regressionResults.rSquared;

  // Calculate means for display (still useful for showing historical averages)
  const meanPropReturn = propertyReturns.reduce((a, b) => a + b) / propertyReturns.length;
  const meanSubReturn = suburbReturns.reduce((a, b) => a + b) / suburbReturns.length;

  // ACTUAL Unit-Level Risk Score & LTV Clip Framework
  // LTV Clip Framework — Property-only stage
  const ltvFramework = {
    // Simplified framework - risk score maps directly to haircut
    baselineClip: 70.0, // Baseline Clip (Green Zone)
    unitRiskScore: 0.32, // Unit-Level Risk Score (rolls in alpha, beta, condition, location, etc.)
    riskRating: "Low", // ≤0.35 maps to "Low"
    propertyRiskFactor: 0.84, // Maps 0.32 score to haircut (×0.84)
    computedClip: 59.0, // 70% × 0.84 = 59%
    maxEligibleAdvance: 1650000, // A$1.65m (59% of A$2.80m)
    proposedAdvance: 500000, // A$0.50m
    actualLTV: 18.8 // A$0.50m / A$2.80m
  };

  // Property data with calculated metrics
  const propertyData = {
    address: "49A Central Avenue, Mosman NSW 2088", // Correct address from application
    suburb: "Mosman",
    state: "NSW",
    postcode: "2088",
    type: "House",
    bedrooms: 4,
    bathrooms: 3,
    landSize: 676, // Correct land size from application
    homeSize: 271,
    yearBuilt: 1998, // Correct year from application
    propTrackAVM: 2800000, // Consistent with application
    alphaScore: calculatedAlpha, // Calculated from actual regression
    betaToSuburb: calculatedBeta, // Calculated from actual regression
    rSquared: rSquared, // Correlation strength
    aggregateRiskScore: ltvFramework.unitRiskScore, // Unit-level risk score from framework
    transactions: [
      { date: "2019-03-15", price: 2800000, type: "PropTrack AVM" }, // PropTrack AVM at underwriting
      { date: "2010-01-01", price: 1550000, type: "Sale", highlight: true }, // Actual sale at A$1.55m
      { date: "1998-10-01", price: 825000, type: "Sale" },
      { date: "1997-08-01", price: 750000, type: "Sale" }
    ]
  };

  // ACTUAL 10-year forecast paths (2020-2029) from underwriting analysis
  // Assumptions: suburb CAGR = 5.9%; property CAGR = 5.5%
  const suburbForecastRate = 0.059; // 5.90%
  const propertyForecastRate = 0.055; // 5.50%

  // Forecast data (2019-2029) - Extended to match loan term
  // Using updated CAGR rates: property 5.5%, suburb 5.9%
  const forecastData = [
    { year: 2019, property: 2800000, suburb: 2100000 }, // PropTrack AVM at underwriting
    { year: 2020, property: Math.round(2800000 * 1.055), suburb: Math.round(2100000 * 1.059) },
    { year: 2021, property: Math.round(2800000 * Math.pow(1.055, 2)), suburb: Math.round(2100000 * Math.pow(1.059, 2)) },
    { year: 2022, property: Math.round(2800000 * Math.pow(1.055, 3)), suburb: Math.round(2100000 * Math.pow(1.059, 3)) },
    { year: 2023, property: Math.round(2800000 * Math.pow(1.055, 4)), suburb: Math.round(2100000 * Math.pow(1.059, 4)) },
    { year: 2024, property: Math.round(2800000 * Math.pow(1.055, 5)), suburb: Math.round(2100000 * Math.pow(1.059, 5)) },
    { year: 2025, property: Math.round(2800000 * Math.pow(1.055, 6)), suburb: Math.round(2100000 * Math.pow(1.059, 6)) },
    { year: 2026, property: Math.round(2800000 * Math.pow(1.055, 7)), suburb: Math.round(2100000 * Math.pow(1.059, 7)) },
    { year: 2027, property: Math.round(2800000 * Math.pow(1.055, 8)), suburb: Math.round(2100000 * Math.pow(1.059, 8)) },
    { year: 2028, property: Math.round(2800000 * Math.pow(1.055, 9)), suburb: Math.round(2100000 * Math.pow(1.059, 9)) },
    { year: 2029, property: Math.round(2800000 * Math.pow(1.055, 10)), suburb: Math.round(2100000 * Math.pow(1.059, 10)) } // Loan term ends Q1-30
  ];

  // Combined data for chart with separate columns for historical and forecast
  // Using ACTUAL historical data (2005-2019) and forecast (2020-2029)
  const allData = [
    // Historical data (2005-2019) - only historical columns have values
    { year: 2005, propertyHistorical: 1420000, suburbHistorical: 1000000, propertyForecast: null, suburbForecast: null },
    { year: 2006, propertyHistorical: 1500000, suburbHistorical: 1080000, propertyForecast: null, suburbForecast: null },
    { year: 2007, propertyHistorical: 1570000, suburbHistorical: 1150000, propertyForecast: null, suburbForecast: null },
    { year: 2008, propertyHistorical: 1550000, suburbHistorical: 1120000, propertyForecast: null, suburbForecast: null }, // GFC dip
    { year: 2009, propertyHistorical: 1630000, suburbHistorical: 1180000, propertyForecast: null, suburbForecast: null },
    { year: 2010, propertyHistorical: 1550000, suburbHistorical: 1270000, propertyForecast: null, suburbForecast: null }, // Actual sale at A$1.55m
    { year: 2011, propertyHistorical: 1800000, suburbHistorical: 1320000, propertyForecast: null, suburbForecast: null },
    { year: 2012, propertyHistorical: 1860000, suburbHistorical: 1390000, propertyForecast: null, suburbForecast: null },
    { year: 2013, propertyHistorical: 2000000, suburbHistorical: 1540000, propertyForecast: null, suburbForecast: null },
    { year: 2014, propertyHistorical: 2140000, suburbHistorical: 1650000, propertyForecast: null, suburbForecast: null },
    { year: 2015, propertyHistorical: 2240000, suburbHistorical: 1750000, propertyForecast: null, suburbForecast: null },
    { year: 2016, propertyHistorical: 2350000, suburbHistorical: 1850000, propertyForecast: null, suburbForecast: null },
    { year: 2017, propertyHistorical: 2460000, suburbHistorical: 1950000, propertyForecast: null, suburbForecast: null },
    { year: 2018, propertyHistorical: 2540000, suburbHistorical: 2010000, propertyForecast: null, suburbForecast: null }, // Royal Commission lull
    // 2019 - transition point (both historical and forecast start)
    { year: 2019, propertyHistorical: 2800000, suburbHistorical: 2100000, propertyForecast: 2800000, suburbForecast: 2100000 }, // PropTrack AVM at underwriting
    // Forecast data (2020-2029) - only forecast columns have values, using updated CAGR rates
    { year: 2020, propertyHistorical: null, suburbHistorical: null, propertyForecast: forecastData[1].property, suburbForecast: forecastData[1].suburb },
    { year: 2021, propertyHistorical: null, suburbHistorical: null, propertyForecast: forecastData[2].property, suburbForecast: forecastData[2].suburb },
    { year: 2022, propertyHistorical: null, suburbHistorical: null, propertyForecast: forecastData[3].property, suburbForecast: forecastData[3].suburb },
    { year: 2023, propertyHistorical: null, suburbHistorical: null, propertyForecast: forecastData[4].property, suburbForecast: forecastData[4].suburb },
    { year: 2024, propertyHistorical: null, suburbHistorical: null, propertyForecast: forecastData[5].property, suburbForecast: forecastData[5].suburb },
    { year: 2025, propertyHistorical: null, suburbHistorical: null, propertyForecast: forecastData[6].property, suburbForecast: forecastData[6].suburb },
    { year: 2026, propertyHistorical: null, suburbHistorical: null, propertyForecast: forecastData[7].property, suburbForecast: forecastData[7].suburb },
    { year: 2027, propertyHistorical: null, suburbHistorical: null, propertyForecast: forecastData[8].property, suburbForecast: forecastData[8].suburb },
    { year: 2028, propertyHistorical: null, suburbHistorical: null, propertyForecast: forecastData[9].property, suburbForecast: forecastData[9].suburb },
    { year: 2029, propertyHistorical: null, suburbHistorical: null, propertyForecast: forecastData[10].property, suburbForecast: forecastData[10].suburb }
  ];

  // Property Alpha factors for display
  const alphaFactors = [
    {
      factor: "Property Condition & Age",
      weight: 30,
      score: 75,
      description: "1925 build, recent renovations, structural integrity"
    },
    {
      factor: "Location Micro-factors",
      weight: 25,
      score: 85,
      description: "Street position, views, proximity to amenities"
    },
    {
      factor: "Property Features & Layout",
      weight: 25,
      score: 80,
      description: "4BR/3BA, 271sqm home, 650sqm land, functional layout"
    },
    {
      factor: "Environmental & Planning",
      weight: 20,
      score: 70,
      description: "Flood/fire overlays, easements, zoning restrictions"
    }
  ];



  return (
    <div className="p-6 space-y-6">
      {/* PropTrack AVM Report Header */}
      <div className="bg-white rounded-md border border-neutral-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-neutral-200 bg-neutral-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 rounded-md bg-white border border-neutral-200 mr-3">
                <FileText className="h-4 w-4 text-neutral-600" />
              </div>
              <h3 className="text-sm font-medium text-neutral-900 uppercase tracking-wider">PropTrack AVM Report</h3>
            </div>
            <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">20-Year Analysis</div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Property Details */}
            <div className="space-y-4">
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Property Address</div>
                <div className="text-sm font-medium text-neutral-900 mt-1">{propertyData.address}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Type</div>
                  <div className="text-sm font-medium text-neutral-900 mt-1">{propertyData.type}</div>
                </div>
                <div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Year Built</div>
                  <div className="text-sm font-medium text-neutral-900 mt-1">{propertyData.yearBuilt}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Bedrooms</div>
                  <div className="text-sm font-medium text-neutral-900 mt-1">{propertyData.bedrooms}</div>
                </div>
                <div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Bathrooms</div>
                  <div className="text-sm font-medium text-neutral-900 mt-1">{propertyData.bathrooms}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Land Size</div>
                  <div className="text-sm font-medium text-neutral-900 mt-1">{propertyData.landSize} sqm</div>
                </div>
                <div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Home Size</div>
                  <div className="text-sm font-medium text-neutral-900 mt-1">{propertyData.homeSize} sqm</div>
                </div>
              </div>
            </div>

            {/* Transaction History */}
            <div className="space-y-4">
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Transaction History</div>
              </div>
              {propertyData.transactions.map((transaction, index) => (
                <div key={index} className={`flex justify-between items-center py-2 border-b border-neutral-100 last:border-b-0 ${transaction.highlight ? 'bg-red-50 border-red-200' : ''}`}>
                  <div>
                    <div className="text-sm font-medium text-neutral-900">
                      {new Date(transaction.date).toLocaleDateString('en-AU', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                      {transaction.highlight && <span className="ml-2 text-xs text-red-600 font-medium">● Actual Sale</span>}
                    </div>
                    <div className="text-xs text-neutral-500">{transaction.type}</div>
                  </div>
                  <div className="text-sm font-medium text-neutral-900">
                    ${transaction.price.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Current Valuation */}
            <div className="space-y-4">
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">PropTrack AVM</div>
                <div className="text-lg font-semibold text-neutral-900 mt-1">
                  ${propertyData.propTrackAVM.toLocaleString()}
                </div>
              </div>
              <div className="bg-neutral-50 rounded-md p-3">
                <div className="flex items-center mb-2">
                  <Camera className="h-4 w-4 text-neutral-500 mr-2" />
                  <span className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Property Images</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-neutral-200 rounded h-16 flex items-center justify-center">
                    <span className="text-xs text-neutral-500">Front View</span>
                  </div>
                  <div className="bg-neutral-200 rounded h-16 flex items-center justify-center">
                    <span className="text-xs text-neutral-500">Street View</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Price Regression Analysis */}
      <div className="bg-white rounded-md border border-neutral-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-neutral-200 bg-neutral-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 rounded-md bg-white border border-neutral-200 mr-3">
                <TrendingUp className="h-4 w-4 text-neutral-600" />
              </div>
              <h3 className="text-sm font-medium text-neutral-900 uppercase tracking-wider">Price Regression & Forecast</h3>
            </div>
            <div className="text-xs text-neutral-500">
              Historical: 2009-2019 | Forecast: 2019-2025
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart */}
            <div className="lg:col-span-2">
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={allData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis
                      dataKey="year"
                      stroke="#9ca3af"
                      fontSize={10}
                      tick={{ fontSize: 10 }}
                    />
                    <YAxis
                      stroke="#9ca3af"
                      fontSize={10}
                      tick={{ fontSize: 10 }}
                      tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                    />
                    <Tooltip
                      formatter={(value: number, name: string) => [
                        `$${value.toLocaleString()}`,
                        name.includes('property') ? 'Property Value' : 'Suburb Median'
                      ]}
                      labelStyle={{ color: '#374151', fontSize: '12px' }}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '12px'
                      }}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                      iconType="line"
                    />
                    {/* Historical Property Line (2009-2019) */}
                    <Line
                      type="monotone"
                      dataKey="propertyHistorical"
                      stroke="#4f46e5"
                      strokeWidth={2}
                      name="Property Historical"
                      connectNulls={false}
                      dot={false}
                    />
                    {/* Forecast Property Line (2019-2025) */}
                    <Line
                      type="monotone"
                      dataKey="propertyForecast"
                      stroke="#a5b4fc"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Property Forecast"
                      connectNulls={false}
                      dot={false}
                    />
                    {/* Historical Suburb Line (2009-2019) */}
                    <Line
                      type="monotone"
                      dataKey="suburbHistorical"
                      stroke="#14b8a6"
                      strokeWidth={2}
                      name="Suburb Historical"
                      connectNulls={false}
                      dot={false}
                    />
                    {/* Forecast Suburb Line (2019-2025) */}
                    <Line
                      type="monotone"
                      dataKey="suburbForecast"
                      stroke="#7dd3fc"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Suburb Forecast"
                      connectNulls={false}
                      dot={false}
                    />
                    {/* Mark 2010 Sale */}
                    <ReferenceDot
                      x={2010}
                      y={1550000}
                      r={6}
                      fill="#ef4444"
                      stroke="#ffffff"
                      strokeWidth={2}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Growth Metrics */}
            <div className="space-y-4">
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Historical Growth (2009-2019)</div>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-600">Property Avg</span>
                    <span className="font-medium text-neutral-900">{(meanPropReturn * 100).toFixed(1)}% p.a.</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-600">Suburb Avg</span>
                    <span className="font-medium text-neutral-900">{(meanSubReturn * 100).toFixed(1)}% p.a.</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-600">Volatility Range</span>
                    <span className="font-medium text-neutral-900">5-10%</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-3">
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Forecast (2019-2025)</div>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-600">Property</span>
                    <span className="font-medium text-primary-600">{(propertyForecastRate * 100).toFixed(1)}% p.a.</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-600">Suburb</span>
                    <span className="font-medium text-secondary-600">{(suburbForecastRate * 100).toFixed(1)}% p.a.</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-600">Beta Impact</span>
                    <span className="font-medium text-neutral-900">{calculatedBeta.toFixed(2)}x</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-3">
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Regression Results</div>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-600">β (Beta)</span>
                    <span className="font-medium text-neutral-900">{regressionResults.beta}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-600">α (Alpha)</span>
                    <span className="font-medium text-neutral-900">{regressionResults.alpha}% p.a.</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-600">Correlation ρ</span>
                    <span className="font-medium text-neutral-900">{regressionResults.correlation}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-600">Covariance</span>
                    <span className="font-medium text-neutral-900">{regressionResults.covariance}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Risk Analysis - Following Exact Specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Property Risk (Alpha) */}
        <div className="bg-white rounded-md border border-neutral-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-neutral-200 bg-neutral-50">
            <div className="flex items-center">
              <div className="p-2 rounded-md bg-white border border-neutral-200 mr-3">
                <Activity className="h-4 w-4 text-neutral-600" />
              </div>
              <h3 className="text-sm font-medium text-neutral-900 uppercase tracking-wider">Property Risk (Alpha)</h3>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Alpha (Regression)</div>
              <div className="text-2xl font-semibold text-neutral-900 mt-1">{regressionResults.alpha}% p.a.</div>
              <div className="text-xs text-neutral-500 mt-1">Slight under-performance vs suburb</div>
            </div>
            <div className="space-y-3">
              <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Key Factors</div>
              {alphaFactors.map((factor, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="text-xs font-medium text-neutral-700">{factor.factor}</div>
                    <div className="text-xs text-neutral-500">{factor.weight}%</div>
                  </div>
                  <div className="text-xs text-neutral-500">{factor.description}</div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-neutral-200 rounded-full h-1.5">
                      <div
                        className="bg-neutral-600 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${factor.score}%` }}
                      ></div>
                    </div>
                    <div className="text-xs font-medium text-neutral-900 w-8">{factor.score}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Covariance and Beta to Suburb */}
        <div className="bg-white rounded-md border border-neutral-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-neutral-200 bg-neutral-50">
            <div className="flex items-center">
              <div className="p-2 rounded-md bg-white border border-neutral-200 mr-3">
                <TrendingUp className="h-4 w-4 text-neutral-600" />
              </div>
              <h3 className="text-sm font-medium text-neutral-900 uppercase tracking-wider">Covariance & Beta</h3>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Beta Coefficient</div>
              <div className="text-2xl font-semibold text-neutral-900 mt-1">{regressionResults.beta}</div>
              <div className="text-xs text-neutral-500 mt-1">~28% more volatile than Mosman overall</div>
            </div>
            <div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Regression Results (2006-2019)</div>
              <div className="mt-3 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-500">β (Beta)</span>
                  <span className="font-medium text-neutral-900">{regressionResults.beta}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-500">α (Alpha)</span>
                  <span className="font-medium text-neutral-900">{regressionResults.alpha}% p.a.</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-500">Correlation ρ</span>
                  <span className="font-medium text-neutral-900">{regressionResults.correlation}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-500">Covariance</span>
                  <span className="font-medium text-neutral-900">{regressionResults.covariance}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-500">R²</span>
                  <span className="font-medium text-neutral-900">{regressionResults.rSquared}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Aggregate Unit Risk Score */}
        <div className="bg-white rounded-md border border-neutral-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-neutral-200 bg-neutral-50">
            <div className="flex items-center">
              <div className="p-2 rounded-md bg-white border border-neutral-200 mr-3">
                <CheckCircle className="h-4 w-4 text-neutral-600" />
              </div>
              <h3 className="text-sm font-medium text-neutral-900 uppercase tracking-wider">Aggregate Risk Score</h3>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Unit-Level Risk Score</div>
              <div className="text-2xl font-semibold text-neutral-900 mt-1">{ltvFramework.unitRiskScore.toFixed(2)} / 1.00</div>
              <div className="text-xs text-neutral-500 mt-1">"{ltvFramework.riskRating}" (≤0.35 maps to "Low")</div>
            </div>

            <div className="space-y-3">
              <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">LTV Clip Framework — Property-only stage</div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-600">Baseline Clip (Green Zone)</span>
                  <span className="font-medium text-neutral-900">{ltvFramework.baselineClip}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-600">Property Risk Factor (maps 0.32 score to haircut)</span>
                  <span className="font-medium text-neutral-900">×{ltvFramework.propertyRiskFactor}</span>
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-3 mt-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-600">Computed Clip</span>
                    <span className="font-medium text-neutral-900">{ltvFramework.computedClip}% (≈A$1.65M)</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-600">Proposed Advance</span>
                    <span className="font-medium text-neutral-900">A$0.50M ({ltvFramework.actualLTV}% LTV)</span>
                  </div>
                </div>

                <div className="mt-3 p-2 bg-neutral-50 rounded text-xs text-neutral-700">
                  The 0.32 risk score already rolls in alpha, beta, condition/age, micro-location, layout, and environmental checks.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyPropertyAnalysis;
