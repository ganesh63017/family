"use client";

import Link from "next/link";
import { Menu, Home, Image as ImageIcon } from "lucide-react";

export function Navbar() {

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="glass pointer-events-auto rounded-full px-6 py-3 flex items-center justify-between w-full max-w-4xl shadow-xl shadow-slate-200/50 dark:shadow-black/50 transition-all duration-300">
        <Link href="/" className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-serif font-bold text-lg hover:opacity-80 transition-opacity">
          <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full">
            <Home className="w-4 h-4 text-slate-700 dark:text-slate-300" />
          </div>
          <h1 className="text-white font-serif font-bold text-3xl tracking-wide">Chilakala's Hub</h1>
        </Link>
        <div className="hidden md:flex gap-8 items-center text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link href="#gallery" className="hover:text-slate-900 dark:hover:text-slate-100 hover:-translate-y-0.5 transition-all flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4" /> Gallery
          </Link>
        </div>
        <button className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
          <Menu className="w-6 h-6" />
        </button>
      </nav>
    </div>
  );
}
