import { Todo } from '../types/todo';

export default function TodoCard({ todo }: { todo: Todo }) {
  return (
    <div className='bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow'>
      <div className='flex items-center mb-2'>
        <div
          className={`${
            todo.completed
              ? 'bg-green-100 text-green-700'
              : 'bg-blue-100 text-blue-700'
          } rounded-full w-8 h-8 flex items-center justify-center mr-2 flex-shrink-0`}
        >
          {todo.id}
        </div>
        <span className='text-sm text-gray-500'>ユーザーID: {todo.userId}</span>
      </div>
      <h3
        className={`text-lg font-medium ${
          todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
        }`}
      >
        {todo.title}
      </h3>

    </div>
  );
}
