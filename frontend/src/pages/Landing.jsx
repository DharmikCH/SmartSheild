import { NavLink } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 lg:px-12 py-6 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
            <svg className="w-[18px] h-[18px] text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
            </svg>
          </div>
          <span className="text-[18px] font-bold text-gray-900 tracking-tight">SmartGuard</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-6 lg:px-12 py-20">
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* Headline */}
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Intelligent Security Analysis for Modern Applications
          </h1>

          {/* Subheading */}
          <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
            SmartGuard leverages advanced AI to analyze your codebase, identify vulnerabilities, and provide real-time security insights with unparalleled accuracy.
          </p>

          {/* CTA Button */}
          <div className="pt-4">
            <NavLink
              to="/analyzer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white text-base font-semibold rounded-full hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start Free Analysis
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </NavLink>
          </div>

          {/* Trust indicators */}
          <div className="pt-8 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <p className="text-2xl font-bold text-primary-600">10K+</p>
              <p className="text-sm text-gray-600">Code Analyses</p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-primary-600">99.9%</p>
              <p className="text-sm text-gray-600">Detection Accuracy</p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-primary-600">{'<'} 2sec</p>
              <p className="text-sm text-gray-600">Analysis Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 lg:px-12 py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-16" style={{ fontFamily: "'Playfair Display', serif" }}>
            Why SmartGuard
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 hover:border-primary-200 transition-colors">
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5.36 4.24l-.707-.707M5.34 7.34l.707.707" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Real-time Analysis</h3>
              <p className="text-gray-600">Instant scanning of your codebase with AI-powered vulnerability detection in seconds.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 hover:border-primary-200 transition-colors">
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Advanced Insights</h3>
              <p className="text-gray-600">Deep analysis with actionable recommendations to strengthen your application security.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 hover:border-primary-200 transition-colors">
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Cost Effective</h3>
              <p className="text-gray-600">Reduce security breaches and compliance violations before they impact your business.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-6 lg:px-12 py-16 bg-white border-t border-gray-200">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready to secure your code?
          </h2>
          <p className="text-lg text-gray-600">Start your free analysis today and discover vulnerabilities before they become problems.</p>
          <NavLink
            to="/analyzer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary-600 text-white font-semibold rounded-full hover:bg-primary-700 transition-all duration-200"
          >
            Begin Analysis
          </NavLink>
        </div>
      </section>
    </div>
  );
}
