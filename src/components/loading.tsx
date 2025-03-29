type LoadingProps = {
  message?: string;
  className?: string;
};

const Loading: React.FC<LoadingProps> = ({
  message = 'データを読み込み中...',
  className = 'flex justify-center items-center min-h-[200px]',
}) => {
  return (
    <div className={className}>
      <p className='text-gray-500'>{message}</p>
    </div>
  );
};

export default Loading;
