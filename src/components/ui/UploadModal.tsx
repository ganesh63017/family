"use client";

import { useState } from "react";
import { Upload, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function UploadModal({
  isOpen,
  onClose,
  onUploadSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [owner, setOwner] = useState("shared");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("owner", owner);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        onUploadSuccess();
        setFile(null);
        onClose();
      } else {
        console.error("Upload failed");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 border border-transparent dark:border-slate-800"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100 mb-6">
              Upload a New Family Photo
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-900 dark:text-slate-300 mb-2">
                  1. Select an Image
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-slate-300 dark:border-slate-600 border-dashed rounded-2xl cursor-pointer bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-teal-600 dark:text-teal-400" />
                      <p className="mb-2 text-sm text-slate-700 dark:text-slate-300 font-bold">
                        {file ? file.name : "Click here to upload an image"}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Supported formats: PNG, JPG or GIF
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-900 dark:text-slate-300 mb-2">
                  2. Assign to an Album
                </label>
                <div className="relative">
                  <select
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 dark:text-slate-100 font-medium appearance-none cursor-pointer pr-10"
                  >
                    <option value="shared">Shared Family Album</option>
                    <option value="venkateswarao">Venkateswarao's Album</option>
                    <option value="anji">Anji's Album</option>
                    <option value="kiran">Kiran's Album</option>
                    <option value="saiganesh">Sai Ganesh's Album</option>
                    <option value="yoksit">Yokshit's Album</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-500 dark:text-slate-400">
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={!file || loading}
                className="w-full py-3 px-4 bg-teal-800 dark:bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-900 dark:hover:bg-teal-500 transition-colors disabled:opacity-50"
              >
                {loading ? "Uploading Photo..." : "Confirm & Upload Photo"}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
