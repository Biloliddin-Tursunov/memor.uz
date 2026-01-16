import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'; // 1. BrowserRouter chaqirildi
import Layout from './components/Layout';
import Home from './pages/Home';
import TeamDashboard from './pages/TeamDashboard';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import { LanguageProvider } from './context/LanguageContext';
import { TeamProvider } from './context/TeamContext';
import { AnimatePresence } from 'framer-motion';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      {/* 2. TUZATISH: TypeScript xatosini yo'qotish uchun Routes ni div ga o'rab, 
         kalitni (key) divga beramiz. Bu sahifa almashganda animatsiyani ishlatadi.
      */}
      <div key={location.pathname} style={{ width: '100%' }}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          {/* Dashboard Routes */}
          <Route path="/team/:teamId" element={<TeamDashboard />} />
          {/* Task Detail Route (Nested logic handled in TeamDashboard) */}
          <Route path="/team/:teamId/task/:taskId" element={<TeamDashboard />} />
        </Routes>
      </div>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    // 3. HashRouter -> BrowserRouter ga o'zgartirildi
    <BrowserRouter>
      <TeamProvider>
        <AuthProvider>
          <LanguageProvider>
              <TaskProvider>
                <Layout>
                  <AnimatedRoutes />
                </Layout>
              </TaskProvider>
          </LanguageProvider>
        </AuthProvider>
      </TeamProvider>
    </BrowserRouter>
  );
};

export default App;