/**
 * アプリケーションヘッダーコンポーネント
 *
 * アプリケーション上部に表示される固定ヘッダー
 * サイドバートグルとユーザーメニュー、ログアウト機能を提供
 */
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../provider/auth-provider';
import { Link, useNavigate } from 'react-router-dom';

type HeaderProps = {
  onToggleSidebar: () => void;
};

export default function Header({ onToggleSidebar }: HeaderProps) {
  // ユーザーメニューの開閉状態
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 認証コンテキストとナビゲーション
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // メニュー外クリックで閉じる処理
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // ログアウト処理
  const handleLogout = () => {
    logout();
    // ログアウト後は認証ページにリダイレクト
    navigate('/auth/login');
  };

  // ユーザーロールに基づく背景色を取得
  const getRoleBgColor = () => {
    if (!user?.role) return 'bg-indigo-500';

    switch (user.role) {
      case 'admin':
        return 'bg-red-500';
      case 'user':
        return 'bg-green-500';
      case 'guest':
        return 'bg-yellow-500';
      default:
        return 'bg-indigo-500';
    }
  };

  return (
    <>
      {/* ヘッダー */}
      <header className='fixed top-0 left-0 right-0 flex items-center h-16 px-4 bg-white shadow-sm z-50'>
        <button
          className='mr-4 text-2xl focus:outline-none'
          onClick={onToggleSidebar}
        >
          ☰
        </button>
        <h1 className='text-xl font-semibold flex-grow'>React Dashboard</h1>
        <div className='flex gap-2 items-center'>
          <button className='p-2 hover:bg-gray-100 rounded-full'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
              />
            </svg>
          </button>

          {/* ユーザーメニュー */}
          <div className='relative' ref={menuRef}>
            <button
              className='flex items-center p-2 hover:bg-gray-100 rounded-full'
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <div
                className={`w-8 h-8 ${getRoleBgColor()} rounded-full flex items-center justify-center text-white font-medium`}
              >
                {user?.username.charAt(0).toUpperCase()}
              </div>
              <div className='ml-2 flex flex-col items-start'>
                <span className='text-sm font-medium'>{user?.username}</span>
                {user?.role && (
                  <span className='text-xs text-gray-500 capitalize'>
                    {user.role}
                  </span>
                )}
              </div>
            </button>

            {menuOpen && (
              <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50'>
                <div className='px-4 py-2 border-b border-gray-100'>
                  <p className='text-sm font-medium'>{user?.email}</p>
                  {user?.role && (
                    <p className='text-xs text-gray-500 capitalize'>
                      ロール: {user.role}
                    </p>
                  )}
                </div>
                <Link
                  to='/settings'
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  onClick={() => setMenuOpen(false)}
                >
                  設定
                </Link>
                <button
                  onClick={handleLogout}
                  className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                >
                  ログアウト
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
