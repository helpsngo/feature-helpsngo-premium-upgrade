import React from 'react';
import { TabType } from '../types';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Award, 
  ShieldCheck, 
  Users, 
  Target, 
  HeartHandshake, 
  ArrowRight, 
  Scale, 
  FileCheck2, 
  CheckCircle2 
} from 'lucide-react';
import { authoritativeOrgService } from '../services/authoritativeOrgService';

interface AboutPageProps {
  onNavigate: (tab: TabType) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const profile = authoritativeOrgService.getProfile();
  const impact = authoritativeOrgService.getImpactData();

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 animate-fadeIn">
      {/* Editorial Header */}
      <section className="bg-gradient-to-b from-stone-100 to-[#FAFAF8] dark:from-zinc-900 dark:to-zinc-950 py-12 sm:py-16 px-4 sm:px-6 border-b border-stone-200/80 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400">
            <span>About HELPS Society</span>
            <span aria-hidden="true">·</span>
            <span>Est. 2016 · Ludhiana, Punjab</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
            Serving Humanity with Compassion, Dignity & Action
          </h1>

          <p className="text-stone-600 dark:text-zinc-300 text-base sm:text-lg leading-relaxed max-w-3xl font-normal">
            HELPS Welfare Society is an Indian registered non-governmental organization founded in 2016 under the Societies Registration Act XXI of 1860. Headquartered in Ludhiana, Punjab, the society orchestrates holistic grassroots interventions across child education, clinical outreach, clean water installations, and dignified nutrition.
          </p>
        </div>
      </section>

      {/* Narrative Editorial Grid */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
            Our Founding Genesis
          </h2>
          <div className="prose prose-stone dark:prose-invert max-w-none text-sm sm:text-base text-stone-700 dark:text-zinc-300 leading-relaxed space-y-4">
            <p>
              In 2016, a collective of dedicated educators, student engineers from Guru Nanak Dev Engineering College (GNDEC), and practicing medical doctors in Ludhiana witnessed the severe challenges facing migrant labor colonies, unreached rural farming hamlets, and urban slum clusters along the Gill Road industrial corridor.
            </p>
            <p>
              Rather than transient charity, the founders resolved to build a permanent, institutionally transparent welfare society committed to five fundamental human rights: <strong>Health, Education, Liberty, Peace, and Service (HELPS)</strong>.
            </p>
            <p>
              Today, HELPS operates evening remedial AABHA learning centers for slum children, bi-weekly mobile diagnostic health clinics, daily community nutrition via the Annapoorna program, and clean drinking water solar borewells commissioned in collaboration with local village panchayats.
            </p>
          </div>
        </div>

        {/* 3 Founding Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 space-y-2.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 flex items-center justify-center font-bold">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white">
              Root-Cause Focus
            </h3>
            <p className="text-xs text-stone-600 dark:text-zinc-400 leading-relaxed">
              We focus on structural catalysts—literacy, preventative medicine, potable water, and livelihood skills—that permanently elevate families out of generational poverty.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 space-y-2.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center font-bold">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white">
              Strict Audit Integrity
            </h3>
            <p className="text-xs text-stone-600 dark:text-zinc-400 leading-relaxed">
              Every rupee received is reconciled with electronic Form 10BE statutory reporting and annual audits by independent Chartered Accountants.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 space-y-2.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center font-bold">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white">
              Community Ownership
            </h3>
            <p className="text-xs text-stone-600 dark:text-zinc-400 leading-relaxed">
              Programs are co-designed with local panchayats, community volunteers, and parents to guarantee long-term operational stewardship.
            </p>
          </div>
        </div>

        {/* Official Statutory Dossier */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 space-y-6 shadow-2xs">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-zinc-800 pb-4">
            <div>
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-stone-500">
                Statutory Compliance
              </span>
              <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white">
                Official Registration & Approvals
              </h3>
            </div>
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-zinc-800/50 border border-stone-200/80 dark:border-zinc-700/60 space-y-1">
              <span className="text-stone-500 dark:text-zinc-400 font-semibold block text-[11px]">Society Registration Act XXI of 1860</span>
              <span className="font-mono font-bold text-zinc-900 dark:text-white">Reg No: HR/2021/0285458</span>
              <p className="text-[11px] text-stone-500">Registrar of Societies, Chandigarh (Permanent Society Constitution)</p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 dark:bg-zinc-800/50 border border-stone-200/80 dark:border-zinc-700/60 space-y-1">
              <span className="text-stone-500 dark:text-zinc-400 font-semibold block text-[11px]">NITI Aayog NGO-DARPAN Portal</span>
              <span className="font-mono font-bold text-zinc-900 dark:text-white">Unique ID: HR/2021/0285458</span>
              <p className="text-[11px] text-stone-500">Verified entity on the Govt. of India NGO Partnership Portal</p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 dark:bg-zinc-800/50 border border-stone-200/80 dark:border-zinc-700/60 space-y-1">
              <span className="text-stone-500 dark:text-zinc-400 font-semibold block text-[11px]">Section 80G Tax Exemption Approval</span>
              <span className="font-mono font-bold text-zinc-900 dark:text-white">Order: CIT(E) CHD/80G/2016-17/4726</span>
              <p className="text-[11px] text-stone-500">Grants 50% statutory deduction on donor contributions (Rule 18AB)</p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 dark:bg-zinc-800/50 border border-stone-200/80 dark:border-zinc-700/60 space-y-1">
              <span className="text-stone-500 dark:text-zinc-400 font-semibold block text-[11px]">Ministry of Corporate Affairs CSR-1</span>
              <span className="font-mono font-bold text-zinc-900 dark:text-white">Registration: CSR00018492</span>
              <p className="text-[11px] text-stone-500">Authorized for Section 135 Companies Act corporate co-sponsorships</p>
            </div>
          </div>
        </div>

        {/* Action Pathways */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-200 dark:border-zinc-800">
          <div className="space-y-0.5">
            <span className="text-xs text-stone-500">Interested in our people and governance?</span>
            <div className="font-bold text-zinc-900 dark:text-white text-sm">Meet the Leadership & Advisory Board</div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('team')}
              className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              View Team
            </button>
            <button
              type="button"
              onClick={() => onNavigate('transparency')}
              className="px-4 py-2 rounded-xl border border-stone-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold uppercase tracking-wider hover:bg-stone-100 transition-colors cursor-pointer"
            >
              Audited Reports
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
