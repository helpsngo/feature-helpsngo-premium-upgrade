import React, { useState } from 'react';
import { TabType } from '../types';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  HeartHandshake, 
  ArrowRight, 
  CheckCircle2, 
  HeartPulse, 
  GraduationCap, 
  Droplets,
  Share2
} from 'lucide-react';

interface EventsPageProps {
  onNavigate: (tab: TabType) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ onNavigate }) => {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [rsvpSuccess, setRsvpSuccess] = useState<string | null>(null);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpPhone, setRsvpPhone] = useState('');

  const events = [
    {
      id: 'evt-1',
      title: 'Free Diagnostic Medical & Vision Screening Camp',
      category: 'Healthcare',
      date: 'Sunday, March 29, 2026',
      time: '09:00 AM – 03:00 PM IST',
      location: 'Community Dispensary Ground, Dhandari Kalan, Ludhiana',
      description: 'Free physician consultations, blood glucose screening, hypertension monitoring, and eye checks with distribution of free prescription medicines.',
      lead: 'Dr. Arvind Mehta (Chief Medical Officer)',
      volunteersNeeded: '15 Medical & Registration Volunteers',
      icon: HeartPulse,
      status: 'upcoming'
    },
    {
      id: 'evt-2',
      title: 'AABHA Annual School Kit & Digital Tablet Distribution',
      category: 'Education',
      date: 'Saturday, April 11, 2026',
      time: '10:30 AM – 01:30 PM IST',
      location: 'GNDEC Auditorium, Gill Road, Ludhiana, Punjab',
      description: 'Annual distribution of textbooks, stationery bags, uniform sets, and refurbished learning tablets to 650+ children from our slum learning clusters.',
      lead: 'Rahul Verma (GNDEC Chapter Lead)',
      volunteersNeeded: '20 Student Mentors',
      icon: GraduationCap,
      status: 'upcoming'
    },
    {
      id: 'evt-3',
      title: 'Green Earth Community Tree Plantation Drive',
      category: 'Environment',
      date: 'Sunday, April 26, 2026',
      time: '07:00 AM – 11:00 AM IST',
      location: 'Sidwan Canal Belt & Gill Road Green Corridor, Ludhiana',
      description: 'Planting 1,500 native saplings with tree guards along the canal embankment in collaboration with regional youth clubs and local panchayats.',
      lead: 'Amarjeet Kumar (Managing Director)',
      volunteersNeeded: '40 Community Volunteers',
      icon: Droplets,
      status: 'upcoming'
    }
  ];

  const handleRsvpSubmit = (e: React.FormEvent, eventTitle: string) => {
    e.preventDefault();
    setRsvpSuccess(`RSVP confirmed for ${rsvpName} at "${eventTitle}". Our coordinator will message you at ${rsvpPhone}.`);
    setTimeout(() => {
      setSelectedEventId(null);
      setRsvpSuccess(null);
      setRsvpName('');
      setRsvpPhone('');
    }, 4000);
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 animate-fadeIn">
      {/* Header */}
      <section className="bg-gradient-to-b from-stone-100 to-[#FAFAF8] dark:from-zinc-900 dark:to-zinc-950 py-12 sm:py-16 px-4 sm:px-6 border-b border-stone-200/80 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="text-xs font-sans font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400">
            Community Calendar
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
            Upcoming Medical Camps & Field Drives
          </h1>
          <p className="text-stone-600 dark:text-zinc-300 text-base sm:text-lg leading-relaxed max-w-3xl">
            Join our upcoming public healthcare camps, distribution drives, and youth volunteer mobilization across Ludhiana and regional Punjab.
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        {events.map((evt) => {
          const Icon = evt.icon;
          const isRsvpOpen = selectedEventId === evt.id;

          return (
            <div 
              key={evt.id}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 space-y-6 shadow-2xs hover:border-stone-300 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 dark:border-zinc-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-orange-600 dark:text-orange-400 tracking-wider">
                      {evt.category}
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
                      {evt.title}
                    </h2>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full w-fit">
                  {evt.status.toUpperCase()}
                </span>
              </div>

              {/* Event Metadata Pill-free Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-600 dark:text-zinc-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-stone-400 shrink-0" />
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">{evt.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-stone-400 shrink-0" />
                  <span>{evt.time}</span>
                </div>
                <div className="flex items-start gap-2 sm:col-span-2">
                  <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                  <span>{evt.location}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 dark:text-zinc-300 leading-relaxed font-normal">
                {evt.description}
              </p>

              <div className="pt-4 border-t border-stone-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4 text-xs">
                <span className="text-stone-500">
                  Lead: <strong className="text-zinc-800 dark:text-zinc-200">{evt.lead}</strong>
                </span>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onNavigate('volunteer')}
                    className="text-stone-600 dark:text-zinc-400 hover:text-zinc-900 font-bold"
                  >
                    Volunteer for this event
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedEventId(isRsvpOpen ? null : evt.id)}
                    className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-xl transition-all cursor-pointer"
                  >
                    {isRsvpOpen ? 'Close Form' : 'Register / RSVP'}
                  </button>
                </div>
              </div>

              {/* Inline RSVP Drawer */}
              {isRsvpOpen && (
                <div className="p-5 rounded-2xl bg-stone-50 dark:bg-zinc-800/60 border border-stone-200 dark:border-zinc-700 space-y-4 animate-fadeIn">
                  <h3 className="font-serif text-base font-bold text-zinc-900 dark:text-white">
                    Confirm Attendance / RSVP
                  </h3>

                  {rsvpSuccess ? (
                    <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold">
                      {rsvpSuccess}
                    </div>
                  ) : (
                    <form onSubmit={(e) => handleRsvpSubmit(e, evt.title)} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          value={rsvpName}
                          onChange={(e) => setRsvpName(e.target.value)}
                          placeholder="Your Full Name *"
                          className="px-3.5 py-2 rounded-xl border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white"
                        />
                        <input
                          type="tel"
                          required
                          value={rsvpPhone}
                          onChange={(e) => setRsvpPhone(e.target.value)}
                          placeholder="Mobile / WhatsApp *"
                          className="px-3.5 py-2 rounded-xl border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white"
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedEventId(null)}
                          className="px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-medium"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 rounded-lg bg-orange-600 text-white text-xs font-bold uppercase tracking-wider"
                        >
                          Confirm Registration
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
};
