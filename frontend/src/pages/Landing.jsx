import { NavLink } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0f1419] flex flex-col">
      {/* Navigation */}
      <nav className="h-[72px] bg-[#1a1f2e] border-b border-[#2a3142] flex items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
            </svg>
          </div>
          <span className="text-lg font-bold text-white">SmartGuard</span>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          <NavLink to="/landing" className="text-gray-400 hover:text-white transition-colors text-sm">Features</NavLink>
          <NavLink to="/landing" className="text-gray-400 hover:text-white transition-colors text-sm">Testimonials</NavLink>
          <NavLink to="/landing" className="text-gray-400 hover:text-white transition-colors text-sm">Pricing</NavLink>
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
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-[#1a1f2e] border border-[#2a3142] rounded-full">
          <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="text-sm text-gray-400">Introducing v2.0 — Now with AI</span>
        </div>

        {/* Hero headline */}
        <h1 className="text-5xl lg:text-7xl font-bold text-white text-center max-w-4xl leading-tight mb-6">
          Build faster.<br />
          <span className="text-gray-500">Ship smarter.</span>
        </h1>

        {/* Subheading */}
        <p className="text-center text-gray-400 text-lg max-w-2xl mb-12">
          The all-in-one platform that helps teams build, deploy, and scale their products 10x faster. No complexity, just results.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <NavLink
            to="/analyzer"
            className="px-8 py-3 bg-white text-[#0f1419] font-semibold rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
          >
            Start Free Trial
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </NavLink>
          <button className="px-8 py-3 border border-[#2a3142] text-white font-semibold rounded-full hover:bg-[#1a1f2e] transition-colors flex items-center justify-center gap-2">
            See how it works
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>

        {/* Trust indicators */}
        <div className="text-center text-sm text-gray-500">
          <p>Join 10,000+ teams already building faster</p>
        </div>
      </div>
    </div>
  );
}
