// layouts/MainLayout.jsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import { ToastProvider } from '../provider/toast-provider';


function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ToastProvider>
      <div className='flex flex-col min-h-screen'>
        {/* ヘッダー */}
        <header className='fixed top-0 left-0 right-0 flex items-center h-16 px-4 bg-white shadow-sm z-50'>
          <button
            className='mr-4 text-2xl focus:outline-none'
            onClick={toggleSidebar}
          >
            ☰
          </button>
          <h1 className='text-xl font-semibold flex-grow'>
            アプリケーション名
          </h1>
          <div className='flex gap-2'>
            <button className='p-2 hover:bg-gray-100 rounded-full'>通知</button>
            <button className='p-2 hover:bg-gray-100 rounded-full'>
              ユーザー
            </button>
          </div>
        </header>

        <div className='flex pt-16 flex-grow'>
          {/* サイドバーコンポーネントを呼び出し */}
          <Sidebar sidebarOpen={sidebarOpen} />

          {/* メインコンテンツエリア */}
          <main
            className={`flex-grow p-6 transition-all duration-300 ${
              sidebarOpen ? 'ml-64' : 'ml-16'
            }`}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}

export default MainLayout;
