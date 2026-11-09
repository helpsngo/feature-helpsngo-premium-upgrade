import React, { useState } from 'react';
import { TabType, UserProfile } from '../types';
import { 
  GraduationCap, 
  Award, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  HeartHandshake, 
  Send,
  Building2,
  FileCheck2,
  ShieldCheck,
  User,
  Mail,
  Phone
} from 'lucide-react';

interface InternshipPageProps {
  onNavigate: (tab: TabType) => void;
  user?: UserProfile;
}

export const InternshipPage: React.FC<InternshipPageProps> = ({ onNavigate, user }) => {
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    institution: 'Guru Nanak Dev Engineering College (GNDEC), Ludhiana',
    degreeProgram: 'B.Tech / Undergraduate',
    track: 'education',
    duration: '8_weeks',
    availabilityHours: '10_15_hours',
    motivation: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const tracks = [
    {
      id: 'education',
      title: 'AABHA Child Remedial Mentorship',
      desc: 'Teach evening classes in English, Math, and basic computer skills to slum children at Ludhiana center clusters.',
      hours: '8-12 hrs/week',
      icon: GraduationCap
    },
    {
      id: 'clinical',
      title: 'Rural Healthcare & Clinic Logistics',
      desc: 'Assist CMO Dr. Arvind Mehta and medical teams in patient registration, vitals logging, and pharmaceutical inventory.',
      hours: '10-15 hrs/week',
      icon: HeartHandshake
    },
    {
      id: 'environment',
      title: 'Green Earth Afforestation & Water IoT',
      desc: 'Coordinate rural solar water filtration telemetry, tree planting logs with local panchayats, and water test kits.',
      hours: '6-10 hrs/week',
      icon: BookOpen
    },
    {
      id: 'storytelling',
      title: 'Field Photography & Social Impact Media',
      desc: 'Document grassroots field reality, beneficiary video narratives, and prepare quarterly NGO impact digests.',
      hours: '8-12 hrs/week',
      icon: Award
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 animate-fadeIn">
      {/* Header */}
      <section className="bg-gradient-to-b from-stone-100 to-[#FAFAF8] dark:from-zinc-900 dark:to-zinc-950 py-12 sm:py-16 px-4 sm:px-6 border-b border-stone-200/80 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="text-xs font-sans font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400">
            University Student Programme
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
            Social Impact Fellowship & Internship
          </h1>
          <p className="text-stone-600 dark:text-zinc-300 text-base sm:text-lg leading-relaxed max-w-3xl">
            A structured social development internship for university students across engineering, medical, social work, and commerce disciplines. Mentored directly by GNDEC faculty chapter leads and senior NGO trustees.
          </p>
        </div>
      </section>

      {/* 4 Tracks Grid */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-sans font-bold uppercase tracking-widest text-stone-500">
            Specialized Tracks
          </span>
          <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white">
            Choose Your Field Track
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {tracks.map((track) => {
            const Icon = track.icon;
            const isSelected = formData.track === track.id;
            return (
              <div 
                key={track.id}
                onClick={() => setFormData({ ...formData, track: track.id })}
                className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected 
                    ? 'bg-orange-50/50 dark:bg-orange-950/20 border-orange-500 ring-2 ring-orange-500/20 shadow-xs' 
                    : 'bg-white dark:bg-zinc-900 border-stone-200 dark:border-zinc-800 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-stone-100 dark:bg-zinc-800 text-orange-600 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-stone-500 bg-stone-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
                    {track.hours}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white">
                    {track.title}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-zinc-400 mt-1 leading-relaxed">
                    {track.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-100 dark:border-zinc-800 flex items-center justify-between text-xs font-semibold">
                  <span className={isSelected ? 'text-orange-600' : 'text-stone-400'}>
                    {isSelected ? '✓ Track Selected' : 'Click to select track'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Program Benefits */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 text-white space-y-4">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
            Internship Credential & Recognition
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-zinc-300">
            <div className="p-4 rounded-2xl bg-zinc-800/80 border border-zinc-700 space-y-1">
              <span className="font-bold text-white block">Official Certificate</span>
              <p className="text-[11px] text-zinc-400">Cryptographically verifiable certificate signed by National Managing Director Amarjeet Kumar.</p>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-800/80 border border-zinc-700 space-y-1">
              <span className="font-bold text-white block">Letter of Recommendation</span>
              <p className="text-[11px] text-zinc-400">Merit-based institutional LOR for university credits, fellowships, and graduate school applications.</p>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-800/80 border border-zinc-700 space-y-1">
              <span className="font-bold text-white block">Mentorship Network</span>
              <p className="text-[11px] text-zinc-400">One-on-one field mentorship with GNDEC Chapter Lead Rahul Verma and CMO Dr. Arvind Mehta.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-stone-200 dark:border-zinc-800 p-6 sm:p-10 shadow-2xs space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400">
              Application Portal
            </span>
            <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white">
              Apply for the Social Impact Fellowship
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-zinc-400">
              Applications are reviewed on a rolling basis. You will receive an interview confirmation within 3 business days.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-serif text-xl font-bold text-emerald-900 dark:text-emerald-100">
                Application Received Successfully!
              </h3>
              <p className="text-xs text-emerald-800 dark:text-emerald-300 max-w-md mx-auto">
                Thank you, <strong>{formData.fullName}</strong>. Our University Chapter Coordinator (Rahul Verma) will contact you at <strong>{formData.email}</strong> with orientation schedule details.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 dark:text-zinc-300">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Gurpreet Singh"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-zinc-700 bg-stone-50 dark:bg-zinc-800 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 dark:text-zinc-300">University / College *</label>
                  <input
                    type="text"
                    required
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-zinc-700 bg-stone-50 dark:bg-zinc-800 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 dark:text-zinc-300">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@gndec.ac.in"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-zinc-700 bg-stone-50 dark:bg-zinc-800 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 dark:text-zinc-300">Mobile Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-zinc-700 bg-stone-50 dark:bg-zinc-800 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 dark:text-zinc-300">Duration Preference</label>
                  <select
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-zinc-700 bg-stone-50 dark:bg-zinc-800 text-xs text-zinc-900 dark:text-white"
                  >
                    <option value="4_weeks">4 Weeks (Intensive Winter/Summer)</option>
                    <option value="8_weeks">8 Weeks (Standard Semester)</option>
                    <option value="12_weeks">12 Weeks (Full Semester Capstone)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 dark:text-zinc-300">Weekly Commitment</label>
                  <select
                    value={formData.availabilityHours}
                    onChange={(e) => setFormData({ ...formData, availabilityHours: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-zinc-700 bg-stone-50 dark:bg-zinc-800 text-xs text-zinc-900 dark:text-white"
                  >
                    <option value="6_10_hours">6 to 10 Hours / Week</option>
                    <option value="10_15_hours">10 to 15 Hours / Week</option>
                    <option value="20_plus_hours">20+ Hours / Week (Full-Time Break)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 dark:text-zinc-300">Why do you want to intern with HELPS NGO? *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  placeholder="Tell us briefly about your background, interests, and how you wish to contribute to the community..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-zinc-700 bg-stone-50 dark:bg-zinc-800 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Submit Internship Application</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
