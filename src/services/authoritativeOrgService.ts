import { 
  AuthoritativeOrganizationProfile, 
  CentralImpactData, 
  FinancialTransparencyData, 
  VerifiedTeamMember 
} from '../types';
import { 
  AUTHORITATIVE_ORGANIZATION_PROFILE, 
  AUTHORITATIVE_IMPACT_DATA, 
  AUTHORITATIVE_FINANCIAL_TRANSPARENCY, 
  VERIFIED_TEAM_ROSTER 
} from '../data/authoritativeData';

const STORAGE_KEYS = {
  PROFILE: 'helps_ngo_auth_profile_v1',
  IMPACT: 'helps_ngo_auth_impact_v1',
  TRANSPARENCY: 'helps_ngo_auth_transparency_v1',
  TEAM: 'helps_ngo_auth_team_v1'
};

type Listener = () => void;

class AuthoritativeOrgService {
  private listeners: Set<Listener> = new Set();
  private profile: AuthoritativeOrganizationProfile;
  private impactData: CentralImpactData;
  private transparencyData: FinancialTransparencyData;
  private teamMembers: VerifiedTeamMember[];

  constructor() {
    this.profile = this.loadFromStorage(STORAGE_KEYS.PROFILE, AUTHORITATIVE_ORGANIZATION_PROFILE);
    this.impactData = this.loadFromStorage(STORAGE_KEYS.IMPACT, AUTHORITATIVE_IMPACT_DATA);
    this.transparencyData = this.loadFromStorage(STORAGE_KEYS.TRANSPARENCY, AUTHORITATIVE_FINANCIAL_TRANSPARENCY);
    this.teamMembers = this.loadFromStorage(STORAGE_KEYS.TEAM, VERIFIED_TEAM_ROSTER);

    // Initial sync with backend server
    this.syncFromServer();
  }

