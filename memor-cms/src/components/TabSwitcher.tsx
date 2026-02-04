import React from 'react';

interface TabSwitcherProps {
    tabs: { key: string; label: string }[];
    current: string;
    set: (v: any) => void;
}

export const TabSwitcher: React.FC<TabSwitcherProps> = ({ tabs, current, set }) => (
    <div className="flex justify-center mb-8">
        <div className="bg-[#2c1810]/10 p-1 rounded-lg flex border border-[#5c4033]/30">
            {tabs.map(t => (
                <button
                    key={t.key}
                    onClick={() => set(t.key)}
                    className={`px-6 py-2 rounded-md font-cinzel text-sm transition-all ${current === t.key ? 'bg-[#740001] text-[#f0e6d2] shadow-md' : 'text-[#5c4033] hover:text-[#2c1810]'}`}
                >
                    {t.label}
                </button>
            ))}
        </div>
    </div>
);
