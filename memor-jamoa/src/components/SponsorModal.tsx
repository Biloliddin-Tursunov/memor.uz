
import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, School } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SponsorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SponsorModal: React.FC<SponsorModalProps> = ({ isOpen, onClose }) => {
    const { t } = useLanguage();

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-space-bg/90 backdrop-blur-md"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative bg-gradient-to-br from-[#1a1510] to-[#050510] border border-white/10 w-full max-w-lg rounded-lg shadow-2xl overflow-hidden flex flex-col items-center text-center p-8 md:p-12"
                    >
                        <button onClick={onClose} className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors">
                            <X size={24} />
                        </button>

                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                            <School size={40} className="text-white/80" />
                        </div>

                        <h3 className="font-serif text-3xl md:text-4xl text-white mb-2 leading-tight">SamDAQU</h3>
                        <p className="font-typewriter text-[10px] uppercase tracking-widest text-white/30 mb-8">
                            {t("Sponsor")}
                        </p>

                        <div className="prose prose-invert mb-8">
                            <p className="font-hand text-xl text-white/80 leading-relaxed italic">
                                "Samarqand Davlat Arxitektura-Qurilish Universiteti — kelajak bunyodkorlarini tarbiyalovchi, an'analar va innovatsiyalarni birlashtirgan buyuk dargoh."
                            </p>
                            <p className="text-sm font-typewriter text-white/50 mt-4 leading-relaxed">
                                Me'mor jamoasining asosiy homiysi va ilhom manbai. Bizning maqsadimiz — ta'lim va amaliyotni birlashtirib, dunyo darajasidagi mutaxassislarni yetishtirishdir.
                            </p>
                        </div>

                        <a
                            href="https://samdaqu.edu.uz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-sm font-typewriter text-xs uppercase tracking-widest hover:bg-amber-100 transition-colors shadow-lg hover:shadow-amber-500/20"
                        >
                            Universitet Sayti: Samdaqu.edu.uz <ExternalLink size={14} />
                        </a>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default SponsorModal;
