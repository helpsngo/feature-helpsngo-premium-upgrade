import React, { useState, useEffect } from 'react';
import { 
  X, 
  Building2, 
  BarChart3, 
  Scale, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  RefreshCw, 
  Lock, 
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  FileText
} from 'lucide-react';
import { authoritativeOrgService } from '../services/authoritativeOrgService';
import { 
  AuthoritativeOrganizationProfile, 
  CentralImpactData, 
  FinancialTransparencyData, 
  VerifiedTeamMember,
  ImpactMetricItem
} from '../types';

interface AdminAuthoritativeOrgModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'profile' | 'impact' | 'transparency' | 'team';
}

export const AdminAuthoritativeOrgModal: React.FC<AdminAuthoritativeOrgModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'profile'
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'impact' | 'transparency' | 'team'>(initialTab);
  
  // Local editable copies
  const [profile, setProfile] = useState<AuthoritativeOrganizationProfile>(() => authoritativeOrgService.getProfile());
  const [impactData, setImpactData] = useState<CentralImpactData>(() => authoritativeOrgService.getImpactData());
  const [transparency, setTransparency] = useState<FinancialTransparencyData>(() => authoritativeOrgService.getFinancialTransparency());
  const [teamMembers, setTeamMembers] = useState<VerifiedTeamMember[]>(() => authoritativeOrgService.getAllTeamMembers());

  // Sub-editing state for team
  const [isAddingTeamMember, setIsAddingTeamMember] = useState(false);
  const [editingTeamMember, setEditingTeamMember] = useState<Partial<VerifiedTeamMember> | null>(null);

  // Status message
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setProfile(authoritativeOrgService.getProfile());
      setImpactData(authoritativeOrgService.getImpactData());
      setTransparency(authoritativeOrgService.getFinancialTransparency());
      setTeamMembers(authoritativeOrgService.getAllTeamMembers());
      setStatusMessage(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const showStatus = (text: string, type: 'success' | 'error' = 'success') => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await authoritativeOrgService.updateProfile(profile);
      showStatus('Authoritative organisation profile successfully saved and published.');
    } catch {
      showStatus('Failed to update organisation profile.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveImpact = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await authoritativeOrgService.updateImpactData(impactData);
      showStatus('Central impact metrics & achievements synchronized across all public screens.');
    } catch {
      showStatus('Failed to update central impact data.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveTransparency = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await authoritativeOrgService.updateFinancialTransparency(transparency);
      showStatus('Financial transparency ratios & annual report records updated.');
    } catch {
      showStatus('Failed to update financial transparency.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeamMember?.name || !editingTeamMember?.designation) return;

    setIsSaving(true);
    try {
      const saved = await authoritativeOrgService.saveTeamMember({
        ...editingTeamMember,
        name: editingTeamMember.name,
        designation: editingTeamMember.designation
      });
      setTeamMembers(authoritativeOrgService.getAllTeamMembers());
      setIsAddingTeamMember(false);
      setEditingTeamMember(null);
      showStatus(`Team member ${saved.name} saved (${saved.approvalStatus}).`);
    } catch {
      showStatus('Failed to save team member.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleMemberApproval = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'approved' ? 'pending_verification' : 'approved';
    await authoritativeOrgService.toggleTeamMemberApproval(id, nextStatus);
    setTeamMembers(authoritativeOrgService.getAllTeamMembers());
    showStatus(`Member visibility changed to: ${nextStatus === 'approved' ? 'Approved (Published)' : 'Pending (Unpublished)'}`);
  };

  const handleDeleteMember = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove ${name} from the verified team roster?`)) {
      await authoritativeOrgService.deleteTeamMember(id);
      setTeamMembers(authoritativeOrgService.getAllTeamMembers());
      showStatus(`Removed ${name} from team roster.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white dark:bg-zinc-900 rounded-[2rem] max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-zinc-800 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-gray-900 via-zinc-900 to-gray-800 text-white flex items-center justify-between shrink-0 shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center text-white font-bold">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-extrabold uppercase tracking-tight text-white">
                  Authoritative Organization & Impact Console
                </h2>
                <span className="text-[10px] bg-purple-500/30 text-purple-200 font-mono px-2 py-0.5 rounded-full border border-purple-400/40">
                  National Trustee Control
                </span>
              </div>
              <p className="text-[10px] text-zinc-300">
                Single source of truth for organization identity, impact metrics, audit data, and team records.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status Toast */}
        {statusMessage && (
          <div className={`px-4 py-2 text-xs font-bold flex items-center justify-between ${
            statusMessage.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
          }`}>
            <span>{statusMessage.text}</span>
            <button onClick={() => setStatusMessage(null)} className="text-white text-xs">✕</button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 dark:bg-zinc-800/60 border-b border-gray-200 dark:border-zinc-800 overflow-x-auto no-scrollbar shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-gray-600 dark:text-zinc-400 hover:bg-gray-200 dark:hover:bg-zinc-700'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Organisation Profile</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('impact')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'impact'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-gray-600 dark:text-zinc-400 hover:bg-gray-200 dark:hover:bg-zinc-700'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Impact Management</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('transparency')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'transparency'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-gray-600 dark:text-zinc-400 hover:bg-gray-200 dark:hover:bg-zinc-700'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Financial Transparency</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('team')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'team'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-gray-600 dark:text-zinc-400 hover:bg-gray-200 dark:hover:bg-zinc-700'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Verified Team ({teamMembers.length})</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* ============================================================== */}
          {/* TAB 1: AUTHORITATIVE ORGANISATION PROFILE                      */}
          {/* ============================================================== */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-5 animate-fadeIn">
              <div className="p-4 bg-orange-50/50 dark:bg-zinc-800/60 rounded-2xl border border-orange-100 dark:border-zinc-700 space-y-3">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-orange-950 dark:text-orange-300 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-orange-600" />
                  Primary Organisation Identity
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 dark:text-zinc-300 mb-1">
                      Official Name
                    </label>
                    <input
                      type="text"
                      required
                      value={profile.officialName}
                      onChange={(e) => setProfile({ ...profile, officialName: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl text-xs font-bold text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 dark:text-zinc-300 mb-1">
                      Legal Name (Registered)
                    </label>
                    <input
                      type="text"
                      required
                      value={profile.legalName}
                      onChange={(e) => setProfile({ ...profile, legalName: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl text-xs font-bold text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 dark:text-zinc-300 mb-1">
                      Short Name / Acronym
                    </label>
                    <input
                      type="text"
                      value={profile.shortName}
                      onChange={(e) => setProfile({ ...profile, shortName: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl text-xs text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 dark:text-zinc-300 mb-1">
                      Established Year
                    </label>
                    <input
                      type="number"
                      value={profile.establishedYear}
                      onChange={(e) => setProfile({ ...profile, establishedYear: Number(e.target.value) || 2016 })}
                      className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl text-xs text-gray-900 dark:text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Registered vs Operational Addresses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-zinc-800/40 rounded-2xl border border-gray-200 dark:border-zinc-700 space-y-2">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    Official Registered Address (Statutory)
                  </h4>
                  <textarea
                    rows={3}
                    value={profile.registeredAddress.formatted}
                    onChange={(e) => setProfile({
                      ...profile,
                      registeredAddress: { ...profile.registeredAddress, formatted: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl text-xs text-gray-900 dark:text-white"
                  />
                  <span className="text-[10px] text-gray-400">Filed with Registrar of Societies & Income Tax Dept.</span>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-zinc-800/40 rounded-2xl border border-gray-200 dark:border-zinc-700 space-y-2">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    Operational Field Address
                  </h4>
                  <textarea
                    rows={3}
                    value={profile.operationalAddress.formatted}
                    onChange={(e) => setProfile({
                      ...profile,
                      operationalAddress: { ...profile.operationalAddress, formatted: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl text-xs text-gray-900 dark:text-white"
                  />
                  <span className="text-[10px] text-gray-400">Physical field operations desk & community volunteer center.</span>
                </div>
              </div>

              {/* Official Contacts & Grievance */}
              <div className="p-4 bg-gray-50 dark:bg-zinc-800/40 rounded-2xl border border-gray-200 dark:border-zinc-700 space-y-3">
                <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                  Official Communication & Grievance Channels
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 dark:text-zinc-400 mb-1">
                      Primary Phone
                    </label>
                    <input
                      type="text"
                      value={profile.primaryPhone}
                      onChange={(e) => setProfile({ ...profile, primaryPhone: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl text-xs text-gray-900 dark:text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 dark:text-zinc-400 mb-1">
                      Primary Email
                    </label>
                    <input
                      type="email"
                      value={profile.primaryEmail}
                      onChange={(e) => setProfile({ ...profile, primaryEmail: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl text-xs text-gray-900 dark:text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 dark:text-zinc-400 mb-1">
                      Statutory Grievance Email
                    </label>
                    <input
                      type="email"
                      value={profile.grievanceEmail}
                      onChange={(e) => setProfile({ ...profile, grievanceEmail: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl text-xs text-gray-900 dark:text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Mission & Vision */}
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 dark:text-zinc-300 mb-1">
                    Mission Statement
                  </label>
                  <textarea
                    rows={2}
                    value={profile.mission}
                    onChange={(e) => setProfile({ ...profile, mission: e.target.value })}
                    className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl text-xs text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 dark:text-zinc-300 mb-1">
                    Vision Statement
                  </label>
                  <textarea
                    rows={2}
                    value={profile.vision}
                    onChange={(e) => setProfile({ ...profile, vision: e.target.value })}
                    className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl text-xs text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving...' : 'Save & Publish Profile'}</span>
                </button>
              </div>
            </form>
          )}

          {/* ============================================================== */}
          {/* TAB 2: CENTRAL IMPACT MANAGEMENT                               */}
          {/* ============================================================== */}
          {activeTab === 'impact' && (
            <form onSubmit={handleSaveImpact} className="space-y-5 animate-fadeIn">
              <div className="p-4 bg-blue-50/50 dark:bg-zinc-800/60 rounded-2xl border border-blue-100 dark:border-zinc-700 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-950 dark:text-blue-300 flex items-center gap-1.5">
                    <BarChart3 className="w-4 h-4 text-blue-600" />
                    Central Impact Reporting Parameters
                  </h3>
                  <span className="text-[10px] text-gray-500 font-mono">
                    Audit Status: <strong className="text-blue-600 uppercase">{impactData.dataVerificationStatus}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 dark:text-zinc-300 mb-1">
                      Reporting Financial Year
                    </label>
                    <input
                      type="text"
                      value={impactData.reportingYear}
                      onChange={(e) => setImpactData({ ...impactData, reportingYear: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl text-xs font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 dark:text-zinc-300 mb-1">
                      Auditor Signoff Reference
                    </label>
                    <input
                      type="text"
                      value={impactData.auditorSignoff}
                      onChange={(e) => setImpactData({ ...impactData, auditorSignoff: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Verified Impact Metrics Grid */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    Authoritative Impact Indicators (No Fictitious 0+ Figures)
                  </h4>
                  <span className="text-[10px] text-gray-400">
                    Set value to null or unverified to keep unpublished.
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(impactData.metrics).map(([key, rawItem]) => {
                    const item = rawItem as ImpactMetricItem;
                    if (!item) return null;
                    return (
                    <div 
                      key={key}
                      className="p-3 bg-gray-50 dark:bg-zinc-800/40 rounded-2xl border border-gray-200 dark:border-zinc-700 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-800 dark:text-zinc-200 truncate">
                          {item.label}
                        </span>
                        <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase ${
                          item.verificationStatus === 'verified'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        }`}>
                          {item.verificationStatus}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={item.value ?? ''}
                          placeholder="Leave blank if unverified"
                          onChange={(e) => {
                            const val = e.target.value === '' ? null : Number(e.target.value);
                            setImpactData({
                              ...impactData,
                              metrics: {
                                ...impactData.metrics,
                                [key]: { ...item, value: val }
                              }
                            });
                          }}
                          className="flex-1 px-3 py-1.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl text-xs font-mono font-bold text-gray-900 dark:text-white"
                        />
                        <select
                          value={item.verificationStatus}
                          onChange={(e) => {
                            setImpactData({
                              ...impactData,
                              metrics: {
                                ...impactData.metrics,
                                [key]: { ...item, verificationStatus: e.target.value as any }
                              }
                            });
                          }}
                          className="px-2 py-1.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl text-xs text-gray-700 dark:text-zinc-300"
                        >
                          <option value="verified">Verified</option>
                          <option value="provisional">Provisional</option>
                          <option value="under_review">Under Review</option>
                          <option value="unpublished_pending_documentation">Unpublished</option>
                        </select>
                      </div>

                      <p className="text-[10px] text-gray-400 truncate">
                        Source: {item.verificationSource}
                      </p>
                    </div>
                  );})}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving...' : 'Save & Synchronize Impact Data'}</span>
                </button>
              </div>
            </form>
          )}

          {/* ============================================================== */}
          {/* TAB 3: FINANCIAL TRANSPARENCY                                  */}
          {/* ============================================================== */}
          {activeTab === 'transparency' && (
            <form onSubmit={handleSaveTransparency} className="space-y-5 animate-fadeIn">
              <div className="p-4 bg-emerald-50/50 dark:bg-zinc-800/60 rounded-2xl border border-emerald-100 dark:border-zinc-700 space-y-3">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-950 dark:text-emerald-300 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-emerald-600" />
                  Audited Expenditure Utilization Ratios
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 dark:text-zinc-300 mb-1">
                      Direct Programs (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={transparency.expenditureRatios.programmePercentage}
                      onChange={(e) => setTransparency({
                        ...transparency,
                        expenditureRatios: {
                          ...transparency.expenditureRatios,
                          programmePercentage: Number(e.target.value) || 0
                        }
                      })}
                      className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl text-xs font-bold font-mono text-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 dark:text-zinc-300 mb-1">
                      Field Logistics (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={transparency.expenditureRatios.administrativePercentage}
                      onChange={(e) => setTransparency({
                        ...transparency,
                        expenditureRatios: {
                          ...transparency.expenditureRatios,
                          administrativePercentage: Number(e.target.value) || 0
                        }
                      })}
                      className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl text-xs font-bold font-mono text-amber-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 dark:text-zinc-300 mb-1">
                      Governance & Audits (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={transparency.expenditureRatios.fundraisingPercentage}
                      onChange={(e) => setTransparency({
                        ...transparency,
                        expenditureRatios: {
                          ...transparency.expenditureRatios,
                          fundraisingPercentage: Number(e.target.value) || 0
                        }
                      })}
                      className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl text-xs font-bold font-mono text-blue-600"
                    />
                  </div>
                </div>

                <div className="text-[11px] text-gray-500 flex items-center justify-between pt-1">
                  <span>Sum Total: <strong>{(
                    transparency.expenditureRatios.programmePercentage +
                    transparency.expenditureRatios.administrativePercentage +
                    transparency.expenditureRatios.fundraisingPercentage
                  ).toFixed(1)}%</strong></span>
                  <span>Reporting Period: {transparency.expenditureRatios.reportingYear}</span>
                </div>
              </div>

              {/* Statutory Notice */}
              <div>
                <label className="block text-[11px] font-bold text-gray-700 dark:text-zinc-300 mb-1">
                  Public Statutory Compliance Notice
                </label>
                <textarea
                  rows={2}
                  value={transparency.statutoryNotice}
                  onChange={(e) => setTransparency({ ...transparency, statutoryNotice: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl text-xs text-gray-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving...' : 'Save Financial Transparency'}</span>
                </button>
              </div>
            </form>
          )}

          {/* ============================================================== */}
          {/* TAB 4: VERIFIED TEAM MANAGEMENT                                */}
          {/* ============================================================== */}
          {activeTab === 'team' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-900 dark:text-white">
                    Verified Leadership & Governance Roster
                  </h3>
                  <p className="text-[10px] text-gray-500 dark:text-zinc-400">
                    Only records with status "Approved" are published on public pages.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setEditingTeamMember({
                      name: '',
                      designation: '',
                      category: 'operations',
                      biography: '',
                      photographUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
                      email: '',
                      phone: '',
                      location: 'Ludhiana, Punjab',
                      appointmentYear: new Date().getFullYear(),
                      approvalStatus: 'approved'
                    });
                    setIsAddingTeamMember(true);
                  }}
                  className="bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Verified Member</span>
                </button>
              </div>

              {/* Add / Edit Member Form Drawer */}
              {isAddingTeamMember && editingTeamMember && (
                <form onSubmit={handleSaveMember} className="p-4 bg-orange-50/50 dark:bg-zinc-800/80 rounded-2xl border border-orange-200 dark:border-zinc-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-orange-950 dark:text-orange-300 uppercase">
                      {editingTeamMember.id ? 'Edit Team Member' : 'Register New Verified Member'}
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingTeamMember(false);
                        setEditingTeamMember(null);
                      }}
                      className="text-gray-400 hover:text-gray-700 text-xs"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 dark:text-zinc-300 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={editingTeamMember.name || ''}
                        onChange={(e) => setEditingTeamMember({ ...editingTeamMember, name: e.target.value })}
                        className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 dark:text-zinc-300 mb-1">Official Designation</label>
                      <input
                        type="text"
                        required
                        value={editingTeamMember.designation || ''}
                        onChange={(e) => setEditingTeamMember({ ...editingTeamMember, designation: e.target.value })}
                        className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 dark:text-zinc-300 mb-1">Role Category</label>
                      <select
                        value={editingTeamMember.category || 'operations'}
                        onChange={(e) => setEditingTeamMember({ ...editingTeamMember, category: e.target.value as any })}
                        className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl text-xs"
                      >
                        <option value="leadership">Executive Leadership</option>
                        <option value="medical">Medical & Clinical Missions</option>
                        <option value="operations">Field Operations & Relief</option>
                        <option value="advisory">Advisory & University Chapter</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 dark:text-zinc-300 mb-1">Publication Approval Status</label>
                      <select
                        value={editingTeamMember.approvalStatus || 'pending_verification'}
                        onChange={(e) => setEditingTeamMember({ ...editingTeamMember, approvalStatus: e.target.value as any })}
                        className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl text-xs font-bold text-orange-600"
                      >
                        <option value="approved">Approved (Published on Public Site)</option>
                        <option value="pending_verification">Pending Verification (Hidden)</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 dark:text-zinc-300 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={editingTeamMember.email || ''}
                        onChange={(e) => setEditingTeamMember({ ...editingTeamMember, email: e.target.value })}
                        className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 dark:text-zinc-300 mb-1">Photograph URL</label>
                      <input
                        type="url"
                        value={editingTeamMember.photographUrl || ''}
                        onChange={(e) => setEditingTeamMember({ ...editingTeamMember, photographUrl: e.target.value })}
                        className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 dark:text-zinc-300 mb-1">Official Biography</label>
                    <textarea
                      rows={2}
                      required
                      value={editingTeamMember.biography || ''}
                      onChange={(e) => setEditingTeamMember({ ...editingTeamMember, biography: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl text-xs"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingTeamMember(false);
                        setEditingTeamMember(null);
                      }}
                      className="px-3.5 py-1.5 rounded-xl border border-gray-300 text-xs font-semibold text-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs px-4 py-1.5 rounded-xl"
                    >
                      Save Member
                    </button>
                  </div>
                </form>
              )}

              {/* Members List */}
              <div className="space-y-3">
                {teamMembers.map((member) => {
                  const isApproved = member.approvalStatus === 'approved';
                  return (
                    <div
                      key={member.id}
                      className="p-3.5 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={member.photographUrl}
                          alt={member.name}
                          className="w-11 h-11 rounded-2xl object-cover border border-gray-200 dark:border-zinc-700 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0 space-y-0.5">
                          <div className="flex items-center gap-2">
                            <h4 className="font-extrabold text-sm text-gray-900 dark:text-white truncate">
                              {member.name}
                            </h4>
                            <span className={`text-[9px] font-bold px-2 py-0.2 rounded-full uppercase ${
                              isApproved
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            }`}>
                              {isApproved ? 'Published' : 'Hidden'}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-orange-600 dark:text-orange-400 truncate">
                            {member.designation}
                          </p>
                          <p className="text-[11px] text-gray-500 dark:text-zinc-400 line-clamp-1">
                            {member.biography}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 ml-auto">
                        <button
                          type="button"
                          onClick={() => handleToggleMemberApproval(member.id, member.approvalStatus)}
                          className={`p-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                            isApproved
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                              : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
                          }`}
                          title={isApproved ? 'Click to unpublish from public view' : 'Click to approve for public view'}
                        >
                          {isApproved ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingTeamMember(member);
                            setIsAddingTeamMember(true);
                          }}
                          className="p-1.5 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-200 border border-gray-200 dark:border-zinc-700 transition-colors cursor-pointer"
                          title="Edit member"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteMember(member.id, member.name)}
                          className="p-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
                          title="Delete member"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
