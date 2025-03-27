

function Dashboard() {
  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold text-gray-900'>ダッシュボード</h1>
        <button className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm'>
          アクション
        </button>
      </div>

      {/* 統計カード */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {['新規タスク', '進行中', '検証待ち', '完了'].map((title, index) => (
          <div key={index} className='bg-white p-6 rounded-lg shadow'>
            <p className='text-sm font-medium text-gray-500'>{title}</p>
            <div className='mt-2 flex items-baseline'>
              <p className='text-3xl font-semibold'>
                {Math.floor(Math.random() * 100)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* メインコンテンツ */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* 最新アクティビティ */}
        <div className='lg:col-span-2 bg-white p-6 rounded-lg shadow'>
          <h2 className='text-lg font-medium mb-4'>最新アクティビティ</h2>
          <div className='space-y-4'>
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className='flex items-start pb-4 border-b border-gray-100 last:border-0'
              >
                <div className='bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0'>
                  {item}
                </div>
                <div>
                  <p className='font-medium'>アクティビティタイトル {item}</p>
                  <p className='text-sm text-gray-500'>
                    詳細テキストがここに入ります。
                  </p>
                  <p className='text-xs text-gray-400 mt-1'>1時間前</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* サイドセクション */}
        <div className='bg-white p-6 rounded-lg shadow'>
          <h2 className='text-lg font-medium mb-4'>進捗状況</h2>
          <div className='space-y-4'>
            {['プロジェクトA', 'プロジェクトB', 'プロジェクトC'].map(
              (project, i) => (
                <div key={i} className='space-y-2'>
                  <div className='flex justify-between'>
                    <span>{project}</span>
                    <span className='text-sm text-gray-500'>
                      {30 * (i + 1)}%
                    </span>
                  </div>
                  <div className='w-full h-2 bg-gray-200 rounded-full overflow-hidden'>
                    <div
                      className='h-full bg-blue-600 rounded-full'
                      style={{ width: `${30 * (i + 1)}%` }}
                    ></div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
