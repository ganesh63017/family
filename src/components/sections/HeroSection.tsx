"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const heroImages = [
  "/family.jpg",
  "/family2.jpg",
  "/family3.jpg"
];

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden pt-24 pb-12 px-4">
      {/* Ambient background blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-200/40 dark:bg-indigo-900/40 rounded-full blur-[120px] opacity-70 -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-20 text-center w-full max-w-6xl glass p-8 md:p-12 rounded-[3rem] shadow-2xl flex flex-col gap-10 items-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/80 dark:ring-white/10"
        >
          {/* The automatic slider */}
          <AnimatePresence mode="popLayout">
            <motion.img 
              key={currentIndex}
              src={heroImages[currentIndex]} 
              alt="Chilakala Family Portrait" 
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover" 
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8 z-10">
            <span className="text-white font-serif font-bold text-3xl tracking-wide">The Chilakala Family</span>
          </div>
          
          {/* Slider indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {heroImages.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-2 rounded-full transition-all duration-500 ${idx === currentIndex ? "w-6 bg-white" : "w-2 bg-white/50"}`} 
              />
            ))}
          </div>
        </motion.div>
        
        <div className="text-center space-y-6 max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold text-teal-950 dark:text-teal-50 font-serif leading-tight"
          >
            Welcome to the <br/>
            <span className="text-teal-700 dark:text-teal-400 italic">Chilakala's Hub</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg md:text-xl text-teal-950 dark:text-teal-100/80 leading-relaxed font-medium"
          >
            A vibrant, modern space dedicated to our shared memories. 
            Upload, view, and cherish the moments that make us family.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <a href="#gallery" className="inline-block px-8 py-4 bg-teal-800 hover:bg-teal-900 dark:bg-teal-500 dark:hover:bg-teal-400 text-white rounded-full font-bold shadow-lg shadow-teal-900/30 dark:shadow-teal-600/30 transition-all hover:-translate-y-1">
              Explore the Gallery Section
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
