import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getReports } from '../api';

export default function History() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReports()
      .then(setReports)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-[26px] font-bold text-gray-900 tracking-tight">Analysis History</h1>
        <p className="text-[13px] text-gray-500 mt-1">
          Review all previously analyzed smart contracts.
        </p>
      </div>

      <div className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-7 h-7 border-[3px] border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
          </div>
        ) : reports.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-50 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-[15px] font-bold text-gray-900 mb-1">No contracts analyzed yet</h3>
            <p className="text-[13px] text-gray-400 mb-5">
              Start by scanning your first smart contract for vulnerabilities
            </p>
            <Link
              to="/analyzer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white text-[13px] font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-sm"
              id="analyze-first-btn"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Analyze your first contract
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/60">
                  <th className="px-6 py-3">#</th>
                  <th className="px-6 py-3">Contract Name</th>
                  <th className="px-6 py-3">Risk Score</th>
                  <th className="px-6 py-3">Risk Level</th>
                  <th className="px-6 py-3">Date Analyzed</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {reports.map((report, index) => (
                  <tr key={report.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-3.5 text-[13px] text-gray-400 font-mono">
                      {index + 1}
                    </td>
                    <td className="px-6 py-3.5 text-[13px] font-semibold text-gray-900">
                      {report.name}
                    </td>
                    <td className="px-6 py-3.5 text-[13px] text-gray-600 font-bold tabular-nums">
                      {report.riskScore}
                    </td>
                    <td className="px-6 py-3.5">
                      <span className={`badge badge-${report.riskLevel.toLowerCase()}`}>
                        {report.riskLevel}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-[13px] text-gray-400">
                      {new Date(report.analyzedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="px-6 py-3.5">
                      <Link
                        to={`/report/${report.id}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-primary-50 text-primary-700 text-[12px] font-semibold rounded-lg hover:bg-primary-100 transition-colors"
                      >
                        View Report
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
