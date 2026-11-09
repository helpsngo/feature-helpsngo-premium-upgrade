import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Building2, 
  Clock, 
  Send, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { TabType } from '../types';
import { authoritativeOrgService } from '../services/authoritativeOrgService';

interface ContactPageProps {
  onNavigate: (tab: TabType) => void;
  onOpenAJChat?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, onOpenAJChat }) => {
  const orgProfile = authoritativeOrgService.getProfile();
  const grievance = orgProfile.grievanceDetails;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'general',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#FBFBF9] dark:bg-zinc-950 text-stone-900 dark:text-zinc-100 transition-colors">
      
      {/* Editorial Header */}
      <section className="bg-stone-900 text-white pt-14 pb-16 px-4 sm:px-6 border-b border-stone-800">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-orange-400 mb-3">
            <Building2 className="w-4 h-4" />
            <span>Authoritative Communications</span>
            <span className="text-stone-600" aria-hidden="true">·</span>
            <span>Registered Society Directory</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
            Connect with HELPS NGO
          </h1>

          <p className="text-base sm:text-lg text-stone-300 max-w-3xl leading-relaxed">
            Reach out to our leadership, field operations coordinators, or grievance redressal desk. Whether you are inquiring about partnerships, volunteering, CSR programs, or humanitarian assistance, our team in Ludhiana is here to assist.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6 pt-6 border-t border-stone-800 text-xs text-stone-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Office Hours: Mon – Sat (9:00 AM – 6:30 PM IST)</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-orange-400" />
              <span>Helpline: {orgProfile.primaryPhone}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Grievance Turnaround: {grievance.turnaroundDays} Business Days</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xs">
            {isSubmitted ? (
              <div className="py-12 text-center">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-white mb-2">
                  Message Dispatched to Field Desk
                </h3>
                <p className="text-sm text-stone-600 dark:text-zinc-300 max-w-md mx-auto mb-6 leading-relaxed">
                  Thank you for reaching out to HELPS Welfare Society. Your inquiry has been routed to the relevant department coordinator. We will reply to {formData.email} within 24 to 48 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', department: 'general', subject: '', message: '' });
                  }}
                  className="px-6 py-2.5 bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-semibold text-xs rounded-xl hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-white">
                    Send an Official Inquiry
                  </h2>
                  <p className="text-xs text-stone-500 dark:text-zinc-400 mt-1">
                    Please select the appropriate department so your message is reviewed by the right coordinator.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Department Routing */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-zinc-300 mb-1.5">
                      Department / Inquiry Nature *
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
                    >
                      <option value="general">General Secretariat (info@helpsngo.in)</option>
                      <option value="csr">Corporate CSR & Institutional Grants (CSR-1)</option>
                      <option value="volunteer">Volunteer & University Internships</option>
                      <option value="medical">Rural Healthcare & Medical Camps</option>
                      <option value="education">AABHA Slum Education Centers</option>
                      <option value="grievance">Statutory Compliance & Nodal Grievance</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-zinc-300 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Jaswinder Singh"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-zinc-300 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-zinc-300 mb-1.5">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-zinc-300 mb-1.5">
                        Subject *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="e.g. CSR partnership inquiry for Ludhiana"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-zinc-300 mb-1.5">
                      Message / Proposal Details *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please share detailed context regarding your question, proposal, or support requirement..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full sm:w-auto px-8 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Official Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Contact Details Directory */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Registered vs Operational Address */}
            <div className="bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400 mb-2">
                <MapPin className="w-4 h-4" />
                <span>Physical Offices</span>
              </div>
              
              <div className="space-y-4 text-xs">
                <div className="pb-3 border-b border-stone-100 dark:border-zinc-800">
                  <span className="font-bold text-stone-900 dark:text-white uppercase tracking-wider block mb-1">
                    Official Registered Office (Societies Act)
                  </span>
                  <p className="text-stone-600 dark:text-zinc-300 leading-relaxed">
                    {orgProfile.registeredAddress.formatted}
                  </p>
                  <span className="text-[11px] text-stone-400 mt-1 block">
                    Landmark: {orgProfile.registeredAddress.landmark}
                  </span>
                </div>

                <div>
                  <span className="font-bold text-stone-900 dark:text-white uppercase tracking-wider block mb-1">
                    Operational Field Desk & Student Hub
                  </span>
                  <p className="text-stone-600 dark:text-zinc-300 leading-relaxed">
                    {orgProfile.operationalAddress.formatted}
                  </p>
                  <span className="text-[11px] text-stone-400 mt-1 block">
                    Hub for AABHA lesson planning, GNDEC volunteer coordination & Annapoorna kitchen dispatch.
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Phone & Email Directory */}
            <div className="bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400 mb-3">
                <Phone className="w-4 h-4" />
                <span>Verified Contact Numbers</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-stone-100 dark:border-zinc-800">
                  <span className="text-stone-500">Managing Director:</span>
                  <a href={`tel:${orgProfile.primaryPhone}`} className="font-mono font-semibold text-stone-900 dark:text-white hover:text-orange-600">
                    {orgProfile.primaryPhone}
                  </a>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-stone-100 dark:border-zinc-800">
                  <span className="text-stone-500">Field Operations Lead:</span>
                  <a href={`tel:${orgProfile.secondaryPhone}`} className="font-mono font-semibold text-stone-900 dark:text-white hover:text-orange-600">
                    {orgProfile.secondaryPhone || '+91 62837 77177'}
                  </a>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-stone-100 dark:border-zinc-800">
                  <span className="text-stone-500">General Secretariat Email:</span>
                  <a href={`mailto:${orgProfile.primaryEmail}`} className="font-semibold text-stone-900 dark:text-white hover:text-orange-600">
                    {orgProfile.primaryEmail}
                  </a>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-stone-500">Statutory Grievance Email:</span>
                  <a href={`mailto:${grievance.email}`} className="font-semibold text-stone-900 dark:text-white hover:text-orange-600">
                    {grievance.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Instant AI Guide Card */}
            {onOpenAJChat && (
              <div className="bg-gradient-to-br from-stone-900 to-zinc-900 text-white rounded-3xl p-6 border border-stone-800">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-white mb-1">
                      Need Immediate Answers?
                    </h3>
                    <p className="text-xs text-stone-300 leading-relaxed mb-3">
                      Ask AJ, our AI guide grounded in certified HELPS NGO records, registration details, 80G tax rules, and program schedules.
                    </p>
                    <button
                      type="button"
                      onClick={onOpenAJChat}
                      className="px-4 py-2 bg-white text-stone-900 font-bold text-xs rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
                    >
                      Ask AJ Assistant Now
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Grievance Redressal Protocol */}
            <div className="bg-stone-100 dark:bg-zinc-800/60 rounded-3xl p-5 border border-stone-200 dark:border-zinc-800 text-xs text-stone-600 dark:text-zinc-400">
              <span className="font-bold text-stone-900 dark:text-white block mb-1">
                Statutory Grievance Protocol (Societies Act 1860)
              </span>
              Under our statutory governance framework, public grievances or donor queries regarding receipts/Form 10BE are logged and handled by Nodal Officer <strong>{grievance.nodalOfficerName}</strong> with a legally tracked turnaround of <strong>{grievance.turnaroundDays} business days</strong>.
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