  private loadFromStorage<T>(key: string, fallback: T): T {
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // safe fallback
    }
    return fallback;
  }

  private saveToStorage<T>(key: string, value: T) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('[AuthoritativeOrgService] LocalStorage error:', e);
    }
  }

  private notify() {
    this.listeners.forEach(fn => fn());
  }

  public subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  // Synchronize state with backend server
  public async syncFromServer(): Promise<void> {
    try {
      const res = await fetch('/api/ngo/authoritative-profile');
      if (res.ok) {
        const data = await res.json();
        if (data.profile) {
          this.profile = data.profile;
          this.saveToStorage(STORAGE_KEYS.PROFILE, this.profile);
        }
        if (data.impact) {
          this.impactData = data.impact;
          this.saveToStorage(STORAGE_KEYS.IMPACT, this.impactData);
        }
        if (data.transparency) {
          this.transparencyData = data.transparency;
          this.saveToStorage(STORAGE_KEYS.TRANSPARENCY, this.transparencyData);
        }
        if (data.team) {
          this.teamMembers = data.team;
          this.saveToStorage(STORAGE_KEYS.TEAM, this.teamMembers);
        }
        this.notify();
      }
    } catch {
      // offline / standalone mode fallback
    }
  }

  // --- GETTERS ---

  public getProfile(): AuthoritativeOrganizationProfile {
    return { ...this.profile };
  }

  public getImpactData(): CentralImpactData {
    return { ...this.impactData };
  }

  public getFinancialTransparency(): FinancialTransparencyData {
    return { ...this.transparencyData };
  }

  public getAllTeamMembers(): VerifiedTeamMember[] {
    return [...this.teamMembers];
  }

  /**
   * Only approved records are ever published publicly.
   */
  public getPublicApprovedTeam(): VerifiedTeamMember[] {
    return this.teamMembers.filter(m => m.approvalStatus === 'approved');
  }

  // --- UPDATERS (ADMIN CONTROLLED) ---

  public async updateProfile(updates: Partial<AuthoritativeOrganizationProfile>): Promise<AuthoritativeOrganizationProfile> {
    this.profile = {
      ...this.profile,
      ...updates,
      lastUpdatedDate: new Date().toISOString().split('T')[0]
    };
    this.saveToStorage(STORAGE_KEYS.PROFILE, this.profile);
    this.notify();

    // Persist to server
    try {
      await fetch('/api/ngo/authoritative-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile: this.profile })
      });
    } catch (e) {
      console.warn('[AuthoritativeOrgService] Server update error:', e);
    }

    return this.profile;
  }

  public async updateImpactData(updates: Partial<CentralImpactData>): Promise<CentralImpactData> {
    this.impactData = {
      ...this.impactData,
      ...updates,
      lastUpdatedDate: new Date().toISOString().split('T')[0]
    };
    this.saveToStorage(STORAGE_KEYS.IMPACT, this.impactData);
    this.notify();

    try {
      await fetch('/api/ngo/impact-metrics', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ impact: this.impactData })
      });
    } catch (e) {
      console.warn('[AuthoritativeOrgService] Server update error:', e);
    }

    return this.impactData;
  }

  public async updateFinancialTransparency(updates: Partial<FinancialTransparencyData>): Promise<FinancialTransparencyData> {
    this.transparencyData = {
      ...this.transparencyData,
      ...updates,
      lastUpdatedDate: new Date().toISOString().split('T')[0]
    };
    this.saveToStorage(STORAGE_KEYS.TRANSPARENCY, this.transparencyData);
    this.notify();

    try {
      await fetch('/api/ngo/financial-transparency', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transparency: this.transparencyData })
      });
    } catch (e) {
      console.warn('[AuthoritativeOrgService] Server update error:', e);
    }

    return this.transparencyData;
  }

  public async saveTeamMember(member: Partial<VerifiedTeamMember> & { name: string; designation: string }): Promise<VerifiedTeamMember> {
    const today = new Date().toISOString().split('T')[0];
    let saved: VerifiedTeamMember;

    if (member.id) {
      // Edit existing
      const index = this.teamMembers.findIndex(m => m.id === member.id);
      if (index >= 0) {
        this.teamMembers[index] = {
          ...this.teamMembers[index],
          ...member,
          lastVerifiedDate: today
        };
        saved = this.teamMembers[index];
      } else {
        saved = {
          id: member.id,
          name: member.name,
          designation: member.designation,
          category: member.category || 'operations',
          biography: member.biography || '',
          photographUrl: member.photographUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
          email: member.email,
          phone: member.phone,
          location: member.location || 'Ludhiana, Punjab',
          appointmentYear: member.appointmentYear || new Date().getFullYear(),
          approvalStatus: member.approvalStatus || 'pending_verification',
          lastVerifiedDate: today
        };
        this.teamMembers.push(saved);
      }
    } else {
      // Create new
      saved = {
        id: `team-${Date.now()}`,
        name: member.name,
        designation: member.designation,
        category: member.category || 'operations',
        biography: member.biography || '',
        photographUrl: member.photographUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
        email: member.email,
        phone: member.phone,
        location: member.location || 'Ludhiana, Punjab',
        appointmentYear: member.appointmentYear || new Date().getFullYear(),
        approvalStatus: member.approvalStatus || 'pending_verification',
        lastVerifiedDate: today
      };
      this.teamMembers.push(saved);
    }

    this.saveToStorage(STORAGE_KEYS.TEAM, this.teamMembers);
    this.notify();

    try {
      await fetch('/api/ngo/team', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ team: this.teamMembers })
      });
    } catch (e) {
      console.warn('[AuthoritativeOrgService] Server update error:', e);
    }

    return saved;
  }

  public async toggleTeamMemberApproval(id: string, newStatus: 'approved' | 'pending_verification' | 'archived'): Promise<void> {
    const member = this.teamMembers.find(m => m.id === id);
    if (member) {
      member.approvalStatus = newStatus;
      member.lastVerifiedDate = new Date().toISOString().split('T')[0];
      this.saveToStorage(STORAGE_KEYS.TEAM, this.teamMembers);
      this.notify();

      try {
        await fetch('/api/ngo/team', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ team: this.teamMembers })
        });
      } catch (e) {
        console.warn('[AuthoritativeOrgService] Server update error:', e);
      }
    }
  }

  public async deleteTeamMember(id: string): Promise<void> {
    this.teamMembers = this.teamMembers.filter(m => m.id !== id);
    this.saveToStorage(STORAGE_KEYS.TEAM, this.teamMembers);
    this.notify();

    try {
      await fetch('/api/ngo/team', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ team: this.teamMembers })
      });
    } catch (e) {
      console.warn('[AuthoritativeOrgService] Server update error:', e);
    }
  }
}

export const authoritativeOrgService = new AuthoritativeOrgService();
