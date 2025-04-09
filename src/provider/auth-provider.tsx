/**
 * 認証状態を管理するContextコンポーネント
 *
 * ログイン状態とユーザー情報をlocalStorageで管理し、
 * アプリケーション全体で認証状態を共有するためのProvider
 */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

// ユーザー情報の型定義
interface User {
  id: string;
  username: string;
  email: string;
  role?: string;
}

// 認証コンテキストの型定義
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// モックユーザーデータ
const MOCK_USERS: Record<string, User> = {
  admin: {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin',
  },
  user: {
    id: '2',
    username: 'user',
    email: 'user@example.com',
    role: 'user',
  },
  guest: {
    id: '3',
    username: 'guest',
    email: 'guest@example.com',
    role: 'guest',
  },
};

// デフォルト値を持つコンテキストを作成
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Providerのprops型定義
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // ユーザー情報の状態
  const [user, setUser] = useState<User | null>(null);

  // 認証状態の計算プロパティ
  const isAuthenticated = user !== null;

  // コンポーネントマウント時にlocalStorageからユーザー情報を取得
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('ユーザー情報の解析に失敗しました:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  /**
   * ログイン処理を行う関数
   * @param username ユーザー名
   * @param password パスワード
   * @returns ログイン成功時はtrue、失敗時はfalse
   */
  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    // モックユーザーでのログイン処理
    // 実際の実装ではAPIリクエストを行う

    // モックユーザー認証（パスワードは「password」で固定）
    if (MOCK_USERS[username] && password === 'password') {
      const mockUser = MOCK_USERS[username];

      // localStorageに保存
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      return true;
    }

    // 既存の仮ログイン処理（モックユーザーに存在しない場合）
    // どのユーザー名でもパスワードが入力されていればログイン可能
    if (username && password && !MOCK_USERS[username]) {
      const newUser: User = {
        id: `temp-${Date.now()}`,
        username,
        email: `${username}@example.com`,
      };

      // localStorageに保存
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      return true;
    }

    return false;
  };

  /**
   * ログアウト処理を行う関数
   */
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // コンテキスト値の作成
  const value = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * 認証コンテキストを使用するためのカスタムフック
 * @returns AuthContext
 * @throws Error コンテキストがProviderの外部で使用された場合
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthはAuthProviderの内部で使用する必要があります');
  }
  return context;
}
