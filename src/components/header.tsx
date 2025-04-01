type HeaderProps = {
  onToggleSidebar: () => void;
};

export default function Header({ onToggleSidebar }: HeaderProps) {
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
        <h1 className='text-xl font-semibold flex-grow'>アプリケーション名</h1>
        <div className='flex gap-2'>
          <button className='p-2 hover:bg-gray-100 rounded-full'>通知</button>
          <button className='p-2 hover:bg-gray-100 rounded-full'>
            ユーザー
          </button>
        </div>
      </header>
    </>
  );
}
