/**
 * アプリケーションのルートレイアウトコンポーネント
 *
 * すべてのレイアウト（認証レイアウトとメインレイアウト）を包含する
 * 最上位のレイアウトコンポーネント
 */
import { Outlet } from 'react-router-dom';
import { AuthProvider } from '../provider/auth-provider';

function RootLayout() {
  return (
    <AuthProvider>
      <div className='font-sans antialiased text-gray-900 bg-gray-100 min-h-screen'>
        <Outlet />
      </div>
    </AuthProvider>
  );
}

export default RootLayout;
