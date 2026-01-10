import React, { useEffect } from 'react';
// BrowserRouter ga o'zgartirishni tavsiya qilaman (chiroyli URL uchun)
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// DIQQAT: './src/' emas, shunchaki './' yoki '../' ishlatiladi
import Layout from './components/Layout';
import Home from './pages/Home';
import TeamDashboard from './pages/TeamDashboard';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import "./index.css";

// Sahifa almashganda scrollni tepaga chiqarish komponenti
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    // mode="wait" - eski sahifa ketib bo'lgach, yangisi keladi
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard Routes */}
        <Route path="/team/:teamId" element={<TeamDashboard />} />
        {/* Task Detail Route */}
        <Route path="/team/:teamId/task/:taskId" element={<TeamDashboard />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop /> {/* Har bir sahifa o'tishida tepaga chiqadi */}
      <AuthProvider>
        <TaskProvider>
          <Layout>
            <AnimatedRoutes />
          </Layout>
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;