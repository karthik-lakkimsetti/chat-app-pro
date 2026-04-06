import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ChatPage from './pages/ChatPage';

/**
 * INDUSTRY STANDARD: Higher-Order Component for Route Protection.
 * This prevents unauthorized access to private pages.
 */
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  if (!isAuthenticated) {
    // 'replace' prevents the user from clicking 'Back' into a protected area
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* PUBLIC ROUTES: Redirect to /chat if already logged in */}
          <Route 
            path="/login" 
            element={!isAuthenticated ? <LoginPage /> : <Navigate to="/chat" replace />} 
          />
          <Route 
            path="/register" 
            element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/chat" replace />} 
          />

          {/* PROTECTED ROUTES: Only visible to logged-in users */}
          <Route 
            path="/chat" 
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            } 
          />

          {/* DEFAULT ROUTE: Catch-all to redirect to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;