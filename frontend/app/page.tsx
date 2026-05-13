'use client';
import { useState } from 'react';
import PredictionForm from '@/components/PredictionForm';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex min-h-screen">
        {/* Sidebar - Fixed left column */}
        <div className="hidden lg:block lg:w-80 flex-shrink-0">
          <div className="fixed left-4 top-20 w-72 h-[calc(100vh-6rem)] overflow-y-auto">
            <Sidebar isOpen={true} onClose={() => {}} />
          </div>
        </div>

        {/* Mobile Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main content — centered with left spacing */}
        <main className="flex-1 pt-16 relative z-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16 lg:mr-12">

          {/* Page header with gradient */}
          <div className="animate-fadeInUp space-y-6">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-2 h-12 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full shadow-lg shadow-emerald-500/50"></div>
                <div>
                  <span className="text-sm font-bold text-emerald-400 tracking-widest uppercase">Welcome Back</span>
                  <p className="text-slate-400 text-sm mt-1">AI-Powered Carbon Emission Tracking</p>
                </div>
              </div>
              <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-emerald-300 via-green-300 to-teal-300 bg-clip-text text-transparent leading-tight">
                Track Your<br />Carbon Footprint
              </h1>
              <p className="text-xl text-slate-400 max-w-2xl mt-6 leading-relaxed">
                Advanced AI-powered predictions for computing infrastructure emissions. Analyze, optimize, and reduce your environmental impact with precision.
              </p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="glass border border-emerald-500/20 rounded-xl p-4 text-center">
                <p className="text-slate-400 text-xs font-semibold uppercase">Status</p>
                <p className="text-emerald-400 text-lg font-bold mt-2">🟢 Active</p>
              </div>
              <div className="glass border border-blue-500/20 rounded-xl p-4 text-center">
                <p className="text-slate-400 text-xs font-semibold uppercase">Model</p>
                <p className="text-blue-400 text-lg font-bold mt-2">✓ Ready</p>
              </div>
              <div className="glass border border-purple-500/20 rounded-xl p-4 text-center">
                <p className="text-slate-400 text-xs font-semibold uppercase">Version</p>
                <p className="text-purple-400 text-lg font-bold mt-2">v2.0</p>
              </div>
            </div>
          </div>

          {/* Prediction Form */}
          <div className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <PredictionForm />
          </div>

          {/* Analytics */}
          <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <AnalyticsDashboard />
          </div>

        </div>
      </main>
      </div>
    </div>
  );
}
