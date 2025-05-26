import React from 'react';
import { User, Home, DollarSign } from 'lucide-react';
import { mockLoanApplication } from '../../data/mockData';

const CaseStudyApplication: React.FC = () => {
  const application = mockLoanApplication;

  return (
    <div className="p-6 space-y-6">
      {/* Application Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Borrower Information */}
        <div className="bg-white rounded-md border border-neutral-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-neutral-200 bg-neutral-50">
            <div className="flex items-center">
              <div className="p-2 rounded-md bg-white border border-neutral-200 mr-3">
                <User className="h-4 w-4 text-neutral-600" />
              </div>
              <h3 className="text-sm font-medium text-neutral-900 uppercase tracking-wider">Borrower Profile</h3>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Name</div>
              <div className="text-sm font-medium text-neutral-900 mt-1">{application.borrower.name}</div>
            </div>
            <div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Annual Income</div>
              <div className="text-sm font-medium text-neutral-900 mt-1">
                ${application.borrower.annualIncome.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Employment Status</div>
              <div className="text-sm font-medium text-neutral-900 mt-1">Employed</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Age</div>
                <div className="text-sm font-medium text-neutral-900 mt-1">66 & 66</div>
              </div>
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Mortgage Balance</div>
                <div className="text-sm font-medium text-neutral-900 mt-1">$0</div>
              </div>
            </div>
            <div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Loan Amount Requested</div>
              <div className="text-sm font-medium text-neutral-900 mt-1">$500,000</div>
            </div>
            <div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Contact</div>
              <div className="text-sm font-medium text-neutral-900 mt-1 space-y-1">
                <div>{application.borrower.email}</div>
                <div>{application.borrower.phone}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Property Information */}
        <div className="bg-white rounded-md border border-neutral-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-neutral-200 bg-neutral-50">
            <div className="flex items-center">
              <div className="p-2 rounded-md bg-white border border-neutral-200 mr-3">
                <Home className="h-4 w-4 text-neutral-600" />
              </div>
              <h3 className="text-sm font-medium text-neutral-900 uppercase tracking-wider">Property Details</h3>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Address</div>
              <div className="text-sm font-medium text-neutral-900 mt-1">{application.property.address}</div>
              <div className="text-xs text-neutral-600">
                {application.property.suburb}, {application.property.state} {application.property.postcode}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Property Type</div>
                <div className="text-sm font-medium text-neutral-900 mt-1 capitalize">{application.property.type}</div>
              </div>
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Land Size</div>
                <div className="text-sm font-medium text-neutral-900 mt-1">{application.property.landSize} sqm</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Home Size</div>
                <div className="text-sm font-medium text-neutral-900 mt-1">271 sqm</div>
              </div>
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Bedrooms</div>
                <div className="text-sm font-medium text-neutral-900 mt-1">{application.property.bedrooms}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Bathrooms</div>
                <div className="text-sm font-medium text-neutral-900 mt-1">{application.property.bathrooms}</div>
              </div>
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">PropTrack AVM</div>
                <div className="text-sm font-medium text-neutral-900 mt-1">
                  ${application.property.originalValue.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loan Information */}
        <div className="bg-white rounded-md border border-neutral-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-neutral-200 bg-neutral-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 rounded-md bg-white border border-neutral-200 mr-3">
                  <DollarSign className="h-4 w-4 text-neutral-600" />
                </div>
                <h3 className="text-sm font-medium text-neutral-900 uppercase tracking-wider">Platform Generated Loan Structure</h3>
              </div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Optimized</div>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Loan Amount</div>
              <div className="text-sm font-medium text-neutral-900 mt-1">
                $500,000
              </div>
            </div>
            <div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Purpose</div>
              <div className="text-sm font-medium text-neutral-900 mt-1">{application.loan.purpose}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">LTV Ratio</div>
                <div className="text-sm font-medium text-neutral-900 mt-1">{application.loan.ltv.toFixed(2)}%</div>
              </div>
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Term</div>
                <div className="text-sm font-medium text-neutral-900 mt-1">{application.loan.term} years</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Interest Rate</div>
                <div className="text-sm font-medium text-neutral-900 mt-1">{application.loan.interestRate}%</div>
              </div>
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Origination Fee</div>
                <div className="text-sm font-medium text-neutral-900 mt-1">{application.loan.originationFee}%</div>
              </div>
            </div>
            <div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Monthly Payment</div>
              <div className="text-sm font-medium text-neutral-900 mt-1">$0</div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Status */}
      <div className="bg-white rounded-md border border-neutral-200 shadow-sm p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Status</div>
              <div className="text-sm font-medium text-neutral-900 mt-1">{application.status}</div>
            </div>
            <div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Application ID</div>
              <div className="text-sm font-medium text-neutral-900 mt-1">{application.id}</div>
            </div>
          </div>
          <div>
            <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Submitted</div>
            <div className="text-sm font-medium text-neutral-900 mt-1">
              {new Date(application.submittedAt).toLocaleDateString('en-AU', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyApplication;
