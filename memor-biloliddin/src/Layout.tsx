import React from 'react';
import './biloliddin.css';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="biloliddin-layout min-h-screen bg-parchment font-sans selection:bg-sepia selection:text-white overflow-x-hidden flex flex-col">
            {children}
        </div>
    );
};

export default Layout;
