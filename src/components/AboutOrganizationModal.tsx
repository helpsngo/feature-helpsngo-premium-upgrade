import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Calendar, 
  Award, 
  ShieldCheck, 
  Users, 
  Target, 
  Compass, 
  HeartHandshake, 
  GraduationCap, 
  HeartPulse, 
  Droplets, 
  Utensils, 
  Sparkles, 
  ExternalLink, 
  X, 
  CheckCircle2, 
  Copy, 
  Check,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
  FileCheck2,
  Share2,
  Scale,
  FileText
} from 'lucide-react';
import { authoritativeOrgService } from '../services/authoritativeOrgService';
import { 
  AuthoritativeOrganizationProfile, 
  CentralImpactData, 
  FinancialTransparencyData, 
  VerifiedTeamMember 
} from '../types';

interface AboutOrganizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateDonate?: () => void;
  onNavigateVolunteer?: () => void;
  onOpenAdminConsole?: () => void;
}

export const AboutOrganizationModal: React.FC<AboutOrganizationModalProps> = ({
  isOpen,
  onClose,
  onNavigateDonate,
  onNavigateVolunteer,
  onOpenAdminConsole
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<'overview' | 'programs' | 'leadership' | 'transparency' | 'statutory'>('overview');
  
  const [profile, setProfile] = useState<AuthoritativeOrganizationProfile>(() => authoritativeOrgService.getProfile());
  const [impactData, setImpactData] = useState<CentralImpactData>(() => authoritativeOrgService.getImpactData());
  const [transparency, setTransparency] = useState<FinancialTransparencyData>(() => authoritativeOrgService.getFinancialTransparency());
  const [approvedTeam, setApprovedTeam] = useState<VerifiedTeamMember[]>(() => authoritativeOrgService.getPublicApprovedTeam());

  useEffect(() => {
    const unsubscribe = authoritativeOrgService.subscribe(() => {
      setProfile(authoritativeOrgService.getProfile());
      setImpactData(authoritativeOrgService.getImpactData());
      setTransparency(authoritativeOrgService.getFinancialTransparency());
      setApprovedTeam(authoritativeOrgService.getPublicApprovedTeam());
    });
    return unsubscribe;
  }, []);

  if (!isOpen) return null;

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const metrics = impactData.metrics;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col animate-scaleUp">
        
        {/* Modal Header */}
        <div className="relative bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white p-5 sm:p-6 flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white text-orange-600 flex items-center justify-center shadow-md font-black text-xl flex-shrink-0">
              <HeartHandshake className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-full">
                  Est. {profile.establishedYear} • Registered Society
                </span>
                <span className="text-[10px] font-bold text-amber-200">
                  Verified Authority Record
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight mt-0.5">
                {profile.officialName}
              </h2>
              <p className="text-xs text-orange-100 font-medium">
                {profile.acronymMeaning}
              </p>
            </div>
          </div>

          {/* Sub-Navigation Tabs */}
          <div className="flex items-center gap-1.5 mt-4 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'overview', label: 'Overview & Mission', icon: Compass },
              { id: 'programs', label: 'Programmes & Reach', icon: Target },
              { id: 'leadership', label: `Verified Team (${approvedTeam.length})`, icon: Users },
              { id: 'transparency', label: 'Financial Transparency', icon: Scale },
              { id: 'statutory', label: 'Statutory & Grievance', icon: ShieldCheck }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeSection === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive 
                      ? 'bg-white text-orange-700 shadow-xs' 
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 text-gray-800 dark:text-gray-200">

          {/* SECTION 1: OVERVIEW, MISSION & VISION */}
          {activeSection === 'overview' && (
            <div className="space-y-4 animate-fadeIn">
              {/* Mission Banner */}
              <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-orange-700 dark:text-orange-400 font-bold text-xs uppercase tracking-wider">
                  <Compass className="w-4 h-4" />
                  <span>Our Mission</span>
                </div>
                <p className="text-sm text-gray-900 dark:text-white font-medium leading-relaxed">
                  "{profile.mission}"
                </p>
              </div>

              {/* Vision Banner */}
              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
                  <Target className="w-4 h-4" />
                  <span>Our Vision</span>
                </div>
                <p className="text-sm text-gray-900 dark:text-white font-medium leading-relaxed">
                  "{profile.vision}"
                </p>
              </div>

              {/* Verified Impact Metrics Grid from Authoritative Source */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    Authoritative Impact Indicators ({impactData.reportingYear})
                  </h3>
                  <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Audited Data
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {metrics.totalBeneficiaries.value !== null && (
                    <div className="bg-gray-50 dark:bg-gray-800/60 p-3 rounded-2xl border border-gray-200 dark:border-gray-700 text-center">
                      <p className="text-lg font-black text-orange-600 dark:text-orange-400 font-mono">
                        {metrics.totalBeneficiaries.value.toLocaleString('en-IN')}{metrics.totalBeneficiaries.displaySuffix}
                      </p>
                      <p className="text-[10px] text-gray-500 font-bold uppercase">Lives Empowered</p>
                    </div>
                  )}

                  {metrics.childrenSupported.value !== null && (
                    <div className="bg-gray-50 dark:bg-gray-800/60 p-3 rounded-2xl border border-gray-200 dark:border-gray-700 text-center">
                      <p className="text-lg font-black text-blue-600 dark:text-blue-400 font-mono">
                        {metrics.childrenSupported.value.toLocaleString('en-IN')}{metrics.childrenSupported.displaySuffix}
                      </p>
                      <p className="text-[10px] text-gray-500 font-bold uppercase">Children (AABHA)</p>
                    </div>
                  )}

                  {metrics.mealsServed.value !== null && (
                    <div className="bg-gray-50 dark:bg-gray-800/60 p-3 rounded-2xl border border-gray-200 dark:border-gray-700 text-center">
                      <p className="text-lg font-black text-amber-600 dark:text-amber-400 font-mono">
                        {metrics.mealsServed.value.toLocaleString('en-IN')}{metrics.mealsServed.displaySuffix}
                      </p>
                      <p className="text-[10px] text-gray-500 font-bold uppercase">Meals Distributed</p>
                    </div>
                  )}

                  {metrics.healthCamps.value !== null && (
                    <div className="bg-gray-50 dark:bg-gray-800/60 p-3 rounded-2xl border border-gray-200 dark:border-gray-700 text-center">
                      <p className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">
                        {metrics.healthCamps.value.toLocaleString('en-IN')}{metrics.healthCamps.displaySuffix}
                      </p>
                      <p className="text-[10px] text-gray-500 font-bold uppercase">Free Health Camps</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="p-4 bg-gray-50 dark:bg-zinc-800/40 rounded-2xl border border-gray-200 dark:border-zinc-700 space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-zinc-300">
                  About the Society
                </h4>
                <p className="text-xs leading-relaxed text-gray-600 dark:text-zinc-300">
                  {profile.description}
                </p>
              </div>

              {/* Official Social Links Banner */}
              <div className="bg-gray-900 text-white p-4 rounded-2xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-orange-400">
                    Verified Social Channels
                  </span>
                  <a 
                    href="https://helpsngo.in/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs font-mono font-bold text-orange-400 hover:underline flex items-center gap-1"
                  >
                    <span>helpsngo.in</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {profile.officialSocialLinks.facebook && (
                    <a
                      href={profile.officialSocialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
                    >
                      <Facebook className="w-3.5 h-3.5 text-blue-400" />
                      <span>Facebook</span>
                    </a>
                  )}
                  {profile.officialSocialLinks.instagram && (
                    <a
                      href={profile.officialSocialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
                    >
                      <Instagram className="w-3.5 h-3.5 text-pink-400" />
                      <span>Instagram</span>
                    </a>
                  )}
                  {profile.officialSocialLinks.youtube && (
                    <a
                      href={profile.officialSocialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
                    >
                      <Youtube className="w-3.5 h-3.5 text-rose-500" />
                      <span>YouTube</span>
                    </a>
                  )}
                  {profile.officialSocialLinks.linkedin && (
                    <a
                      href={profile.officialSocialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
                    >
                      <Linkedin className="w-3.5 h-3.5 text-blue-500" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: PROGRAMMES & REACH */}
          {activeSection === 'programs' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  Verified achievements categorized by programme and field location:
                </p>
                <span className="text-[10px] text-gray-400 font-mono">
                  Audit Signoff: {impactData.auditorSignoff}
                </span>
              </div>

              <div className="space-y-3">
                {impactData.programmeAchievements.map((prog) => (
                  <div
                    key={prog.id}
                    className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/60 shadow-xs space-y-2 hover:border-orange-300 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-950 px-2 py-0.5 rounded-md">
                            {prog.category}
                          </span>
                          <span className="text-[10px] text-gray-400 font-mono">
                            {prog.reportingPeriod}
                          </span>
                        </div>
                        <h4 className="font-extrabold text-sm text-gray-900 dark:text-white mt-1">
                          {prog.programmeName}
                        </h4>
                      </div>

                      <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </span>
                    </div>

                    <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                      {prog.achievementHeadline}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1 border-t border-gray-100 dark:border-gray-700">
                      <div className="text-gray-500">
                        Location: <strong className="text-gray-800 dark:text-zinc-200">{prog.verifiedLocation}</strong>
                      </div>
                      <div className="text-gray-500 sm:text-right">
                        Lead: <strong className="text-gray-800 dark:text-zinc-200">{prog.leadCoordinator}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 3: VERIFIED TEAM ROSTER (ONLY APPROVED MEMBERS) */}
          {activeSection === 'leadership' && (
            <div className="space-y-3.5 animate-fadeIn">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  Approved trustees, physicians, educators, and field operations managers:
                </p>
                <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  Approved Records Only
                </span>
              </div>

              <div className="space-y-3">
                {approvedTeam.map((leader) => (
                  <div
                    key={leader.id}
                    className="p-3.5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/60 flex items-start gap-3 shadow-xs"
                  >
                    <img
                      src={leader.photographUrl}
                      alt={leader.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-gray-200 dark:border-gray-700 flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-extrabold text-sm text-gray-900 dark:text-white truncate">
                          {leader.name}
                        </h4>
                        <span className="text-[10px] text-gray-400 font-mono flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{leader.location}</span>
                        </span>
                      </div>
                      <p className="text-xs font-bold text-orange-600 dark:text-orange-400">
                        {leader.designation}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                        {leader.biography}
                      </p>
                      {leader.email && (
                        <div className="pt-1 flex items-center gap-3 text-[11px]">
                          <a href={`mailto:${leader.email}`} className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-mono">
                            <Mail className="w-3 h-3" />
                            <span>{leader.email}</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 4: FINANCIAL TRANSPARENCY & AUDITED STATEMENTS */}
          {activeSection === 'transparency' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 bg-emerald-50/60 dark:bg-zinc-800/60 rounded-2xl border border-emerald-100 dark:border-zinc-700 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-emerald-950 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-emerald-600" />
                    Statutory Programmatic Utilization ({transparency.expenditureRatios.reportingYear})
                  </h4>
                  <span className="text-[10px] text-gray-500 font-mono">
                    Auditor: {transparency.expenditureRatios.auditedBy}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 bg-white dark:bg-zinc-900 rounded-xl border border-emerald-200">
                    <span className="text-lg font-black text-emerald-600 font-mono">
                      {transparency.expenditureRatios.programmePercentage}%
                    </span>
                    <p className="text-[10px] text-gray-500 font-bold uppercase mt-0.5">Direct Field Aid</p>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-zinc-900 rounded-xl border border-amber-200">
                    <span className="text-lg font-black text-amber-600 font-mono">
                      {transparency.expenditureRatios.administrativePercentage}%
                    </span>
                    <p className="text-[10px] text-gray-500 font-bold uppercase mt-0.5">Field Logistics</p>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-zinc-900 rounded-xl border border-blue-200">
                    <span className="text-lg font-black text-blue-600 font-mono">
                      {transparency.expenditureRatios.fundraisingPercentage}%
                    </span>
                    <p className="text-[10px] text-gray-500 font-bold uppercase mt-0.5">Audits & Compliance</p>
                  </div>
                </div>
              </div>

              {/* Annual Audited Reports */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  Audited Accounts by Financial Year
                </h4>
                <div className="space-y-2">
                  {transparency.annualReports.map((ar) => (
                    <div key={ar.id} className="p-3 bg-gray-50 dark:bg-zinc-800/40 rounded-xl border border-gray-200 dark:border-zinc-700 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-extrabold text-gray-900 dark:text-white block">
                          {ar.financialYear}: {ar.title}
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono">
                          Receipts: ₹{ar.totalReceiptsINR.toLocaleString('en-IN')} • Opinion: {ar.auditOpinion}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600 uppercase bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                        Audited
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-[11px] text-gray-500 dark:text-zinc-400 leading-relaxed border-t border-gray-100 dark:border-zinc-800 pt-2">
                {transparency.statutoryNotice}
              </p>
            </div>
          )}

          {/* SECTION 5: STATUTORY REGISTRATION & GRIEVANCE */}
          {activeSection === 'statutory' && (
            <div className="space-y-4 animate-fadeIn">
              {/* Statutory Registrations List */}
              <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-gray-900 dark:text-white font-bold text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Verified Legal Registrations</span>
                </div>

                <div className="space-y-2 text-xs">
                  {profile.verifiedRegistrations.map((reg) => (
                    <div key={reg.id} className="pb-2 border-b border-gray-200 dark:border-gray-700 flex items-start justify-between gap-2">
                      <div>
                        <span className="font-bold text-gray-900 dark:text-white block">{reg.title}</span>
                        <span className="text-[10px] text-gray-500">{reg.governingAct}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 block">{reg.registrationNumber}</span>
                        <span className="text-[9px] text-gray-400 font-mono">Authority: {reg.issuingAuthority}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tax Registrations */}
              <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-gray-900 dark:text-white font-bold text-xs uppercase tracking-wider">
                  <FileCheck2 className="w-4 h-4 text-orange-600" />
                  <span>Tax Registrations & 80G Deductions</span>
                </div>

                <div className="space-y-2 text-xs">
                  {profile.taxRegistrations.map((tax) => (
                    <div key={tax.id} className="pb-2 border-b border-gray-200 dark:border-gray-700 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900 dark:text-white">{tax.taxSection}</span>
                        <span className="font-mono font-bold text-orange-700 dark:text-orange-400">{tax.orderNumber}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 dark:text-zinc-400">
                        {tax.publicDisclaimer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Registered vs Operational Addresses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Registered Address */}
                <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Registered Address (Statutory)
                    </span>
                    <button
                      onClick={() => handleCopy(profile.registeredAddress.formatted, 'reg_address')}
                      className="text-[10px] text-orange-600 font-bold uppercase hover:underline cursor-pointer"
                    >
                      {copiedField === 'reg_address' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                    {profile.registeredAddress.formatted}
                  </p>
                </div>

                {/* Operational Address */}
                <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Operational Field Address
                    </span>
                    <button
                      onClick={() => handleCopy(profile.operationalAddress.formatted, 'ops_address')}
                      className="text-[10px] text-orange-600 font-bold uppercase hover:underline cursor-pointer"
                    >
                      {copiedField === 'ops_address' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                    {profile.operationalAddress.formatted}
                  </p>
                </div>
              </div>

              {/* Contact & Grievance Officer */}
              <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 space-y-2">
                <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider block">
                  Designated Grievance & Redressal Desk
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-gray-500 block text-[10px]">Nodal Officer:</span>
                    <span className="font-bold text-gray-900 dark:text-white">{profile.grievanceDetails.nodalOfficerName}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">Email:</span>
                    <a href={`mailto:${profile.grievanceDetails.email}`} className="font-mono text-emerald-600 hover:underline">
                      {profile.grievanceDetails.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">Turnaround:</span>
                    <span className="font-semibold text-gray-800 dark:text-zinc-200">Within {profile.grievanceDetails.turnaroundDays} business days</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-gray-50 dark:bg-gray-900/80 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-2 text-[11px] text-gray-500">
            <span className="font-mono">Last Verified: {profile.lastUpdatedDate}</span>
          </div>

          <div className="flex items-center gap-2">
            {onNavigateDonate && (
              <button
                type="button"
                onClick={onNavigateDonate}
                className="bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase px-4 py-2 rounded-xl transition-all cursor-pointer shadow-xs"
              >
                Donate ₹ INR
              </button>
            )}
            {onNavigateVolunteer && (
              <button
                type="button"
                onClick={onNavigateVolunteer}
                className="bg-gray-200 dark:bg-zinc-800 hover:bg-gray-300 text-gray-800 dark:text-zinc-200 font-bold text-xs uppercase px-3 py-2 rounded-xl transition-all cursor-pointer"
              >
                Volunteer
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
