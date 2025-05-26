import React, { useState } from 'react';
import { Button } from './components/ui/button';
import { ChevronLeft, ChevronRight, Home, FileText, MapPin, BarChart2, CheckCircle, DollarSign } from 'lucide-react';
import { ApiProvider } from './standalone/contexts/ApiContext';

// Case Study Slides
import CaseStudyApplication from './components/case-study/CaseStudyApplication';
import CaseStudySuburbAnalysis from './components/case-study/CaseStudySuburbAnalysis';
import CaseStudyPropertyAnalysis from './components/case-study/CaseStudyPropertyAnalysis';
import CaseStudyPortfolioAnalysis from './components/case-study/CaseStudyPortfolioAnalysis';
import CaseStudyUnderwritingDecision from './components/case-study/CaseStudyUnderwritingDecision';
import CaseStudyFinancialProjections from './components/case-study/CaseStudyFinancialProjections';

// Import standalone styles
import './standalone/styles.css';

const CaseStudyDemo: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 'application',
      title: 'Loan Application',
      subtitle: 'Thomas & Sabrina - Mosman Property',
      icon: FileText,
      component: CaseStudyApplication
    },
    {
      id: 'property-analysis',
      title: 'Property Analysis',
      subtitle: 'Unit-Level Risk Assessment',
      icon: Home,
      component: CaseStudyPropertyAnalysis
    },
    {
      id: 'suburb-analysis',
      title: 'Suburb Analysis',
      subtitle: 'Mosman Traffic Light Classification',
      icon: MapPin,
      component: CaseStudySuburbAnalysis
    },
    {
      id: 'portfolio-analysis',
      title: 'Portfolio Analysis',
      subtitle: 'Portfolio Fit & Allocation',
      icon: BarChart2,
      component: CaseStudyPortfolioAnalysis
    },
    {
      id: 'underwriting-decision',
      title: 'Underwriting Decision',
      subtitle: 'AI Scoring & IC Memo',
      icon: CheckCircle,
      component: CaseStudyUnderwritingDecision
    },
    {
      id: 'financial-projections',
      title: 'Financial Projections',
      subtitle: 'Return Modeling & Scenarios',
      icon: DollarSign,
      component: CaseStudyFinancialProjections
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const CurrentSlideComponent = slides[currentSlide].component;

  return (
    <ApiProvider>
      <div className="min-h-screen bg-neutral-50 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
          <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div className="flex items-center space-x-3">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0"
                  >
                    {/* Roof */}
                    <path
                      d="M10 50L50 10L90 50"
                      stroke="#4f46e5"
                      strokeWidth="18"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    {/* Green Squares */}
                    <rect x="35" y="55" width="12" height="12" rx="2" fill="#14b8a6" />
                    <rect x="53" y="55" width="12" height="12" rx="2" fill="#14b8a6" />
                    <rect x="35" y="73" width="12" height="12" rx="2" fill="#14b8a6" />
                    <rect x="53" y="73" width="12" height="12" rx="2" fill="#14b8a6" />
                  </svg>
                  <div>
                    <div className="text-lg font-semibold text-neutral-900">
                      Equihome Partners
                    </div>
                    <div className="text-xs text-neutral-500 -mt-0.5">
                      Investment Case Study
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">
                  Case Study Analysis
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Progress Navigation */}
        <div className="bg-white border-b border-neutral-200">
          <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-1">
                {slides.map((slide, index) => {
                  const Icon = slide.icon;
                  const isActive = index === currentSlide;
                  const isCompleted = index < currentSlide;

                  return (
                    <button
                      key={slide.id}
                      onClick={() => goToSlide(index)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-xs font-medium transition-colors duration-150 ${
                        isActive
                          ? 'bg-primary-50 text-primary-700 border border-primary-200'
                          : isCompleted
                          ? 'text-secondary-600 hover:text-secondary-700 hover:bg-secondary-50'
                          : 'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50'
                      }`}
                    >
                      <div className={`p-1 rounded ${
                        isActive
                          ? 'bg-primary-100 text-primary-600'
                          : isCompleted
                          ? 'bg-secondary-100 text-secondary-600'
                          : 'bg-neutral-100 text-neutral-500'
                      }`}>
                        <Icon className="h-3 w-3" />
                      </div>
                      <span className="hidden lg:inline">{slide.title}</span>
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">
                  Step {currentSlide + 1} of {slides.length}
                </div>
                <div className="w-24 bg-neutral-200 rounded-full h-1">
                  <div
                    className="bg-primary-500 h-1 rounded-full transition-all duration-300"
                    style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 max-w-full mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-neutral-900">{slides[currentSlide].title}</h1>
                <p className="text-sm text-neutral-500 mt-1">{slides[currentSlide].subtitle}</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">
                  {new Date().toLocaleDateString('en-AU', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Slide Content */}
          <div className="bg-white rounded-md shadow-card border border-neutral-200">
            <CurrentSlideComponent />
          </div>
        </main>

        {/* Navigation Footer */}
        <footer className="bg-white border-t border-neutral-200">
          <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className={`inline-flex items-center px-4 py-2 border border-neutral-300 shadow-sm text-sm font-medium rounded-md transition-colors duration-150 ${
                  currentSlide === 0
                    ? 'text-neutral-400 bg-neutral-50 cursor-not-allowed'
                    : 'text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none'
                }`}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </button>

              <div className="flex items-center space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors duration-150 ${
                      index === currentSlide
                        ? 'bg-primary-500'
                        : index < currentSlide
                        ? 'bg-secondary-500'
                        : 'bg-neutral-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                disabled={currentSlide === slides.length - 1}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-150 ${
                  currentSlide === slides.length - 1
                    ? 'text-neutral-400 bg-neutral-100 cursor-not-allowed'
                    : 'text-white bg-primary-600 hover:bg-primary-700 focus:outline-none'
                }`}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        </footer>
      </div>
    </ApiProvider>
  );
};

export default CaseStudyDemo;
