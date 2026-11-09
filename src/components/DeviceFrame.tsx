import React, { useState, useEffect } from 'react';
import { Smartphone, Tablet, Monitor, Sparkles, Check } from 'lucide-react';

export type DeviceMode = 'auto' | 'mobile' | 'tablet' | 'desktop';

interface DeviceFrameProps {
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children }) => {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('auto');
  const [viewportWidth, setViewportWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  // Dynamically listen to screen/window size changes
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine current effective device category
  const detectedDevice = 
    viewportWidth < 640 ? 'mobile' : viewportWidth < 1024 ? 'tablet' : 'desktop';

  const effectiveMode = deviceMode === 'auto' ? detectedDevice : deviceMode;

  return (
    <div className="min-h-screen bg-[#F1F3F5] dark:bg-gray-950 flex flex-col items-center justify-start transition-colors duration-200 font-sans text-gray-900 dark:text-gray-100 w-full">
      {/* WCAG 2.2 Skip to Main Content Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-orange-600 focus:text-white focus:rounded-xl focus:font-bold focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>

      {/* Top Device Viewport Status Bar (Clean & Accessible) */}
      <header
        aria-label="Responsive Device Viewport Bar"
        className="w-full max-w-7xl mt-1.5 sm:mt-2.5 mb-1.5 px-3 sm:px-6 py-1.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl sm:rounded-full border border-gray-200/80 dark:border-gray-800 shadow-2xs flex flex-wrap items-center justify-between gap-2 text-xs transition-colors"
      >
        {/* App Title & Verification Badge */}
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-orange-600 rounded-full flex items-center justify-center text-white font-black text-[10px] shadow-xs">
            H
          </div>
          <span className="font-extrabold tracking-tight text-gray-900 dark:text-white uppercase text-xs">
            HELPS Welfare Society
          </span>
          <span className="text-[11px] text-gray-400 dark:text-gray-500 font-medium hidden sm:inline">
            ·
          </span>
          <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider hidden sm:inline">
            80G Exempt (CIT(E) CHD) · Societies Act 1860 (Est. 2016)
          </span>
        </div>

        {/* Viewport Mode Controls (Auto by default, with one-click preview options) */}
        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 p-0.5 rounded-xl sm:rounded-full">
          <button
            id="preview-mode-auto"
            type="button"
            onClick={() => setDeviceMode('auto')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg sm:rounded-full font-bold text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
              deviceMode === 'auto'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
            title="Automatically adapts to actual screen size of Android, Tablet, or Desktop"
          >
            <Sparkles className="w-3 h-3" />
            <span>Auto</span>
          </button>

          <button
            id="preview-mode-mobile"
            type="button"
            onClick={() => setDeviceMode('mobile')}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg sm:rounded-full font-bold text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
              deviceMode === 'mobile'
                ? 'bg-white dark:bg-gray-700 text-orange-600 dark:text-orange-400 shadow-xs'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
            title="Android / Mobile Screen (390 - 414px)"
          >
            <Smartphone className="w-3 h-3" />
            <span className="hidden xs:inline">Android</span>
          </button>

          <button
            id="preview-mode-tablet"
            type="button"
            onClick={() => setDeviceMode('tablet')}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg sm:rounded-full font-bold text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
              deviceMode === 'tablet'
                ? 'bg-white dark:bg-gray-700 text-orange-600 dark:text-orange-400 shadow-xs'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
            title="Tablet Screen (768px)"
          >
            <Tablet className="w-3 h-3" />
            <span className="hidden xs:inline">Tablet</span>
          </button>

          <button
            id="preview-mode-desktop"
            type="button"
            onClick={() => setDeviceMode('desktop')}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg sm:rounded-full font-bold text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
              deviceMode === 'desktop'
                ? 'bg-white dark:bg-gray-700 text-orange-600 dark:text-orange-400 shadow-xs'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
            title="Desktop Screen (Full 100% Width)"
          >
            <Monitor className="w-3 h-3" />
            <span className="hidden xs:inline">Desktop</span>
          </button>
        </div>
      </header>

      {/* Main Responsive Application Stage */}
      <div
        className={`w-full transition-all duration-300 flex flex-col flex-1 ${
          effectiveMode === 'mobile'
            ? 'max-w-md mx-auto bg-white dark:bg-gray-950 sm:rounded-3xl sm:shadow-md sm:border sm:border-gray-200 sm:dark:border-gray-800 overflow-hidden relative min-h-screen'
            : effectiveMode === 'tablet'
            ? 'max-w-3xl mx-auto bg-white dark:bg-gray-950 sm:rounded-3xl sm:shadow-md sm:border sm:border-gray-200 sm:dark:border-gray-800 overflow-hidden relative min-h-screen'
            : 'max-w-7xl mx-auto bg-white dark:bg-gray-950 sm:rounded-3xl sm:shadow-sm sm:border sm:border-gray-200 sm:dark:border-gray-800 overflow-hidden relative min-h-screen'
        }`}
      >
        {/* Main Content Area */}
        <main id="main-content" className="w-full bg-[#FAFAF8] dark:bg-gray-950 flex-1 flex flex-col relative transition-colors">
          {children}
        </main>
      </div>
    </div>
  );
};
