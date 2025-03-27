import{ useState } from 'react';

function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  // プロフィールフォームのステート
  const [form, setForm] = useState({
    name: 'ユーザー名',
    email: 'user@example.com',
    bio: 'プロフィール情報がここに表示されます。',
  });

  // フォーム入力処理
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // フォーム送信処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('設定を保存しました！');
  };

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-bold text-gray-900'>設定</h1>

      {/* タブナビゲーション */}
      <div className='border-b border-gray-200'>
        <nav className='flex -mb-px'>
          {['profile', 'account', 'notifications', 'security'].map((tab) => {
            const tabLabel = {
              profile: 'プロフィール',
              account: 'アカウント',
              notifications: '通知',
              security: 'セキュリティ',
            }[tab];

            return (
              <button
                key={tab}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tabLabel}
              </button>
            );
          })}
        </nav>
      </div>

      {/* プロフィール設定 */}
      {activeTab === 'profile' && (
        <div className='bg-white p-6 rounded-lg shadow-sm'>
          <h2 className='text-lg font-medium mb-6'>プロフィール設定</h2>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                名前
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={form.name}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
              />
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                メールアドレス
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={form.email}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
              />
            </div>

            <div>
              <label
                htmlFor='bio'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                プロフィール
              </label>
              <textarea
                id='bio'
                name='bio'
                rows={4}
                value={form.bio}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
              />
            </div>

            <div className='flex justify-end'>
              <button
                type='submit'
                className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm'
              >
                変更を保存
              </button>
            </div>
          </form>
        </div>
      )}

      {/* アカウント設定 */}
      {activeTab === 'account' && (
        <div className='bg-white p-6 rounded-lg shadow-sm'>
          <h2 className='text-lg font-medium mb-6'>アカウント設定</h2>
          <p className='text-gray-600'>アカウント情報の設定ができます。</p>
        </div>
      )}

      {/* 通知設定 */}
      {activeTab === 'notifications' && (
        <div className='bg-white p-6 rounded-lg shadow-sm'>
          <h2 className='text-lg font-medium mb-6'>通知設定</h2>
          <p className='text-gray-600'>通知の設定ができます。</p>
        </div>
      )}

      {/* セキュリティ設定 */}
      {activeTab === 'security' && (
        <div className='bg-white p-6 rounded-lg shadow-sm'>
          <h2 className='text-lg font-medium mb-6'>セキュリティ設定</h2>
          <p className='text-gray-600'>セキュリティの設定ができます。</p>
        </div>
      )}
    </div>
  );
}

export default Settings;
