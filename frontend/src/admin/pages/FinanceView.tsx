
import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, TrendingDown, Wallet, DollarSign, Plus, 
  Search, Filter, Edit2, Calendar, User, Clock, 
  ArrowUpRight, ArrowDownLeft, MoreHorizontal, Check, X,
  RefreshCw, FileText, ChevronDown
} from 'lucide-react';
import { FinanceTransaction, TransactionType, FinanceCategory, Currency, User as AppUser } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import { DB } from '../db';

interface FinanceViewProps {
  currentUser: AppUser;
}

const EXCHANGE_RATES = {
  UZS: 1,
  USD: 12650,
  EUR: 13700
};

const FinanceView: React.FC<FinanceViewProps> = ({ currentUser }) => {
  const { t } = useTheme();
  const [transactions, setTransactions] = useState<FinanceTransaction[]>(DB.initialFinance as FinanceTransaction[]);
  const [displayCurrency, setDisplayCurrency] = useState<Currency>('UZS');
  const [filterType, setFilterType] = useState<TransactionType | 'All'>('All');
  const [filterCategory, setFilterCategory] = useState<FinanceCategory | 'All'>('All');
  const [showEditedOnly, setShowEditedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<FinanceTransaction | null>(null);

  const convert = (amount: number, from: Currency, to: Currency) => {
    const inUzs = amount * EXCHANGE_RATES[from];
    return inUzs / EXCHANGE_RATES[to];
  };

  const formatMoney = (val: number, curr: Currency) => {
    return new Intl.NumberFormat('uz-UZ', { 
      style: 'currency', 
      currency: curr,
      maximumFractionDigits: curr === 'UZS' ? 0 : 2 
    }).format(val);
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter(tr => {
      const matchType = filterType === 'All' || tr.type === filterType;
      const matchCat = filterCategory === 'All' || tr.category === filterCategory;
      const matchEdited = !showEditedOnly || !!tr.updatedAt;
      const matchSearch = tr.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tr.createdBy.toLowerCase().includes(searchQuery.toLowerCase());
      return matchType && matchCat && matchEdited && matchSearch;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, filterType, filterCategory, showEditedOnly, searchQuery]);

  const stats = useMemo(() => {
    let income = 0;
    let expense = 0;
    transactions.forEach(tr => {
      const valInUzs = tr.amount * EXCHANGE_RATES[tr.currency];
      if (tr.type === 'Kirim') income += valInUzs;
      else expense += valInUzs;
    });
    return {
      total: income - expense,
      income,
      expense
    };
  }, [transactions]);

  const handleSaveTransaction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = editingTransaction?.id || Math.random().toString(36).substr(2, 9);
    
    const newTr: FinanceTransaction = {
      id,
      date: formData.get('date') as string,
      amount: Number(formData.get('amount')),
      currency: formData.get('currency') as Currency,
      type: formData.get('type') as TransactionType,
      category: formData.get('category') as FinanceCategory,
      description: formData.get('description') as string,
      createdBy: editingTransaction ? editingTransaction.createdBy : currentUser.name,
      updatedBy: editingTransaction ? currentUser.name : undefined,
      updatedAt: editingTransaction ? new Date().toLocaleString() : undefined
    };

    if (editingTransaction) {
      setTransactions(transactions.map(t => t.id === id ? newTr : t));
    } else {
      setTransactions([newTr, ...transactions]);
    }
    setShowModal(false);
    setEditingTransaction(null);
  };

  return (
    <div className="p-4 md:p-8 flex flex-col animate-fadeIn bg-transparent font-sans min-h-full pb-32">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-10 border-b border-borderDark pb-8 shrink-0">
        <div>
          <h1 className="text-3xl md:text-5xl font-black font-caslon text-textMain mb-2 uppercase tracking-widest leading-none">Moliya Nazorati</h1>
          <p className="text-textMuted font-serif italic text-sm opacity-70">Tushumlar, investitsiyalar va operatsion harajatlar hisoboti.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
           {/* Currency Switcher */}
           <div className="flex bg-bgSidebar border border-borderDark p-1 rounded-xl shadow-inner">
             {(['UZS', 'USD', 'EUR'] as Currency[]).map(c => (
                <button 
                  key={c}
                  onClick={() => setDisplayCurrency(c)}
                  className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg ${displayCurrency === c ? 'bg-accent text-bgMain shadow-lg' : 'text-textMuted hover:text-textMain'}`}
                >
                  {c}
                </button>
             ))}
           </div>
           
           <button 
             onClick={() => { setEditingTransaction(null); setShowModal(true); }}
             className="bg-accent hover:bg-accentHover text-bgMain px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-2xl flex items-center justify-center gap-2 transition-all active:scale-95"
           >
              <Plus size={18}/> Yangi Hisobot
           </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
         <StatCard 
            label="Umumiy Balans" 
            value={formatMoney(convert(stats.total, 'UZS', displayCurrency), displayCurrency)} 
            icon={<Wallet size={24}/>} 
            color="text-textMain"
         />
         <StatCard 
            label="Jami Kirim" 
            value={formatMoney(convert(stats.income, 'UZS', displayCurrency), displayCurrency)} 
            icon={<TrendingUp size={24}/>} 
            color="text-emerald-500"
         />
         <StatCard 
            label="Jami Chiqim" 
            value={formatMoney(convert(stats.expense, 'UZS', displayCurrency), displayCurrency)} 
            icon={<TrendingDown size={24}/>} 
            color="text-red-500"
         />
      </div>

      {/* Filters Bar */}
      <div className="bg-cardBg border border-borderDark rounded-2xl p-4 md:px-8 mb-6 flex flex-wrap items-center gap-6 shadow-sm">
         <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
            <input 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Hisobotlardan qidirish..."
              className="w-full bg-bgSidebar/50 border border-borderDark pl-10 pr-4 py-2 rounded-xl text-sm outline-none focus:border-accent transition-all"
            />
         </div>
         
         <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-textMuted">
            <FilterTab active={filterType === 'All'} onClick={() => setFilterType('All')} label="Hammasi" />
            <FilterTab active={filterType === 'Kirim'} onClick={() => setFilterType('Kirim')} label="Kirim" />
            <FilterTab active={filterType === 'Chiqim'} onClick={() => setFilterType('Chiqim')} label="Chiqim" />
            <div className="w-px h-6 bg-borderDark"></div>
            <button 
              onClick={() => setShowEditedOnly(!showEditedOnly)}
              className={`flex items-center gap-2 transition-colors ${showEditedOnly ? 'text-accent' : 'hover:text-textMain'}`}
            >
               <Edit2 size={14}/> {showEditedOnly ? 'Faqat Tahrirlanganlar' : 'Tahrirlanganlar'}
            </button>
         </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-cardBg border border-borderDark rounded-2xl shadow-2xl overflow-hidden flex-1">
         <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[1000px]">
               <thead className="bg-bgSidebar border-b border-borderDark">
                  <tr className="text-[10px] font-black text-textMuted uppercase tracking-[0.2em]">
                     <th className="px-8 py-5">Sana</th>
                     <th className="px-8 py-5">Tur / Kategoriya</th>
                     <th className="px-8 py-5">Tavsif</th>
                     <th className="px-8 py-5">Summa ({displayCurrency})</th>
                     <th className="px-8 py-5">Kim tomonidan</th>
                     <th className="px-8 py-5"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-borderDark/20">
                  {filteredTransactions.map(tr => (
                     <tr key={tr.id} className="hover:bg-accent/5 transition-colors group">
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-3">
                              <Calendar size={14} className="text-textMuted opacity-40"/>
                              <span className="text-sm font-bold text-textMain">{tr.date}</span>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex flex-col gap-1">
                              <div className={`flex items-center gap-2 w-fit px-2 py-0.5 rounded text-[9px] font-black uppercase border ${tr.type === 'Kirim' ? 'bg-emerald-500/5 text-emerald-500 border-emerald-500/20' : 'bg-red-500/5 text-red-500 border-red-500/20'}`}>
                                 {tr.type === 'Kirim' ? <ArrowDownLeft size={10}/> : <ArrowUpRight size={10}/>}
                                 {tr.type}
                              </div>
                              <span className="text-[10px] text-textMuted font-bold uppercase tracking-widest">{tr.category}</span>
                           </div>
                        </td>
                        <td className="px-8 py-6 max-w-md">
                           <p className="text-sm font-serif italic text-textMain line-clamp-1">{tr.description}</p>
                           {tr.updatedAt && (
                              <div className="flex items-center gap-2 mt-1 text-[9px] text-accent font-black uppercase tracking-tighter opacity-70">
                                 <Clock size={10}/> Tahrirlangan: {tr.updatedBy} ({tr.updatedAt})
                              </div>
                           )}
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex flex-col">
                              <span className={`text-base font-black ${tr.type === 'Kirim' ? 'text-emerald-500' : 'text-red-500'}`}>
                                 {tr.type === 'Chiqim' ? '-' : '+'}{formatMoney(convert(tr.amount, tr.currency, displayCurrency), displayCurrency)}
                              </span>
                              {tr.currency !== displayCurrency && (
                                 <span className="text-[9px] text-textMuted font-mono opacity-50 italic">
                                    Asl: {formatMoney(tr.amount, tr.currency)}
                                 </span>
                              )}
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-bgSidebar border border-borderDark flex items-center justify-center text-accent text-[10px] font-black uppercase shadow-inner">
                                 {tr.createdBy.charAt(0)}
                              </div>
                              <span className="text-xs font-bold text-textMain">{tr.createdBy}</span>
                           </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                           <button 
                             onClick={() => { setEditingTransaction(tr); setShowModal(true); }}
                             className="p-2.5 text-textMuted hover:text-accent hover:bg-accent/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                           >
                              <Edit2 size={16}/>
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
            {filteredTransactions.length === 0 && (
               <div className="py-24 flex flex-col items-center justify-center text-textMuted opacity-30 text-center">
                  <FileText size={60} className="mb-4"/>
                  <p className="text-xl font-caslon italic tracking-widest">Ma'lumotlar topilmadi</p>
               </div>
            )}
         </div>
      </div>

      {/* Transaction Modal */}
      {showModal && (
         <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-bgMain w-full max-w-xl border border-borderDark shadow-2xl rounded-3xl overflow-hidden animate-slideDown font-serif">
               <div className="bg-bgSidebar px-10 py-8 border-b border-borderDark flex items-center justify-between">
                  <div>
                     <h3 className="text-2xl font-black text-textMain uppercase tracking-tight font-caslon">
                        {editingTransaction ? 'Hisobotni Tahrirlash' : 'Yangi Tranzaksiya'}
                     </h3>
                     <p className="text-[10px] font-black text-accent uppercase tracking-widest mt-1 opacity-60">Moliya tizimi v2.1</p>
                  </div>
                  <button onClick={() => setShowModal(false)} className="p-2 hover:bg-red-500/10 text-textMuted rounded-full transition-colors"><X size={24}/></button>
               </div>
               
               <form onSubmit={handleSaveTransaction} className="p-10 space-y-6 font-sans">
                  <div className="grid grid-cols-2 gap-6">
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-textMuted uppercase tracking-widest ml-1">Sana</label>
                        <input required type="date" name="date" defaultValue={editingTransaction?.date || new Date().toISOString().split('T')[0]} className="w-full bg-cardBg border border-borderDark p-3 rounded-xl text-sm text-textMain outline-none focus:border-accent" />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-textMuted uppercase tracking-widest ml-1">Tur</label>
                        <select required name="type" defaultValue={editingTransaction?.type || 'Kirim'} className="w-full bg-cardBg border border-borderDark p-3 rounded-xl text-sm font-bold appearance-none outline-none focus:border-accent">
                           <option value="Kirim">Kirim (Income)</option>
                           <option value="Chiqim">Chiqim (Expense)</option>
                        </select>
                     </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                     <div className="col-span-2 space-y-1">
                        <label className="text-[10px] font-black text-textMuted uppercase tracking-widest ml-1">Summa</label>
                        <input required type="number" name="amount" defaultValue={editingTransaction?.amount} className="w-full bg-cardBg border border-borderDark p-3 rounded-xl text-sm font-black outline-none focus:border-accent" placeholder="0.00" />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-textMuted uppercase tracking-widest ml-1">Valuta</label>
                        <select name="currency" defaultValue={editingTransaction?.currency || 'UZS'} className="w-full bg-cardBg border border-borderDark p-3 rounded-xl text-sm font-bold appearance-none outline-none focus:border-accent text-center">
                           <option value="UZS">UZS</option>
                           <option value="USD">USD</option>
                           <option value="EUR">EUR</option>
                        </select>
                     </div>
                  </div>

                  <div className="space-y-1">
                     <label className="text-[10px] font-black text-textMuted uppercase tracking-widest ml-1">Kategoriya</label>
                     <select required name="category" defaultValue={editingTransaction?.category || 'Boshqa'} className="w-full bg-cardBg border border-borderDark p-3 rounded-xl text-sm font-bold appearance-none outline-none focus:border-accent">
                        <option value="Investitsiya">Investitsiya</option>
                        <option value="Donation">Donation</option>
                        <option value="Office">Office</option>
                        <option value="Server">Server</option>
                        <option value="Xodimlar">Xodimlar</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Boshqa">Boshqa</option>
                     </select>
                  </div>

                  <div className="space-y-1">
                     <label className="text-[10px] font-black text-textMuted uppercase tracking-widest ml-1">Tavsif</label>
                     <textarea required name="description" defaultValue={editingTransaction?.description} className="w-full bg-cardBg border border-borderDark p-4 rounded-xl text-sm outline-none focus:border-accent min-h-[100px] resize-none" placeholder="Tafsilotlar..." />
                  </div>

                  <button type="submit" className="w-full bg-accent hover:bg-accentHover text-bgMain py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-3">
                     <Check size={18}/> Saqlash
                  </button>
               </form>
            </div>
         </div>
      )}
    </div>
  );
};

const StatCard = ({ label, value, icon, color }: any) => (
   <div className="bg-cardBg border border-borderDark p-8 rounded-2xl shadow-xl flex items-center justify-between group hover:border-accent transition-all relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div>
         <p className="text-[10px] font-black uppercase tracking-[0.2em] text-textMuted mb-2 opacity-60">{label}</p>
         <h3 className={`text-2xl md:text-3xl font-black font-caslon tracking-tight ${color}`}>{value}</h3>
      </div>
      <div className={`p-4 rounded-2xl bg-bgSidebar border border-borderDark group-hover:scale-110 transition-transform ${color}`}>{icon}</div>
   </div>
);

const FilterTab = ({ active, onClick, label }: any) => (
   <button onClick={onClick} className={`transition-colors ${active ? 'text-accent' : 'hover:text-textMain'}`}>
      {label}
   </button>
);

export default FinanceView;
