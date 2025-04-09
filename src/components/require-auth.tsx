/**
 * 認証必須ルートのOutletコンポーネント
 *
 * 認証が必要なルートで使用され、未認証の場合はログインページに
 * リダイレクトします。認証済みの場合はOutletを表示します。
 */
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../provider/auth-provider';

function RequireAuth() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // 認証されていない場合はログインページにリダイレクト
  // 元のアクセス先をstate経由で渡して、ログイン後に戻れるようにする
  if (!isAuthenticated) {
    return <Navigate to='/auth/login' state={{ from: location }} replace />;
  }

  // 認証済みの場合はOutletを表示（子ルートをレンダリング）
  return <Outlet />;
}

export default RequireAuth;
