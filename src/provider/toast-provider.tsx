import React, { createContext, useContext, useState, ReactNode } from 'react';

// トーストのタイプを定義
export type ToastType = 'success' | 'error' | 'warning' | 'info';

// トースト1つ分のデータ型
export type Toast = {
  message: string;
  type: ToastType;
  id: number;
};

// コンテキストの型定義
type ToastContextType = {
  showToast: (message: string, type: ToastType) => void;
  hideToast: (id: number) => void;
  toasts: Toast[];
};

// コンテキストの作成
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// トーストを使用するためのカスタムフック
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// プロバイダーの型
type ToastProviderProps = {
  children: ReactNode;
};

// トーストプロバイダーコンポーネント
export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [idCounter, setIdCounter] = useState(0);

  // トーストを表示する関数
  const showToast = (message: string, type: ToastType = 'info') => {
    const id = idCounter;
    setIdCounter((prevId) => prevId + 1);

    setToasts((prev) => [...prev, { message, type, id }]);

    // 3秒後に自動で消える
    setTimeout(() => {
      hideToast(id);
    }, 3000);
  };

  // 特定のトーストを非表示にする関数
  const hideToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast, toasts }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

// トースト表示用コンテナコンポーネント
const ToastContainer: React.FC = () => {
  const { toasts, hideToast } = useToast();

  // トーストのタイプに応じたスタイルを取得
  const getToastStyles = (type: ToastType): string => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      case 'warning':
        return 'bg-yellow-500 text-white';
      case 'info':
      default:
        return 'bg-blue-500 text-white';
    }
  };

  if (toasts.length === 0) return null;

  return (
    <div className='fixed bottom-4 right-4 z-50 flex flex-col gap-2'>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-3 rounded-lg shadow-lg flex justify-between items-center min-w-[250px] max-w-md transform transition-all duration-300 ease-in-out animate-fade-in ${getToastStyles(
            toast.type
          )}`}
        >
          <p>{toast.message}</p>
          <button
            onClick={() => hideToast(toast.id)}
            className='ml-4 text-white hover:text-gray-200 focus:outline-none'
            aria-label='Close toast'
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};
