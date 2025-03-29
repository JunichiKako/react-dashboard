
import useSWR from 'swr';
import { Todo } from '../types/todo';
import { fetcher } from '../utils/fetcher';
import TodoCard from '../components/todo-card';
import Loading from '../components/loading';
import { useToast } from '../provider/toast-provider';

const DashboardPage = () => {
  const { showToast } = useToast();

  const {
    data: todos,
    error,
    isLoading,
  } = useSWR<Todo[]>(
    'https://jsonplaceholder.typicode.com/todos?_limit=12',
    (url: string) => fetcher<Todo[]>(url)
  );

  if (isLoading) {
    return <Loading />;
  }

  // エラー発生時
  if (error) {
    // エラーをToastで表示
    showToast(`エラーが発生しました: ${error.message}`, 'error');

    // エラー時のフォールバックUIを表示
    return (
      <div className='container mx-auto p-4'>
        <h1 className='text-2xl font-bold text-gray-800 mb-6'>Todoリスト</h1>
        <div className='bg-gray-50 p-8 rounded-lg text-center'>
          <p className='text-gray-600 mb-4'>データの読み込みに失敗しました</p>
          <button
            className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
            onClick={() => window.location.reload()}
          >
            再読み込み
          </button>
        </div>
      </div>
    );
  }

  // 正常時のUI
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold text-gray-800 mb-6'>Todoリスト</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {todos?.map((todo) => <TodoCard key={todo.id} todo={todo} />)}
      </div>
    </div>
  );
};

export default DashboardPage;
