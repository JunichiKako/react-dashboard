import { Link, useLocation } from 'react-router-dom';

type SidebarProps = {
  sidebarOpen: boolean;
};

function Sidebar({ sidebarOpen }: SidebarProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  // リンクがアクティブかどうかを確認する関数
  const isActive = (path: string) => {
    return currentPath === path;
  };

  // アクティブなリンクのスタイルを取得する関数
  const getLinkClass = (path: string) => {
    const baseClass = 'flex items-center px-4 py-3 text-gray-700';
    return isActive(path)
      ? `${baseClass} bg-blue-100 text-blue-700 border-r-4 border-blue-500`
      : `${baseClass} hover:bg-gray-200`;
  };

  return (
    <aside
      className={`fixed top-16 bottom-0 left-0 bg-gray-50 transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-16'
      } overflow-y-auto`}
    >
      <nav className='py-2'>
        <ul>
          <li>
            <Link to='/dashboard' className={getLinkClass('/dashboard')}>
              <span className='text-xl min-w-6 text-center'>📊</span>
              <span className={`ml-3 ${!sidebarOpen && 'hidden'}`}>
                ダッシュボード
              </span>
            </Link>
          </li>
          <li>
            <Link to='/projects' className={getLinkClass('/projects')}>
              <span className='text-xl min-w-6 text-center'>📁</span>
              <span className={`ml-3 ${!sidebarOpen && 'hidden'}`}>
                プロジェクト
              </span>
            </Link>
          </li>
          <li>
            <Link to='/settings' className={getLinkClass('/settings')}>
              <span className='text-xl min-w-6 text-center'>⚙️</span>
              <span className={`ml-3 ${!sidebarOpen && 'hidden'}`}>設定</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
