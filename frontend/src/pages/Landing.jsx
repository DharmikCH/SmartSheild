import { NavLink } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0f1419] flex flex-col">
      {/* Navigation */}
      <nav className="h-[72px] bg-[#1a1f2e] border-b border-[#2a3142] flex items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#6EE7B7] flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
            </svg>
          </div>
          <span className="text-lg font-bold text-white">SmartGuard</span>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          {/* Removed links to keep it blank as requested */}
        </div>

        <NavLink
          to="/analyzer"
          className="px-5 py-2 bg-white text-[#0f1419] text-sm font-semibold rounded-full hover:bg-gray-100 transition-colors"
        >
          Get Started
        </NavLink>
      </nav>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20">
        {/* Announcement badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 border border-[#10b981]/30 rounded-full">
          <div className="w-2 h-2 rounded-full bg-[#10b981]"></div>
          <span className="text-sm text-[#10b981]">Free smart contract scanner — no signup needed</span>
        </div>

        {/* Hero headline */}
        <h1 className="text-5xl lg:text-7xl font-bold text-white text-center max-w-4xl leading-tight mb-6">
          Audit Smarter.<br />
          <span className="text-[#10b981]">Deploy Safer.</span>
        </h1>

        {/* Subheading */}
        <p className="text-center text-gray-400 text-lg max-w-2xl mb-12">
          Paste your Solidity code and get a full security report in seconds — vulnerabilities, risk score, and fix suggestions included.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
          <NavLink
            to="/analyzer"
            className="px-8 py-3 bg-white text-[#0f1419] font-semibold rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
          >
            Analyze a contract
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </NavLink>
        </div>

        {/* Trust indicators */}
        {/* Trust indicators */}
        <div className="w-full max-w-4xl border-t border-[#2a3142] pt-12 mt-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-[#10b981] mb-2">5+</div>
            <div className="text-sm text-gray-400 font-medium">Vulnerability patterns detected</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#10b981] mb-2">3</div>
            <div className="text-sm text-gray-400 font-medium">Risk levels classified</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#10b981] mb-2">100%</div>
            <div className="text-sm text-gray-400 font-medium">Static analysis, no runtime needed</div>
          </div>
        </div>
      </div>
    </div>
  );
}
