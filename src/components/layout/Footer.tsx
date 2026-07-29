import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="glass-dark mt-auto relative z-10 py-10 rounded-t-3xl border-b-0 border-x-0 mx-2 md:mx-8">
      <div className="container mx-auto px-4 flex flex-col items-center gap-5">
        <p className="text-slate-800 dark:text-slate-200 font-medium flex items-center gap-2 text-lg">
          Made with <Heart className="w-5 h-5 text-slate-400 dark:text-slate-500 fill-slate-300 dark:fill-slate-600 animate-pulse" /> for the Chilakala Family
        </p>
        <div className="h-px w-24 bg-slate-200 dark:bg-slate-700" />
        <p className="text-slate-500 dark:text-slate-400 text-sm font-light">
          &copy; {new Date().getFullYear()} Chilakala Home Hub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
