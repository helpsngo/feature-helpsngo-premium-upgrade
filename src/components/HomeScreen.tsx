import React, { useState, useEffect } from 'react';
import { 
  TabType, 
  Mission, 
  Project, 
  ImpactStory, 
  OrgStats, 
  FieldDispatch, 
  UserProfile, 
  DonationRecord 
} from '../types';
import { authoritativeOrgService } from '../services/authoritativeOrgService';
import { 
  Heart, 
  HeartHandshake, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Users, 
  GraduationCap, 
  HeartPulse, 
  Utensils, 
  Droplets, 
  TreePine, 
  Building2, 
  Calendar, 
  FileText, 
  Sparkles, 
  Bot, 
  ChevronRight, 
  ExternalLink, 
  Phone, 
  Scale, 
  BookOpen, 
  Clock, 
  Compass, 
  Sliders, 
  Edit3,
  MapPin,
  HelpCircle,
  Camera
} from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (tab: TabType) => void;
  onSelectProject: (project: Project) => void;
  onDonateToProject?: (project: Project) => void;
  projects: Project[];
  missions: Mission[];
  stories?: ImpactStory[];
  stats?: OrgStats;
  dispatches?: FieldDispatch[];
  user?: UserProfile;
  donations?: DonationRecord[];
  onOpenAdminStudio?: () => void;
  onEditProject?: (project: Project) => void;
  onEditStats?: () => void;
  onEditStory?: (story: ImpactStory) => void;
  onAddNewStory?: () => void;
  onOpenCorporateCSR?: () => void;
  onOpenTaxCert?: () => void;
  onOpenWebhooks?: () => void;
  onOpenAboutOrg?: () => void;
  onOpenLegalPolicies?: (policyId?: string) => void;
  onOpenRightsCenter?: () => void;
  onOpenAuthoritativeConsole?: (tab?: 'profile' | 'impact' | 'transparency' | 'team') => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onSelectProject,
  onDonateToProject,
  projects,
  missions,
  stories = [],
  stats,
  dispatches = [],
  user,
  donations = [],
  onOpenAdminStudio,
  onEditProject,
  onEditStats,
  onEditStory,
  onAddNewStory,
  onOpenCorporateCSR,
  onOpenTaxCert,
  onOpenAboutOrg,
  onOpenLegalPolicies,
  onOpenAuthoritativeConsole
}) => {
  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';
  const orgProfile = authoritativeOrgService.getProfile();
  const [impactData, setImpactData] = useState(() => authoritativeOrgService.getImpactData());
  const transparency = authoritativeOrgService.getFinancialTransparency();

  useEffect(() => {
    const unsub = authoritativeOrgService.subscribe(() => {
      setImpactData(authoritativeOrgService.getImpactData());
    });
    return unsub;
  }, []);

  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const activeStory = stories[activeStoryIdx] || stories[0];

  // Gallery items with authentic context
  const galleryPhotos = [
    {
      id: 'g1',
      title: 'AABHA Evening Tutorial Center',
      location: 'Gill Road Slum Cluster, Ludhiana',
      date: 'March 2026',
      tag: 'Education',
      url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'g2',
      title: 'Mobile Doctor Diagnostic Clinic',
      location: 'Dhandari Kalan Rural Belt',
      date: 'February 2026',
      tag: 'Healthcare',
      url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'g3',
      title: 'Annapoorna Community Langar Kitchen',
      location: 'Railway Colony Settlement, Ludhiana',
      date: 'March 2026',
      tag: 'Food Relief',
      url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'g4',
      title: 'Clean Drinking Water Solar Unit',
      location: 'Rural Malwa Village, Punjab',
      date: 'January 2026',
      tag: 'Water Security',
      url: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'g5',
      title: 'Green Earth Native Afforestation Drive',
      location: 'Ludhiana Canal Green Belt',
      date: 'November 2025',
      tag: 'Environment',
      url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'g6',
      title: 'Women Skill Vocational Tailoring Center',
      location: 'Community Training Hall, Ludhiana',
      date: 'December 2025',
      tag: 'Livelihood',
      url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="space-y-16 pb-12 animate-fadeIn text-stone-900 dark:text-zinc-100">
      
      {/* SECTION 1: Administrator Studio Strip (Only for Admin) */}
      {isAdmin && onOpenAdminStudio && (
        <section className="bg-stone-900 text-white rounded-2xl p-4 border border-stone-800 shadow-sm flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-orange-600 flex items-center justify-center font-bold text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-orange-400">
                Authoritative Administration Console
              </div>
              <p className="text-xs text-stone-300">
                All metrics, financial statements, and programme registries sync directly to statutory records.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {onOpenAuthoritativeConsole && (
              <button
                type="button"
                onClick={() => onOpenAuthoritativeConsole('profile')}
                className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl border border-stone-700 cursor-pointer"
              >
                Authoritative Dossier
              </button>
            )}
            <button
              type="button"
              onClick={onOpenAdminStudio}
              className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Content Studio
            </button>
          </div>
        </section>
      )}

      {/* SECTION 2: Powerful Hero with Clear Mission */}
      <section className="relative overflow-hidden rounded-3xl bg-[#18181B] text-white border border-stone-800 shadow-sm">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=80"
            alt="HELPS NGO humanitarian field operations"
            className="w-full h-full object-cover object-center filter grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#18181B] via-[#18181B]/90 to-transparent" />
        </div>

        <div className="relative z-10 px-6 sm:px-12 py-16 sm:py-24 max-w-4xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-orange-400 mb-4">
            <span>Established 2016 · Ludhiana, Punjab</span>
            <span className="text-stone-600" aria-hidden="true">·</span>
            <span>Societies Registration Act XXI of 1860</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] mb-6">
            Dignity, education, and health for every human being.
          </h1>

          <p className="text-base sm:text-lg text-stone-300 max-w-2xl leading-relaxed mb-8">
            HELPS Welfare Society operates verifiable, grassroots humanitarian interventions across Punjab and northern India: slum child education (AABHA), free mobile doctor clinics, community langar nutrition (Annapoorna), and clean drinking water installations.
          </p>

          {/* SECTION 3: Prominent Donate and Get Involved Actions */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('donate')}
              className="px-7 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Donate to Cause (50% Tax Relief)</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('projects')}
              className="px-6 py-3.5 bg-stone-800/90 hover:bg-stone-700 text-stone-100 font-semibold text-sm rounded-xl border border-stone-700 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Programmes</span>
              <ArrowRight className="w-4 h-4 text-orange-400" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('volunteer')}
              className="px-6 py-3.5 bg-transparent hover:bg-white/10 text-stone-300 hover:text-white font-semibold text-sm rounded-xl border border-stone-700 transition-all cursor-pointer"
            >
              Volunteer With Us
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="mt-10 pt-6 border-t border-stone-800 flex flex-wrap items-center gap-6 text-xs text-stone-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>88.4% Direct Programme Expenditure</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Section 80G(5)(vi) Approved</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Form 10BE Electronic Reconciliation</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Verified Impact Statistics */}
      <section aria-label="Verified Impact Statistics">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              Grassroots Reach ({impactData.reportingYear})
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
              Audited Field Achievements
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('impact')}
            className="text-xs font-semibold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1"
          >
            <span>View Full Impact Ledger</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
          {[
            {
              metric: impactData.metrics.totalBeneficiaries,
              icon: Users,
              color: 'text-orange-600 dark:text-orange-400',
              label: 'Lives Empowered'
            },
            {
              metric: impactData.metrics.childrenSupported,
              icon: GraduationCap,
              color: 'text-blue-600 dark:text-blue-400',
              label: 'Children Educated'
            },
            {
              metric: impactData.metrics.mealsServed,
              icon: Utensils,
              color: 'text-emerald-600 dark:text-emerald-400',
              label: 'Nutritious Meals'
            },
            {
              metric: impactData.metrics.healthCamps,
              icon: HeartPulse,
              color: 'text-rose-600 dark:text-rose-400',
              label: 'Medical Camps'
            },
            {
              metric: impactData.metrics.cleanWaterWells,
              icon: Droplets,
              color: 'text-cyan-600 dark:text-cyan-400',
              label: 'Clean Water Units'
            },
            {
              metric: impactData.metrics.volunteers,
              icon: HeartHandshake,
              color: 'text-amber-600 dark:text-amber-400',
              label: 'Active Volunteers'
            }
          ].map((item, idx) => {
            const val = item.metric?.value;
            const display = val != null ? `${val.toLocaleString('en-IN')}${item.metric.displaySuffix || ''}` : 'Pending Audit';
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-2xl p-4 shadow-xs flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-4 h-4 ${item.color}`} />
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                    AUDITED
                  </span>
                </div>
                <div>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-stone-900 dark:text-white tracking-tight">
                    {display}
                  </div>
                  <div className="text-[11px] font-medium text-stone-500 dark:text-zinc-400 mt-0.5">
                    {item.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 5: Organisation Introduction */}
      <section className="bg-stone-100/70 dark:bg-zinc-900/50 rounded-3xl p-6 sm:p-10 border border-stone-200 dark:border-zinc-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              Who We Are · Society Overview
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 dark:text-white leading-tight">
              A decade of compassionate grassroots action in Punjab.
            </h2>
            <p className="text-sm sm:text-base text-stone-600 dark:text-zinc-300 leading-relaxed">
              Founded in 2016 near Guru Nanak Dev Engineering College (GNDEC) in Ludhiana, HELPS Welfare Society was created with one uncompromising premise: true social change happens on the ground, shoulder-to-shoulder with the marginalized.
            </p>
            <p className="text-sm sm:text-base text-stone-600 dark:text-zinc-300 leading-relaxed">
              We stand for <strong>H</strong>ealth, <strong>E</strong>ducation, <strong>L</strong>iberty, <strong>P</strong>eace, and <strong>S</strong>ervice. Today, the society is registered under the Societies Registration Act XXI of 1860, on the NITI Aayog NGO-DARPAN portal, and with the Ministry of Corporate Affairs under Form CSR-1.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="px-5 py-2.5 bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-semibold text-xs rounded-xl hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Read Founding Story
              </button>
              <button
                type="button"
                onClick={() => onNavigate('mission')}
                className="px-5 py-2.5 bg-white dark:bg-zinc-800 text-stone-800 dark:text-zinc-200 font-semibold text-xs rounded-xl border border-stone-200 dark:border-zinc-700 hover:bg-stone-50 transition-colors cursor-pointer"
              >
                Our 5 Pillars & Vision
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-stone-200 dark:border-zinc-800 shadow-xs space-y-4 text-xs">
            <div className="font-serif text-base font-bold text-stone-900 dark:text-white border-b border-stone-100 dark:border-zinc-800 pb-3">
              Official Society Dossier
            </div>
            <div className="flex justify-between py-1 border-b border-stone-100 dark:border-zinc-800">
              <span className="text-stone-500">Legal Name</span>
              <span className="font-medium text-stone-900 dark:text-white">HELPS Welfare Society (Regd.)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-stone-100 dark:border-zinc-800">
              <span className="text-stone-500">Founded Year</span>
              <span className="font-mono font-medium text-stone-900 dark:text-white">2016 (Ludhiana, Punjab)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-stone-100 dark:border-zinc-800">
              <span className="text-stone-500">Societies Act Reg</span>
              <span className="font-mono text-stone-900 dark:text-white font-medium">HR/2021/0285458</span>
            </div>
            <div className="flex justify-between py-1 border-b border-stone-100 dark:border-zinc-800">
              <span className="text-stone-500">NITI Aayog DARPAN</span>
              <span className="font-mono text-stone-900 dark:text-white font-medium">HR/2021/0285458</span>
            </div>
            <div className="flex justify-between py-1 border-b border-stone-100 dark:border-zinc-800">
              <span className="text-stone-500">MCA Form CSR-1</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">CSR00018492</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-stone-500">Section 80G Order</span>
              <span className="font-mono text-stone-900 dark:text-white font-medium">CIT(E) CHD/80G/2016-17/4726</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Key Programmes Showcase */}
      <section aria-label="Key Humanitarian Programmes">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              Core Interventions
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
              Signature Grassroots Programmes
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className="text-xs font-semibold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1"
          >
            <span>All Programmes</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-xs hover:border-orange-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-16/10 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md">
                    {project.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-1 text-[11px] text-stone-400 mb-1">
                    <MapPin className="w-3 h-3 text-orange-600" />
                    <span>{project.location}</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white mb-2 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-zinc-400 leading-relaxed line-clamp-3 mb-4">
                    {project.description}
                  </p>

                  {/* Beneficiary Highlight */}
                  <div className="text-xs text-stone-500 dark:text-zinc-400 font-medium">
                    Verified Reach: <strong className="text-stone-900 dark:text-white">{project.beneficiariesCount}</strong>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-stone-100 dark:border-zinc-800 mt-4 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => onSelectProject(project)}
                  className="text-xs font-semibold text-stone-700 dark:text-zinc-300 hover:text-orange-600 flex items-center gap-1 cursor-pointer"
                >
                  <span>Learn More</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (onDonateToProject) {
                      onDonateToProject(project);
                    } else {
                      onNavigate('donate');
                    }
                  }}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Donate
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: Real Programme Stories */}
      {activeStory && (
        <section className="bg-stone-900 text-white rounded-3xl p-6 sm:p-10 border border-stone-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-orange-400">
                Ground Reality · Beneficiary Voice
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Stories of Restored Hope
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('stories')}
              className="text-xs font-semibold text-orange-400 hover:underline flex items-center gap-1"
            >
              <span>Explore All Field Stories</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 aspect-4/3 rounded-2xl overflow-hidden border border-stone-700">
              <img
                src={activeStory.image}
                alt={activeStory.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="lg:col-span-7 space-y-4">
              <blockquote className="font-serif text-xl sm:text-2xl text-stone-200 italic leading-relaxed">
                "{activeStory.quote}"
              </blockquote>

              <p className="text-sm text-stone-300 leading-relaxed">
                {activeStory.story}
              </p>

              <div className="pt-3 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="font-bold text-white text-sm">{activeStory.name}</div>
                  <div className="text-xs text-stone-400">{activeStory.role} · {activeStory.location}</div>
                </div>

                {/* Story Switcher */}
                <div className="flex items-center gap-1.5">
                  {stories.slice(0, 4).map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveStoryIdx(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        activeStoryIdx === idx ? 'bg-orange-500 w-6' : 'bg-stone-700 hover:bg-stone-500'
                      }`}
                      aria-label={`Story ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 8: Verified Photo Gallery */}
      <section aria-label="Verified Field Photo Gallery">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              Field Documentation
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
              Authentic Photographic Archive
            </h2>
          </div>
          <span className="text-xs text-stone-500 dark:text-zinc-400 hidden sm:inline">
            Directly from Punjab Operations
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryPhotos.map((photo) => (
            <div
              key={photo.id}
              className="group relative rounded-2xl overflow-hidden bg-stone-100 dark:bg-zinc-800 aspect-4/3 border border-stone-200 dark:border-zinc-800 shadow-xs"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">
                {photo.tag}
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <div className="font-serif text-sm font-bold leading-tight">{photo.title}</div>
                <div className="flex items-center justify-between text-[11px] text-stone-300 mt-0.5 font-mono">
                  <span>{photo.location}</span>
                  <span>{photo.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 9: Beneficiary Support Section ("Request Assistance") */}
      <section className="bg-orange-50/70 dark:bg-orange-950/20 rounded-3xl p-6 sm:p-10 border border-orange-200 dark:border-orange-800/40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-700 dark:text-orange-400">
              <HeartHandshake className="w-4 h-4" />
              <span>Zero-Cost Public Welfare Service</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
              Do You or Someone in Your Community Need Aid?
            </h2>
            <p className="text-sm text-stone-700 dark:text-zinc-300 leading-relaxed max-w-2xl">
              HELPS Welfare Society provides free medical care, dry ration packages, school kit grants, and emergency livelihood assistance. If you are a destitute family, daily-wage earner, student, or patient facing distress, our Ludhiana field desk is ready to help.
            </p>
            <div className="flex items-center gap-4 text-xs text-stone-600 dark:text-zinc-400 pt-2 font-mono">
              <span>Turnaround: 7 Business Days</span>
              <span aria-hidden="true">·</span>
              <span>Helpline: +91 94729 29856</span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => onNavigate('assistance')}
              className="w-full py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Request Humanitarian Aid</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="w-full py-2.5 bg-white dark:bg-zinc-800 text-stone-800 dark:text-zinc-200 font-semibold text-xs rounded-xl border border-stone-200 dark:border-zinc-700 hover:bg-stone-50 transition-colors"
            >
              Contact Nodal Grievance Desk
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 10: Volunteer and Participation Section */}
      <section className="bg-stone-900 text-white rounded-3xl p-6 sm:p-10 border border-stone-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-orange-400">
              Youth & University Mobilization
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight">
              Join 4,500+ change-makers transforming lives on the ground.
            </h2>
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              In partnership with Guru Nanak Dev Engineering College (GNDEC) and regional universities across Punjab, our volunteers conduct evening remedial tutorials for slum children, distribute hot meals during harsh winters, and plant native trees along canal corridors.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => onNavigate('volunteer')}
                className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Sign Up as Field Volunteer
              </button>
              <button
                type="button"
                onClick={() => onNavigate('internship')}
                className="px-6 py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs rounded-xl border border-stone-700 transition-colors cursor-pointer"
              >
                Explore University Internships
              </button>
              <button
                type="button"
                onClick={() => onNavigate('events')}
                className="px-6 py-3 bg-transparent hover:bg-white/10 text-stone-300 font-semibold text-xs rounded-xl border border-stone-700 transition-colors cursor-pointer"
              >
                Upcoming Field Events
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-stone-800/80 rounded-2xl p-6 border border-stone-700 space-y-4">
            <div className="font-serif text-base font-bold text-white">
              Why Volunteer with HELPS?
            </div>
            <div className="space-y-3 text-xs text-stone-300">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Verified Service Hours & Signed Certificates from Trust Director</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Direct classroom teaching at AABHA learning centers near GNDEC</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Leadership training in community logistics and disaster relief</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: Donation and Transparency Section */}
      <section className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-10 border border-stone-200 dark:border-zinc-800 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              Statutory Fiscal Governance
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white leading-tight">
              88.4% of every rupee reaches the field. Audited annually.
            </h2>
            <p className="text-sm text-stone-600 dark:text-zinc-400 leading-relaxed">
              We uphold strict financial discipline under the Income Tax Act, 1961 and the Societies Registration Act, 1860. Independent Chartered Accountants audit our books annually. Qualifying donations receive 50% statutory deduction under Section 80G with automated Form 10BE reconciliation.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-stone-50 dark:bg-zinc-800 p-3 rounded-2xl border border-stone-200 dark:border-zinc-700 text-center">
                <div className="text-2xl font-mono font-bold text-emerald-600 dark:text-emerald-400">88.4%</div>
                <div className="text-[10px] text-stone-500 font-semibold uppercase mt-0.5">Programmes</div>
              </div>
              <div className="bg-stone-50 dark:bg-zinc-800 p-3 rounded-2xl border border-stone-200 dark:border-zinc-700 text-center">
                <div className="text-2xl font-mono font-bold text-stone-700 dark:text-zinc-300">6.8%</div>
                <div className="text-[10px] text-stone-500 font-semibold uppercase mt-0.5">Administration</div>
              </div>
              <div className="bg-stone-50 dark:bg-zinc-800 p-3 rounded-2xl border border-stone-200 dark:border-zinc-700 text-center">
                <div className="text-2xl font-mono font-bold text-stone-700 dark:text-zinc-300">4.8%</div>
                <div className="text-[10px] text-stone-500 font-semibold uppercase mt-0.5">Fundraising</div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => onNavigate('transparency')}
                className="px-5 py-2.5 bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-semibold text-xs rounded-xl hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Inspect Annual CA Statements
              </button>
              {onOpenTaxCert && (
                <button
                  type="button"
                  onClick={onOpenTaxCert}
                  className="px-5 py-2.5 bg-stone-100 dark:bg-zinc-800 text-stone-800 dark:text-zinc-200 font-semibold text-xs rounded-xl border border-stone-200 dark:border-zinc-700 hover:bg-stone-200 transition-colors cursor-pointer"
                >
                  Generate 80G Form 10BE
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 bg-stone-50 dark:bg-zinc-800/80 rounded-3xl p-6 border border-stone-200 dark:border-zinc-700">
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white mb-2">
              Make an Instant Contribution
            </h3>
            <p className="text-xs text-stone-500 dark:text-zinc-400 mb-5">
              Select a giving tier to power direct meals, health checkups, or slum schooling:
            </p>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                { amount: 500, label: '10 Meals' },
                { amount: 1500, label: 'School Kit' },
                { amount: 3000, label: 'Doctor Clinic' }
              ].map((tier) => (
                <button
                  key={tier.amount}
                  type="button"
                  onClick={() => onNavigate('donate')}
                  className="p-3 bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-700 rounded-2xl hover:border-orange-500 text-center transition-all cursor-pointer"
                >
                  <div className="font-mono font-bold text-stone-900 dark:text-white text-sm">
                    ₹{tier.amount}
                  </div>
                  <div className="text-[10px] text-stone-500 dark:text-zinc-400 mt-0.5">{tier.label}</div>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => onNavigate('donate')}
              className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>Donate Online with 80G Tax Receipt</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 12: AJ Assistant Entry Point */}
      <section className="bg-gradient-to-r from-stone-900 via-stone-800 to-zinc-900 text-white rounded-3xl p-6 sm:p-10 border border-stone-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-400">
              <Bot className="w-4 h-4" />
              <span>Verified AI Knowledge Assistant</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Have questions about 80G deductions, programs, or volunteering? Ask AJ.
            </h2>
            <p className="text-sm text-stone-300 leading-relaxed max-w-2xl">
              AJ is trained exclusively on certified HELPS Welfare Society governance documents, financial filings, and field schedules. No guesswork, no hallucinations—only source-cited answers.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {[
                'How do I claim 50% 80G tax exemption?',
                'What is the audited expenditure ratio?',
                'Where are AABHA centers located?',
                'How do college students volunteer?'
              ].map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onNavigate('aj-assistant')}
                  className="px-3 py-1.5 rounded-full bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-300 text-xs transition-colors cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <button
              type="button"
              onClick={() => onNavigate('aj-assistant')}
              className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-2xl shadow-lg transition-transform active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Bot className="w-5 h-5" />
              <span>Open AJ AI Guide</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 13: Latest News and Activities */}
      <section aria-label="Latest News & Field Dispatches">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              Field Dispatch
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
              Recent Ground Updates
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('stories')}
            className="text-xs font-semibold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1"
          >
            <span>All Field Dispatches</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dispatches.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xs hover:border-stone-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-stone-400 font-mono mb-2">
                  <span>{item.category}</span>
                  <span>{item.date}</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-zinc-400 leading-relaxed">
                  {item.meta}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 dark:border-zinc-800 mt-4">
                <button
                  type="button"
                  onClick={() => onNavigate('stories')}
                  className="text-xs font-semibold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Read Field Dispatch</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 14: Partner and Supporter Section (Strictly Verified Only) */}
      <section className="bg-stone-100/60 dark:bg-zinc-900/60 rounded-3xl p-6 sm:p-10 border border-stone-200 dark:border-zinc-800">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400 mb-1">
            Authoritative Institutional Alignments
          </div>
          <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-white">
            Verified Statutory Registrations & Partners
          </h2>
          <p className="text-xs text-stone-500 dark:text-zinc-400 mt-1">
            HELPS Welfare Society collaborates strictly with verified institutions and statutory regulatory registries.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-stone-200 dark:border-zinc-800 shadow-2xs">
            <div className="font-serif text-base font-bold text-stone-900 dark:text-white">
              NITI Aayog
            </div>
            <div className="text-[11px] text-stone-500 mt-0.5">NGO-DARPAN Portal</div>
            <div className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">HR/2021/0285458</div>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-stone-200 dark:border-zinc-800 shadow-2xs">
            <div className="font-serif text-base font-bold text-stone-900 dark:text-white">
              Ministry of Corporate Affairs
            </div>
            <div className="text-[11px] text-stone-500 mt-0.5">Form CSR-1 Registration</div>
            <div className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">CSR00018492</div>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-stone-200 dark:border-zinc-800 shadow-2xs">
            <div className="font-serif text-base font-bold text-stone-900 dark:text-white">
              GNDEC Ludhiana
            </div>
            <div className="text-[11px] text-stone-500 mt-0.5">Student Volunteer Chapter</div>
            <div className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">AABHA Education Hub</div>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-stone-200 dark:border-zinc-800 shadow-2xs">
            <div className="font-serif text-base font-bold text-stone-900 dark:text-white">
              Income Tax Department
            </div>
            <div className="text-[11px] text-stone-500 mt-0.5">12A & 80G Statutory Order</div>
            <div className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">CIT(E) CHD/80G/16-17</div>
          </div>
        </div>
      </section>

    </div>
  );
};
