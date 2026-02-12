import React, { useEffect } from 'react';
import { blogPosts } from '../data/localDb';

interface BlogPostProps {
  id: string;
  onBack: () => void;
}

const BlogPost: React.FC<BlogPostProps> = ({ id, onBack }) => {
  const post = blogPosts.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center">
            <h2 className="font-serif text-2xl text-deep-teal">Maqola topilmadi</h2>
            <button onClick={onBack} className="mt-4 text-sepia hover:underline">Ortga qaytish</button>
        </div>
    )
  }

  return (
    <article className="py-24 bg-parchment min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={onBack} className="mb-8 flex items-center text-sepia hover:text-deep-teal transition-colors font-sans text-sm uppercase tracking-widest">
            &larr; Barcha maqolalar
        </button>

        <header className="mb-12 text-center">
            <span className="inline-block px-3 py-1 border border-sepia/30 rounded-full text-xs font-sans text-sepia uppercase tracking-widest mb-6">
                {post.category}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-deep-teal leading-tight mb-6">
                {post.title}
            </h1>
            <div className="flex justify-center items-center gap-4 text-sm font-sans text-graphite/60">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime} o'qish</span>
            </div>
        </header>

        {post.imageUrl && (
            <div className="mb-12 rounded-sm overflow-hidden shadow-lg">
                <img src={post.imageUrl} alt={post.title} className="w-full h-auto object-cover" />
            </div>
        )}

        <div 
            className="prose prose-lg prose-headings:font-serif prose-headings:text-deep-teal prose-p:font-sans prose-p:text-graphite/80 prose-a:text-sepia prose-img:rounded-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-16 pt-8 border-t border-sepia/20">
            <p className="font-serif italic text-center text-graphite/60">
                Fikrlaringiz bormi? <a href="#contact" className="text-sepia underline">Men bilan bog'laning</a>.
            </p>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;