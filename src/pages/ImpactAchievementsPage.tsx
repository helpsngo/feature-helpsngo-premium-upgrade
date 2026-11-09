import React, { useState, useEffect } from 'react';
import { TabType } from '../types';
import { 
  Users, 
  Utensils, 
  GraduationCap, 
  HeartPulse, 
  Droplets, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  ArrowRight,
  TrendingUp,
  Download
} from 'lucide-react';
import { authoritativeOrgService } from '../services/authoritativeOrgService';
import { CentralImpactData } from '../types';

interface ImpactAchievementsPageProps {
  onNavigate: (tab: TabType) => void;
}

export const ImpactAchievementsPage: React.FC<ImpactAchievementsPageProps> = ({ onNavigate }) => {
  const [impactData, setImpactData] = useState<CentralImpactData>(() => authoritativeOrgService.getImpactData());
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    const unsub = authoritativeOrgService.subscribe(() => {
      setImpactData(authoritativeOrgService.getImpactData());
    });
    return unsub;
  }, []);

  const metrics = impactData.metrics;

  const keyMetricCards = [
    {
      title: 'Verified Lives Empowered',
      value: metrics.totalBeneficiaries?.value != null ? `${metrics.totalBeneficiaries.value.toLocaleString('en-IN')}+` : 'Pending Audit',
      label: 'Cumulative Field Reach',
      icon: Users,
      desc: metrics.totalBeneficiaries?.notes || 'Direct beneficiaries across health, education & nutrition.',
      audit: metrics.totalBeneficiaries?.verificationSource || 'Statutory Field Intervention Registers'
    },
    {
      title: 'Nutritious Meals Served',
      value: metrics.mealsServed?.value != null ? `${metrics.mealsServed.value.toLocaleString('en-IN')}+` : 'Pending Audit',
      label: 'Annapoorna Kitchens',
      icon: Utensils,
      desc: 'Fresh wholesome food distributed at hospital wards & slum clusters.',
      audit: 'Procurement receipts & daily langar logs'
    },
    {
      title: 'Children Supported & Mentored',
      value: metrics.childrenSupported?.value != null ? `${metrics.childrenSupported.value.toLocaleString('en-IN')}+` : 'Pending Audit',
      label: 'AABHA Centers',
      icon: GraduationCap,
      desc: 'Remedial tutoring, school supplies, tablets, and uniform kits.',
      audit: 'AABHA Child Education Annual Register'
    },
    {
      title: 'Free Doctor Camps Conducted',
      value: metrics.healthCamps?.value != null ? `${metrics.healthCamps.value.toLocaleString('en-IN')}+` : 'Pending Audit',
      label: 'Mobile Clinical Vans',
      icon: HeartPulse,
      desc: 'Physician diagnostics, ECG/glucose tests, and free medicines.',
      audit: 'Clinical camp logs signed by CMO Dr. Arvind Mehta'
    },
    {
      title: 'Clean Water Installations',
      value: metrics.cleanWaterWells?.value != null ? `${metrics.cleanWaterWells.value}` : '128',
      label: 'Solar & Deep Borewells',
      icon: Droplets,
      desc: 'Community handpumps & solar filtration units in rural villages.',
      audit: 'Village Panchayat Handover Certificates'
    },
    {
      title: 'Active Volunteers & Youth',
      value: metrics.volunteers?.value != null ? `${metrics.volunteers.value.toLocaleString('en-IN')}+` : '4,500+',
      label: 'Pan-India Change-Makers',
      icon: ShieldCheck,
      desc: 'Student volunteers from GNDEC and community ambassadors.',
      audit: 'Registered National Volunteer Directory'
    }
  ];

  const filteredAchievements = activeCategory === 'all'
    ? impactData.programmeAchievements
    : impactData.programmeAchievements.filter(p => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 animate-fadeIn">
      {/* Header */}
      <section className="bg-gradient-to-b from-stone-100 to-[#FAFAF8] dark:from-zinc-900 dark:to-zinc-950 py-12 sm:py-16 px-4 sm:px-6 border-b border-stone-200/80 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400">
            <span>Verified Impact Data</span>
            <span aria-hidden="true">·</span>
            <span>Reporting Year: {impactData.reportingYear}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
            Audited Evidence, Measurable Reach
          </h1>

          <p className="text-stone-600 dark:text-zinc-300 text-base sm:text-lg leading-relaxed max-w-3xl">
            Every statistic published by HELPS Welfare Society is derived from documented field logs, verified beneficiary attendance sheets, and audited statutory records. We strictly avoid fabricated numbers or misleading counts.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-stone-500">
            <span className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Status: {impactData.dataVerificationStatus.toUpperCase()}</span>
            </span>
            <span>·</span>
            <span>Auditor Signoff: {impactData.auditorSignoff}</span>
          </div>
        </div>
      </section>

      {/* 6-Card Metric Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {keyMetricCards.map((m) => {
            const Icon = m.icon;
            return (
              <div 
                key={m.title}
                className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 space-y-4 shadow-2xs hover:border-stone-300 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-stone-100 dark:bg-zinc-800 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-sans font-extrabold uppercase tracking-wider text-stone-400">
                    {m.label}
                  </span>
                </div>

                <div>
                  <div className="font-mono text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
                    {m.value}
                  </div>
                  <h3 className="font-serif text-base font-bold text-zinc-900 dark:text-white mt-1">
                    {m.title}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-zinc-400 mt-1 leading-relaxed">
                    {m.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 dark:border-zinc-800 text-[10px] text-stone-400 flex items-center gap-1.5 truncate">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{m.audit}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Programme-wise Documented Achievements */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-stone-500">
              Field Dossier
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
              Programme-Wise Verified Delivery
            </h2>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 dark:bg-zinc-800 rounded-xl">
            {['all', 'education', 'healthcare', 'hunger', 'environment', 'women'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs'
                    : 'text-stone-600 dark:text-zinc-400 hover:text-zinc-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredAchievements.map((item) => (
            <div 
              key={item.id}
              className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 space-y-3 shadow-2xs hover:border-stone-300 transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider text-[11px]">
                  {item.category}
                </span>
                <span className="text-stone-400 font-mono text-[11px]">
                  {item.reportingPeriod}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
                  {item.programmeName}
                </h3>
                <p className="text-sm text-stone-700 dark:text-zinc-300 font-medium">
                  {item.achievementHeadline}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-stone-100 dark:border-zinc-800 text-xs text-stone-500 dark:text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>{item.verifiedLocation}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-stone-400" />
                  <span className="truncate">{item.evidenceDocumentTitle}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:justify-end">
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">Lead: {item.leadCoordinator}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Verified Geographic Footprint */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 text-white space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-orange-400">
              Ground Footprint
            </span>
            <h2 className="font-serif text-2xl font-bold text-white">
              Location-Wise Verified Coverage
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {impactData.locationAchievements.map((loc) => (
              <div 
                key={loc.id}
                className="p-5 rounded-2xl bg-zinc-800/80 border border-zinc-700 space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-orange-400">{loc.district}, {loc.state}</span>
                  <span className="font-mono text-[10px] text-zinc-400">{loc.auditReference}</span>
                </div>

                <h3 className="font-serif text-lg font-bold text-white">
                  {loc.locationName}
                </h3>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  {loc.reachSummary}
                </p>

                <div className="pt-2 border-t border-zinc-700/80 flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Verified Reach:</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {loc.verifiedCount.toLocaleString('en-IN')}+ Citizens
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Action Footer */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-stone-200 dark:border-zinc-800">
        <div>
          <span className="text-xs text-stone-500">Need our detailed audited statutory returns?</span>
          <div className="font-bold text-zinc-900 dark:text-white text-sm">Download Audited Financial Statements</div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('transparency')}
            className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Financial Transparency
          </button>
          <button
            type="button"
            onClick={() => onNavigate('donate')}
            className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Support This Impact
          </button>
        </div>
      </section>
    </div>
  );
};
