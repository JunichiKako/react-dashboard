/**
 * ログインページコンポーネント
 *
 * ユーザー認証フォームを提供し、認証コンテキストを使用して
 * ログイン処理を行います
 */
import { useState, FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../provider/auth-provider';

function Login() {
  // フォーム状態
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 認証コンテキストとナビゲーションフックの取得
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * ログインフォーム送信処理
   * @param e フォームイベント
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 入力検証
    if (!username || !password) {
      setError('ユーザー名とパスワードを入力してください');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      // 認証処理の実行
      const success = await login(username, password);

      if (success) {
        // ログイン成功時は元のアクセス先またはダッシュボードへリダイレクト
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      } else {
        setError('ログインに失敗しました。認証情報を確認してください');
      }
    } catch (err) {
      setError('ログイン処理中にエラーが発生しました');
      console.error('ログインエラー:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
      {/* エラーメッセージ表示 */}
      {error && (
        <div className='p-3 text-sm text-red-600 bg-red-100 rounded-md'>
          {error}
        </div>
      )}

      {/* ヘルプテキスト - モックユーザー情報 */}
      <div className='p-3 text-sm text-blue-600 bg-blue-50 rounded-md'>
        <p className='font-medium mb-1'>モックユーザー:</p>
        <ul className='list-disc pl-5 space-y-1'>
          <li>
            管理者: username=<strong>admin</strong>, password=
            <strong>password</strong>
          </li>
          <li>
            一般ユーザー: username=<strong>user</strong>, password=
            <strong>password</strong>
          </li>
          <li>
            ゲスト: username=<strong>guest</strong>, password=
            <strong>password</strong>
          </li>
        </ul>
        <p className='mt-1 text-xs'>
          ※他のユーザー名でもパスワードが入力されていればログイン可能です
        </p>
      </div>

      {/* ユーザー名入力フィールド */}
      <div>
        <label
          htmlFor='username'
          className='block text-sm font-medium text-gray-700'
        >
          ユーザー名
        </label>
        <input
          id='username'
          name='username'
          type='text'
          autoComplete='username'
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
        />
      </div>

      {/* パスワード入力フィールド */}
      <div>
        <label
          htmlFor='password'
          className='block text-sm font-medium text-gray-700'
        >
          パスワード
        </label>
        <input
          id='password'
          name='password'
          type='password'
          autoComplete='current-password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
        />
      </div>

      {/* ログインボタン */}
      <div>
        <button
          type='submit'
          disabled={isLoading}
          className='flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'
        >
          {isLoading ? 'ログイン中...' : 'ログイン'}
        </button>
      </div>
    </form>
  );
}

export default Login;
