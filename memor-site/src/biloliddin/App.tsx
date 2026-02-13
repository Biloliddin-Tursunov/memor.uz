import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, useParams } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Layout from './Layout';
import { PageView } from './types';

// Wrapper to extract ID from params
const BlogPostWrapper = ({ onBack }: { onBack: () => void }) => {
  const { id } = useParams();
  return <BlogPost id={parseInt(id || '0')} onBack={onBack} />;
};

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Helper to determine active page for Navigation component
  const getActivePage = (): PageView => {
    const path = location.pathname;
    if (path.includes('/blog') && path.split('/').length > 3) return { type: 'post', id: parseInt(path.split('/').pop() || '0') };
    if (path.includes('/blog')) return 'blog';
    if (path.includes('/projects')) return 'projects';
    if (path.includes('/about')) return 'about';
    if (path.includes('/contact')) return 'contact';
    return 'home';
  };

  // Wrapper for onNavigate to support legacy props until refactored
  const handleNavigate = (view: PageView) => {
    if (typeof view === 'string') {
      if (view === 'home') navigate('/biloliddin');
      else navigate(`/biloliddin/${view}`);
    } else if (typeof view === 'object' && view.type === 'post') {
      navigate(`/biloliddin/blog/${view.id}`);
    }
  };

  // Auto-scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Layout>
      <Navigation activePage={getActivePage()} onNavigate={handleNavigate} />
      <main className="flex-grow pt-20">
        <Routes>
          <Route path="/" element={
            <>
              <Hero onNavigate={handleNavigate} />
            </>
          } />
          <Route path="/blog" element={<BlogList onReadPost={(id) => navigate(`/biloliddin/blog/${id}`)} />} />
          <Route path="/blog/:id" element={<BlogPostWrapper onBack={() => navigate('/biloliddin/blog')} />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Hero onNavigate={handleNavigate} />} />
        </Routes>
      </main>
      {location.pathname !== '/biloliddin' && location.pathname !== '/biloliddin/' && <Footer />}
    </Layout>
  );
}

export default App;