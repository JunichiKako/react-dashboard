import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// レイアウトコンポーネント
import RootLayout from './layouts/root-layout';
import MainLayout from './layouts/main-layout';
import AuthLayout from './layouts/auth-layout';
import RequireAuth from './components/require-auth';

// ページコンポーネント
import Login from './pages/login';
import Dashboard from './pages/dash-board';
import Projects from './pages/projects';
import NotFound from './pages/not-found';
import Settings from './pages/settings';
import { AuthProvider } from './provider/auth-provider';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* ルートレイアウト - すべてのレイアウトの親 */}
          <Route element={<RootLayout />}>
            {/* 認証レイアウト */}
            <Route path='auth' element={<AuthLayout />}>
              <Route path='login' element={<Login />} />
              <Route index element={<Navigate to='login' replace />} />
            </Route>

            {/* 認証が必要なルート */}
            <Route element={<RequireAuth />}>
              {/* メインレイアウト */}
              <Route element={<MainLayout />}>
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='projects' element={<Projects />} />
                <Route path='settings' element={<Settings />} />
                {/* ルートパスはダッシュボードにリダイレクト */}
                <Route
                  path='/'
                  element={<Navigate to='/dashboard' replace />}
                />
              </Route>
            </Route>

            {/* 404ページ */}
            <Route path='*' element={<NotFound />} />

            {/* /loginへのアクセスは/auth/loginにリダイレクト */}
            <Route
              path='login'
              element={<Navigate to='/auth/login' replace />}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
