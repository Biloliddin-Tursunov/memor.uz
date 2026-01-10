import React from 'react';
import { TEAMS } from '../../constants';
import TeamCard from '../components/TeamCard';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto pb-20">
      <div className="mb-16 text-center relative py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <h2 className="font-serif text-6xl md:text-8xl text-white mb-6 drop-shadow-2xl opacity-90">
            Ijod Maydoni
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-xl font-typewriter leading-relaxed">

            Dunyoni go'zallashtirish uchun
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-4 perspective-1000">
        {TEAMS.map((team, index) => (
          <TeamCard key={team.id} team={team} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Home;