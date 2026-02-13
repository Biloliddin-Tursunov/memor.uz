import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react"

// Layouts
import MainLayout from './layouts/MainLayout';

// Biloliddin Personal Site (Lazy Loaded)
const BiloliddinApp = lazy(() => import('./biloliddin/App'));
const Paper = lazy(() => import('./components/paper/Paper'));

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Biloliddin's Personal Blog Route */}
        <Route path="/my-journey/*" element={
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-teal-900">Yuklanmoqda...</div>}>
            <BiloliddinApp />
          </Suspense>
        } />

        {/* Paper Generator Route - Isolated App */}
        <Route path="/paper" element={
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900">Yuklanmoqda...</div>}>
            <Paper />
          </Suspense>
        } />

        {/* Main Application Route */}
        <Route path="/*" element={<MainLayout />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  );
};

export default App;