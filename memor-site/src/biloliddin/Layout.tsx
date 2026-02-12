import React from 'react';
import { Helmet } from 'react-helmet-async';
import './biloliddin.css';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="biloliddin-layout min-h-screen bg-parchment font-sans selection:bg-sepia selection:text-white overflow-x-hidden flex flex-col">
            <Helmet>
                <title>Biloliddin | Me'mor & Shaharsoz</title>
                <meta name="description" content="Biloliddinning shaxsiy blogi - Me'morchilik va shaharsozlik haqida." />
                {/* Fonts are likely already loaded by main app, but we ensure structure here */}
            </Helmet>
            {children}
        </div>
    );
};

export default Layout;
