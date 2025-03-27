import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center text-center px-4'>
      <h1 className='text-9xl font-bold text-gray-200'>404</h1>
      <h2 className='text-3xl font-bold text-gray-800 mt-4'>
        ページが見つかりません
      </h2>
      <p className='text-gray-600 mt-2 max-w-md'>
        お探しのページは存在しないか、移動または削除された可能性があります。
      </p>
      <Link
        to='/'
        className='mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-colors'
      >
        ホームに戻る
      </Link>
    </div>
  );
}

export default NotFound;
