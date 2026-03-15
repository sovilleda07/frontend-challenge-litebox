import { useRef, useState } from 'react';
import { useCreatePost } from '../../hooks/useCreatePost';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Loader } from '../ui/Loader';

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewPostModal = ({ isOpen, onClose }: NewPostModalProps) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [titleError, setTitleError] = useState('');
  const [imageError, setImageError] = useState('');
  const [apiError, setApiError] = useState('');
  const [errorSource, setErrorSource] = useState<'size' | 'api' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    uploadState,
    uploadProgress,
    simulateUpload,
    confirmPost,
    triggerError,
    reset,
  } = useCreatePost();

  if (!isOpen) return null;

  const handleClose = () => {
    reset();
    setTitle('');
    setImage(null);
    setTitleError('');
    setImageError('');
    setApiError('');
    setErrorSource(null);
    onClose();
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setImageError('');

    if (file.size > 5 * 1024 * 1024) {
      setErrorSource('size');
      triggerError();
      return;
    }

    await simulateUpload();
  };

  const handleConfirm = async () => {
    if (uploadState === 'uploaded') {
      if (!title.trim()) {
        setTitleError('Post title is required');
        return;
      }
      setApiError('');
      try {
        await confirmPost(title, image!);
      } catch {
        setErrorSource('api');
        setApiError('Something went wrong. Please try again.');
      }
      return;
    }

    if (!title.trim()) {
      setTitleError('Post title is required');
      return;
    }
    if (!image) {
      setImageError('Please upload an image');
      return;
    }
  };

  const handleRetry = async () => {
    if (errorSource === 'api' && image && title) {
      setApiError('');
      setErrorSource(null);
      try {
        await confirmPost(title, image);
      } catch {
        setErrorSource('api');
        setApiError('Something went wrong. Please try again.');
      }
      return;
    }
    setErrorSource(null);
    reset();
    setImage(null);
  };

  const isIdle = uploadState === 'idle';
  const isUploading = uploadState === 'uploading';
  const isUploaded = uploadState === 'uploaded';
  const isSuccess = uploadState === 'success';
  const isError = uploadState === 'error';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div
        className="
          bg-lime w-[calc(100%-48px)] md:w-[640px]
          border-[3px] border-black
          shadow-[10px_10px_0px_0px_#000000]
          p-10 flex flex-col
        "
      >
        <div className="flex justify-end p-[10px]">
          <button
            onClick={handleClose}
            className="w-12 h-12 flex items-center justify-center"
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="#000"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {isSuccess ? (
          <div className="flex flex-col items-center gap-12 py-6">
            <p
              className="text-purple-dark font-medium text-[35px] leading-[120%] text-center"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              Your post was successfully uploaded!
            </p>
            <Button variant="black" onClick={handleClose}>
              Done
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2 items-center px-10">
              <h2
                className="text-purple-dark font-medium text-[35px] leading-[120%] text-center"
                style={{ fontFamily: 'Space Grotesk' }}
              >
                Upload your post
              </h2>
              <p
                className="text-center text-gray-dark text-[18px] leading-[180%]"
                style={{ fontFamily: 'Space Grotesk' }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse commodo libero.
              </p>
            </div>

            <div className="flex flex-col gap-6 items-center">
              <div className="w-full md:w-[400px]">
                <Input
                  placeholder="Post Title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (titleError) setTitleError('');
                  }}
                  error={titleError || undefined}
                />
              </div>

              {isIdle && (
                <>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <div className="w-full md:w-[400px] flex flex-col gap-1">
                    <button
                      onClick={handleUploadClick}
                      className="
                        w-full h-[56px]
                        border-[2px] border-black bg-lime
                        flex items-center justify-center gap-2
                        text-black text-[16px]
                      "
                      style={{ fontFamily: 'Space Grotesk' }}
                    >
                      {image ? image.name : 'Upload image'}
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 4v16M4 12l8-8 8 8"
                          stroke="#000"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    {imageError && (
                      <span
                        className="text-error text-sm"
                        style={{ fontFamily: 'Space Grotesk' }}
                      >
                        {imageError}
                      </span>
                    )}
                  </div>
                </>
              )}

              {(isUploading || isUploaded) && (
                <div className="w-full md:w-[400px] flex flex-col gap-2">
                  <Loader
                    status={isUploading ? 'loading' : 'success'}
                    progress={uploadProgress}
                    onCancel={reset}
                  />
                  {apiError && (
                    <span
                      className="text-error text-sm"
                      style={{ fontFamily: 'Space Grotesk' }}
                    >
                      {apiError}
                    </span>
                  )}
                </div>
              )}

              {isError && (
                <div className="w-full md:w-[400px]">
                  <Loader status="error" progress={0} onRetry={handleRetry} />
                </div>
              )}
            </div>

            <div className="flex justify-center">
              <Button
                variant="black"
                onClick={handleConfirm}
                disabled={isUploading}
              >
                Confirm
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
