import React, { useState } from 'react';
import Navigation from './components/Sidebar';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import ContentPage from './pages/ContentPage';
import MessagesPage from './pages/MessagesPage';
import { Section, TeamMember } from './types';

function App() {
    const [currentUser, setCurrentUser] = useState<TeamMember | null>(null);
    const [view, setView] = useState<Section>('dashboard');

    if (!currentUser) {
        return <Login onLogin={(user) => setCurrentUser(user)} />;
    }

    return (
        <div className="min-h-screen selection:bg-[#740001] selection:text-[#f0e6d2]">
            {/* Navigation Bar */}
            <Navigation currentSection={view} onHome={() => setView('dashboard')} />

            <main className="min-h-screen">
                {view === 'dashboard' ? (
                    <Dashboard
                        currentUser={currentUser}
                        navigateTo={setView}
                    />
                ) : (
                    <ContentPage
                        view={view}
                        currentUser={currentUser}
                    />
                )}
                {view === 'messages' && <MessagesPage />}
            </main>

            {/* Magical particles/effects background */}
            <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
                <div className="absolute top-10 left-10 w-2 h-2 bg-[#d4af37] rounded-full opacity-50 animate-pulse"></div>
                <div className="absolute top-40 right-20 w-3 h-3 bg-[#d4af37] rounded-full opacity-30 animate-pulse delay-700"></div>
                <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-[#d4af37] rounded-full opacity-40 animate-pulse delay-300"></div>
            </div>
        </div>
    );
}

export default App;