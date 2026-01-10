import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import TeamDashboard from './pages/TeamDashboard';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import { AnimatePresence } from 'framer-motion';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        {/* Dashboard Routes */}
        <Route path="/team/:teamId" element={<TeamDashboard />} />
        {/* Task Detail Route (Nested logic handled in TeamDashboard) */}
        <Route path="/team/:teamId/task/:taskId" element={<TeamDashboard />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <TaskProvider>
          <Layout>
            <AnimatedRoutes />
          </Layout>
        </TaskProvider>
      </AuthProvider>
    </HashRouter>
  );
};

export default App;