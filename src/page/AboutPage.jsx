import React from 'react';

export default function AboutPage({ setCurrentPage, isDarkMode }) {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* HERO SECTION */}
      <div className="relative border rounded-3xl p-6 md:p-12 shadow-2xl overflow-hidden flex flex-col items-center text-center group transition-all duration-500 
        bg-gradient-to-br from-white via-slate-50 to-violet-100 border-slate-200 hover:border-violet-400/40
        dark:from-neutral-900 dark:via-neutral-900 dark:to-violet-950/40 dark:border-neutral-800/80 dark:hover:border-violet-500/20">
        
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-[80px] pointer-events-none bg-fuchsia-500/5 dark:bg-fuchsia-600/10"></div>
        
        <div className="h-14 w-14 bg-gradient-to-tr from-violet-600 to-fuchsia-600 rounded-2xl flex items-center justify-center shadow-xl shadow-violet-500/20 mb-6 transform group-hover:rotate-6 transition-transform duration-300">
          <span className="text-white font-black text-xl tracking-tighter">OS</span>
        </div>
        
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight max-w-2xl leading-tight text-slate-900 dark:text-white">
          The Core Architecture for Modern <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">User Hub Control</span>
        </h1>
        
        <p className="text-xs md:text-sm mt-4 max-w-xl font-sans leading-relaxed text-slate-600 dark:text-neutral-400">
          Core.OS provides senior-level database tracking capabilities, sub-routing modules, state management, and real-time dashboard instrumentation panel controls.
        </p>

        {/* Responsive buttons: Stacked on mobile, row on tablet/desktop */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center z-10 w-full sm:w-auto">
          <button 
            onClick={() => setCurrentPage('register')}
            className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
          >
            Get Started (Open Form)
          </button>
          <button 
            onClick={() => setCurrentPage('directory')}
            className="w-full sm:w-auto border font-bold text-xs py-3.5 px-6 rounded-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer 
              bg-white hover:bg-slate-50 border-slate-300 text-slate-700 shadow-sm
              dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300"
          >
            Inspect Directory Table
          </button>
        </div>
      </div>

      {/* BODY DETAIL SECTION WITH CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="border backdrop-blur-md rounded-2xl p-6 shadow-xl transform hover:-translate-y-1 transition-all duration-300 group 
          bg-white border-slate-200 hover:border-violet-400/40 shadow-slate-100
          dark:bg-neutral-900/60 dark:border-neutral-800/80 dark:hover:border-violet-500/30  ">
          <div className="h-10 w-10 rounded-xl border flex items-center justify-center mb-4 font-bold text-sm font-mono group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300 bg-slate-50 border-slate-200 text-violet-600 dark:bg-neutral-950 dark:border-neutral-800 dark:text-violet-400">
            <span>01</span>
          </div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-white">State Cache Core</h3>
          <p className="text-xs mt-2 leading-relaxed text-slate-600 dark:text-neutral-400">
            Utilizes integrated LocalStorage serialization layers to safely lock and cache custom parameters directly inside the user browser sandboxed core.
          </p>
        </div>

        {/* Card 2 */}
        <div className="border backdrop-blur-md rounded-2xl p-6 shadow-xl transform hover:-translate-y-1 transition-all duration-300 group 
          bg-white border-slate-200 hover:border-fuchsia-400/40 shadow-slate-100
          dark:bg-neutral-900/60 dark:border-neutral-800/80 dark:hover:border-fuchsia-500/30">
          <div className="h-10 w-10 rounded-xl border flex items-center justify-center mb-4 font-bold text-sm font-mono group-hover:bg-fuchsia-600 group-hover:text-white transition-colors duration-300 bg-slate-50 border-slate-200 text-fuchsia-600 dark:bg-neutral-950 dark:border-neutral-800 dark:text-fuchsia-400">
            <span>02</span>
          </div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-white">Dynamic Matrix UI</h3>
          <p className="text-xs mt-2 leading-relaxed text-slate-600 dark:text-neutral-400">
            Designed completely with Tailwind CSS tokens, deep perspective shadows, hover transition variables, and absolute dynamic notification counters.
          </p>
        </div>

        {/* Card 3 */}
        <div className="border backdrop-blur-md rounded-2xl p-6 shadow-xl transform hover:-translate-y-1 transition-all duration-300 group 
          bg-white border-slate-200 hover:border-emerald-400/40 shadow-slate-100
          dark:bg-neutral-900/60 dark:border-neutral-800/80 dark:hover:border-emerald-500/30 sm:col-span-2 md:col-span-1">
          <div className="h-10 w-10 rounded-xl border flex items-center justify-center mb-4 font-bold text-sm font-mono group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 bg-slate-50 border-slate-200 text-emerald-600 dark:bg-neutral-950 dark:border-neutral-800 dark:text-emerald-400">
            <span>03</span>
          </div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-white">License Restrictions</h3>
          <p className="text-xs mt-2 leading-relaxed text-slate-600 dark:text-neutral-400">
            Equipped with strict logic filters ensuring user registry inputs don't pass the maximum threshold capacity of 10 system operational nodes.
          </p>
        </div>
      </div>

      {/* TECHNICAL STACK HIGHLIGHT */}
      <div className="p-6 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-100 border-slate-200 dark:bg-neutral-950 dark:border-neutral-800">
        <div className="flex items-center space-x-3 text-left w-full md:w-auto">
          <div className="h-2 w-2 bg-emerald-500 rounded-full animate-ping flex-shrink-0"></div>
          <div className="text-xs">
            <span className="font-bold block text-slate-800 dark:text-white">Production Grade Architecture Loaded</span>
            <span className="text-slate-500 dark:text-neutral-500">System running optimally on React Virtual DOM Framework compilation parameters.</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 text-[10px] font-mono font-bold uppercase w-full md:w-auto justify-start md:justify-end">
          <span className="px-2 py-1 rounded border shadow bg-white border-slate-200 text-slate-600 dark:bg-neutral-950 dark:border-neutral-800 dark:text-neutral-400">React v18</span>
          <span className="px-2 py-1 rounded border shadow bg-white border-slate-200 text-slate-600 dark:bg-neutral-950 dark:border-neutral-800 dark:text-neutral-400">Tailwind v4</span>
          <span className="px-2 py-1 rounded border shadow bg-white border-slate-200 text-slate-600 dark:bg-neutral-950 dark:border-neutral-800 dark:text-neutral-400">Local Storage</span>
        </div>
      </div>
    </div>
  );
}