import React from 'react';
import { TabType } from '../types';
import { 
  HeartPulse, 
  GraduationCap, 
  ShieldCheck, 
  Compass, 
  HeartHandshake, 
  Droplets, 
  Utensils, 
  Sprout, 
  ArrowRight,
  Globe2,
  CheckCircle2
} from 'lucide-react';

interface MissionVisionPageProps {
  onNavigate: (tab: TabType) => void;
}

export const MissionVisionPage: React.FC<MissionVisionPageProps> = ({ onNavigate }) => {
  const pillars = [
    {
      letter: 'H',
      title: 'Health',
      subtitle: 'Accessible Primary & Diagnostic Medicine',
      description: 'Bringing certified physicians, free diagnostic screening (ECG, glucose, vitals), and essential pharmaceuticals directly to isolated rural hamlets and slum settlements with zero user fees.',
      icon: HeartPulse,
      accent: 'emerald',
      achievement: '150+ Mobile Diagnostic Camps Conducted'
    },
    {
      letter: 'E',
      title: 'Education',
      subtitle: 'Remedial Learning & Slum Child Mentorship',
      description: 'Running evening tutorial classrooms via AABHA centers, distributing uniforms, textbooks, digital tablets, and school bags, and preventing generational child labor in urban slums.',
      icon: GraduationCap,
      accent: 'blue',
      achievement: '50,000+ Students Mentored & Supported'
    },
    {
      letter: 'L',
      title: 'Liberty',
      subtitle: 'Livelihood & Women Self-Reliance',
      description: 'Equipping underprivileged women and youth with vocational tailoring skills, computer literacy, and micro-entrepreneurship training to attain permanent financial self-reliance.',
      icon: ShieldCheck,
      accent: 'amber',
      achievement: '850+ Women Graduated & Certified'
    },
    {
      letter: 'P',
      title: 'Peace',
      subtitle: 'Communal Harmony & Social Justice',
      description: 'Fostering inclusive, interfaith youth volunteer solidarity, community counseling, grievance mediation, and equal dignity for marginalized and disabled citizens across Punjab.',
      icon: Compass,
      accent: 'indigo',
      achievement: 'Grassroots Peace & Civic Outreach'
    },
    {
      letter: 'S',
      title: 'Service',
      subtitle: 'Selfless Nutrition & Humanitarian Aid',
      description: 'Daily Annapoorna community langar kitchens serving freshly prepared nutritious hot meals to stranded hospital attendants, daily-wage laborers, and families during cold waves.',
      icon: HeartHandshake,
      accent: 'orange',
      achievement: '500,000+ Nutritious Hot Meals Served'
    }
  ];

  const sdgs = [
    { number: 'SDG 1', name: 'No Poverty', desc: 'Direct emergency relief & livelihood training' },
    { number: 'SDG 2', name: 'Zero Hunger', desc: '500,000+ meals via Annapoorna kitchens' },
    { number: 'SDG 3', name: 'Good Health', desc: 'Free clinical consultations & doctor camps' },
    { number: 'SDG 4', name: 'Quality Education', desc: 'AABHA remedial learning centers' },
    { number: 'SDG 6', name: 'Clean Water', desc: '128 solar borewells commissioned' }
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 animate-fadeIn">
      {/* Header */}
      <section className="bg-gradient-to-b from-stone-100 to-[#FAFAF8] dark:from-zinc-900 dark:to-zinc-950 py-12 sm:py-16 px-4 sm:px-6 border-b border-stone-200/80 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="text-xs font-sans font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400">
            Guiding Philosophy
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
            Our Mission, Vision & 5 Welfare Pillars
          </h1>
          <p className="text-stone-600 dark:text-zinc-300 text-base sm:text-lg leading-relaxed max-w-3xl">
            A compassionate framework anchored in five core human values, transforming grassroots goodwill into measurable, audited community empowerment.
          </p>
        </div>
      </section>

      {/* Mission & Vision Twin Canvas */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 space-y-3 shadow-2xs">
            <span className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-orange-600 dark:text-orange-400">
              Our Core Mission
            </span>
            <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white">
              Holistic Grassroots Upliftment
            </h2>
            <p className="text-sm text-stone-600 dark:text-zinc-300 leading-relaxed font-normal">
              To serve humanity with compassion, creating positive and sustainable change through holistic welfare programs in child education, healthcare assistance, environmental protection, women skill empowerment, and social justice across Punjab and all of India.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 space-y-3 shadow-2xs">
            <span className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Our Long-Term Vision
            </span>
            <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white">
              An Equitable, Dignified Society
            </h2>
            <p className="text-sm text-stone-600 dark:text-zinc-300 leading-relaxed font-normal">
              A compassionate, equitable world where every individual—irrespective of social background—has unhindered access to quality education, essential healthcare, clean water, dignified nutrition, and life-changing opportunities to thrive.
            </p>
          </div>
        </div>
      </section>

      {/* The 5 HELPS Pillars */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="space-y-1">
          <span className="text-xs font-sans font-bold uppercase tracking-widest text-stone-500">
            The HELPS Acronym
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
            Five Pillars of Compassionate Service
          </h2>
        </div>

        <div className="space-y-4">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div 
                key={p.letter}
                className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xs hover:border-stone-300 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-stone-100 dark:bg-zinc-800 text-zinc-900 dark:text-white flex items-center justify-center font-serif text-2xl font-bold shrink-0">
                    {p.letter}
                  </div>
                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white">
                        {p.title}
                      </h3>
                      <span className="text-stone-400">·</span>
                      <span className="text-xs font-semibold text-stone-500 dark:text-zinc-400">
                        {p.subtitle}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-600 dark:text-zinc-300 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>

                <div className="text-left md:text-right shrink-0">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
                    Audited Outcome
                  </span>
                  <span className="text-xs font-bold font-mono text-emerald-700 dark:text-emerald-400">
                    {p.achievement}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Sustainable Development Goals Alignment */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 text-white space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-orange-400">
              Global Alignment
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Aligned with UN Sustainable Development Goals
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl">
              HELPS NGO structures every grassroots intervention to fulfill international benchmarks for sustainable human development.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
            {sdgs.map((sdg) => (
              <div 
                key={sdg.number}
                className="p-3.5 rounded-2xl bg-zinc-800/80 border border-zinc-700 space-y-1"
              >
                <span className="font-mono text-xs font-bold text-orange-400 block">
                  {sdg.number}
                </span>
                <span className="text-xs font-bold text-white block">
                  {sdg.name}
                </span>
                <p className="text-[10px] text-zinc-400 leading-tight">
                  {sdg.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Action Footer */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-stone-200 dark:border-zinc-800">
        <div>
          <span className="text-xs text-stone-500">Ready to support our mission?</span>
          <div className="font-bold text-zinc-900 dark:text-white text-sm">Join as a Volunteer or Contribute</div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Explore Programmes
          </button>
          <button
            type="button"
            onClick={() => onNavigate('volunteer')}
            className="px-4 py-2 rounded-xl border border-stone-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold uppercase tracking-wider hover:bg-stone-100 transition-colors cursor-pointer"
          >
            Sign Up to Serve
          </button>
        </div>
      </section>
    </div>
  );
};
