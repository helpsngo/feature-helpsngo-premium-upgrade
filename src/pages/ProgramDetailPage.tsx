import React from 'react';
import { 
  ArrowLeft, 
  Heart, 
  MapPin, 
  Users, 
  Target, 
  CheckCircle2, 
  Calendar, 
  ShieldCheck, 
  Share2, 
  Sparkles,
  Award,
  Clock,
  ChevronRight
} from 'lucide-react';
import { TabType, Project } from '../types';

interface ProgramDetailPageProps {
  program: Project | null;
  onBack: () => void;
  onDonate: (program: Project) => void;
  onVolunteer: () => void;
  onRequestAssistance: () => void;
  onNavigate: (tab: TabType) => void;
}

export const ProgramDetailPage: React.FC<ProgramDetailPageProps> = ({
  program,
  onBack,
  onDonate,
  onVolunteer,
  onRequestAssistance,
  onNavigate
}) => {
  if (!program) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-white mb-2">
          Programme Not Found
        </h2>
        <p className="text-sm text-stone-500 mb-6">
          The requested programme could not be located or has been archived.
        </p>
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2.5 bg-stone-900 text-white font-semibold text-xs rounded-xl"
        >
          Return to All Programmes
        </button>
      </div>
    );
  }

  const percentage = Math.min(100, Math.round((program.raisedAmount / program.targetAmount) * 100));

  return (
    <div className="min-h-screen bg-[#FBFBF9] dark:bg-zinc-950 text-stone-900 dark:text-zinc-100 transition-colors">
      
      {/* Top Breadcrumb Bar */}
      <div className="bg-stone-100 dark:bg-zinc-900 border-b border-stone-200 dark:border-zinc-800 px-4 sm:px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Programmes</span>
          </button>

          <div className="flex items-center gap-1.5 text-stone-500 text-[11px]">
            <span>Programmes</span>
            <ChevronRight className="w-3 h-3 text-stone-400" />
            <span className="font-semibold text-stone-800 dark:text-zinc-200">{program.category}</span>
          </div>
        </div>
      </div>

      {/* Program Hero / Media Header */}
      <section className="bg-stone-900 text-white pt-10 pb-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-orange-400 mb-2">
              <span>{program.category} Programme</span>
              <span className="text-stone-600" aria-hidden="true">·</span>
              <span className="text-emerald-400 font-medium">80G Tax-Deductible</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
              {program.title}
            </h1>

            <p className="text-base text-stone-300 leading-relaxed mb-6">
              {program.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs text-stone-400 pt-4 border-t border-stone-800">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-orange-400" />
                <span>{program.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>{program.beneficiariesCount} Verified Reach</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>MCA CSR-1 Eligible</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-700 aspect-4/3">
              <img
                src={program.image}
                alt={program.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-white text-xs">
                <span className="font-semibold block">{program.title}</span>
                <span className="text-stone-300 text-[11px]">Field Unit: {program.location}</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content & Donation Sidebar */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Detailed Narrative & Updates */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Overview */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-white mb-4">
                Programme Mission & Strategy
              </h2>
              <div className="text-stone-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  {program.longDescription || program.description}
                </p>
                <p>
                  Initiated by HELPS Welfare Society under its statutory charter, this initiative combines ground-level assessments in Ludhiana slums and rural Punjab with transparent, donor-audited fund deployment.
                </p>
              </div>
            </div>

            {/* Impact Milestones */}
            <div className="bg-stone-50 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-3xl p-6">
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-600" />
                <span>Audited Programme Milestones</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="bg-white dark:bg-zinc-800 p-4 rounded-2xl border border-stone-200 dark:border-zinc-700">
                  <div className="text-2xl font-mono font-bold text-stone-900 dark:text-white mb-1">
                    {program.beneficiariesCount}
                  </div>
                  <div className="text-xs text-stone-500 dark:text-zinc-400">Total Direct Reach</div>
                </div>

                <div className="bg-white dark:bg-zinc-800 p-4 rounded-2xl border border-stone-200 dark:border-zinc-700">
                  <div className="text-2xl font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                    88.4%
                  </div>
                  <div className="text-xs text-stone-500 dark:text-zinc-400">Direct Program Spend Ratio</div>
                </div>

                <div className="bg-white dark:bg-zinc-800 p-4 rounded-2xl border border-stone-200 dark:border-zinc-700">
                  <div className="text-2xl font-mono font-bold text-orange-600 dark:text-orange-400 mb-1">
                    {percentage}%
                  </div>
                  <div className="text-xs text-stone-500 dark:text-zinc-400">Annual Target Realized</div>
                </div>
              </div>
            </div>

            {/* Field Updates */}
            {program.updates && program.updates.length > 0 && (
              <div>
                <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-white mb-6">
                  Field Progress Updates
                </h3>
                <div className="space-y-6">
                  {program.updates.map((update, idx) => (
                    <div 
                      key={idx}
                      className="bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row gap-5"
                    >
                      {update.image && (
                        <img
                          src={update.image}
                          alt={update.title}
                          className="w-full sm:w-36 h-36 object-cover rounded-2xl shrink-0"
                        />
                      )}
                      <div>
                        <div className="flex items-center gap-2 text-xs text-stone-400 font-mono mb-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{update.date}</span>
                        </div>
                        <h4 className="font-serif text-lg font-bold text-stone-900 dark:text-white mb-2">
                          {update.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-stone-600 dark:text-zinc-300 leading-relaxed">
                          {update.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Beneficiary Action Banner */}
            <div className="bg-orange-50/70 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/40 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="font-serif text-xl font-bold text-orange-950 dark:text-orange-200 mb-1">
                  Do You or Someone You Know Need This Aid?
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-zinc-400">
                  Submit a zero-cost beneficiary assistance request to our Ludhiana field operations team.
                </p>
              </div>
              <button
                type="button"
                onClick={onRequestAssistance}
                className="px-6 py-2.5 bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-bold text-xs rounded-xl hover:bg-stone-800 transition-colors shrink-0 cursor-pointer"
              >
                Request Assistance
              </button>
            </div>

          </div>

          {/* Right Action & Donation Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Donation Card */}
            <div className="bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xs sticky top-24">
              <div className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400 mb-1">
                Support This Cause
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white mb-4">
                Fund Direct Ground Action
              </h3>

              {/* Progress */}
              <div className="mb-5">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-mono font-bold text-stone-900 dark:text-white">
                    ₹{program.raisedAmount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-stone-500">
                    Target ₹{program.targetAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="w-full bg-stone-200 dark:bg-zinc-800 rounded-full h-2 overflow-hidden">
                  <div
                    style={{ width: `${percentage}%` }}
                    className="bg-orange-600 h-full rounded-full"
                  />
                </div>
                <div className="text-right text-[11px] text-stone-400 mt-1 font-mono">
                  {percentage}% funded by public supporters
                </div>
              </div>

              <button
                type="button"
                onClick={() => onDonate(program)}
                className="w-full py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer mb-3"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Donate to this Programme</span>
              </button>

              <button
                type="button"
                onClick={onVolunteer}
                className="w-full py-2.5 bg-stone-100 dark:bg-zinc-800 hover:bg-stone-200 dark:hover:bg-zinc-700 text-stone-800 dark:text-zinc-200 font-semibold text-xs rounded-xl transition-colors mb-4"
              >
                Volunteer for this Programme
              </button>

              <div className="pt-4 border-t border-stone-100 dark:border-zinc-800 text-[11px] text-stone-500 dark:text-zinc-400 space-y-2">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>50% Tax Deduction under Sec 80G</span>
                </div>
                <div>Instant digital 80G tax receipt and Form 10BE reconciliation certificate provided.</div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
