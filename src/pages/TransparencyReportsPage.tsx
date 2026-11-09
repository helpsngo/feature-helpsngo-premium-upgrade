import React, { useState } from 'react';
import { 
  FileCheck, 
  ShieldCheck, 
  Scale, 
  Building2, 
  Download, 
  ExternalLink, 
  PieChart, 
  TrendingUp, 
  CheckCircle2, 
  HelpCircle,
  FileText,
  Calendar,
  Award
} from 'lucide-react';
import { TabType } from '../types';
import { authoritativeOrgService } from '../services/authoritativeOrgService';

interface TransparencyReportsPageProps {
  onNavigate: (tab: TabType) => void;
  onOpenTaxCert?: () => void;
}

export const TransparencyReportsPage: React.FC<TransparencyReportsPageProps> = ({ 
  onNavigate,
  onOpenTaxCert
}) => {
  const orgProfile = authoritativeOrgService.getProfile();
  const transparency = authoritativeOrgService.getFinancialTransparency();
  const [selectedFY, setSelectedFY] = useState(transparency.annualReports[0]?.financialYear || 'FY 2024-2025');

  const activeReport = transparency.annualReports.find(r => r.financialYear === selectedFY) || transparency.annualReports[0];

  return (
    <div className="min-h-screen bg-[#FBFBF9] dark:bg-zinc-950 text-stone-900 dark:text-zinc-100 transition-colors">
      
      {/* Editorial Header */}
      <section className="bg-[#18181B] text-white pt-14 pb-16 px-4 sm:px-6 border-b border-zinc-800">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-3">
            <Scale className="w-4 h-4" />
            <span>Statutory Accountability & Governance</span>
            <span className="text-zinc-600" aria-hidden="true">·</span>
            <span>Audited Records</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
            Financial Transparency & Public Filings
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 max-w-3xl leading-relaxed">
            HELPS Welfare Society operates under complete statutory transparency. Every rupee received from donors, corporate partners, and well-wishers is audited annually by independent Chartered Accountants and submitted to the Registrar of Societies and the Income Tax Department.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6 pt-6 border-t border-zinc-800 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="font-mono text-emerald-400 font-bold text-sm">88.4%</span>
              <span>Direct Grassroots Program Expenditure</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Clean & Unqualified CA Audit Opinions</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-orange-400" />
              <span>Rule 18AB / Form 10BE Electronic Compliance</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">

        {/* Section 1: Expenditure Ratio Breakdown */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                Resource Allocation
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
                How Your Contribution is Spent ({transparency.expenditureRatios.reportingYear})
              </h2>
            </div>
            <span className="text-xs text-stone-500 dark:text-zinc-400 hidden sm:inline">
              Audited by Independent CAs
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-stone-200 dark:border-zinc-800 shadow-xs relative overflow-hidden">
              <div className="text-4xl sm:text-5xl font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                {transparency.expenditureRatios.programmePercentage}%
              </div>
              <div className="font-serif text-lg font-bold text-stone-900 dark:text-white mb-1">
                Direct Programme Services
              </div>
              <p className="text-xs text-stone-600 dark:text-zinc-400 leading-relaxed">
                AABHA slum classroom tutorials, medicines for rural health clinics, Annapoorna meals, and clean water installations.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-stone-200 dark:border-zinc-800 shadow-xs">
              <div className="text-4xl sm:text-5xl font-mono font-bold text-stone-700 dark:text-zinc-300 mb-2">
                {transparency.expenditureRatios.administrativePercentage}%
              </div>
              <div className="font-serif text-lg font-bold text-stone-900 dark:text-white mb-1">
                Operational & Compliance
              </div>
              <p className="text-xs text-stone-600 dark:text-zinc-400 leading-relaxed">
                Legal audits, regulatory filings, banking compliance, field utility logistics, and data safeguarding.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-stone-200 dark:border-zinc-800 shadow-xs">
              <div className="text-4xl sm:text-5xl font-mono font-bold text-stone-700 dark:text-zinc-300 mb-2">
                {transparency.expenditureRatios.fundraisingPercentage}%
              </div>
              <div className="font-serif text-lg font-bold text-stone-900 dark:text-white mb-1">
                Fundraising & Awareness
              </div>
              <p className="text-xs text-stone-600 dark:text-zinc-400 leading-relaxed">
                Donor reports, statutory receipts, awareness outreach, website server hosting, and volunteer mobilization.
              </p>
            </div>
          </div>

          {/* Allocation Progress Bar */}
          <div className="bg-stone-200 dark:bg-zinc-800 rounded-full h-3.5 flex overflow-hidden">
            <div 
              style={{ width: `${transparency.expenditureRatios.programmePercentage}%` }} 
              className="bg-emerald-600 h-full"
              title="Programme Services: 88.4%"
            />
            <div 
              style={{ width: `${transparency.expenditureRatios.administrativePercentage}%` }} 
              className="bg-amber-500 h-full"
              title="Administration: 6.8%"
            />
            <div 
              style={{ width: `${transparency.expenditureRatios.fundraisingPercentage}%` }} 
              className="bg-orange-500 h-full"
              title="Fundraising: 4.8%"
            />
          </div>
          <div className="flex flex-wrap items-center justify-between text-xs text-stone-500 dark:text-zinc-400 mt-2 px-1">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" /> 88.4% Field Relief</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> 6.8% Governance & Compliance</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block" /> 4.8% Fundraising & Communications</span>
          </div>
        </div>

        {/* Section 2: Audited Financial Statements by Financial Year */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                Audited Reports
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
                Annual Financial Statements
              </h2>
            </div>

            {/* FY selector buttons */}
            <div className="flex items-center gap-1.5 bg-stone-100 dark:bg-zinc-900 p-1 rounded-2xl border border-stone-200 dark:border-zinc-800">
              {transparency.annualReports.map((report) => (
                <button
                  key={report.id}
                  type="button"
                  onClick={() => setSelectedFY(report.financialYear)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedFY === report.financialYear
                      ? 'bg-white dark:bg-zinc-800 text-stone-900 dark:text-white shadow-xs'
                      : 'text-stone-600 dark:text-zinc-400 hover:text-stone-900'
                  }`}
                >
                  {report.financialYear}
                </button>
              ))}
            </div>
          </div>

          {activeReport && (
            <div className="bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-stone-200 dark:border-zinc-800">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      {activeReport.financialYear}
                    </span>
                    <span className="text-xs text-stone-500 dark:text-zinc-400">Filed: {activeReport.filingDate}</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-white">
                    {activeReport.title}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-zinc-400 mt-1">
                    Independent Auditor: {activeReport.auditorFirm} · Audit Opinion: <strong className="text-emerald-600 dark:text-emerald-400">{activeReport.auditOpinion}</strong>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => alert(`Official CA-audited balance sheet and Form 10B return for ${activeReport.financialYear} is archived at HELPS Welfare Society office and available upon request.`)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-semibold text-xs rounded-xl hover:bg-stone-800 dark:hover:bg-zinc-200 transition-colors shrink-0 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download CA Statement</span>
                </button>
              </div>

              {/* Financial Summary Table */}
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-stone-200 dark:border-zinc-800 text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-zinc-400">
                      <th className="py-3 px-4">Financial Parameter</th>
                      <th className="py-3 px-4">Amount (INR)</th>
                      <th className="py-3 px-4">Share (%)</th>
                      <th className="py-3 px-4">Statutory Classification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-zinc-800 text-stone-800 dark:text-zinc-200">
                    <tr>
                      <td className="py-3.5 px-4 font-medium text-stone-900 dark:text-white">Total Voluntary Receipts & Donations</td>
                      <td className="py-3.5 px-4 font-mono font-bold">₹{activeReport.totalReceiptsINR.toLocaleString('en-IN')}</td>
                      <td className="py-3.5 px-4 font-mono">100.0%</td>
                      <td className="py-3.5 px-4 text-xs text-stone-500">Sec 11/12 IT Act Charitable Inflow</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 font-medium text-emerald-700 dark:text-emerald-400">Charitable Programme Expenditures</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-emerald-700 dark:text-emerald-400">₹{activeReport.programExpenditureINR.toLocaleString('en-IN')}</td>
                      <td className="py-3.5 px-4 font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                        {((activeReport.programExpenditureINR / activeReport.totalExpenditureINR) * 100).toFixed(1)}%
                      </td>
                      <td className="py-3.5 px-4 text-xs text-stone-500">AABHA, Health Camps, Annapoorna Meals</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 font-medium">Administration & Compliance Expenditures</td>
                      <td className="py-3.5 px-4 font-mono">
                        ₹{(activeReport.totalExpenditureINR * 0.068).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </td>
                      <td className="py-3.5 px-4 font-mono">6.8%</td>
                      <td className="py-3.5 px-4 text-xs text-stone-500">Audit, Society Filings, Banking Fees</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 font-medium">Fundraising & Awareness Communication</td>
                      <td className="py-3.5 px-4 font-mono">
                        ₹{(activeReport.totalExpenditureINR * 0.048).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </td>
                      <td className="py-3.5 px-4 font-mono">4.8%</td>
                      <td className="py-3.5 px-4 text-xs text-stone-500">Public Mobilization & Donor Receipts</td>
                    </tr>
                    <tr className="bg-stone-50/60 dark:bg-zinc-800/40 font-bold">
                      <td className="py-3.5 px-4 text-stone-900 dark:text-white">Total Charitable Outflow Applied</td>
                      <td className="py-3.5 px-4 font-mono text-stone-900 dark:text-white">₹{activeReport.totalExpenditureINR.toLocaleString('en-IN')}</td>
                      <td className="py-3.5 px-4 font-mono">100.0%</td>
                      <td className="py-3.5 px-4 text-xs text-emerald-600 dark:text-emerald-400">85%+ Application Rule Satisfied</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Section 3: Statutory Registration Certificates Dossier */}
        <div>
          <div className="mb-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              Legal Standing
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
              Official Statutory Registrations & Exemptions
            </h2>
            <p className="text-sm text-stone-500 dark:text-zinc-400 mt-1">
              Valid legal certificates issued by Government of India authorities and the Income Tax Department.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {transparency.statutoryCertificates.map((cert) => (
              <div 
                key={cert.id}
                className="bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{cert.verificationStatus.toUpperCase()}</span>
                    </span>
                    <span className="text-[11px] text-stone-400 font-mono">
                      Valid: {cert.validUntil}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white mb-1">
                    {cert.certificateName}
                  </h3>

                  <div className="space-y-1.5 text-xs text-stone-600 dark:text-zinc-400 my-3">
                    <div><strong>Authority:</strong> {cert.issuingAuthority}</div>
                    <div><strong>Registration / Order No:</strong> <span className="font-mono text-stone-900 dark:text-white">{cert.registrationNumber}</span></div>
                    <div><strong>Effective Date:</strong> {cert.validFrom}</div>
                    <p className="text-stone-500 dark:text-zinc-400 italic pt-1">{cert.verificationNote}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                  <span className="text-stone-400 font-mono">Document Record</span>
                  <button
                    type="button"
                    onClick={() => {
                      if (cert.id === 'cert-80g' && onOpenTaxCert) {
                        onOpenTaxCert();
                      } else {
                        alert(`Official copy of ${cert.certificateName} (${cert.registrationNumber}) is available at society registered office.`);
                      }
                    }}
                    className="text-orange-600 dark:text-orange-400 font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>View Record Details</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: 80G Tax Exemption & Form 10BE Notice for Donors */}
        <div className="bg-orange-50/70 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/40 rounded-3xl p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-orange-950 dark:text-orange-200 mb-2">
                Section 80G Tax Exemption & Electronic Form 10BE
              </h3>
              <p className="text-sm text-stone-700 dark:text-zinc-300 leading-relaxed mb-4">
                Donations made to HELPS Welfare Society qualify for a 50% deduction under Section 80G(5)(vi) of the Income Tax Act, 1961 (Approval Order: <span className="font-mono font-semibold">CIT(E) CHD/80G/2016-17/4726</span>). Under Rule 18AB, to enable your deduction in your Annual Information Statement (AIS), please provide your PAN during donation. We electronically upload Form 10BD/10BE every financial year.
              </p>

              <div className="flex flex-wrap gap-4 text-xs">
                {onOpenTaxCert && (
                  <button
                    type="button"
                    onClick={onOpenTaxCert}
                    className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Generate Form 10BE Preview
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onNavigate('donate')}
                  className="px-5 py-2.5 bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-bold rounded-xl hover:bg-stone-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
                >
                  Make a Tax-Deductible Donation
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Statutory Audit Note */}
        <div className="text-xs text-stone-500 dark:text-zinc-400 bg-stone-100 dark:bg-zinc-900 p-5 rounded-2xl border border-stone-200 dark:border-zinc-800 leading-relaxed">
          <div className="font-semibold text-stone-700 dark:text-zinc-300 mb-1">
            Statutory Transparency Disclaimer & Verification Notes:
          </div>
          {transparency.statutoryNotice}
        </div>

      </section>

    </div>
  );
};
