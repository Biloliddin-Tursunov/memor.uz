
import React from 'react';
import { useTeams } from '../context/TeamContext';
import TeamCard from '../components/TeamCard';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const { teams } = useTeams();

  return (
    <div className="max-w-7xl mx-auto pb-20">
      <div className="mb-10 md:mb-16 text-center relative py-8 md:py-12">
         <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1 }}
           className="relative z-10"
         >
            <h2 className="font-serif text-4xl md:text-8xl text-white mb-4 md:mb-6 drop-shadow-2xl opacity-90">
              {t("Ijod Maydoni")}
            </h2>
            <p className="text-white/60 max-w-xl mx-auto text-xs md:text-xl font-typewriter leading-relaxed px-4">
              {t("Dunyoni go'zallashtirish uchun")}
            </p>
         </motion.div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-12 px-1 md:px-4 perspective-1000">
        {teams.map((team, index) => (
          <TeamCard key={team.id} team={team} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Home;
