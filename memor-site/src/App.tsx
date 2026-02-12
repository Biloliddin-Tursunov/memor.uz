import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react"

// Layouts
import MainLayout from './layouts/MainLayout';

// Biloliddin Personal Site (Lazy Loaded)
const BiloliddinApp = lazy(() => import('./biloliddin/App'));

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Biloliddin's Personal Blog Route */}
        <Route path="/biloliddin/*" element={
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-teal-900">Yuklanmoqda...</div>}>
            <BiloliddinApp />
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