
import React from 'react';
import { Ornament } from './Ornament';
import { TEAM_MEMBERS } from '../constants';

interface TeamSectionProps {
    className?: string;
}

const TeamSection: React.FC<TeamSectionProps> = ({ className = '' }) => {
    return (
        <div className={`mb-20 ${className}`}>
            <div className="text-center mb-12">
                <Ornament type="flourish" className="mb-4 opacity-40 w-8 h-8" />
                <h3 className="font-display text-3xl text-graphite dark:text-white">Jamoa A'zolari</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-center">
                {TEAM_MEMBERS.map((member) => (
                    <div key={member.name} className="flex flex-col items-center group">
                        <div className="relative w-28 h-28 md:w-32 md:h-32 mb-4 rounded-full overflow-hidden border-2 border-graphite/10 dark:border-white/10 p-1 transition-colors group-hover:border-teal">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover rounded-full filter grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                        </div>
                        <h4 className="font-display text-lg text-graphite dark:text-white mb-1 group-hover:text-teal transition-colors">
                            {member.name}
                        </h4>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-graphite/50 dark:text-gray-400">
                            {member.role}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamSection;
