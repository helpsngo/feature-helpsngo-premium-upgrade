import React from 'react';
import { TabType } from '../types';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink, 
  ShieldCheck, 
  Scale, 
  Heart, 
  FileCheck2,
  Clock,
  ArrowRight
} from 'lucide-react';
import { authoritativeOrgService } from '../services/authoritativeOrgService';

interface SiteFooterProps {
  onNavigate: (tab: TabType) => void;
  onOpenLegalPolicies?: (policyId?: string) => void;
  onOpenRightsCenter?: () => void;
  onOpenAboutOrg?: () => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({
  onNavigate,
  onOpenLegalPolicies,
  onOpenRightsCenter,
  onOpenAboutOrg
}) => {
  const profile = authoritativeOrgService.getProfile();

  const handlePolicyClick = (policyId: string) => {
    if (onOpenLegalPolicies) {
      onOpenLegalPolicies(policyId);
    } else {
      onNavigate(policyId as TabType);
    }
  };

  return (
    <footer 
      role="contentinfo"
      className="bg-[#121214] text-zinc-300 pt-12 pb-8 border-t border-zinc-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Top Institutional Trust Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-orange-400 font-sans text-xs uppercase font-extrabold tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Statutory Charitable Recognition</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
              HELPS Welfare Society (HELPS NGO)
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Registered under the Societies Registration Act XXI of 1860 (Reg No: HR/2021/0285458). 
              Approved by the Income Tax Department under Section 12A and Section 80G for charitable service. 
              MCA Form CSR-1 Certified for institutional partnerships.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('donate')}
              className="bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider py-3 px-5 rounded-full shadow-sm transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Donate (80G Tax Deductible)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('transparency')}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs uppercase tracking-wider py-3 px-5 rounded-full border border-zinc-700 transition-all cursor-pointer"
            >
              Audited Reports
            </button>
          </div>
        </div>

        {/* 4-Column Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 text-xs">
          
          {/* Column 1: Society Overview & Mandate */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                H
              </div>
              <span className="font-serif text-base font-bold text-white tracking-tight">
                HELPS Welfare Society
              </span>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              Dedicated to human dignity through grassroots slum child education (AABHA Centers), free rural diagnostic healthcare clinics, Annapoorna hunger relief, and environmental afforestation across Punjab and India.
            </p>
            <div className="space-y-1.5 pt-1 text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">Established:</span>
                <span>2016 (Ludhiana, Punjab)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">NGO DARPAN:</span>
                <span className="font-mono text-zinc-300">HR/2021/0285458</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">PAN:</span>
                <span className="font-mono text-zinc-300">AAATH7892R</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation & Dedicated Pages */}
          <div className="space-y-3">
            <h3 className="font-sans text-xs uppercase font-extrabold tracking-wider text-white">
              Organisation & Work
            </h3>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <button 
                  type="button" 
                  onClick={() => onNavigate('about')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About HELPS Society
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => onNavigate('mission')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Mission, Vision & Core Values
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => onNavigate('team')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Leadership & Advisory Board
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => onNavigate('projects')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our 5 Welfare Programmes
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => onNavigate('impact')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Audited Impact & Achievements
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => onNavigate('stories')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Stories & Field Dispatches
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => onNavigate('transparency')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Audited Financial Statements (FY 2024-25)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Participation & Citizen Pathways */}
          <div className="space-y-3">
            <h3 className="font-sans text-xs uppercase font-extrabold tracking-wider text-white">
              Get Involved & Support
            </h3>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <button 
                  type="button" 
                  onClick={() => onNavigate('donate')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Donate (80G Tax Exemption)
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => onNavigate('volunteer')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Volunteer Application & Portal
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => onNavigate('internship')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  University Student Internship
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => onNavigate('events')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Medical Camps & Community Drives
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => onNavigate('assistance')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Beneficiary Assistance Request
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => onNavigate('aj-assistant')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Ask AJ (Verified AI Guide)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Official Headquarters & Grievance */}
          <div className="space-y-3">
            <h3 className="font-sans text-xs uppercase font-extrabold tracking-wider text-white">
              Registered Office & Helpline
            </h3>
            
            <div className="space-y-2 text-zinc-400 leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-medium">Registered Address:</span>
                  <span>H.No-2, Gill Road, Near Guru Nanak Dev Engineering College (GNDEC), Ludhiana, Punjab – 141006, India</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Building2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-medium">Field Operations Desk:</span>
                  <span>GNDEC Campus & Gill Park Outreach Desk, Ludhiana, Punjab</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <a href="tel:+919472929856" className="text-zinc-200 hover:text-white transition-colors">
                  +91 94729 29856 / +91 62837 77177
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <a href="mailto:info@helpsngo.in" className="text-zinc-200 hover:text-white transition-colors">
                  info@helpsngo.in
                </a>
              </div>

              <div className="p-2.5 bg-zinc-900 rounded-xl border border-zinc-800 text-[11px] text-zinc-300 space-y-0.5">
                <span className="text-white block font-bold">Grievance & Nodal Officer:</span>
                <span>Amarjeet Kumar (Managing Director)</span>
                <span className="block text-zinc-400">compliance@helpsngo.in · 7-Day Turnaround</span>
              </div>
            </div>
          </div>
        </div>

        {/* Verified Institutional Collaborators */}
        <div className="pt-6 border-t border-zinc-800/80">
          <div className="text-[11px] uppercase font-bold text-zinc-500 tracking-wider mb-3">
            Verified Statutory Registrations & Academic Collaborators
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400">
            <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
              Societies Act XXI of 1860 (Reg. HR/2021/0285458)
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
              NITI Aayog NGO-DARPAN Portal
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
              MCA Form CSR-1 Certified (CSR00018492)
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
              GNDEC Student Chapter & Volunteer Unit
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
              12A & 80G Certified · Income Tax Department
            </span>
          </div>
        </div>

        {/* Statutory Legal Policies Row & Copyright */}
        <div className="pt-6 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <button 
              type="button" 
              onClick={() => handlePolicyClick('privacy-policy')}
              className="hover:text-zinc-300 transition-colors cursor-pointer"
            >
              Privacy & DPDP Act 2023
            </button>
            <span aria-hidden="true">·</span>
            <button 
              type="button" 
              onClick={() => handlePolicyClick('terms-and-conditions')}
              className="hover:text-zinc-300 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span aria-hidden="true">·</span>
            <button 
              type="button" 
              onClick={() => handlePolicyClick('refund-cancellation')}
              className="hover:text-zinc-300 transition-colors cursor-pointer"
            >
              Refund & Cancellation
            </button>
            <span aria-hidden="true">·</span>
            <button 
              type="button" 
              onClick={() => handlePolicyClick('donor-privacy-pii')}
              className="hover:text-zinc-300 transition-colors cursor-pointer"
            >
              Donor PII Protection
            </button>
            <span aria-hidden="true">·</span>
            <button 
              type="button" 
              onClick={() => handlePolicyClick('child-safeguarding-pocso')}
              className="hover:text-zinc-300 transition-colors cursor-pointer text-emerald-400 font-medium"
            >
              Child Safeguarding (POCSO)
            </button>
            <span aria-hidden="true">·</span>
            <button 
              type="button" 
              onClick={() => handlePolicyClick('grievance-whistleblower')}
              className="hover:text-zinc-300 transition-colors cursor-pointer"
            >
              Grievance Redressal
            </button>
            {onOpenRightsCenter && (
              <>
                <span aria-hidden="true">·</span>
                <button 
                  type="button" 
                  onClick={onOpenRightsCenter}
                  className="hover:text-zinc-300 transition-colors cursor-pointer text-orange-400 font-medium"
                >
                  DPDP Rights Center (Sec 11-14)
                </button>
              </>
            )}
          </div>

          <p className="font-mono text-zinc-500">
            © 2016–2026 HELPS Welfare Society. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
