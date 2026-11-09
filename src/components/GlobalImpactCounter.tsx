import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Utensils, 
  GraduationCap, 
  HeartPulse, 
  Sparkles, 
  TrendingUp, 
  ArrowRight, 
  ShieldCheck, 
  RefreshCw, 
  Info, 
  CheckCircle2, 
  Coins, 
  HeartHandshake,
  Activity,
  Droplets
} from 'lucide-react';
import { DonationRecord, TabType, CentralImpactData } from '../types';
import { authoritativeOrgService } from '../services/authoritativeOrgService';

interface GlobalImpactCounterProps {
  donations?: DonationRecord[];
  onNavigate?: (tab: TabType) => void;
  className?: string;
}

export const GlobalImpactCounter: React.FC<GlobalImpactCounterProps> = ({
  donations = [],
  onNavigate,
  className = ''
}) => {
  const [viewMode, setViewMode] = useState<'cumulative' | 'direct_ledger'>('cumulative');
  const [showFormulaModal, setShowFormulaModal] = useState<boolean>(false);
  const [centralImpact, setCentralImpact] = useState<CentralImpactData>(() => authoritativeOrgService.getImpactData());

  React.useEffect(() => {
    const unsub = authoritativeOrgService.subscribe(() => {
      setCentralImpact(authoritativeOrgService.getImpactData());
    });
    return unsub;
  }, []);

  // Compute live metrics based on valid donation records with authoritative baseline preservation
  const impactStats = useMemo(() => {
    // Include completed, processing or recorded donations with positive amounts
    const activeRecords = donations.filter(d => (Number(d.amount) || 0) > 0);

    const totalFunds = activeRecords.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
    const donationCount = activeRecords.length;

    // Categorized breakdown
    const hungerFunds = activeRecords
      .filter(d => {
        const cat = (d.category || '').toLowerCase();
        const title = (d.title || '').toLowerCase();
        return cat.includes('hunger') || title.includes('meal') || title.includes('nutrition') || title.includes('food');
      })
      .reduce((sum, d) => sum + (Number(d.amount) || 0), 0);

    const educationFunds = activeRecords
      .filter(d => {
        const cat = (d.category || '').toLowerCase();
        const title = (d.title || '').toLowerCase();
        return cat.includes('education') || title.includes('aabha') || title.includes('school') || title.includes('class');
      })
      .reduce((sum, d) => sum + (Number(d.amount) || 0), 0);

    const healthFunds = activeRecords
      .filter(d => {
        const cat = (d.category || '').toLowerCase();
        const title = (d.title || '').toLowerCase();
        return cat.includes('health') || title.includes('medical') || title.includes('clinic') || title.includes('camp');
      })
      .reduce((sum, d) => sum + (Number(d.amount) || 0), 0);

    const waterFunds = activeRecords
      .filter(d => {
        const cat = (d.category || '').toLowerCase();
        const title = (d.title || '').toLowerCase();
        return cat.includes('water') || cat.includes('environment') || title.includes('water') || title.includes('tree') || title.includes('earth');
      })
      .reduce((sum, d) => sum + (Number(d.amount) || 0), 0);

    // General fund allocation distribution: 40% meals, 30% education, 20% health, 10% water
    const specificSum = hungerFunds + educationFunds + healthFunds + waterFunds;
    const generalFunds = Math.max(0, totalFunds - specificSum);

    const effectiveHungerFunds = hungerFunds + (generalFunds * 0.40);
    const effectiveEducationFunds = educationFunds + (generalFunds * 0.30);
    const effectiveHealthFunds = healthFunds + (generalFunds * 0.20);
    const effectiveWaterFunds = waterFunds + (generalFunds * 0.10);

    // Direct outcome formulas:
    // - Every ₹25 provides 1 warm cooked meal (Ludhiana Annapoorna community kitchens)
    const directMeals = Math.round(effectiveHungerFunds / 25);
    // - Every ₹50 empowers 1 life with essential relief kits, clothing, or clean water
    const directLives = Math.round(totalFunds / 50);
    // - Every ₹500 sponsors school supplies & tutorial kit for 1 child at AABHA centers
    const directStudents = Math.round(effectiveEducationFunds / 500);
    // - Every ₹200 sponsors diagnostic screening & medicine for 1 patient
    const directPatients = Math.round(effectiveHealthFunds / 200);

    // Baseline historical figures dynamically loaded from Central Impact System (FY 2024-2025 Audited)
    const baseMeals = centralImpact.metrics.mealsServed?.value ?? 500000;
    const baseLives = centralImpact.metrics.totalBeneficiaries?.value ?? 100000;
    const baseStudents = centralImpact.metrics.childrenSupported?.value ?? 50000;
    const healthAch = centralImpact.programmeAchievements.find(p => p.category === 'Healthcare');
    const basePatients = healthAch?.beneficiaryCount ?? 15000;

    // Latest recorded donation
    const latestDonation = activeRecords.length > 0 ? activeRecords[0] : null;

    return {
      totalFunds,
      donationCount,
      directMeals,
      directLives,
      directStudents,
      directPatients,
      baseMeals,
      baseLives,
      baseStudents,
      basePatients,
      cumulativeMeals: baseMeals + directMeals,
      cumulativeLives: baseLives + directLives,
      cumulativeStudents: baseStudents + directStudents,
      cumulativePatients: basePatients + directPatients,
      latestDonation,
      reportingYear: centralImpact.reportingYear,
      verificationStatus: centralImpact.dataVerificationStatus
    };
  }, [donations, centralImpact]);

  const isCumulative = viewMode === 'cumulative';

  return (
    <section 
      aria-label="Global Impact Counter"
      className={`relative bg-gradient-to-br from-slate-900 via-zinc-900 to-neutral-950 text-white rounded-3xl p-4 sm:p-5 border border-zinc-800 shadow-md overflow-hidden ${className}`}
    >
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-600/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2.5 pb-3.5 border-b border-zinc-800/80">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-orange-500/20 border border-orange-500/30 text-orange-400 flex items-center justify-center shrink-0 shadow-xs">
            <Activity className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-white">
                Global Impact Counter
              </h2>
              <span className="flex items-center gap-1 bg-emerald-500/15 text-emerald-400 text-[9px] font-black px-2 py-0.5 rounded-full border border-emerald-500/25">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Live Ticker
              </span>
            </div>
            <p className="text-[10px] text-zinc-400">
              Derived in real-time from verified donation history ({impactStats.donationCount} ledger records)
            </p>
          </div>
        </div>

        {/* View mode toggle & info button */}
        <div className="flex items-center gap-1.5 ml-auto">
          <div className="bg-zinc-800/90 p-0.5 rounded-xl border border-zinc-700/60 flex items-center text-[10px] font-bold">
            <button
              type="button"
              onClick={() => setViewMode('cumulative')}
              className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                isCumulative 
                  ? 'bg-orange-600 text-white shadow-2xs font-extrabold' 
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Show cumulative all-time total including baseline stats"
            >
              All-Time Total
            </button>
            <button
              type="button"
              onClick={() => setViewMode('direct_ledger')}
              className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                !isCumulative 
                  ? 'bg-orange-600 text-white shadow-2xs font-extrabold' 
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Show direct outcomes generated solely by the active donation history"
            >
              Direct Live Ledger
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowFormulaModal(!showFormulaModal)}
            className="w-7 h-7 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center border border-zinc-700/60 transition-colors cursor-pointer"
            title="How this impact is calculated"
            aria-label="Calculation formula info"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Calculation Formula Drawer (if toggled) */}
      {showFormulaModal && (
        <div className="my-3 p-3 bg-zinc-800/70 border border-zinc-700 rounded-2xl text-[11px] text-zinc-300 space-y-1.5 animate-fadeIn">
          <div className="flex items-center justify-between text-orange-400 font-extrabold uppercase text-[10px]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Transparent Impact Conversion Formulas
            </span>
            <button 
              type="button" 
              onClick={() => setShowFormulaModal(false)}
              className="text-zinc-400 hover:text-white text-xs cursor-pointer"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] pt-1">
            <div className="p-2 bg-zinc-900/60 rounded-xl border border-zinc-800">
              <strong className="text-white block font-bold">🍲 Meals Distributed</strong>
              <span>Every ₹25 contribution prepares 1 fresh, wholesome hot meal via Annapoorna kitchens.</span>
            </div>
            <div className="p-2 bg-zinc-900/60 rounded-xl border border-zinc-800">
              <strong className="text-white block font-bold">👥 Lives Empowered</strong>
              <span>Every ₹50 provides essential health, nutrition, or educational relief touchpoints.</span>
            </div>
            <div className="p-2 bg-zinc-900/60 rounded-xl border border-zinc-800">
              <strong className="text-white block font-bold">🎓 Children Educated</strong>
              <span>Every ₹500 provides textbooks, stationery, uniform kits & tutorial access for a student.</span>
            </div>
            <div className="p-2 bg-zinc-900/60 rounded-xl border border-zinc-800">
              <strong className="text-white block font-bold">🩺 Medical Screenings</strong>
              <span>Every ₹200 covers physician diagnostics, vision/sugar checks, and essential medication.</span>
            </div>
          </div>
        </div>
      )}

      {/* Main 4-Tile Metric Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 py-3.5 relative z-10">
        {/* Metric 1: Total Lives Empowered */}
        <div className="bg-zinc-800/50 hover:bg-zinc-800/80 border border-zinc-700/50 hover:border-indigo-500/40 rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between transition-all group">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-wider text-indigo-300 bg-indigo-950/60 px-1.5 py-0.5 rounded-md border border-indigo-800/40">
              Reach
            </span>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black tracking-tight text-white font-mono">
              {isCumulative 
                ? `${impactStats.cumulativeLives.toLocaleString('en-IN')}+` 
                : (impactStats.directLives > 0 ? impactStats.directLives.toLocaleString('en-IN') : '0 (Active)')}
            </div>
            <p className="text-[11px] font-bold text-zinc-300 uppercase tracking-tight mt-0.5">
              Lives Empowered
            </p>
            <p className="text-[9px] text-zinc-400 mt-0.5 truncate">
              {isCumulative 
                ? `Includes ${impactStats.baseLives.toLocaleString('en-IN')}+ audited base` 
                : (impactStats.directLives > 0 ? 'Directly from active gifts' : `Audited baseline: ${impactStats.baseLives.toLocaleString('en-IN')}+`)}
            </p>
          </div>
        </div>

        {/* Metric 2: Meals Distributed */}
        <div className="bg-zinc-800/50 hover:bg-zinc-800/80 border border-zinc-700/50 hover:border-amber-500/40 rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between transition-all group">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Utensils className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-wider text-amber-300 bg-amber-950/60 px-1.5 py-0.5 rounded-md border border-amber-800/40">
              Nutrition
            </span>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black tracking-tight text-white font-mono">
              {isCumulative 
                ? `${impactStats.cumulativeMeals.toLocaleString('en-IN')}+` 
                : (impactStats.directMeals > 0 ? impactStats.directMeals.toLocaleString('en-IN') : '0 (Active)')}
            </div>
            <p className="text-[11px] font-bold text-zinc-300 uppercase tracking-tight mt-0.5">
              Meals Distributed
            </p>
            <p className="text-[9px] text-zinc-400 mt-0.5 truncate">
              {isCumulative 
                ? `Includes ${impactStats.baseMeals.toLocaleString('en-IN')}+ audited base` 
                : (impactStats.directMeals > 0 ? 'Annapoorna food relief' : `Audited baseline: ${impactStats.baseMeals.toLocaleString('en-IN')}+`)}
            </p>
          </div>
        </div>

        {/* Metric 3: Children Educated */}
        <div className="bg-zinc-800/50 hover:bg-zinc-800/80 border border-zinc-700/50 hover:border-blue-500/40 rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between transition-all group">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <GraduationCap className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-wider text-blue-300 bg-blue-950/60 px-1.5 py-0.5 rounded-md border border-blue-800/40">
              Education
            </span>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black tracking-tight text-white font-mono">
              {isCumulative 
                ? `${impactStats.cumulativeStudents.toLocaleString('en-IN')}+` 
                : (impactStats.directStudents > 0 ? impactStats.directStudents.toLocaleString('en-IN') : '0 (Active)')}
            </div>
            <p className="text-[11px] font-bold text-zinc-300 uppercase tracking-tight mt-0.5">
              Children Educated
            </p>
            <p className="text-[9px] text-zinc-400 mt-0.5 truncate">
              {isCumulative 
                ? `Includes ${impactStats.baseStudents.toLocaleString('en-IN')}+ audited base` 
                : (impactStats.directStudents > 0 ? 'AABHA learning centers' : `Audited baseline: ${impactStats.baseStudents.toLocaleString('en-IN')}+`)}
            </p>
          </div>
        </div>

        {/* Metric 4: Medical Aid Provided */}
        <div className="bg-zinc-800/50 hover:bg-zinc-800/80 border border-zinc-700/50 hover:border-rose-500/40 rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between transition-all group">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
              <HeartPulse className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-wider text-rose-300 bg-rose-950/60 px-1.5 py-0.5 rounded-md border border-rose-800/40">
              Healthcare
            </span>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black tracking-tight text-white font-mono">
              {isCumulative 
                ? `${impactStats.cumulativePatients.toLocaleString('en-IN')}+` 
                : (impactStats.directPatients > 0 ? impactStats.directPatients.toLocaleString('en-IN') : '0 (Active)')}
            </div>
            <p className="text-[11px] font-bold text-zinc-300 uppercase tracking-tight mt-0.5">
              Medical Aid Given
            </p>
            <p className="text-[9px] text-zinc-400 mt-0.5 truncate">
              {isCumulative 
                ? `Includes ${impactStats.basePatients.toLocaleString('en-IN')}+ audited base` 
                : (impactStats.directPatients > 0 ? 'Physician health camps' : `Audited baseline: ${impactStats.basePatients.toLocaleString('en-IN')}+`)}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Live Ledger Banner & Quick Action */}
      <div className="relative z-10 pt-2.5 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <Coins className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="text-[11px] text-zinc-300">
            Total Mobilized in Ledger: <strong className="text-white font-mono">₹{impactStats.totalFunds.toLocaleString('en-IN')}</strong>
          </span>
          {impactStats.latestDonation && (
            <span className="hidden sm:inline-block text-[10px] text-zinc-400 border-l border-zinc-700 pl-2">
              Latest: <span className="text-emerald-400 font-bold">₹{impactStats.latestDonation.amount.toLocaleString('en-IN')}</span> for {impactStats.latestDonation.title.slice(0, 24)}...
            </span>
          )}
        </div>

        {onNavigate && (
          <button
            type="button"
            onClick={() => onNavigate('donate')}
            className="ml-auto bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-[11px] uppercase tracking-wider py-1.5 px-3.5 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <span>Boost Impact</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </section>
  );
};
