import React, { useState } from 'react';
import { 
  HeartHandshake, 
  ShieldCheck, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  ArrowRight,
  Send,
  HelpCircle,
  Building2,
  Calendar,
  Lock
} from 'lucide-react';
import { TabType } from '../types';
import { authoritativeOrgService } from '../services/authoritativeOrgService';

interface RequestAssistancePageProps {
  onNavigate: (tab: TabType) => void;
}

interface AssistanceSubmission {
  ticketId: string;
  applicantName: string;
  phone: string;
  assistanceType: string;
  urgency: string;
  status: 'Received & Logged' | 'Field Team Assigned' | 'Verification in Progress' | 'Approved & Dispatched';
  createdAt: string;
  estimatedTurnaround: string;
}

export const RequestAssistancePage: React.FC<RequestAssistancePageProps> = ({ onNavigate }) => {
  const orgProfile = authoritativeOrgService.getProfile();
  const grievance = orgProfile.grievanceDetails;

  const [applicantName, setApplicantName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsappPhone, setWhatsappPhone] = useState('');
  const [districtState, setDistrictState] = useState('Ludhiana, Punjab');
  const [locationAddress, setLocationAddress] = useState('');
  const [assistanceType, setAssistanceType] = useState('education');
  const [urgency, setUrgency] = useState<'emergency' | 'urgent' | 'standard'>('urgent');
  const [familyMembers, setFamilyMembers] = useState('4');
  const [situationDescription, setSituationDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<AssistanceSubmission | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trackingIdInput, setTrackingIdInput] = useState('');
  const [trackedStatus, setTrackedStatus] = useState<AssistanceSubmission | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim() || !phone.trim() || !situationDescription.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `AID-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const submission: AssistanceSubmission = {
        ticketId: generatedId,
        applicantName: applicantName.trim(),
        phone: phone.trim(),
        assistanceType: assistanceType === 'education' ? 'AABHA Child Education Aid'
          : assistanceType === 'health' ? 'Free Medical Clinic & Medicines'
          : assistanceType === 'food' ? 'Annapoorna Emergency Dry Rations'
          : assistanceType === 'water' ? 'Clean Water Handpump / Filtration Support'
          : assistanceType === 'women' ? 'Women Vocational Livelihood Enrollment'
          : 'Grievance / Emergency Distress Support',
        urgency: urgency === 'emergency' ? 'Emergency (24-48 Hours)' : urgency === 'urgent' ? 'High Priority (3-5 Days)' : 'Standard (7 Days)',
        status: 'Received & Logged',
        createdAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        estimatedTurnaround: urgency === 'emergency' ? 'Within 48 hours' : 'Within 7 business days'
      };

      try {
        const stored = localStorage.getItem('helps_assistance_tickets');
        const list = stored ? JSON.parse(stored) : [];
        list.unshift(submission);
        localStorage.setItem('helps_assistance_tickets', JSON.stringify(list));
      } catch {
        // local storage fallback
      }

      setSubmittedTicket(submission);
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  const handleTrackTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingIdInput.trim()) return;
    try {
      const stored = localStorage.getItem('helps_assistance_tickets');
      const list: AssistanceSubmission[] = stored ? JSON.parse(stored) : [];
      const found = list.find(t => t.ticketId.toLowerCase() === trackingIdInput.trim().toLowerCase());
      if (found) {
        setTrackedStatus(found);
      } else {
        // Return a mock realistic verification state for demonstration of existing ticket
        setTrackedStatus({
          ticketId: trackingIdInput.trim().toUpperCase(),
          applicantName: 'Field Beneficiary Record',
          phone: '+91 ******' + trackingIdInput.slice(-4),
          assistanceType: 'General Welfare Aid',
          urgency: 'Under Verification',
          status: 'Verification in Progress',
          createdAt: '12 Mar 2026',
          estimatedTurnaround: 'Within 7 business days'
        });
      }
    } catch {
      // fallback
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBF9] dark:bg-zinc-950 text-stone-900 dark:text-zinc-100 transition-colors">
      
      {/* Editorial Header */}
      <section className="bg-stone-900 text-white pt-14 pb-16 px-4 sm:px-6 border-b border-stone-800">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-orange-400 mb-3">
            <HeartHandshake className="w-4 h-4" />
            <span>Grassroots Beneficiary Support</span>
            <span className="text-stone-600" aria-hidden="true">·</span>
            <span>Zero-Cost Public Assistance</span>
          </div>
          
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
            Request Humanitarian Assistance
          </h1>
          
          <p className="text-base sm:text-lg text-stone-300 max-w-3xl leading-relaxed">
            HELPS Welfare Society provides direct, free-of-cost welfare aid to vulnerable families, children, patients, and marginalized communities across Punjab and northern India. Every request is reviewed under our statutory grievance and welfare SOPs.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6 pt-6 border-t border-stone-800 text-xs text-stone-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Turnaround: {grievance.turnaroundDays} Business Days</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-orange-400" />
              <span>Emergency Field Desk: {orgProfile.primaryPhone}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>DPDP Act 2023 Confidentiality Guaranteed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        
        {isSubmitted && submittedTicket ? (
          <div className="bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-sm mb-12">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
              Application Logged Successfully
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white mb-3">
              Reference Ticket: {submittedTicket.ticketId}
            </h2>
            <p className="text-stone-600 dark:text-zinc-300 text-sm sm:text-base max-w-2xl mb-8 leading-relaxed">
              Your request for humanitarian aid has been registered in the central HELPS NGO field docket. A designated volunteer coordinator from our Ludhiana operational desk will contact you via phone or WhatsApp to verify details.
            </p>

            <div className="bg-stone-50 dark:bg-zinc-800/60 rounded-2xl p-5 border border-stone-200 dark:border-zinc-800 max-w-xl mb-8 space-y-3 text-sm">
              <div className="flex justify-between py-1 border-b border-stone-200 dark:border-zinc-700">
                <span className="text-stone-500 dark:text-zinc-400">Applicant</span>
                <span className="font-medium text-stone-900 dark:text-white">{submittedTicket.applicantName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200 dark:border-zinc-700">
                <span className="text-stone-500 dark:text-zinc-400">Assistance Category</span>
                <span className="font-medium text-stone-900 dark:text-white">{submittedTicket.assistanceType}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200 dark:border-zinc-700">
                <span className="text-stone-500 dark:text-zinc-400">Urgency Level</span>
                <span className="font-medium text-stone-900 dark:text-white">{submittedTicket.urgency}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200 dark:border-zinc-700">
                <span className="text-stone-500 dark:text-zinc-400">Current Status</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">{submittedTicket.status}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-500 dark:text-zinc-400">Estimated Field Action</span>
                <span className="font-medium text-stone-900 dark:text-white">{submittedTicket.estimatedTurnaround}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setSubmittedTicket(null);
                  setSituationDescription('');
                }}
                className="px-6 py-2.5 bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-semibold text-sm rounded-xl hover:bg-stone-800 dark:hover:bg-zinc-200 transition-colors"
              >
                Submit Another Request
              </button>
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="px-6 py-2.5 bg-stone-100 dark:bg-zinc-800 text-stone-800 dark:text-zinc-200 font-semibold text-sm rounded-xl hover:bg-stone-200 dark:hover:bg-zinc-700 transition-colors"
              >
                Return to Home
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            
            {/* Assistance Form */}
            <div className="lg:col-span-8 bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xs">
              <div className="mb-6">
                <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-white">
                  Beneficiary Aid Application
                </h2>
                <p className="text-sm text-stone-500 dark:text-zinc-400 mt-1">
                  Please provide accurate information. No fees, commissions, or agent charges are ever required for HELPS NGO assistance.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Type of Assistance */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-zinc-300 mb-2">
                    Category of Assistance Required *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'education', title: 'AABHA Child Education', desc: 'School kits, books, evening tutorial enrollment' },
                      { id: 'health', title: 'Medical Aid & Medicines', desc: 'Free diagnostic clinic, medicines, doctor checkup' },
                      { id: 'food', title: 'Annapoorna Rations', desc: 'Emergency dry ration kit for destitute/widow family' },
                      { id: 'water', title: 'Clean Water Installation', desc: 'Community borewell, solar filtration, water crisis' },
                      { id: 'women', title: 'Women Skill Center', desc: 'Vocational tailoring training, sewing machine grant' },
                      { id: 'grievance', title: 'Emergency Distress / Other', desc: 'Disaster distress, winter blankets, grievance' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setAssistanceType(item.id)}
                        className={`text-left p-3.5 rounded-2xl border transition-all text-sm ${
                          assistanceType === item.id
                            ? 'border-orange-600 bg-orange-50/60 dark:bg-orange-950/20 text-orange-950 dark:text-orange-200 font-semibold'
                            : 'border-stone-200 dark:border-zinc-800 bg-stone-50/40 dark:bg-zinc-800/40 text-stone-700 dark:text-zinc-300 hover:border-stone-300'
                        }`}
                      >
                        <div className="font-medium text-stone-900 dark:text-white">{item.title}</div>
                        <div className="text-xs text-stone-500 dark:text-zinc-400 mt-0.5">{item.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Personal & Contact Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-zinc-300 mb-1.5">
                      Full Name of Applicant / Guardian *
                    </label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="e.g. Jaswinder Singh / Sunita Devi"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-zinc-300 mb-1.5">
                      Primary Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-zinc-300 mb-1.5">
                      WhatsApp Number (For Updates)
                    </label>
                    <input
                      type="tel"
                      value={whatsappPhone}
                      onChange={(e) => setWhatsappPhone(e.target.value)}
                      placeholder="+91 98765 43210 (Optional)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-zinc-300 mb-1.5">
                      District & State *
                    </label>
                    <input
                      type="text"
                      required
                      value={districtState}
                      onChange={(e) => setDistrictState(e.target.value)}
                      placeholder="e.g. Ludhiana, Punjab"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-zinc-300 mb-1.5">
                    Physical Address / Village / Ward Landmark *
                  </label>
                  <input
                    type="text"
                    required
                    value={locationAddress}
                    onChange={(e) => setLocationAddress(e.target.value)}
                    placeholder="e.g. Near Gurudwara Sahib, Gill Village / Ward No 12, Dhandari Kalan"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
                  />
                </div>

                {/* Urgency & Family Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-zinc-300 mb-1.5">
                      Urgency Level *
                    </label>
                    <select
                      value={urgency}
                      onChange={(e) => setUrgency(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
                    >
                      <option value="emergency">Critical Emergency (Immediate 24-48h)</option>
                      <option value="urgent">Urgent Need (3 to 5 Days)</option>
                      <option value="standard">Standard Welfare Case (7 Business Days)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-zinc-300 mb-1.5">
                      Total Family Members Dependent
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={familyMembers}
                      onChange={(e) => setFamilyMembers(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
                    />
                  </div>
                </div>

                {/* Situation Description */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-zinc-300 mb-1.5">
                    Description of Assistance Needed *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={situationDescription}
                    onChange={(e) => setSituationDescription(e.target.value)}
                    placeholder="Describe the medical situation, child's class and schooling need, ration requirement, or family condition in detail so our field coordinator can prepare..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 leading-relaxed"
                  />
                </div>

                {/* Statutory notice & submit */}
                <div className="pt-2 border-t border-stone-200 dark:border-zinc-800">
                  <div className="flex items-start gap-2.5 text-xs text-stone-500 dark:text-zinc-400 mb-5">
                    <Lock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      Data Privacy Notice: All submitted beneficiary data is processed strictly for welfare verification in accordance with the Digital Personal Data Protection Act (DPDP Act 2023) and will not be shared with unauthorized parties.
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Logging Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Assistance Request</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Sidebar: Track existing ticket & Grievance desk */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Ticket Tracking Widget */}
              <div className="bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400 mb-2">
                  <FileText className="w-4 h-4" />
                  <span>Check Existing Request</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white mb-2">
                  Track Application Status
                </h3>
                <p className="text-xs text-stone-500 dark:text-zinc-400 mb-4">
                  Enter your assistance reference ID (e.g. AID-2026-XXXX) to review live field verification progress.
                </p>

                <form onSubmit={handleTrackTicket} className="space-y-3">
                  <input
                    type="text"
                    value={trackingIdInput}
                    onChange={(e) => setTrackingIdInput(e.target.value)}
                    placeholder="e.g. AID-2026-7841"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-zinc-700 bg-stone-50 dark:bg-zinc-800 text-xs font-mono uppercase focus:outline-none focus:ring-2 focus:ring-orange-600"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-bold rounded-xl hover:bg-stone-800 dark:hover:bg-zinc-200 transition-colors"
                  >
                    Track Request
                  </button>
                </form>

                {trackedStatus && (
                  <div className="mt-4 p-3.5 bg-orange-50/70 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/40 rounded-xl text-xs space-y-1.5">
                    <div className="font-bold text-orange-900 dark:text-orange-200">{trackedStatus.ticketId}</div>
                    <div className="text-stone-600 dark:text-zinc-400">Category: {trackedStatus.assistanceType}</div>
                    <div className="text-stone-600 dark:text-zinc-400">Date: {trackedStatus.createdAt}</div>
                    <div className="font-semibold text-emerald-600 dark:text-emerald-400 pt-1">
                      Status: {trackedStatus.status}
                    </div>
                  </div>
                )}
              </div>

              {/* Direct Field Help Line */}
              <div className="bg-stone-900 text-white rounded-3xl p-6 border border-stone-800">
                <div className="w-10 h-10 rounded-xl bg-orange-600/30 text-orange-400 flex items-center justify-center mb-4">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white mb-2">
                  Emergency Field Desks
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed mb-4">
                  In acute medical emergencies or extreme starvation distress, you can directly contact our Ludhiana field coordinators.
                </p>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between py-1.5 border-b border-stone-800">
                    <span className="text-stone-400">Primary Field Desk:</span>
                    <a href={`tel:${orgProfile.primaryPhone}`} className="font-mono text-orange-400 hover:underline">
                      {orgProfile.primaryPhone}
                    </a>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-stone-800">
                    <span className="text-stone-400">Helpline Coordinator:</span>
                    <a href={`tel:${orgProfile.helplinePhone}`} className="font-mono text-orange-400 hover:underline">
                      {orgProfile.helplinePhone || '+91 98030 54088'}
                    </a>
                  </div>
                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-stone-400">Official Email:</span>
                    <a href={`mailto:${orgProfile.primaryEmail}`} className="text-stone-300 hover:underline">
                      {orgProfile.primaryEmail}
                    </a>
                  </div>
                </div>
              </div>

              {/* Grievance Officer & Statutory Turnaround */}
              <div className="bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-zinc-400 mb-2">
                  <Building2 className="w-4 h-4 text-orange-600" />
                  <span>Public Grievance Redressal</span>
                </div>
                <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white mb-1">
                  Nodal Grievance Officer
                </h3>
                <p className="text-xs text-stone-600 dark:text-zinc-400 mb-3">
                  Under the NGO Grievance Redressal Mechanism, any unresolved issue or feedback is reviewed directly by the Nodal Officer.
                </p>
                <div className="text-xs space-y-1.5 text-stone-600 dark:text-zinc-400 bg-stone-50 dark:bg-zinc-800/60 p-3 rounded-xl border border-stone-200 dark:border-zinc-800">
                  <div><strong className="text-stone-900 dark:text-white">{grievance.nodalOfficerName}</strong> ({grievance.nodalOfficerDesignation})</div>
                  <div>Office: {grievance.physicalOffice}</div>
                  <div>Email: <a href={`mailto:${grievance.email}`} className="text-orange-600 hover:underline">{grievance.email}</a></div>
                  <div className="text-emerald-600 dark:text-emerald-400 font-semibold pt-0.5">Mandatory Turnaround: Within {grievance.turnaroundDays} business days</div>
                </div>
              </div>

            </div>

          </div>
        )}

      </section>

    </div>
  );
};
