import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getReports } from '../api';

export default function Dashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReports()
      .then(setReports)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const stats = {
    total: reports.length,
    high: reports.filter((r) => r.riskLevel === 'High').length,
    medium: reports.filter((r) => r.riskLevel === 'Medium').length,
    low: reports.filter((r) => r.riskLevel === 'Low').length,
  };

  const recentReports = reports.slice(0, 8);

  return (
    <div className="space-y-7">
      {/* Page header */}
      <div>
        <h1 className="text-[32px] font-bold text-gray-900 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Dashboard</h1>
        <p className="text-[13px] text-gray-500 mt-2">
          Monitor your smart contract security posture at a glance.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Primary - Total Analyzed */}
        <div className="card-hover bg-primary-600 rounded-2xl p-5 text-white border border-primary-500">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[13px] font-semibold text-white/85">Total Contracts</span>
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
              <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <p className="text-[32px] font-extrabold leading-none">{stats.total}</p>
          <p className="text-[11px] text-white/70 mt-1.5">Contracts scanned</p>
        </div>

        {/* High Risk */}
        <div className="card-hover bg-white border border-gray-100 rounded-2xl p-5 hover:border-red-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[13px] font-semibold text-gray-500">High Risk</span>
            <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
              <svg className="w-[18px] h-[18px] text-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
          <p className="text-[32px] font-extrabold text-gray-900 leading-none">{stats.high}</p>
          <p className="text-[11px] text-gray-400 mt-1.5">Need immediate attention</p>
        </div>

        {/* Medium Risk */}
        <div className="card-hover bg-white border border-gray-100 rounded-2xl p-5 hover:border-amber-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[13px] font-semibold text-gray-500">Medium Risk</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
              <svg className="w-[18px] h-[18px] text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-[32px] font-extrabold text-gray-900 leading-none">{stats.medium}</p>
          <p className="text-[11px] text-gray-400 mt-1.5">Should be reviewed</p>
        </div>

        {/* Low Risk */}
        <div className="card-hover bg-white border border-gray-100 rounded-2xl p-5 hover:border-emerald-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[13px] font-semibold text-gray-500">Low Risk</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
              <svg className="w-[18px] h-[18px] text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-[32px] font-extrabold text-gray-900 leading-none">{stats.low}</p>
          <p className="text-[11px] text-gray-400 mt-1.5">Looking good</p>
        </div>
      </div>

      {/* Recent analyses */}
      <div className="border-0 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-[18px] font-bold text-gray-900">Recent Analyses</h2>
            <p className="text-[12px] text-gray-400 mt-1">Latest contract security scans</p>
          </div>
          <Link
            to="/history"
            className="text-[13px] font-medium text-primary-600 hover:text-primary-700 transition-colors"
          >
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-7 h-7 border-[3px] border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
          </div>
        ) : recentReports.length === 0 ? (
          <div className="text-center py-16 px-6">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gray-50 flex items-center justify-center">
              <svg className="w-7 h-7 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <p className="text-[13px] text-gray-500 mb-4">No contracts analyzed yet</p>
            <Link
              to="/analyzer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white text-[13px] font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              Analyze your first contract
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Risk Score</th>
                  <th className="px-6 py-3">Risk Level</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50/50 transition-colors">
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
                      })}
                    </td>
                    <td className="px-6 py-3.5">
                      <Link
                        to={`/report/${report.id}`}
                        className="text-[13px] font-medium text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        View →
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
