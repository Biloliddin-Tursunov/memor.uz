import React from 'react';
import { ArrowRight, BedDouble, Layers, DollarSign, LucideIcon } from 'lucide-react';

interface Props {
    data: any;
    setData: (d: any) => void;
    onNext: () => void;
}

interface InputGroupProps {
  icon: LucideIcon;
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
}

const InputGroup: React.FC<InputGroupProps> = ({ icon: Icon, label, value, onChange, placeholder }) => (
  <div className="space-y-2">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
          <Icon size={14} className="text-slate-900" />
          {label}
      </label>
      <input 
        type="text" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-all bg-white text-slate-900 placeholder-slate-400 text-sm font-medium"
      />
  </div>
);

const RequirementsStep: React.FC<Props> = ({ data, setData, onNext }) => {
  const handleChange = (field: string, value: string) => {
    setData({ ...data, [field]: value });
  };

  return (
    <div className="max-w-3xl mx-auto py-4">
      <div className="text-center mb-8">
         <h2 className="text-2xl font-serif text-slate-900 mb-2">Asosiy talablar</h2>
         <p className="text-slate-500 text-sm">Kelajakdagi uyingizning texnik parametrlarini kiriting</p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup 
              icon={BedDouble} 
              label="Xonalar soni" 
              value={data.rooms} 
              onChange={(v) => handleChange('rooms', v)} 
              placeholder="Masalan: 4 xona" 
            />
            <InputGroup 
              icon={Layers} 
              label="Qavatlar" 
              value={data.floors} 
              onChange={(v) => handleChange('floors', v)} 
              placeholder="Masalan: 2 qavat" 
            />
        </div>
        
        <InputGroup 
          icon={DollarSign} 
          label="Budjet (taxminiy)" 
          value={data.price} 
          onChange={(v) => handleChange('price', v)} 
          placeholder="$50,000 - $80,000" 
        />

        <div className="space-y-2 pt-2">
             <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Qo'shimcha istaklar</label>
             <textarea 
                value={data.extra}
                onChange={(e) => handleChange('extra', e.target.value)}
                placeholder="Masalan: Katta derazalar, yerto'la, garaj..."
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-all bg-white h-28 resize-none text-sm text-slate-900 placeholder-slate-400"
             />
        </div>
      </div>

      <div className="w-full flex justify-end pt-8">
        <button 
        onClick={onNext}
        className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors shadow-lg flex items-center gap-2 uppercase tracking-wide"
        >
        Loyiha yaratish <ArrowRight size={16} />
        </button>
    </div>
    </div>
  );
};

export default RequirementsStep;