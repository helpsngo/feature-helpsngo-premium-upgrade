import React, { useState } from 'react';
import { TabType, ImpactStory, FieldDispatch } from '../types';
import { 
  Heart, 
  MapPin, 
  Calendar, 
  Share2, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  BookOpen,
  HeartPulse,
  Droplets,
  Utensils,
  Sparkles
} from 'lucide-react';
import { IMPACT_STORIES, INITIAL_FIELD_DISPATCHES } from '../data/mockData';

interface StoriesNewsPageProps {
  onNavigate: (tab: TabType) => void;
  onSelectStory?: (story: ImpactStory) => void;
}

export const StoriesNewsPage: React.FC<StoriesNewsPageProps> = ({ onNavigate, onSelectStory }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'education', 'healthcare', 'hunger relief', 'water & environment'];

  const filteredStories = selectedCategory === 'all'
    ? IMPACT_STORIES
    : IMPACT_STORIES.filter(s => s.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 animate-fadeIn">
      {/* Header */}
      <section className="bg-gradient-to-b from-stone-100 to-[#FAFAF8] dark:from-zinc-900 dark:to-zinc-950 py-12 sm:py-16 px-4 sm:px-6 border-b border-stone-200/80 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="text-xs font-sans font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400">
            Voices from the Field
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
            Field Stories & Grassroots Dispatches
          </h1>
          <p className="text-stone-600 dark:text-zinc-300 text-base sm:text-lg leading-relaxed max-w-3xl">
            Real narratives of resilience, change, and community empowerment from our classrooms, mobile healthcare vans, and community kitchens across Punjab.
          </p>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 dark:bg-zinc-800 rounded-xl w-fit">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs'
                  : 'text-stone-600 dark:text-zinc-400 hover:text-zinc-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Lead Story & Sub-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredStories.map((story, idx) => (
            <article 
              key={story.id}
              className={`bg-white dark:bg-zinc-900 rounded-3xl border border-stone-200 dark:border-zinc-800 overflow-hidden shadow-2xs hover:border-stone-300 transition-all flex flex-col justify-between ${
                idx === 0 ? 'md:col-span-2 md:flex-row' : ''
              }`}
            >
              {/* Media */}
              <div className={`relative bg-stone-100 dark:bg-zinc-800 overflow-hidden ${
                idx === 0 ? 'md:w-1/2 h-72 md:h-auto' : 'h-56'
              }`}>
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      const fallback = target.parentElement.querySelector('.story-fallback');
                      if (fallback) fallback.classList.remove('hidden');
                    }
                  }}
                />
                <div className="story-fallback hidden absolute inset-0 bg-stone-200 dark:bg-zinc-800 flex items-center justify-center p-4 text-center">
                  <span className="font-serif text-lg font-bold text-stone-400">{story.name}</span>
                </div>
                <div className="absolute top-3 left-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 border border-stone-200 dark:border-zinc-700">
                  {story.category}
                </div>
              </div>

              {/* Story Content */}
              <div className={`p-6 sm:p-8 flex flex-col justify-between space-y-4 ${
                idx === 0 ? 'md:w-1/2' : ''
              }`}>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs text-stone-400 dark:text-zinc-500 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>{story.location}</span>
                    <span aria-hidden="true">·</span>
                    <span>{story.impactMetric}</span>
                  </div>

                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white leading-snug">
                    {story.name}
                  </h2>

                  <p className="text-xs sm:text-sm text-stone-600 dark:text-zinc-300 leading-relaxed font-normal">
                    {story.story}
                  </p>

                  {story.quote && (
                    <blockquote className="my-3 pl-4 border-l-2 border-orange-500 font-serif italic text-xs sm:text-sm text-stone-700 dark:text-zinc-300">
                      "{story.quote}"
                    </blockquote>
                  )}
                </div>

                {/* Footer Strip */}
                <div className="pt-4 border-t border-stone-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                  <span className="font-medium text-stone-500 dark:text-zinc-400">
                    Beneficiary Context: <strong className="text-zinc-800 dark:text-zinc-200">{story.role}</strong>
                  </span>

                  <button
                    type="button"
                    onClick={() => onNavigate('donate')}
                    className="text-orange-600 dark:text-orange-400 hover:text-orange-700 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Support Similar Work</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Field Dispatches / Live Rhythm */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 space-y-6 shadow-2xs">
          <div className="space-y-1">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-stone-500">
              Field Dispatch Log
            </span>
            <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white">
              Recent Operational Dispatches
            </h2>
          </div>

          <div className="space-y-3">
            {INITIAL_FIELD_DISPATCHES.map((d) => (
              <div 
                key={d.id}
                className="p-4 rounded-2xl bg-stone-50 dark:bg-zinc-800/50 border border-stone-200/60 dark:border-zinc-700/60 flex items-start gap-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                  {d.iconType === 'clinic' ? <HeartPulse className="w-5 h-5" /> : d.iconType === 'water' ? <Droplets className="w-5 h-5" /> : <Utensils className="w-5 h-5" />}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <h3 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-white">
                      {d.title}
                    </h3>
                    <span className="text-[10px] font-mono text-stone-400">
                      {d.date}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-zinc-400 leading-relaxed">
                    {d.meta}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
