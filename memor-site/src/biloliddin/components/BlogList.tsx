import React from 'react';
import { blogPosts } from '../data/localDb';
import { PageView } from '../types';
import TelegramEmbed from '../../components/TelegramEmbed';

interface BlogListProps {
    onReadPost: (id: string) => void;
    limit?: number;
}

const BlogList: React.FC<BlogListProps> = ({ onReadPost, limit }) => {
    const posts = limit ? blogPosts.slice(0, limit) : blogPosts;

    return (
        <section className="py-20 bg-parchment">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {!limit && (
                    <div className="mb-16 text-center">
                        <h2 className="font-serif text-4xl text-deep-teal mb-4">Blog</h2>
                        <div className="w-16 h-px bg-sepia mx-auto"></div>
                    </div>
                )}

                {posts.length > 0 ? (
                    <div className="space-y-16">
                        {posts.map((post) => (
                            <article key={post.id} className="group cursor-pointer">
                                {post.telegramUrl ? (
                                    <div className="w-full">
                                        <TelegramEmbed postUrl={post.telegramUrl} />
                                    </div>
                                ) : (
                                    <div className="flex flex-col md:flex-row gap-8 items-start" onClick={() => onReadPost(post.id)}>
                                        {/* Date & Category for Desktop */}
                                        <div className="hidden md:block w-32 flex-shrink-0 text-right pt-2">
                                            {post.date && (
                                                <>
                                                    <span className="block font-serif text-2xl text-deep-teal font-bold mb-1">{post.date.split(' ')[0]}</span>
                                                    <span className="block font-sans text-xs text-sepia uppercase tracking-widest">{post.date.split(' ')[1]} {post.date.split(' ')[2]}</span>
                                                </>
                                            )}
                                            <span className="block mt-4 font-sans text-xs text-graphite/50">{post.category}</span>
                                        </div>

                                        <div className="flex-1">
                                            {/* Mobile Meta */}
                                            <div className="md:hidden flex items-center gap-3 mb-2 text-xs font-sans text-sepia uppercase tracking-widest">
                                                <span>{post.date}</span>
                                                <span>•</span>
                                                <span>{post.category}</span>
                                            </div>

                                            <h3 className="text-2xl md:text-3xl font-serif text-graphite group-hover:text-deep-teal transition-colors mb-3 leading-tight">
                                                {post.title}
                                            </h3>
                                            <p className="text-graphite/70 font-sans leading-relaxed mb-4">
                                                {post.excerpt}
                                            </p>
                                            <button className="text-deep-teal font-sans text-sm font-bold uppercase tracking-wide border-b border-transparent group-hover:border-deep-teal transition-all">
                                                O'qish &rarr;
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-sepia/30 rounded-lg bg-sepia/5 text-center">
                        <p className="font-serif text-xl text-deep-teal italic mb-2">Hozircha maqolalar yo'q</p>
                        <p className="font-sans text-sm text-graphite/60">Tez orada bu yerda yangi fikrlar va tahlillar paydo bo'ladi.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default BlogList;