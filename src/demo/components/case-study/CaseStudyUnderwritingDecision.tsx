import React from 'react';
import { FileText, CheckCircle, AlertTriangle, TrendingUp, Target, Users, Home, Shield } from 'lucide-react';

const CaseStudyUnderwritingDecision: React.FC = () => {

  // 1. Executive Summary
  const executiveSummary = {
    borrowers: "Thomas & Sabrina – age 66 (retired professionals, $200k passive income)",
    purpose: "'Bank of Mum & Dad' – gift/loan to adult children; no liquidity distress",
    advance: "A$0.50m (18.8% LTV on A$2.80m AVM)",
    term: "10 years, no monthly payments",
    economics: "3% origination fee (GP revenue) + 5% simple interest (capitalised) + 18.8% appreciation share",
    decision: "RECOMMEND APPROVAL – unanimous IC vote sought"
  };

  // 2. Borrower & Property Snapshot
  const borrowerSnapshot = [
    "Married, children independent",
    "Zero consumer debt",
    "Credit score 802",
    "$2.0m net worth (ex-home)"
  ];

  const propertySnapshot = [
    "4 BR / 3 BA house, 271 m² internal",
    "676 m² land, 1 km to Mosman Village",
    "Built 1925, major reno 2016 (structural + roof)",
    "Flood/fire overlays: nil"
  ];

  // 3. Three-Stage Risk Framework (from previous tabs)
  const threeStageFramework = {
    propertyStage: {
      unitRiskScore: 0.32,
      rating: "Low",
      baselineClip: 70,
      propertyRiskFactor: 0.84,
      resultingClip: 59, // 70% × 0.84
      keyFactors: ["Alpha: -1.5% p.a.", "Beta: 1.28 vs property", "Condition: 1925 build, renovated 2016"]
    },
    suburbStage: {
      tfsColour: "Green",
      mlScore: 0.18,
      zoneLiquidityFactor: 0.90,
      resultingClip: 53, // 59% × 0.90
      keyFactors: ["46 vs 62 days on market", "A$198k vs A$110k income", "97th vs 65th percentile SEIFA"]
    },
    portfolioStage: {
      currentVaR: 12.0,
      varLimit: 15.0,
      portfolioBuffer: 0.95,
      finalClip: 50, // 53% × 0.95
      keyFactors: ["Green weight: 57.1% (within 70% cap)", "Portfolio β: 0.97 (within 0.9-1.1)", "VaR: 12% (3pp headroom)"]
    }
  };

  // 4. Returns Profile
  const returnsProfile = [
    {
      scenario: "Base-case (CAGR: Prop 5.9%, Suburb 7.9%)",
      irr: "13.6%",
      moic: "1.41×",
      comments: "Prob-weighted"
    },
    {
      scenario: "–10% price path shock (1-σ)",
      irr: "10.4%",
      moic: "1.28×",
      comments: "Still above hurdle"
    },
    {
      scenario: "GFC-style 20% drawdown yr 2",
      irr: "7.7%",
      moic: "1.18×",
      comments: "Inside downside guard-rail"
    },
    {
      scenario: "95th percentile bull-case",
      irr: "18.8%",
      moic: "1.67×",
      comments: "Upside captured via equity share"
    }
  ];

  // 5. Portfolio Impact
  const portfolioImpact = [
    "Green weight ↑ 2.1 pp to 57.1% (12.9 pp head-room)",
    "β_fund ↑ 0.03 to 0.97 (within 0.9-1.1 band)",
    "VaR +0.2 pp to 12.0% (3 pp inside limit)",
    "Expected net IRR ↑ 20 bp to 13.2%"
  ];

  // 6. Covenants & Monitoring
  const covenants = [
    { covenant: "Fund VaR (95%, 1 yr)", threshold: "15%", status: "12.0%", passed: true },
    { covenant: "Max Zone (Green)", threshold: "70%", status: "57.1%", passed: true },
    { covenant: "Single-Suburb cap", threshold: "7% GAV", status: "4.8%", passed: true },
    { covenant: "Weighted LTV", threshold: "≤ 45%", status: "33%", passed: true }
  ];



  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-md border border-neutral-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-neutral-200 bg-neutral-50">
          <div className="flex items-center">
            <div className="p-2 rounded-md bg-white border border-neutral-200 mr-3">
              <FileText className="h-4 w-4 text-neutral-600" />
            </div>
            <h3 className="text-sm font-medium text-neutral-900 uppercase tracking-wider">Underwriting Decision</h3>
          </div>
        </div>
        <div className="p-6">
          <div className="text-center">
            <div className="text-lg font-semibold text-neutral-900">Investment Committee Memo</div>
            <div className="text-sm text-neutral-600 mt-1">Loan #11: 49A Central Avenue, Mosman NSW 2088</div>
          </div>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="bg-white rounded-md border border-neutral-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-neutral-200 bg-neutral-50">
          <div className="flex items-center">
            <div className="p-2 rounded-md bg-white border border-neutral-200 mr-3">
              <Target className="h-4 w-4 text-neutral-600" />
            </div>
            <h3 className="text-sm font-medium text-neutral-900 uppercase tracking-wider">Executive Summary</h3>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Borrowers</div>
                <div className="text-sm text-neutral-900 mt-1">Thomas & Sabrina, age 66 (retired professionals, A$200k passive income)</div>
              </div>
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Purpose</div>
                <div className="text-sm text-neutral-900 mt-1">'Bank of Mum & Dad' – gift/loan to adult children</div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Structure</div>
                <div className="text-sm text-neutral-900 mt-1">A$0.50M advance (18.8% LTV), 10-year term, no monthly payments</div>
              </div>
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Economics</div>
                <div className="text-sm text-neutral-900 mt-1">3% origination + 5% simple interest + 18.8% appreciation share</div>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
            <div className="text-center">
              <div className="text-lg font-semibold text-green-700">RECOMMEND APPROVAL</div>
              <div className="text-sm text-green-600 mt-1">All risk parameters within mandate</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Borrower & Property Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-md border border-neutral-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-neutral-200 bg-neutral-50">
            <div className="flex items-center">
              <div className="p-2 rounded-md bg-white border border-neutral-200 mr-3">
                <Users className="h-4 w-4 text-neutral-600" />
              </div>
              <h3 className="text-sm font-medium text-neutral-900 uppercase tracking-wider">Borrower</h3>
            </div>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {borrowerSnapshot.map((item, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                  <span className="text-sm text-neutral-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md border border-neutral-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-neutral-200 bg-neutral-50">
            <div className="flex items-center">
              <div className="p-2 rounded-md bg-white border border-neutral-200 mr-3">
                <Home className="h-4 w-4 text-neutral-600" />
              </div>
              <h3 className="text-sm font-medium text-neutral-900 uppercase tracking-wider">Property</h3>
            </div>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {propertySnapshot.map((item, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                  <span className="text-sm text-neutral-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Three-Stage Risk Framework */}
      <div className="bg-white rounded-md border border-neutral-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-neutral-200 bg-neutral-50">
          <div className="flex items-center">
            <div className="p-2 rounded-md bg-white border border-neutral-200 mr-3">
              <Shield className="h-4 w-4 text-neutral-600" />
            </div>
            <h3 className="text-sm font-medium text-neutral-900 uppercase tracking-wider">Three-Stage Risk Framework</h3>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Property Stage */}
            <div className="text-center">
              <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium mb-2">Property Stage</div>
              <div className="text-3xl font-bold text-neutral-900">{threeStageFramework.propertyStage.resultingClip}%</div>
              <div className="text-xs text-neutral-500 mt-1">70% × 0.84</div>
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Unit Risk Score</span>
                  <span className="font-medium">{threeStageFramework.propertyStage.unitRiskScore} ({threeStageFramework.propertyStage.rating})</span>
                </div>
                <div className="border-t border-neutral-200 pt-2">
                  <div className="text-neutral-600 mb-1">Key Factors:</div>
                  {threeStageFramework.propertyStage.keyFactors.map((factor, i) => (
                    <div key={i} className="text-neutral-700">• {factor}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Suburb Stage */}
            <div className="text-center">
              <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium mb-2">Suburb Stage</div>
              <div className="text-3xl font-bold text-neutral-900">{threeStageFramework.suburbStage.resultingClip}%</div>
              <div className="text-xs text-neutral-500 mt-1">59% × 0.90</div>
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-600">TFS Classification</span>
                  <span className="font-medium text-green-600">{threeStageFramework.suburbStage.tfsColour}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">ML Score</span>
                  <span className="font-medium">{threeStageFramework.suburbStage.mlScore}</span>
                </div>
                <div className="border-t border-neutral-200 pt-2">
                  <div className="text-neutral-600 mb-1">Key Factors:</div>
                  {threeStageFramework.suburbStage.keyFactors.map((factor, i) => (
                    <div key={i} className="text-neutral-700">• {factor}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Portfolio Stage */}
            <div className="text-center">
              <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium mb-2">Portfolio Stage</div>
              <div className="text-3xl font-bold text-green-600">{threeStageFramework.portfolioStage.finalClip}%</div>
              <div className="text-xs text-neutral-500 mt-1">53% × 0.95</div>
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Current VaR</span>
                  <span className="font-medium">{threeStageFramework.portfolioStage.currentVaR}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">VaR Limit</span>
                  <span className="font-medium">{threeStageFramework.portfolioStage.varLimit}%</span>
                </div>
                <div className="border-t border-neutral-200 pt-2">
                  <div className="text-neutral-600 mb-1">Key Factors:</div>
                  {threeStageFramework.portfolioStage.keyFactors.map((factor, i) => (
                    <div key={i} className="text-neutral-700">• {factor}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Framework Summary */}
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
            <div className="text-center">
              <div className="text-lg font-semibold text-green-700">Final LTV Clip: 50%</div>
              <div className="text-sm text-green-600 mt-1">Loan advance: 18.8% LTV → 31.2pp safety margin</div>
            </div>
          </div>
        </div>
      </div>

      {/* Returns Analysis */}
      <div className="bg-white rounded-md border border-neutral-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-neutral-200 bg-neutral-50">
          <div className="flex items-center">
            <div className="p-2 rounded-md bg-white border border-neutral-200 mr-3">
              <TrendingUp className="h-4 w-4 text-neutral-600" />
            </div>
            <h3 className="text-sm font-medium text-neutral-900 uppercase tracking-wider">Returns Analysis</h3>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {returnsProfile.map((scenario, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium mb-2">
                  {scenario.scenario.includes('Base-case') ? 'Base Case' :
                   scenario.scenario.includes('shock') ? 'Stress Test' :
                   scenario.scenario.includes('GFC') ? 'Downside' : 'Upside'}
                </div>
                <div className="text-2xl font-bold text-neutral-900">{scenario.irr}</div>
                <div className="text-xs text-neutral-500">IRR (net)</div>
                <div className="text-lg font-semibold text-neutral-700 mt-2">{scenario.moic}</div>
                <div className="text-xs text-neutral-500">MoIC</div>
                <div className="mt-3 text-xs text-neutral-600">{scenario.comments}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio Impact & Covenant Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-md border border-neutral-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-neutral-200 bg-neutral-50">
            <div className="flex items-center">
              <div className="p-2 rounded-md bg-white border border-neutral-200 mr-3">
                <Target className="h-4 w-4 text-neutral-600" />
              </div>
              <h3 className="text-sm font-medium text-neutral-900 uppercase tracking-wider">Portfolio Impact</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {portfolioImpact.map((item, index) => (
                <div key={index} className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                  <span className="text-neutral-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md border border-neutral-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-neutral-200 bg-neutral-50">
            <div className="flex items-center">
              <div className="p-2 rounded-md bg-white border border-neutral-200 mr-3">
                <Shield className="h-4 w-4 text-neutral-600" />
              </div>
              <h3 className="text-sm font-medium text-neutral-900 uppercase tracking-wider">Covenant Compliance</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {covenants.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-neutral-700">{item.covenant}</span>
                  <div className="flex items-center">
                    <span className="font-medium text-neutral-900 mr-2">{item.status}</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-200 text-xs text-neutral-600">
              <strong>Monitoring:</strong> Monthly AVM updates + TFS classification review
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyUnderwritingDecision;
