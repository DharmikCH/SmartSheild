import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getReport } from '../api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const riskLevelColors = {
  High: 'text-danger',
  Medium: 'text-warning',
  Low: 'text-success',
};

const riskLevelBg = {
  High: 'bg-red-900/20 border-red-800/40',
  Medium: 'bg-amber-900/20 border-amber-800/40',
  Low: 'bg-emerald-900/20 border-emerald-800/40',
};

function VulnerabilityCard({ vuln }) {
  const [expanded, setExpanded] = useState(false);

  const severityBadge = {
    Critical: 'bg-red-900/40 text-red-300',
    High: 'bg-orange-900/40 text-orange-300',
    Medium: 'bg-amber-900/40 text-amber-300',
  };

  return (
    <div className="bg-[#1a1f2e] border border-[#2a3142] rounded-2xl p-5 card-hover">
      <div className="flex flex-wrap items-start gap-3 mb-3">
        <h3 className="text-[14px] font-bold text-white flex-1">{vuln.issue}</h3>
        <span className={`badge ${severityBadge[vuln.severity] || 'bg-[#252d3a] text-gray-400'}`}>
          {vuln.severity}
        </span>
        {vuln.lineNumber && (
          <span className="px-2.5 py-0.5 bg-[#252d3a] text-gray-500 text-[11px] font-semibold rounded-lg">
            Line {vuln.lineNumber}
          </span>
        )}
      </div>

      <p className="text-[13px] text-gray-400 leading-relaxed mb-4">{vuln.description}</p>

      <button
        onClick={() => setExpanded(!expanded)}
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary-600 hover:text-primary-700 transition-colors"
        id={`fix-toggle-${vuln.issue.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        {expanded ? 'Hide Fix' : 'View Fix'}
      </button>

      {expanded && (
        <div className="mt-4 space-y-4">
          <div className="p-3.5 bg-blue-900/20 border border-blue-800/40 rounded-xl">
            <p className="text-[13px] text-blue-300">
              <span className="font-bold">Recommendation:</span> {vuln.fix}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-danger rounded-full"></div>
                <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider">Unsafe Code</span>
              </div>
              <div className="border-2 border-red-800/40 rounded-xl overflow-hidden">
                <SyntaxHighlighter
                  language="solidity"
                  style={oneDark}
                  customStyle={{ margin: 0, fontSize: '12px', borderRadius: 0, lineHeight: 1.6 }}
                  showLineNumbers
                >
                  {vuln.unsafeCode}
                </SyntaxHighlighter>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-[11px] font-bold text-green-400 uppercase tracking-wider">Safe Code</span>
              </div>
              <div className="border-2 border-green-800/40 rounded-xl overflow-hidden">
                <SyntaxHighlighter
                  language="solidity"
                  style={oneDark}
                  customStyle={{ margin: 0, fontSize: '12px', borderRadius: 0, lineHeight: 1.6 }}
                  showLineNumbers
                >
                  {vuln.safeCode}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Report() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getReport(id)
      .then(setReport)
      .catch((err) => setError(err.response?.data?.error || 'Failed to load report'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-center">
          <div className="w-8 h-8 border-[3px] border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[13px] text-gray-400">Loading report...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-red-900/20 border border-red-800/40 rounded-2xl text-center">
        <svg className="w-10 h-10 text-danger mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
        <p className="text-[13px] text-red-300 font-medium">{error}</p>
        <Link to="/analyzer" className="inline-block mt-4 text-[13px] text-primary-600 font-semibold hover:underline">
          ← Back to Analyzer
        </Link>
      </div>
    );
  }

  if (!report) return null;

  const chartData = [
    { name: 'Critical', count: report.severityCounts?.Critical || 0 },
    { name: 'High', count: report.severityCounts?.High || 0 },
    { name: 'Medium', count: report.severityCounts?.Medium || 0 },
  ];

  const barColors = ['#ef4444', '#f97316', '#f59e0b'];

  const healthPassed = report.healthChecklist?.filter((h) => h.passed).length || 0;
  const healthTotal = report.healthChecklist?.length || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[26px] font-bold text-white tracking-tight">{report.name}</h1>
        <p className="text-[13px] text-gray-500 mt-1">
          Analyzed on {new Date(report.analyzedAt).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className={`card-hover border rounded-2xl p-5 bg-[#1a1f2e] border-[#2a3142] ${riskLevelBg[report.riskLevel]}`}>
          <span className="text-[13px] font-semibold text-gray-400">Risk Score</span>
          <p className={`text-[36px] font-extrabold mt-1 leading-none ${riskLevelColors[report.riskLevel]}`}>
            {report.riskScore}
          </p>
          <p className="text-[11px] text-gray-500 mt-1.5">out of 100</p>
        </div>

        <div className="card-hover bg-[#1a1f2e] border border-[#2a3142] rounded-2xl p-5">
          <span className="text-[13px] font-semibold text-gray-400">Risk Level</span>
          <div className="mt-3">
            <span className={`badge badge-${report.riskLevel.toLowerCase()} text-[14px] px-4 py-1.5`}>
              {report.riskLevel}
            </span>
          </div>
        </div>

        <div className="card-hover bg-[#1a1f2e] border border-[#2a3142] rounded-2xl p-5">
          <span className="text-[13px] font-semibold text-gray-400">Vulnerabilities</span>
          <p className="text-[36px] font-extrabold text-white mt-1 leading-none">
            {report.vulnerabilities?.length || 0}
          </p>
          <p className="text-[11px] text-gray-500 mt-1.5">issues detected</p>
        </div>
      </div>

      {/* Chart + Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Bar chart */}
        <div className="bg-[#1a1f2e] border border-[#2a3142] rounded-2xl p-5">
          <h2 className="text-[15px] font-bold text-white mb-1">Severity Breakdown</h2>
          <p className="text-[12px] text-gray-500 mb-4">Distribution by severity level</p>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3142" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af', fontFamily: 'Plus Jakarta Sans' }} axisLine={{ stroke: '#2a3142' }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={{ stroke: '#2a3142' }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: '1px solid #2a3142',
                    backgroundColor: '#1a1f2e',
                    color: '#fff',
                    fontSize: '12px',
                    fontFamily: 'Plus Jakarta Sans',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  }}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]} maxBarSize={50}>
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={barColors[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Health checklist */}
        <div className="bg-[#1a1f2e] border border-[#2a3142] rounded-2xl p-5">
          <h2 className="text-[15px] font-bold text-white mb-1">Health Checklist</h2>
          <p className="text-[12px] text-gray-500 mb-4">
            {healthPassed}/{healthTotal} checks passed
          </p>

          <div className="w-full h-1.5 bg-[#252d3a] rounded-full mb-5 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${healthTotal > 0 ? (healthPassed / healthTotal) * 100 : 0}%`,
                background: healthPassed === healthTotal
                  ? '#22c55e'
                  : healthPassed >= healthTotal / 2
                  ? '#f59e0b'
                  : '#ef4444',
              }}
            />
          </div>

          <div className="space-y-2.5">
            {report.healthChecklist?.map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${
                  item.passed
                    ? 'bg-emerald-900/20 border-emerald-800/40'
                    : 'bg-red-900/20 border-red-800/40'
                }`}
              >
                {item.passed ? (
                  <svg className="w-[18px] h-[18px] text-success flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-[18px] h-[18px] text-danger flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
                <span className="text-[13px] text-gray-300">{item.check}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vulnerability cards */}
      {report.vulnerabilities?.length > 0 && (
        <div className="space-y-4">
          <div>
            <h2 className="text-[17px] font-bold text-white">Detected Vulnerabilities</h2>
            <p className="text-[12px] text-gray-400 mt-0.5">
              Click "View Fix" to see recommended solutions with code examples
            </p>
          </div>

          {report.vulnerabilities.map((vuln, index) => (
            <VulnerabilityCard key={index} vuln={vuln} />
          ))}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 pt-2 pb-4">
        <Link
          to="/analyzer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white text-[13px] font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-sm"
          id="analyze-another-btn"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Analyze Another
        </Link>
        <Link
          to="/history"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1a1f2e] border border-[#2a3142] text-gray-300 text-[13px] font-medium rounded-xl hover:bg-[#252d3a] transition-colors"
          id="view-all-reports-btn"
        >
          View All Reports
        </Link>
      </div>
    </div>
  );
}
