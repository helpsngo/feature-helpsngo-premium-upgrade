import React from 'react';
import { TabType } from '../types';
import { 
  Users, 
  ShieldCheck, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  HeartPulse, 
  ArrowRight,
  Briefcase
} from 'lucide-react';
import { authoritativeOrgService } from '../services/authoritativeOrgService';

interface OurTeamPageProps {
  onNavigate: (tab: TabType) => void;
}

export const OurTeamPage: React.FC<OurTeamPageProps> = ({ onNavigate }) => {
  const approvedTeam = authoritativeOrgService.getPublicApprovedTeam();

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 animate-fadeIn">
      {/* Header */}
      <section className="bg-gradient-to-b from-stone-100 to-[#FAFAF8] dark:from-zinc-900 dark:to-zinc-950 py-12 sm:py-16 px-4 sm:px-6 border-b border-stone-200/80 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="text-xs font-sans font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400">
            Governance & Leadership
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
            Our Verified Leadership & Advisory Board
          </h1>
          <p className="text-stone-600 dark:text-zinc-300 text-base sm:text-lg leading-relaxed max-w-3xl">
            Meet the dedicated trustees, physicians, educators, and field coordinators directing HELPS Welfare Society's grassroots interventions across Punjab and India.
          </p>
        </div>
      </section>

      {/* Leadership Roster */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="space-y-1">
          <span className="text-xs font-sans font-bold uppercase tracking-widest text-stone-500">
            Executive Leadership
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
            Trustee Board & Operations Directors
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {approvedTeam.map((member) => (
            <div 
              key={member.id}
              className="bg-white dark:bg-zinc-900 rounded-3xl border border-stone-200 dark:border-zinc-800 overflow-hidden shadow-2xs hover:border-stone-300 transition-all flex flex-col"
            >
              {/* Photo Area with Scrim & Fallback */}
              <div className="relative h-64 bg-stone-100 dark:bg-zinc-800 overflow-hidden">
                <img
                  src={member.photographUrl}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to elegant CSS avatar container if external image fails
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      const fallback = target.parentElement.querySelector('.img-fallback');
                      if (fallback) fallback.classList.remove('hidden');
                    }
                  }}
                />
                <div className="img-fallback hidden absolute inset-0 bg-stone-200 dark:bg-zinc-800 flex items-center justify-center font-serif text-4xl font-bold text-stone-400">
                  {member.name.charAt(0)}
                </div>
                
                {/* Appointment Year Badge */}
                <div className="absolute top-3 left-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider text-zinc-900 dark:text-white border border-stone-200 dark:border-zinc-700 shadow-2xs">
                  With HELPS since {member.appointmentYear}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-orange-600 dark:text-orange-400">
                      {member.category}
                    </span>
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold uppercase flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white leading-tight">
                    {member.name}
                  </h3>

                  <p className="text-xs font-medium text-stone-500 dark:text-zinc-400">
                    {member.designation}
                  </p>

                  <p className="text-xs sm:text-sm text-stone-600 dark:text-zinc-300 leading-relaxed font-normal pt-1">
                    {member.biography}
                  </p>
                </div>

                {/* Contact & Location Strip */}
                <div className="pt-3 border-t border-stone-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500 dark:text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>{member.location}</span>
                  </div>
                  {member.email && (
                    <a 
                      href={`mailto:${member.email}`} 
                      className="text-orange-600 dark:text-orange-400 hover:underline font-medium text-[11px]"
                    >
                      {member.email}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Governance & Accountability Structure */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 space-y-6 shadow-2xs">
          <div className="space-y-1">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-stone-500">
              Institutional Oversight
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
              Governance & Oversight Committees
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-zinc-800/40 border border-stone-200/60 dark:border-zinc-700/60 space-y-1.5">
              <span className="font-serif text-sm font-bold text-zinc-900 dark:text-white block">
                Trustee Executive Council
              </span>
              <p className="text-stone-600 dark:text-zinc-400 leading-relaxed">
                Directs statutory society filings, bank reconciliations, MCA CSR-1 reporting, and multi-year program planning.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-zinc-800/40 border border-stone-200/60 dark:border-zinc-700/60 space-y-1.5">
              <span className="font-serif text-sm font-bold text-zinc-900 dark:text-white block">
                Medical & Clinical Advisory
              </span>
              <p className="text-stone-600 dark:text-zinc-400 leading-relaxed">
                Led by certified physicians to evaluate clinical camp diagnostics, pharmaceutical safety protocols, and referrals.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-zinc-800/40 border border-stone-200/60 dark:border-zinc-700/60 space-y-1.5">
              <span className="font-serif text-sm font-bold text-zinc-900 dark:text-white block">
                University Volunteer Desk
              </span>
              <p className="text-stone-600 dark:text-zinc-400 leading-relaxed">
                Coordinated with Guru Nanak Dev Engineering College (GNDEC) faculty mentors and student change-makers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Action Footer */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-stone-200 dark:border-zinc-800">
        <div>
          <span className="text-xs text-stone-500">Want to join our field teams?</span>
          <div className="font-bold text-zinc-900 dark:text-white text-sm">Become a Volunteer or Apply for an Internship</div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('volunteer')}
            className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Volunteer With Us
          </button>
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="px-4 py-2 rounded-xl border border-stone-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold uppercase tracking-wider hover:bg-stone-100 transition-colors cursor-pointer"
          >
            Contact Secretariat
          </button>
        </div>
      </section>
    </div>
  );
};
