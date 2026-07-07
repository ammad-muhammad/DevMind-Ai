import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthStore from './store/authStore';
import useChatStore from './store/chatStore';
import useScrollToTop from './hooks/useScrollToTop';

import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { VerifyOTP } from './pages/VerifyOTP';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { Sidebar } from './components/Sidebar';

// Dashboard Tool Pages
import { Chat } from './pages/dashboard/Chat';
import { Debugger } from './pages/dashboard/Debugger';
import { Explainer } from './pages/dashboard/Explainer';
import { CodeWriter } from './pages/dashboard/CodeWriter';
import { Snippets } from './pages/dashboard/Snippets';
import { Settings } from './pages/dashboard/Settings';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

const DashboardLayout = () => {
  const { fetchChats } = useChatStore();

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0a] text-white">
      <Sidebar />
      <main className="flex-1 overflow-auto relative">
        <Outlet />
      </main>
    </div>
  );
};

function ScrollToTop() {
  useScrollToTop()
  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          } 
        >
          {/* Default redirect for /dashboard */}
          <Route index element={<Navigate to="/dashboard/chat" replace />} />
          
          {/* Tool Routes */}
          <Route path="chat" element={<Chat />} />
          <Route path="debug" element={<Debugger />} />
          <Route path="explain" element={<Explainer />} />
          <Route path="write" element={<CodeWriter />} />
          <Route path="snippets" element={<Snippets />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
