
import React, { useState } from 'react';
import { MOCK_ARTICLES, MOCK_VIDEOS, MOCK_BOOKS, MOCK_CREATORS } from '../constants';
import { Ornament } from '../components/Ornament';
import { DisplayItem } from '../types';

type Tab = 'maqolalar' | 'videolar' | 'kitoblar' | 'ijodkorlar';

interface KnowledgeProps {
   onItemClick: (item: DisplayItem) => void;
}

const Knowledge: React.FC<KnowledgeProps> = ({ onItemClick }) => {
   const [activeTab, setActiveTab] = useState<Tab>('maqolalar');

   const renderContent = () => {
      switch (activeTab) {
         case 'maqolalar':
            return (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {MOCK_ARTICLES.map(article => (
                     <div
                        key={article.id}
                        className="bg-white dark:bg-white/5 p-6 border border-graphite/10 dark:border-white/10 shadow-sm hover:shadow-md transition-all cursor-pointer hover:-translate-y-1"
                        onClick={() => onItemClick({
                           id: article.id,
                           title: article.title,
                           subtitle: article.author,
                           description: article.excerpt,
                           imageUrl: article.imageUrl,
                           date: article.date,
                           type: article.category
                        })}
                     >
                        <span className="text-teal text-xs font-bold uppercase tracking-wider mb-2 block">{article.category}</span>
                        <h3 className="font-display text-2xl mb-3">{article.title}</h3>
                        <p className="font-serif text-graphite/70 dark:text-gray-300 mb-4">{article.excerpt}</p>
                        <div className="text-xs text-graphite/40 dark:text-gray-500 font-mono flex justify-between">
                           <span>{article.author}</span>
                           <span>{article.date}</span>
                        </div>
                     </div>
                  ))}
               </div>
            );
         case 'videolar':
            return (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {MOCK_VIDEOS.map(video => (
                     <div
                        key={video.id}
                        className="group cursor-pointer"
                        onClick={() => onItemClick({
                           id: video.id,
                           title: video.title,
                           subtitle: video.author,
                           description: "Video darslik tafsilotlari...",
                           imageUrl: video.thumbnailUrl,
                           type: video.type
                        })}
                     >
                        <div className="relative mb-3">
                           <img src={video.thumbnailUrl} className="w-full h-48 object-cover rounded-sm" alt={video.title} />
                           <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                              <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center pl-1">
                                 <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-graphite border-b-[8px] border-b-transparent"></div>
                              </div>
                           </div>
                           <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-1">{video.duration}</span>
                        </div>
                        <h3 className="font-display text-lg leading-snug group-hover:text-teal transition-colors">{video.title}</h3>
                        <p className="text-xs text-graphite/60 dark:text-gray-400 mt-1">{video.author} • {video.type}</p>
                     </div>
                  ))}
               </div>
            );
         case 'kitoblar':
            return (
               <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {MOCK_BOOKS.map(book => (
                     <div
                        key={book.id}
                        className="flex flex-col items-center text-center group cursor-pointer"
                        onClick={() => onItemClick({
                           id: book.id,
                           title: book.title,
                           subtitle: book.author,
                           description: book.description,
                           imageUrl: book.coverUrl,
                           date: book.year,
                           type: 'Kitob'
                        })}
                     >
                        <div className="w-full aspect-[2/3] bg-graphite/10 dark:bg-white/5 mb-4 shadow-inner relative overflow-hidden rounded-sm">
                           <img src={book.coverUrl} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" alt={book.title} />
                           {/* Book Spine Effect */}
                           <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-r from-white/20 to-transparent"></div>
                        </div>
                        <h3 className="font-display text-lg mb-1 group-hover:text-teal transition-colors">{book.title}</h3>
                        <p className="text-sm italic text-graphite/60 dark:text-gray-400">{book.author}, {book.year}</p>
                     </div>
                  ))}
               </div>
            );
         case 'ijodkorlar':
            return (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {MOCK_CREATORS.map(creator => (
                     <div
                        key={creator.id}
                        className="flex items-start gap-4 p-4 border border-transparent hover:border-graphite/10 dark:hover:border-white/10 hover:bg-white dark:hover:bg-white/5 transition-all cursor-pointer rounded-sm"
                        onClick={() => onItemClick({
                           id: creator.id,
                           title: creator.name,
                           subtitle: creator.role,
                           description: creator.bio,
                           imageUrl: creator.avatarUrl,
                           type: 'Usta'
                        })}
                     >
                        <img src={creator.avatarUrl} className="w-20 h-20 object-cover rounded-full" alt={creator.name} />
                        <div>
                           <h3 className="font-display text-xl group-hover:text-teal transition-colors">{creator.name}</h3>
                           <span className="text-xs uppercase text-teal font-bold tracking-widest mb-2 block">{creator.role}</span>
                           <p className="text-sm font-serif text-graphite/70 dark:text-gray-300">{creator.bio}</p>
                        </div>
                     </div>
                  ))}
               </div>
            );
         default: return null;
      }
   }

   return (
      <div className="max-w-6xl mx-auto px-4 py-12">
         <div className="text-center mb-12">
            <h2 className="font-display text-5xl mb-4 text-graphite">Ilm Maskani</h2>
            <p className="font-serif italic text-graphite/60 dark:text-gray-400">"O'tmishni o'rganib, kelajakni quramiz"</p>
         </div>

         {/* Tabs */}
         <div className="flex flex-wrap justify-center gap-8 mb-16 border-b border-graphite/20 dark:border-white/20 pb-4">
            {['maqolalar', 'videolar', 'kitoblar', 'ijodkorlar'].map((tab) => (
               <button
                  key={tab}
                  onClick={() => setActiveTab(tab as Tab)}
                  className={`text-sm font-bold uppercase tracking-[0.2em] pb-2 transition-colors relative ${activeTab === tab ? 'text-teal' : 'text-graphite/50 dark:text-gray-500 hover:text-graphite dark:hover:text-gray-300'}`}
               >
                  {tab}
                  {activeTab === tab && <span className="absolute bottom-[-17px] left-0 w-full h-[3px] bg-teal"></span>}
               </button>
            ))}
         </div>

         <div className="min-h-[400px]">
            {renderContent()}
         </div>

         <div className="mt-20">
            <Ornament />
         </div>
      </div>
   );
};

export default Knowledge;
