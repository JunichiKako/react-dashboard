
// プロジェクトのインターフェース定義
type Project = {
  id: number;
  name: string;
  status: string;
  dueDate: string;
  progress: number;
};

function Projects() {
  // サンプルプロジェクトデータ
  const projects: Project[] = [
    {
      id: 1,
      name: 'ウェブサイトリニューアル',
      status: '進行中',
      dueDate: '2025-05-15',
      progress: 70,
    },
    {
      id: 2,
      name: 'モバイルアプリ開発',
      status: '計画中',
      dueDate: '2025-06-30',
      progress: 20,
    },
    {
      id: 3,
      name: 'マーケティングキャンペーン',
      status: '完了',
      dueDate: '2025-03-01',
      progress: 100,
    },
    {
      id: 4,
      name: 'データ分析ダッシュボード',
      status: '進行中',
      dueDate: '2025-04-20',
      progress: 60,
    },
  ];

  // ステータスに基づくバッジの色を取得する関数
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case '進行中':
        return 'bg-blue-100 text-blue-800';
      case '計画中':
        return 'bg-yellow-100 text-yellow-800';
      case '完了':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold text-gray-900'>プロジェクト一覧</h1>
        <button className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm'>
          新規プロジェクト
        </button>
      </div>

      <div className='flex gap-4'>
        <select
          className='px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
          defaultValue='all'
        >
          <option value='all'>すべてのステータス</option>
          <option value='in-progress'>進行中</option>
          <option value='planned'>計画中</option>
          <option value='completed'>完了</option>
        </select>
        <input
          type='text'
          placeholder='プロジェクト名で検索'
          className='px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 flex-grow'
        />
      </div>

      <div className='overflow-x-auto bg-white shadow-md rounded-lg'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                プロジェクト名
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                ステータス
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                期限
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                進捗
              </th>
              <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                アクション
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {projects.map((project) => (
              <tr key={project.id} className='hover:bg-gray-50'>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='font-medium text-gray-900'>
                    {project.name}
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(project.status)}`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-gray-500'>
                  {project.dueDate}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='w-full h-2 bg-gray-200 rounded-full overflow-hidden'>
                    <div
                      className='h-full bg-blue-600 rounded-full'
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <div className='text-xs text-gray-500 mt-1 text-right'>
                    {project.progress}%
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                  <button className='text-indigo-600 hover:text-indigo-900 mx-1'>
                    編集
                  </button>
                  <button className='text-red-600 hover:text-red-900 mx-1'>
                    削除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Projects;
