import React, { useState, useEffect } from 'react';
import { TabType, UserProfile } from '../types';
import { 
  Menu, 
  X, 
  Heart, 
  ChevronDown, 
  User, 
  LogIn, 
  LogOut, 
  ShieldCheck, 
  Bot, 
  Phone, 
  Mail, 
  HeartHandshake, 
  FileText, 
  Sparkles, 
  GraduationCap, 
  Calendar, 
  HelpCircle,
  Building2,
  Scale,
  Award
} from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { authoritativeOrgService } from '../services/authoritativeOrgService';

interface MainNavbarProps {
  currentTab: TabType;
  onNavigate: (tab: TabType) => void;
  user?: UserProfile;
  onOpenAuth?: () => void;
  onLogout?: () => void;
  onOpenAJChat?: () => void;
  onOpenAdminStudio?: () => void;
  pendingApprovalsCount?: number;
}

export const MainNavbar: React.FC<MainNavbarProps> = ({
  currentTab,
  onNavigate,
  user,
  onOpenAuth,
  onLogout,
  onOpenAJChat,
  onOpenAdminStudio,
  pendingApprovalsCount = 0
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const isGuest = !user || user.role === 'guest';
  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';
  const isManagement = user?.role === 'management' || user?.role === 'program_manager';
  const isVolunteer = user?.role === 'volunteer';

  // Close mobile drawer on tab navigation or resize
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [currentTab]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNav = (tab: TabType) => {
    onNavigate(tab);
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Utility Ribbon (Institutional trust, Helpline & Tax-Deductible Notice) */}
      <div className="bg-[#18181B] text-zinc-300 text-[11px] px-3 sm:px-6 py-1.5 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3 text-zinc-300">
            <span className="font-semibold text-white">Societies Registration Act XXI of 1860</span>
            <span className="text-zinc-600 hidden sm:inline" aria-hidden="true">·</span>
            <span className="text-zinc-400 hidden sm:inline">Reg: HR/2021/0285458</span>
            <span className="text-zinc-600 hidden md:inline" aria-hidden="true">·</span>
            <span className="text-emerald-400 font-medium hidden md:inline">50% Tax Deduction u/s 80G(5)(vi)</span>
          </div>

          <div className="flex items-center gap-4 ml-auto text-zinc-400">
            <a 
              href="tel:+919472929856" 
              className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-orange-400" />
              <span>+91 94729 29856</span>
            </a>
            <span className="text-zinc-700 hidden xs:inline" aria-hidden="true">·</span>
            <a 
              href="mailto:info@helpsngo.in" 
              className="hidden sm:flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors"
            >
              <Mail className="w-3 h-3 text-orange-400" />
              <span>info@helpsngo.in</span>
            </a>
            <div className="border-l border-zinc-800 pl-3 hidden xs:block">
              <LanguageSelector variant="compact" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Top Navigation Header */}
      <header 
        role="banner"
        className="sticky top-0 z-40 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-stone-200/80 dark:border-zinc-800 shadow-2xs transition-colors"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          {/* Brand Wordmark & Emblem */}
          <button
            type="button"
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 rounded-xl"
            aria-label="HELPS Welfare Society Home"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-orange-600 text-white flex items-center justify-center font-black text-lg shadow-sm group-hover:bg-orange-700 transition-colors shrink-0">
              H
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-zinc-950 dark:text-white leading-tight">
                HELPS NGO
              </span>
              <span className="text-[10px] sm:text-[11px] font-sans font-medium text-stone-500 dark:text-zinc-400 tracking-wide uppercase">
                Welfare Society · Est. 2016
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav 
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            <button
              type="button"
              onClick={() => handleNav('home')}
              className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                currentTab === 'home' 
                  ? 'text-orange-600 dark:text-orange-400 font-bold' 
                  : 'hover:text-zinc-950 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-zinc-800'
              }`}
            >
              Home
            </button>

            {/* About Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('about')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  ['about', 'mission', 'team'].includes(currentTab)
                    ? 'text-orange-600 dark:text-orange-400 font-bold'
                    : 'hover:text-zinc-950 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-zinc-800'
                }`}
                aria-expanded={activeDropdown === 'about'}
              >
                <span>About Us</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
              </button>

              {activeDropdown === 'about' && (
                <div className="absolute top-full left-0 w-64 pt-2 z-50 animate-fadeIn">
                  <div className="bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-2xl shadow-xl p-2 space-y-1">
                    <button
                      type="button"
                      onClick={() => handleNav('about')}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                        currentTab === 'about' ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600' : 'hover:bg-stone-50 dark:hover:bg-zinc-800'
                      }`}
                    >
                      <div className="font-bold text-zinc-900 dark:text-white">About HELPS Society</div>
                      <div className="text-[11px] text-stone-500 dark:text-zinc-400 mt-0.5">Founding journey & society constitution</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNav('mission')}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                        currentTab === 'mission' ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600' : 'hover:bg-stone-50 dark:hover:bg-zinc-800'
                      }`}
                    >
                      <div className="font-bold text-zinc-900 dark:text-white">Mission & Vision</div>
                      <div className="text-[11px] text-stone-500 dark:text-zinc-400 mt-0.5">5 core welfare pillars & theory of change</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNav('team')}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                        currentTab === 'team' ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600' : 'hover:bg-stone-50 dark:hover:bg-zinc-800'
                      }`}
                    >
                      <div className="font-bold text-zinc-900 dark:text-white">Our Team & Governance</div>
                      <div className="text-[11px] text-stone-500 dark:text-zinc-400 mt-0.5">Verified founders, medical leads & advisors</div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Programmes Link */}
            <button
              type="button"
              onClick={() => handleNav('projects')}
              className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                currentTab === 'projects' || currentTab === 'program-detail'
                  ? 'text-orange-600 dark:text-orange-400 font-bold'
                  : 'hover:text-zinc-950 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-zinc-800'
              }`}
            >
              Programmes
            </button>

            {/* Impact & Transparency Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('impact')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  ['impact', 'stories', 'transparency'].includes(currentTab)
                    ? 'text-orange-600 dark:text-orange-400 font-bold'
                    : 'hover:text-zinc-950 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-zinc-800'
                }`}
                aria-expanded={activeDropdown === 'impact'}
              >
                <span>Impact & Reports</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
              </button>

              {activeDropdown === 'impact' && (
                <div className="absolute top-full left-0 w-64 pt-2 z-50 animate-fadeIn">
                  <div className="bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-2xl shadow-xl p-2 space-y-1">
                    <button
                      type="button"
                      onClick={() => handleNav('impact')}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                        currentTab === 'impact' ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600' : 'hover:bg-stone-50 dark:hover:bg-zinc-800'
                      }`}
                    >
                      <div className="font-bold text-zinc-900 dark:text-white">Impact & Achievements</div>
                      <div className="text-[11px] text-stone-500 dark:text-zinc-400 mt-0.5">Audited numbers: meals, clinics, schools</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNav('stories')}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                        currentTab === 'stories' ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600' : 'hover:bg-stone-50 dark:hover:bg-zinc-800'
                      }`}
                    >
                      <div className="font-bold text-zinc-900 dark:text-white">Field Stories & News</div>
                      <div className="text-[11px] text-stone-500 dark:text-zinc-400 mt-0.5">Real field dispatches & beneficiaries</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNav('transparency')}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                        currentTab === 'transparency' ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600' : 'hover:bg-stone-50 dark:hover:bg-zinc-800'
                      }`}
                    >
                      <div className="font-bold text-zinc-900 dark:text-white">Financial Transparency</div>
                      <div className="text-[11px] text-stone-500 dark:text-zinc-400 mt-0.5">88.4% field spend ratio, annual audits</div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Get Involved Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('involved')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  ['volunteer', 'internship', 'events'].includes(currentTab)
                    ? 'text-orange-600 dark:text-orange-400 font-bold'
                    : 'hover:text-zinc-950 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-zinc-800'
                }`}
                aria-expanded={activeDropdown === 'involved'}
              >
                <span>Get Involved</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
              </button>

              {activeDropdown === 'involved' && (
                <div className="absolute top-full left-0 w-64 pt-2 z-50 animate-fadeIn">
                  <div className="bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-2xl shadow-xl p-2 space-y-1">
                    <button
                      type="button"
                      onClick={() => handleNav('volunteer')}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                        currentTab === 'volunteer' ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600' : 'hover:bg-stone-50 dark:hover:bg-zinc-800'
                      }`}
                    >
                      <div className="font-bold text-zinc-900 dark:text-white">Volunteer Community</div>
                      <div className="text-[11px] text-stone-500 dark:text-zinc-400 mt-0.5">Grassroots field assignments & logging</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNav('internship')}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                        currentTab === 'internship' ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600' : 'hover:bg-stone-50 dark:hover:bg-zinc-800'
                      }`}
                    >
                      <div className="font-bold text-zinc-900 dark:text-white">University Internship</div>
                      <div className="text-[11px] text-stone-500 dark:text-zinc-400 mt-0.5">GNDEC & regional student programs</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNav('events')}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                        currentTab === 'events' ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600' : 'hover:bg-stone-50 dark:hover:bg-zinc-800'
                      }`}
                    >
                      <div className="font-bold text-zinc-900 dark:text-white">Upcoming Events</div>
                      <div className="text-[11px] text-stone-500 dark:text-zinc-400 mt-0.5">Medical camps, plantation drives & drives</div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Assistance Request & Contact */}
            <button
              type="button"
              onClick={() => handleNav('assistance')}
              className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                currentTab === 'assistance'
                  ? 'text-orange-600 dark:text-orange-400 font-bold'
                  : 'hover:text-zinc-950 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-zinc-800'
              }`}
            >
              Request Aid
            </button>

            <button
              type="button"
              onClick={() => handleNav('contact')}
              className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                currentTab === 'contact'
                  ? 'text-orange-600 dark:text-orange-400 font-bold'
                  : 'hover:text-zinc-950 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-zinc-800'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: Key Actions (Ask AJ, User/Auth, Donate) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Ask AJ Assistant Button */}
            {onOpenAJChat && (
              <button
                type="button"
                onClick={onOpenAJChat}
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-full border border-stone-200 dark:border-zinc-700 bg-stone-50 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 hover:border-orange-300 dark:hover:border-orange-500 text-xs font-semibold transition-all cursor-pointer"
                title="Ask AJ: Source-grounded AI guide"
              >
                <Bot className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                <span>Ask AJ</span>
              </button>
            )}

            {/* Portal / Account Trigger */}
            {onOpenAuth && (
              <button
                type="button"
                onClick={onOpenAuth}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full border border-stone-200 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                {isGuest ? (
                  <>
                    <LogIn className="w-3.5 h-3.5 text-stone-500" />
                    <span>Portal Sign In</span>
                  </>
                ) : (
                  <>
                    <User className="w-3.5 h-3.5 text-orange-600" />
                    <span className="max-w-[70px] truncate">{user?.name ? user.name.split(' ')[0] : 'Account'}</span>
                  </>
                )}
              </button>
            )}

            {/* Primary Action: Donate Button */}
            <button
              id="main-navbar-donate-cta"
              type="button"
              onClick={() => handleNav('donate')}
              className="bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-full shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Donate</span>
              <span className="text-[10px] bg-white/20 text-white font-mono uppercase px-1.5 py-0.5 rounded-full hidden sm:inline">
                80G
              </span>
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600"
              aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div 
            className="lg:hidden bg-white dark:bg-zinc-900 border-b border-stone-200 dark:border-zinc-800 px-4 py-4 space-y-4 max-h-[82vh] overflow-y-auto animate-fadeIn"
          >
            {/* Quick Actions in Mobile Drawer */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleNav('donate')}
                className="w-full bg-orange-600 text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Donate (80G)</span>
              </button>
              {onOpenAJChat && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAJChat();
                  }}
                  className="w-full bg-stone-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 border border-stone-200 dark:border-zinc-700 cursor-pointer"
                >
                  <Bot className="w-4 h-4 text-orange-600" />
                  <span>Ask AJ</span>
                </button>
              )}
            </div>

            {/* Navigation Sections */}
            <div className="space-y-1 pt-2 border-t border-stone-100 dark:border-zinc-800">
              <div className="text-[10px] uppercase font-bold text-stone-400 dark:text-zinc-500 tracking-wider px-2 py-1">
                Explore
              </div>
              <button
                type="button"
                onClick={() => handleNav('home')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                  currentTab === 'home' ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600' : 'text-zinc-800 dark:text-zinc-200'
                }`}
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => handleNav('about')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                  currentTab === 'about' ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600' : 'text-zinc-800 dark:text-zinc-200'
                }`}
              >
                About HELPS Society
              </button>
              <button
                type="button"
                onClick={() => handleNav('mission')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                  currentTab === 'mission' ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600' : 'text-zinc-800 dark:text-zinc-200'
                }`}
              >
                Mission & Vision
              </button>
              <button
                type="button"
                onClick={() => handleNav('team')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                  currentTab === 'team' ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600' : 'text-zinc-800 dark:text-zinc-200'
                }`}
              >
                Our Team & Leadership
              </button>
              <button
                type="button"
                onClick={() => handleNav('projects')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                  currentTab === 'projects' || currentTab === 'program-detail' ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600' : 'text-zinc-800 dark:text-zinc-200'
                }`}
              >
                All Programmes
              </button>
            </div>

            <div className="space-y-1 pt-2 border-t border-stone-100 dark:border-zinc-800">
              <div className="text-[10px] uppercase font-bold text-stone-400 dark:text-zinc-500 tracking-wider px-2 py-1">
                Transparency & Proof
              </div>
              <button
                type="button"
                onClick={() => handleNav('impact')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                  currentTab === 'impact' ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600' : 'text-zinc-800 dark:text-zinc-200'
                }`}
              >
                Impact & Achievements
              </button>
              <button
                type="button"
                onClick={() => handleNav('transparency')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                  currentTab === 'transparency' ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600' : 'text-zinc-800 dark:text-zinc-200'
                }`}
              >
                Financial Transparency & Audits
              </button>
              <button
                type="button"
                onClick={() => handleNav('stories')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                  currentTab === 'stories' ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600' : 'text-zinc-800 dark:text-zinc-200'
                }`}
              >
                Stories & Field News
              </button>
            </div>

            <div className="space-y-1 pt-2 border-t border-stone-100 dark:border-zinc-800">
              <div className="text-[10px] uppercase font-bold text-stone-400 dark:text-zinc-500 tracking-wider px-2 py-1">
                Participation & Community
              </div>
              <button
                type="button"
                onClick={() => handleNav('volunteer')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                  currentTab === 'volunteer' ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600' : 'text-zinc-800 dark:text-zinc-200'
                }`}
              >
                Volunteer Portal
              </button>
              <button
                type="button"
                onClick={() => handleNav('internship')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                  currentTab === 'internship' ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600' : 'text-zinc-800 dark:text-zinc-200'
                }`}
              >
                University Internship
              </button>
              <button
                type="button"
                onClick={() => handleNav('events')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                  currentTab === 'events' ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600' : 'text-zinc-800 dark:text-zinc-200'
                }`}
              >
                Upcoming Events & Camps
              </button>
              <button
                type="button"
                onClick={() => handleNav('assistance')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                  currentTab === 'assistance' ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600' : 'text-zinc-800 dark:text-zinc-200'
                }`}
              >
                Request Assistance / Aid
              </button>
              <button
                type="button"
                onClick={() => handleNav('contact')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                  currentTab === 'contact' ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600' : 'text-zinc-800 dark:text-zinc-200'
                }`}
              >
                Contact & Headquarters
              </button>
            </div>

            {/* Auth / Profile Link */}
            <div className="pt-2 border-t border-stone-100 dark:border-zinc-800 flex items-center justify-between">
              {onOpenAuth && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="flex items-center gap-2 text-xs font-bold text-zinc-800 dark:text-zinc-200"
                >
                  <User className="w-4 h-4 text-orange-600" />
                  <span>{isGuest ? 'Sign In / Register' : `Signed in as ${user?.name}`}</span>
                </button>
              )}
              {!isGuest && onLogout && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="text-xs font-bold text-rose-600 flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
