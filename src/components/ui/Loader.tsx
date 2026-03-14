type LoaderStatus = 'loading' | 'error' | 'success';

interface LoaderProps {
  status: LoaderStatus;
  progress?: number;
  onCancel?: () => void;
  onRetry?: () => void;
}

export const Loader = ({
  status,
  progress = 0,
  onCancel,
  onRetry,
}: LoaderProps) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {status === 'loading' && (
        <div className="flex flex-col gap-1">
          <span className="text-sm text-black">Loading image {progress}%</span>
          <div className="relative w-full h-1.5 bg-gray-light">
            <div
              className="absolute top-0 left-0 h-full bg-black transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={onCancel}
              className="text-sm font-medium text-black hover:opacity-70 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="flex flex-col gap-1">
          <span className="text-sm text-black">Failed to upload your file</span>
          <div className="w-full h-1.5 bg-error" />
          <div className="flex justify-end">
            <button
              onClick={onRetry}
              className="text-sm font-medium text-black hover:opacity-70 cursor-pointer"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {status === 'success' && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-black">Upload successful</span>
            <span className="text-sm text-black">✓</span>
          </div>
          <div className="w-full h-1.5 bg-black" />
        </div>
      )}
    </div>
  );
};
