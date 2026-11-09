import React, { useState } from 'react';
import { OrgStats } from '../types';
import { X, CheckCircle, BarChart3, ShieldCheck, Sparkles, Building2, ExternalLink } from 'lucide-react';
import { authoritativeOrgService } from '../services/authoritativeOrgService';

interface AdminStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: OrgStats;
  onSaveStats: (stats: OrgStats) => void;
  onOpenAuthoritativeConsole?: () => void;
}

export const AdminStatsModal: React.FC<AdminStatsModalProps> = ({
  isOpen,
  onClose,
  stats,
  onSaveStats,
  onOpenAuthoritativeConsole
}) => {
  const [formData, setFormData] = useState<OrgStats>({ ...stats });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveStats(formData);

    // Sync authoritative central impact store
    try {
      const numChildren = parseInt(String(formData.childrenEducated).replace(/[^0-9]/g, ''), 10);
      const numMeals = parseInt(String(formData.mealsServed).replace(/[^0-9]/g, ''), 10);
      const numVolunteers = parseInt(String(formData.volunteersActive).replace(/[^0-9]/g, ''), 10);
      const numWells = parseInt(String(formData.waterWellsInstalled).replace(/[^0-9]/g, ''), 10);

      const currentImpact = authoritativeOrgService.getImpactData();
      const updatedImpact = {
        ...currentImpact,
        metrics: {
          ...currentImpact.metrics,
          childrenSupported: {
            ...currentImpact.metrics.childrenSupported,
            value: !isNaN(numChildren) ? numChildren : currentImpact.metrics.childrenSupported?.value
          },
          mealsServed: {
            ...currentImpact.metrics.mealsServed,
            value: !isNaN(numMeals) ? numMeals : currentImpact.metrics.mealsServed?.value
          },
          volunteers: {
            ...currentImpact.metrics.volunteers,
            value: !isNaN(numVolunteers) ? numVolunteers : currentImpact.metrics.volunteers?.value
          },
          cleanWaterWells: {
            ...currentImpact.metrics.cleanWaterWells,
            value: !isNaN(numWells) ? numWells : currentImpact.metrics.cleanWaterWells?.value
          }
        }
      };
      authoritativeOrgService.updateImpactData(updatedImpact);
    } catch {
      // non-fatal
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-[2rem] max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-gray-900 to-zinc-800 text-white flex items-center justify-between sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="bg-orange-600 p-1.5 rounded-lg text-white">
              <BarChart3 className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-sm sm:text-base font-extrabold uppercase tracking-tight">
                Organization Metrics & Mission Banner
              </h2>
              <p className="text-[10px] text-zinc-300 font-mono">
                Real-time Homepage & Donor Transparency Stats
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 flex-1">
          {onOpenAuthoritativeConsole && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs text-emerald-950 font-bold">
                  Looking for statutory profile, program achievements, and audited transparency?
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenAuthoritativeConsole();
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl shrink-0 cursor-pointer shadow-xs"
              >
                Open 4-Tab Console
              </button>
            </div>
          )}

          {/* Mission Headline & Description */}
          <div className="space-y-3 bg-orange-50/50 p-4 rounded-2xl border border-orange-100">
            <h3 className="text-xs font-extrabold text-orange-950 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              Homepage Hero Mission Statement
            </h3>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                Hero Headline
              </label>
              <input
                type="text"
                required
                value={formData.missionHeadline}
                onChange={(e) => setFormData({ ...formData, missionHeadline: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-orange-200 rounded-xl text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                Mission Description Paragraph
              </label>
              <textarea
                rows={2}
                required
                value={formData.missionDescription}
                onChange={(e) => setFormData({ ...formData, missionDescription: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-orange-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Core Key Statistics */}
          <div className="space-y-3 bg-gray-50 p-4 rounded-2xl border border-gray-200">
            <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
              Impact Counters & Statistics
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">
                  Children Educated
                </label>
                <input
                  type="text"
                  value={formData.childrenEducated}
                  onChange={(e) => setFormData({ ...formData, childrenEducated: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">
                  Nutritious Meals Served
                </label>
                <input
                  type="text"
                  value={formData.mealsServed}
                  onChange={(e) => setFormData({ ...formData, mealsServed: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">
                  Lives Touched
                </label>
                <input
                  type="text"
                  value={formData.livesTouched}
                  onChange={(e) => setFormData({ ...formData, livesTouched: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">
                  Clean Water Wells Installed
                </label>
                <input
                  type="text"
                  value={formData.waterWellsInstalled}
                  onChange={(e) => setFormData({ ...formData, waterWellsInstalled: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="col-span-2 space-y-1">
                <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">
                  Active Volunteer Squad
                </label>
                <input
                  type="text"
                  value={formData.volunteersActive}
                  onChange={(e) => setFormData({ ...formData, volunteersActive: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Legal / 80G Registration */}
          <div className="space-y-1 bg-emerald-50/60 p-3.5 rounded-2xl border border-emerald-200">
            <label className="text-[11px] font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              80G Trust Registration Number
            </label>
            <input
              type="text"
              value={formData.trustRegistration}
              onChange={(e) => setFormData({ ...formData, trustRegistration: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-emerald-300 rounded-xl text-xs font-mono font-bold text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-gray-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md transition-all active:scale-95 flex items-center gap-1.5"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Update Organization Metrics</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
