// layouts/MainLayout.jsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import { ToastProvider } from '../provider/toast-provider';
import Header from '../components/header';

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // サイドバーの開閉を制御する関数をこのコンポーネントで定義
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <ToastProvider>
      <div className='flex flex-col min-h-screen'>
        <Header onToggleSidebar={toggleSidebar} />

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
