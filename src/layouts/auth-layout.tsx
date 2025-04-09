/**
 * 認証ページのレイアウトコンポーネント
 *
 * ログインやサインアップなどの認証関連ページで使用される
 * メインレイアウトとは別の全画面レイアウト
 */
import { ReactNode } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../provider/auth-provider';

interface AuthLayoutProps {
  children?: ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // すでに認証済みの場合は、元のアクセス先またはダッシュボードにリダイレクト
  if (isAuthenticated) {
    const from = location.state?.from?.pathname || '/dashboard';
    return <Navigate to={from} replace />;
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'>
        {/* ロゴまたはブランド表示エリア */}
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-gray-800'>React Dashboard</h1>
          <p className='mt-2 text-sm text-gray-600'>
            アカウントにログインしてください
          </p>
        </div>

        {/* 子コンポーネントまたはOutletを表示 */}
        {children || <Outlet />}
      </div>
    </div>
  );
}

export default AuthLayout;
