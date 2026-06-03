import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Analytics from './pages/Analytics';
import Simulator from './pages/Simulator';
import History from './pages/History';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      <Navbar isMenuOpen={sidebarOpen} onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex min-h-screen pt-16">
        <div className="hidden lg:block lg:w-80 flex-shrink-0">
          <div className="fixed left-4 top-20 w-72 h-[calc(100vh-6rem)] overflow-y-auto">
            <Sidebar isOpen={true} onClose={() => {}} />
          </div>
        </div>

        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 relative z-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16 lg:mr-12">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/simulator" element={<Simulator />} />
              <Route path="/history" element={<History />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
