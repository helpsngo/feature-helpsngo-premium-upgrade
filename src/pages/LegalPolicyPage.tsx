import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Scale, 
  Lock, 
  ArrowLeft, 
  CheckCircle2, 
  Building2, 
  Mail, 
  Phone,
  Search
} from 'lucide-react';
import { TabType } from '../types';
import { STATUTORY_POLICIES } from '../components/LegalPoliciesModal';
import { authoritativeOrgService } from '../services/authoritativeOrgService';

interface LegalPolicyPageProps {
  initialPolicyId?: string;
  onNavigate: (tab: TabType) => void;
}

export const LegalPolicyPage: React.FC<LegalPolicyPageProps> = ({
  initialPolicyId = 'privacy-policy',
  onNavigate
}) => {
  const [selectedPolicyId, setSelectedPolicyId] = useState(initialPolicyId);
  const [searchQuery, setSearchQuery] = useState('');
  const orgProfile = authoritativeOrgService.getProfile();
  const grievance = orgProfile.grievanceDetails;

  const currentPolicy = STATUTORY_POLICIES.find(p => p.id === selectedPolicyId) || STATUTORY_POLICIES[0];

  const filteredPolicies = STATUTORY_POLICIES.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.summary && p.summary.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#FBFBF9] dark:bg-zinc-950 text-stone-900 dark:text-zinc-100 transition-colors">
      
      {/* Editorial Header */}
      <section className="bg-stone-900 text-white pt-14 pb-16 px-4 sm:px-6 border-b border-stone-800">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-3">
            <Scale className="w-4 h-4" />
            <span>Statutory Governance & Compliance</span>
            <span className="text-stone-600" aria-hidden="true">·</span>
            <span>DPDP Act 2023 & Societies Act</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
            Legal Policies & Regulatory Safeguards
          </h1>

          <p className="text-base sm:text-lg text-stone-300 max-w-3xl leading-relaxed">
            HELPS Welfare Society adheres to Indian statutory governance, including the Societies Registration Act XXI of 1860, the Digital Personal Data Protection Act (DPDP Act 2023), Income Tax Rule 18AB (Form 10BE), and child safeguarding standards.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6 pt-6 border-t border-stone-800 text-xs text-stone-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>DPDP Act 2023 Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-orange-400" />
              <span>Nodal Grievance Redressal Officer Appointed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Policy List Selector */}
          <div className="lg:col-span-4 space-y-4">
            
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search policies..."
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:outline-none focus:ring-2 focus:ring-orange-600"
              />
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-3xl p-3 shadow-xs space-y-1">
              {filteredPolicies.map((policy) => {
                const isActive = policy.id === selectedPolicyId;
                return (
                  <button
                    key={policy.id}
                    type="button"
                    onClick={() => setSelectedPolicyId(policy.id)}
                    className={`w-full text-left p-3 rounded-2xl transition-all text-xs flex flex-col cursor-pointer ${
                      isActive
                        ? 'bg-orange-600 text-white font-semibold shadow-xs'
                        : 'text-stone-700 dark:text-zinc-300 hover:bg-stone-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    <span className="font-serif text-sm leading-tight mb-1">{policy.title}</span>
                    <span className={`text-[10px] ${isActive ? 'text-orange-100' : 'text-stone-400'}`}>
                      {policy.category} · v{policy.version || '2026.1'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Grievance Summary Box */}
            <div className="bg-stone-50 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-3xl p-5 text-xs text-stone-600 dark:text-zinc-400">
              <span className="font-bold text-stone-900 dark:text-white block mb-1">
                Data Grievance Redressal
              </span>
              Questions regarding DPDP data rights, erasure requests, or statutory certificates can be sent to Nodal Officer <strong>{grievance.nodalOfficerName}</strong> at <a href={`mailto:${grievance.email}`} className="text-orange-600 hover:underline">{grievance.email}</a>.
            </div>

          </div>

          {/* Policy Document Reader */}
          <div className="lg:col-span-8 bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-xs">
            <div className="pb-6 border-b border-stone-200 dark:border-zinc-800 mb-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400 mb-2">
                <span>{currentPolicy.category}</span>
                <span className="text-stone-300 dark:text-zinc-700" aria-hidden="true">·</span>
                <span className="font-mono text-stone-500">Updated: {currentPolicy.lastUpdated}</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white mb-2">
                {currentPolicy.title}
              </h2>

              {currentPolicy.summary && (
                <p className="text-sm text-stone-600 dark:text-zinc-400 leading-relaxed italic bg-stone-50 dark:bg-zinc-800/60 p-4 rounded-2xl border border-stone-200 dark:border-zinc-800">
                  {currentPolicy.summary}
                </p>
              )}
            </div>

            {/* Markdown-style content renderer */}
            <div className="prose dark:prose-invert max-w-none text-sm text-stone-700 dark:text-zinc-300 leading-relaxed space-y-4">
              {currentPolicy.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={idx} className="font-serif text-lg font-bold text-stone-900 dark:text-white pt-4 pb-1">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                } else if (paragraph.startsWith('* ')) {
                  const items = paragraph.split('\n* ');
                  return (
                    <ul key={idx} className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                      {items.map((item, itemIdx) => (
                        <li key={itemIdx}>{item.replace(/^\* /, '')}</li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={idx} className="whitespace-pre-line text-xs sm:text-sm">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            <div className="mt-10 pt-6 border-t border-stone-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4 text-xs">
              <span className="text-stone-400 font-mono">
                HELPS Welfare Society · Regd No: HR/2021/0285458
              </span>
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="text-orange-600 dark:text-orange-400 font-semibold hover:underline"
              >
                Submit Compliance Inquiry →
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
