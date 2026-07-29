"use client";

import { useState, useEffect } from "react";
import { Camera, Plus, X, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { UploadModal } from "@/components/ui/UploadModal";

type ImageType = { id: string, owner: string, url: string, uploadedAt: string };

export function GallerySection() {
  const [activeTab, setActiveTab] = useState("all");
  const [images, setImages] = useState<ImageType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const tabs = [
    { id: "all", label: "View Shared Memories" },
    { id: "venkateswarao", label: "Venkateswarao's Photos" },
    { id: "anji", label: "Anji's Photos" },
    { id: "kiran", label: "kiran's Photos" },
    { id: "saiganesh", label: "Sai Ganesh's Photos" },
    { id: "yoksit", label: "Yokshit Photos" },
  ];

  const [isDeleting, setIsDeleting] = useState(false);

  const fetchImages = async () => {
    try {
      const res = await fetch("/api/upload");
      if (res.ok) {
        const data = await res.json();
        setImages(data);
      }
    } catch (e) {
      console.error("Failed to fetch images", e);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const filteredImages = activeTab === "all" ? images : images.filter(img => img.owner === activeTab);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null && selectedIndex < filteredImages.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleDelete = async () => {
    if (selectedIndex === null) return;
    const imgToDelete = filteredImages[selectedIndex];
    
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/upload?id=${imgToDelete.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setSelectedIndex(null);
        fetchImages();
      } else {
        alert("Failed to delete photo");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to delete photo");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section id="gallery" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 flex flex-col items-center"
        >
          <h2 className="text-4xl font-serif font-bold text-teal-950 dark:text-teal-50 mb-4">Family Photo Gallery</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-teal-800 dark:from-teal-400 dark:to-teal-600 rounded-full mb-6" />
          <p className="text-teal-800 dark:text-teal-200 max-w-2xl font-medium text-lg mb-8">
            Click on any photo to view it in full size. Use the buttons below to switch albums.
          </p>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-teal-800 dark:bg-teal-500 text-white rounded-full font-bold hover:bg-teal-900 dark:hover:bg-teal-400 hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <Plus className="w-5 h-5" /> Upload New Photo
          </button>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-6 py-2 cursor-pointer rounded-full text-sm font-bold transition-all duration-300",
                activeTab === tab.id
                  ? "bg-teal-800 text-white dark:bg-teal-200 dark:text-teal-950 shadow-lg"
                  : "bg-teal-100 text-teal-800 hover:bg-teal-200 hover:text-teal-950 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white shadow-sm"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-7xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredImages.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center text-teal-600 dark:text-teal-400 flex flex-col items-center font-medium"
              >
                <Camera className="w-16 h-16 mb-4 opacity-30" />
                <p>No photos in this album yet. Be the first to upload!</p>
              </motion.div>
            ) : (
              filteredImages.map((img, index) => {
                const d = new Date(img.uploadedAt);
                const dateStr = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth()+1).toString().padStart(2, '0')}/${d.getFullYear()}`;
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4 }}
                    key={img.id}
                    onClick={() => setSelectedIndex(index)}
                    className="group relative aspect-square glass-dark rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-teal-900/20 dark:hover:shadow-black/40 cursor-pointer"
                  >
                    <img src={img.url} alt="Gallery item" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    
                    <div className="absolute inset-0 bg-teal-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center backdrop-blur-[2px] z-20">
                      <span className="text-white text-xs font-bold px-4 text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {dateStr}
                      </span>
                      <span className="text-teal-200 text-xs font-medium mt-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        Click to enlarge
                      </span>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md">
            
            <button 
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 p-3 text-white/70 hover:text-white bg-black/50 hover:bg-white/10 rounded-full transition-colors z-[210]"
              title="Close (Cancel)"
            >
              <X className="w-8 h-8" />
            </button>
            
            <button 
              onClick={handleDelete}
              disabled={isDeleting}
              className="absolute top-6 left-6 p-3 text-red-400 hover:text-red-300 bg-black/50 hover:bg-white/10 rounded-full transition-colors z-[210] disabled:opacity-50"
              title="Delete Photo"
            >
              <Trash2 className="w-6 h-6" />
            </button>
            
            {selectedIndex > 0 && (
              <button 
                onClick={handlePrev}
                className="absolute left-6 p-4 text-white/70 hover:text-white bg-black/50 hover:bg-white/10 rounded-full transition-colors z-[210]"
                title="Previous Photo"
              >
                <ChevronLeft className="w-10 h-10" />
              </button>
            )}

            <motion.img 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              key={selectedIndex}
              src={filteredImages[selectedIndex].url} 
              className="max-w-[90vw] max-h-[90vh] object-contain shadow-2xl"
              alt="Full size"
            />

            {selectedIndex < filteredImages.length - 1 && (
              <button 
                onClick={handleNext}
                className="absolute right-6 p-4 text-white/70 hover:text-white bg-black/50 hover:bg-white/10 rounded-full transition-colors z-[210]"
                title="Next Photo"
              >
                <ChevronRight className="w-10 h-10" />
              </button>
            )}
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm font-medium tracking-widest uppercase">
              Photo {selectedIndex + 1} of {filteredImages.length}
            </div>
          </div>
        )}
      </AnimatePresence>

      <UploadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onUploadSuccess={fetchImages}
      />
    </section>
  );
}
