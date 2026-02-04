import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Save, Eye, Image as ImageIcon, FileText, Upload, Calendar, MapPin, Coins, Ruler, User, Palette, Globe, Lock, Globe2 } from 'lucide-react';
import { RichTextEditor } from './RichTextEditor';
import ImageUploader from './ImageUploader';
import { TabSwitcher } from './TabSwitcher';
import { uploadImage } from '../lib/supabase';

interface EditorProps {
    onBack: () => void;
    category: string;
    initialData?: any;
    onSave: (data: any, category: string) => void;
}

const LANGUAGES = [
    { key: 'uz', label: "O'zbek" },
    { key: 'ru', label: "Русский" },
    { key: 'en', label: "English" },
    { key: 'tr', label: "Türkçe" }
];

const Editor: React.FC<EditorProps> = ({ onBack, category, initialData, onSave }) => {
    const [lang, setLang] = useState('uz');
    const [previewMode, setPreviewMode] = useState(false);
    const [formData, setFormData] = useState<any>({
        // Default values
        title_uz: '', title_ru: '', title_en: '', title_tr: '',
        content_uz: '', content_ru: '', content_en: '', content_tr: '',
        excerpt_uz: '', excerpt_ru: '', excerpt_en: '', excerpt_tr: '',
        status: 'draft',
        ...initialData
    });

    const getRichTextValue = (field: string) => {
        const content = formData[field];
        if (!content) return '';
        if (typeof content === 'string' && content.startsWith('[')) return '';
        return content;
    };

    const handleRichTextChange = (html: string) => {
        setFormData((prev: any) => ({ ...prev, [`content_${lang}`]: html }));
    };

    const handleEditorImageUpload = (): Promise<string | null> => {
        return new Promise((resolve) => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = async () => {
                if (input.files?.length) {
                    try {
                        const url = await uploadImage(input.files[0], 'images');
                        resolve(url);
                    } catch (e) {
                        console.error(e);
                        alert('Rasm yuklashda xatolik!');
                        resolve(null);
                    }
                } else {
                    resolve(null);
                }
            };
            input.click();
        });
    };

    useEffect(() => {
        if (initialData) {
            setFormData({
                status: 'draft',
                ...initialData,
                title_uz: initialData.title_uz || '',
                content_uz: initialData.content_uz || '',
            });
        }
    }, [initialData]);

    const handleChange = (key: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        if (!formData.title_uz) return alert("Asosiy (O'zbekcha) sarlavha bo'lishi shart!");

        const dataToSave = {
            ...formData,
            status: formData.status || 'draft',
            date: formData.date || new Date().toLocaleString('uz-UZ', { month: 'long', day: 'numeric' }),
            type: category === 'art' ? formData.type || 'Rasm' : category
        };

        onSave(dataToSave, category);
    };

    const renderCommonFields = () => (
        <div className="space-y-6 mb-8 animate-fadeIn">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sepia/70 text-sm font-cinzel">
                    <Globe size={14} /> {LANGUAGES.find(l => l.key === lang)?.label} variantini tahrirlayapsiz
                </div>

                <div className="flex bg-parchment-dark rounded-lg p-1 border border-sepia/20">
                    <button
                        onClick={() => handleChange('status', 'draft')}
                        className={`px-3 py-1 rounded text-xs font-cinzel transition-colors flex items-center gap-2 ${formData.status === 'draft' ? 'bg-sepia/20 text-ink' : 'text-sepia/60 hover:text-sepia'}`}
                    >
                        <Lock size={12} /> Draft
                    </button>
                    <button
                        onClick={() => handleChange('status', 'published')}
                        className={`px-3 py-1 rounded text-xs font-cinzel transition-colors flex items-center gap-2 ${formData.status === 'published' ? 'bg-teal text-parchment' : 'text-sepia/60 hover:text-sepia'}`}
                    >
                        <Globe2 size={12} /> Public
                    </button>
                </div>
            </div>

            <input
                type="text"
                placeholder={`${LANGUAGES.find(l => l.key === lang)?.label} Sarlavha...`}
                value={formData[`title_${lang}`] || ''}
                onChange={(e) => handleChange(`title_${lang}`, e.target.value)}
                className="w-full bg-transparent border-b-2 border-sepia/20 text-3xl md:text-4xl font-bold font-cinzel text-ink placeholder-ink/30 focus:outline-none focus:border-sepia pb-4 text-center"
            />

            {(category === 'article' || category === 'book') && (
                <div>
                    <label className="text-sepia/70 font-cinzel text-xs uppercase mb-2 block">Qisqacha mazmun (Excerpt)</label>
                    <textarea
                        value={formData[`excerpt_${lang}`] || ''}
                        onChange={(e) => handleChange(`excerpt_${lang}`, e.target.value)}
                        className="w-full bg-parchment-dark/50 border border-sepia/30 rounded p-4 font-serif text-ink focus:border-sepia outline-none resize-none h-24"
                        placeholder="Qisqacha ma'lumot..."
                    />
                </div>
            )}
        </div>
    );

    const renderSpecificFields = () => {
        const imageKey = category === 'creator' ? 'avatar_url' : (category === 'book' ? 'cover_url' : 'image_url');
        const showImageUpload = true;

        return (
            <div className="space-y-6 mb-6">
                {showImageUpload && (
                    <ImageUploader
                        currentImage={formData[imageKey]}
                        onImageUploaded={(url) => handleChange(imageKey, url)}
                        label={category === 'creator' ? "Avatar" : "Muqova Rasmi"}
                        bucket="images"
                    />
                )}

                {category === 'book' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="group">
                            <label className="text-sepia font-cinzel text-xs uppercase mb-1 block">Muallif</label>
                            <input
                                value={formData.author || ''}
                                onChange={(e) => handleChange('author', e.target.value)}
                                className="w-full bg-transparent border-b border-sepia py-2 text-ink focus:border-teal outline-none font-serif"
                                placeholder="Yozuvchi ismi..."
                            />
                        </div>
                        <div className="group">
                            <label className="text-sepia font-cinzel text-xs uppercase mb-1 block">PDF Yuklash (Link)</label>
                            <input
                                value={formData.download_url || ''}
                                onChange={(e) => handleChange('download_url', e.target.value)}
                                className="w-full bg-transparent border-b border-sepia py-2 text-ink focus:border-teal outline-none font-serif"
                                placeholder="PDF URL..."
                            />
                        </div>
                    </div>
                )}

                {category === 'creator' && (
                    <div className="space-y-4">
                        <div className="group">
                            <label className="text-sepia font-cinzel text-xs uppercase mb-1 block">Mutaxassislik</label>
                            <input
                                value={formData[`role_${lang}`] || ''}
                                onChange={(e) => handleChange(`role_${lang}`, e.target.value)}
                                className="w-full bg-transparent border-b border-sepia py-2 text-ink focus:border-teal outline-none font-serif"
                                placeholder="Masalan: Xattot, Kulol..."
                            />
                        </div>
                    </div>
                )}

                {category === 'art' && (
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sepia font-cinzel text-xs uppercase mb-1 block flex gap-2 items-center"><Coins size={12} /> Narx</label>
                            <input
                                value={formData.price || ''}
                                onChange={(e) => handleChange('price', e.target.value)}
                                className="w-full bg-transparent border-b border-sepia py-2 text-ink font-serif" placeholder="500,000 so'm"
                            />
                        </div>
                        <div>
                            <label className="text-sepia font-cinzel text-xs uppercase mb-1 block flex gap-2 items-center"><Ruler size={12} /> O'lchamlar</label>
                            <input
                                value={formData.dimensions || ''}
                                onChange={(e) => handleChange('dimensions', e.target.value)}
                                className="w-full bg-transparent border-b border-sepia py-2 text-ink font-serif" placeholder="50x70 sm"
                            />
                        </div>
                        <div>
                            <label className="text-sepia font-cinzel text-xs uppercase mb-1 block flex gap-2 items-center"><Palette size={12} /> Turi</label>
                            <input
                                value={formData.type || ''}
                                onChange={(e) => handleChange('type', e.target.value)}
                                className="w-full bg-transparent border-b border-sepia py-2 text-ink font-serif" placeholder="Rasm, Haykal..."
                            />
                        </div>
                    </div>
                )}

                {(category === 'event' || category === 'mission') && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="group">
                            <label className="text-sepia font-cinzel text-xs uppercase mb-1 block flex gap-2 items-center"><Calendar size={12} /> Vaqt</label>
                            <input
                                type="datetime-local"
                                value={formData.dateTime || ''}
                                onChange={(e) => handleChange('dateTime', e.target.value)}
                                className="w-full bg-transparent border-b border-sepia py-2 text-ink font-serif"
                            />
                        </div>
                        <div className="group">
                            <label className="text-sepia font-cinzel text-xs uppercase mb-1 block flex gap-2 items-center"><MapPin size={12} /> Manzil</label>
                            <input
                                value={formData[`location_${lang}`] || ''}
                                onChange={(e) => handleChange(`location_${lang}`, e.target.value)}
                                className="w-full bg-transparent border-b border-sepia py-2 text-ink font-serif" placeholder="Joylashuv..."
                            />
                        </div>
                    </div>
                )}

                {(!formData.author && category !== 'creator' && category !== 'book') && (
                    <div className="mb-6">
                        <label className="text-sepia font-cinzel text-xs uppercase mb-1 block">Muallif</label>
                        <input
                            value={formData.author || ''}
                            onChange={(e) => handleChange('author', e.target.value)}
                            className="w-full bg-transparent border-b border-sepia py-2 text-ink font-serif" placeholder="Ismingiz..."
                        />
                    </div>
                )}
            </div>
        );
    };

    const renderPreview = () => {
        const title = formData[`title_${lang}`];
        const content = formData[`content_${lang}`];
        const excerpt = formData[`excerpt_${lang}`];
        const imageKey = category === 'creator' ? 'avatar_url' : (category === 'book' ? 'cover_url' : 'image_url');
        const imageUrl = formData[imageKey];
        const date = formData.date || new Date().toLocaleDateString(lang === 'uz' ? 'uz-UZ' : 'en-US');
        const author = formData.author || 'Me\'mor';

        return (
            <div className="bg-parchment text-graphite dark:bg-[#020617] dark:text-gray-100 font-serif min-h-screen p-8 md:p-12 overflow-y-auto w-full absolute top-0 left-0 z-50">
                <div className="max-w-4xl mx-auto animate-fadeIn">
                    <button
                        onClick={() => setPreviewMode(false)}
                        className="fixed top-6 right-6 z-50 bg-teal text-white px-4 py-2 rounded shadow-lg flex items-center gap-2 hover:bg-teal/80 transition-all font-cinzel"
                    >
                        <Eye size={18} /> Tahrirlashga qaytish
                    </button>

                    <header className="mb-12 text-center md:text-left">
                        <span className="text-teal text-[10px] font-bold uppercase tracking-[0.3em] mb-3 block">{category}</span>
                        <h1 className="font-display text-4xl md:text-5xl text-graphite dark:text-white leading-tight mb-6 font-cinzel">
                            {title || '(Sarlavha yo\'q)'}
                        </h1>
                        <div className="flex items-center justify-center md:justify-start gap-4 text-[10px] font-mono text-graphite/40 uppercase tracking-widest border-t border-graphite/5 pt-4">
                            <span>{author}</span>
                            <span className="w-1 h-1 bg-sepia rounded-full opacity-30"></span>
                            <span>{date}</span>
                        </div>
                    </header>

                    {imageUrl && (
                        <div className="aspect-[21/9] mb-12 overflow-hidden rounded-sm bg-graphite/5 border border-graphite/5 shadow-sm">
                            <img src={imageUrl} alt={title} className="w-full h-full object-cover grayscale-[0.2]" />
                        </div>
                    )}

                    <div className="max-w-2xl mx-auto">
                        <article className="prose prose-lg prose-headings:font-display prose-p:font-serif prose-p:text-graphite/80 dark:prose-invert max-w-none">
                            {excerpt && (
                                <p className="text-xl leading-relaxed first-letter:text-6xl first-letter:float-left first-letter:mr-4 first-letter:text-sepia first-letter:font-display italic mb-10 opacity-90">
                                    {excerpt}
                                </p>
                            )}
                            <div
                                className="space-y-6 text-lg leading-relaxed text-graphite/80 dark:text-slate-300"
                                dangerouslySetInnerHTML={{ __html: content || '' }}
                            />
                        </article>
                    </div>
                </div>
            </div>
        );
    };

    if (previewMode) {
        return renderPreview();
    }

    return (
        <div className="w-full h-full flex flex-col relative animate-fadeIn bg-parchment-light">

            {/* Toolbar Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-parchment border-b border-sepia/20">
                <button onClick={onBack} className="flex items-center gap-2 text-sepia hover:text-ink transition-colors font-cinzel">
                    <ChevronLeft size={20} />
                    <span>Ortga</span>
                </button>

                {/* Language Switcher in Header */}
                <div className="flex bg-parchment-dark/50 rounded p-1 mx-4">
                    {LANGUAGES.map(l => (
                        <button
                            key={l.key}
                            onClick={() => setLang(l.key)}
                            className={`px-3 py-1 rounded text-xs font-cinzel transition-all ${lang === l.key ? 'bg-sepia text-parchment shadow-sm' : 'text-sepia/60 hover:text-sepia'}`}
                        >
                            {l.key.toUpperCase()}
                        </button>
                    ))}
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={() => setPreviewMode(true)}
                        className="flex items-center gap-2 text-sepia/70 hover:text-sepia transition-colors"
                    >
                        <Eye size={18} />
                        <span className="hidden sm:inline">Bashorat</span>
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 bg-teal text-parchment px-6 py-2 rounded-sm border border-sepia shadow-lg hover:bg-teal/80 transition-colors font-cinzel tracking-widest group"
                    >
                        <Save size={18} className="group-hover:animate-pulse" />
                        <span>Muhrlash</span>
                    </button>
                </div>
            </div>

            {/* Main Content Area - Full width/height, scrollable */}
            <div className="flex-1 overflow-y-auto bg-parchment pb-20">
                <div className="max-w-5xl mx-auto p-8 md:p-12">

                    <div className="mb-8 text-center">
                        <div className="flex items-center justify-center gap-2 text-sepia/70 text-sm font-cinzel mb-4">
                            <Globe size={14} /> {LANGUAGES.find(l => l.key === lang)?.label} variant
                            <span className="w-px h-4 bg-sepia/30 mx-2"></span>
                            <select
                                value={formData.status}
                                onChange={(e) => handleChange('status', e.target.value)}
                                className="bg-transparent border-none outline-none text-sepia font-bold cursor-pointer"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>

                        <input
                            type="text"
                            placeholder="Sarlavha..."
                            value={formData[`title_${lang}`] || ''}
                            onChange={(e) => handleChange(`title_${lang}`, e.target.value)}
                            className="w-full bg-transparent border-b-2 border-sepia/10 text-4xl md:text-5xl font-bold font-cinzel text-ink placeholder-ink/20 focus:outline-none focus:border-sepia/50 pb-4 text-center transition-colors"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Side: Meta fields */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-parchment-dark/30 p-6 rounded border border-sepia/10">
                                <h3 className="font-cinzel text-sepia text-sm uppercase mb-4 opacity-70 border-b border-sepia/10 pb-2">Ma'lumotlar</h3>
                                {renderSpecificFields()}

                                <div className="mt-6">
                                    <label className="text-sepia/70 font-cinzel text-xs uppercase mb-2 block">Qisqacha (Excerpt)</label>
                                    <textarea
                                        value={formData[`excerpt_${lang}`] || ''}
                                        onChange={(e) => handleChange(`excerpt_${lang}`, e.target.value)}
                                        className="w-full bg-parchment border border-sepia/20 rounded p-3 font-serif text-ink focus:border-sepia outline-none resize-none h-32 text-sm"
                                        placeholder="..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Editor */}
                        <div className="lg:col-span-2 min-h-[500px] flex flex-col">
                            <label className="text-sepia font-cinzel text-xs uppercase mb-2 block flex justify-between">
                                <span>Asosiy Matn</span>
                                <span className="text-sepia/40">Markdown / Rich Text</span>
                            </label>
                            <div className="flex-1 bg-white/50 rounded border border-sepia/20 shadow-inner">
                                <RichTextEditor
                                    content={getRichTextValue(`content_${lang}`)}
                                    onChange={handleRichTextChange}
                                    onImageUpload={handleEditorImageUpload}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Editor;