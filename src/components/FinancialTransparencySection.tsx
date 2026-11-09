import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Download, 
  ExternalLink, 
  PieChart, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  Building2, 
  Scale, 
  HelpCircle,
  FileCheck2,
  Lock,
  ChevronDown,
  ChevronUp,
  Sliders
} from 'lucide-react';
import { authoritativeOrgService } from '../services/authoritativeOrgService';
import { FinancialTransparencyData, UserProfile } from '../types';

interface FinancialTransparencySectionProps {
  user?: UserProfile;
  onOpenAdminConsole?: () => void;
  className?: string;
}

export const FinancialTransparencySection: React.FC<FinancialTransparencySectionProps> = ({
  user,
  onOpenAdminConsole,
  className = ''
}) => {
  const [data, setData] = useState<FinancialTransparencyData>(() => authoritativeOrgService.getFinancialTransparency());
  const [activeTab, setActiveTab] = useState<'ratios' | 'reports' | 'certificates'>('ratios');
  const [expandedReportId, setExpandedReportId] = useState<string | null>(null);

  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';

  useEffect(() => {
    const unsubscribe = authoritativeOrgService.subscribe(() => {
      setData(authoritativeOrgService.getFinancialTransparency());
    });
    return unsubscribe;
  }, []);

  const ratios = data.expenditureRatios;

  return (
    <section 
      aria-label="Financial Transparency & Audited Reports"
      className={`bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-5 sm:p-6 shadow-xs ${className}`}
    >
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-100 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-gray-900 dark:text-white tracking-tight">
                Statutory Financial Transparency
              </h2>
              <span className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-3 h-3" />
                Audited & Published
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-zinc-400 mt-0.5">
              Verified accounts, MCA CSR-1 returns & Section 80G statutory filings (Last Updated: {data.lastUpdatedDate})
            </p>
          </div>
        </div>

        {/* Admin configure button */}
        {isAdmin && onOpenAdminConsole && (
          <button
            type="button"
            onClick={onOpenAdminConsole}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 hover:bg-purple-100 border border-purple-200 dark:border-purple-800 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Manage Records</span>
          </button>
        )}
      </div>

      {/* Navigation sub-tabs */}
      <div className="flex items-center gap-2 pt-4 pb-2 border-b border-gray-100 dark:border-zinc-800 overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveTab('ratios')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'ratios'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800'
          }`}
        >
          <PieChart className="w-3.5 h-3.5" />
          <span>Fund Utilization Ratio</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('reports')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'reports'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Annual Audited Reports ({data.annualReports.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('certificates')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'certificates'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800'
          }`}
        >
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>Statutory Certificates ({data.statutoryCertificates.length})</span>
        </button>
      </div>

      {/* TAB 1: Fund Utilization Ratios */}
      {activeTab === 'ratios' && (
        <div className="pt-4 space-y-4 animate-fadeIn">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50/50 via-teal-50/30 to-amber-50/20 dark:from-zinc-800/80 dark:to-zinc-800/40 border border-emerald-100 dark:border-zinc-700/80">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="text-xs font-extrabold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider">
                Audited Programmatic Spend Distribution ({ratios.reportingYear})
              </span>
              <span className="text-[10px] text-gray-500 dark:text-zinc-400 font-mono">
                Auditor: {ratios.auditedBy}
              </span>
            </div>

            {/* Visual multi-segment bar */}
            <div className="w-full h-4 bg-gray-200 dark:bg-zinc-700 rounded-full overflow-hidden flex shadow-inner">
              <div 
                style={{ width: `${ratios.programmePercentage}%` }} 
                className="bg-emerald-500 h-full" 
                title={`Direct Relief: ${ratios.programmePercentage}%`}
              />
              <div 
                style={{ width: `${ratios.administrativePercentage}%` }} 
                className="bg-amber-500 h-full" 
                title={`Field Logistics: ${ratios.administrativePercentage}%`}
              />
              <div 
                style={{ width: `${ratios.fundraisingPercentage}%` }} 
                className="bg-blue-500 h-full" 
                title={`Governance: ${ratios.fundraisingPercentage}%`}
              />
            </div>

            {/* Ratio Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3.5">
              <div className="p-3 bg-white dark:bg-zinc-900/80 rounded-xl border border-emerald-200/60 dark:border-zinc-700">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                    {ratios.programmePercentage}%
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <h3 className="text-xs font-bold text-gray-900 dark:text-white mt-1">
                  Direct Field Programs
                </h3>
                <p className="text-[11px] text-gray-500 dark:text-zinc-400 mt-0.5 leading-snug">
                  Slum child tutorial kits, diagnostic medicines, daily hot meals & solar handpumps.
                </p>
              </div>

              <div className="p-3 bg-white dark:bg-zinc-900/80 rounded-xl border border-amber-200/60 dark:border-zinc-700">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono">
                    {ratios.administrativePercentage}%
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                </div>
                <h3 className="text-xs font-bold text-gray-900 dark:text-white mt-1">
                  Field Logistics & Transport
                </h3>
                <p className="text-[11px] text-gray-500 dark:text-zinc-400 mt-0.5 leading-snug">
                  Mobile medical van fuel, rural freight, cold-chain medicine storage & volunteer transport.
                </p>
              </div>

              <div className="p-3 bg-white dark:bg-zinc-900/80 rounded-xl border border-blue-200/60 dark:border-zinc-700">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-blue-600 dark:text-blue-400 font-mono">
                    {ratios.fundraisingPercentage}%
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                </div>
                <h3 className="text-xs font-bold text-gray-900 dark:text-white mt-1">
                  Audits & Governance
                </h3>
                <p className="text-[11px] text-gray-500 dark:text-zinc-400 mt-0.5 leading-snug">
                  Statutory CA audits, Form 10BE electronic filings, Registrar compliance & DPDP Act security.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Annual Reports by Financial Year */}
      {activeTab === 'reports' && (
        <div className="pt-4 space-y-3 animate-fadeIn">
          {data.annualReports.map((report) => {
            const isExpanded = expandedReportId === report.id;
            return (
              <div 
                key={report.id}
                className="border border-gray-200 dark:border-zinc-800 rounded-2xl p-4 bg-gray-50/50 dark:bg-zinc-800/40 hover:border-emerald-300 transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono font-extrabold text-xs">
                      {report.financialYear}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                        {report.title}
                      </h3>
                      <p className="text-[11px] text-gray-500 dark:text-zinc-400">
                        Filed: {report.filingDate} • Opinion: <strong className="text-emerald-600">{report.auditOpinion}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setExpandedReportId(isExpanded ? null : report.id)}
                      className="text-xs font-semibold text-gray-600 dark:text-zinc-300 hover:text-emerald-600 flex items-center gap-1 cursor-pointer"
                    >
                      <span>{isExpanded ? 'Hide Breakup' : 'View Financials'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Financial Details */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-zinc-700/80 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                    <div className="p-2.5 bg-white dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800">
                      <span className="text-[10px] text-gray-500 uppercase font-semibold">Total Charitable Receipts</span>
                      <p className="text-sm font-black text-gray-900 dark:text-white font-mono">
                        ₹{report.totalReceiptsINR.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div className="p-2.5 bg-white dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800">
                      <span className="text-[10px] text-gray-500 uppercase font-semibold">Programmatic Field Spend</span>
                      <p className="text-sm font-black text-emerald-600 dark:text-emerald-400 font-mono">
                        ₹{report.programExpenditureINR.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div className="p-2.5 bg-white dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800">
                      <span className="text-[10px] text-gray-500 uppercase font-semibold">Auditor Firm</span>
                      <p className="text-xs font-bold text-gray-800 dark:text-zinc-200">
                        {report.auditorFirm}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 3: Valid Statutory Certificates */}
      {activeTab === 'certificates' && (
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fadeIn">
          {data.statutoryCertificates.map((cert) => (
            <div 
              key={cert.id}
              className="p-3.5 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-gray-50/40 dark:bg-zinc-800/30 flex flex-col justify-between space-y-2 hover:border-emerald-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                    {cert.registrationNumber}
                  </span>
                  <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-600 uppercase">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </span>
                </div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white mt-1.5 leading-snug">
                  {cert.certificateName}
                </h4>
                <p className="text-[11px] text-gray-500 dark:text-zinc-400 mt-0.5">
                  Authority: {cert.issuingAuthority} • Validity: {cert.validUntil}
                </p>
              </div>

              <div className="pt-2 border-t border-gray-200 dark:border-zinc-800 flex items-center justify-between text-[11px]">
                <span className="text-[10px] text-gray-400">{cert.verificationNote}</span>
                <span className="text-emerald-600 font-semibold text-[10px] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Statutory Order
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Statutory footnote */}
      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-zinc-800 flex items-start gap-2 text-[11px] text-gray-500 dark:text-zinc-400 leading-relaxed">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <span>
          {data.statutoryNotice}
        </span>
      </div>
    </section>
  );
};
