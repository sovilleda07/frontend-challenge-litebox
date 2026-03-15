import { useRef, useState } from 'react';
import { useCreatePost } from '../../hooks/useCreatePost';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Loader } from '../ui/Loader';

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const fieldWrapper = 'w-full md:w-[400px]';

export const NewPostModal = ({ isOpen, onClose }: NewPostModalProps) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [errorSource, setErrorSource] = useState<'size' | 'api' | null>(null);

  const [errors, setErrors] = useState({
    title: '',
    image: '',
    api: '',
  });

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

  const state = {
    idle: uploadState === 'idle',
    uploading: uploadState === 'uploading',
    uploaded: uploadState === 'uploaded',
    success: uploadState === 'success',
    error: uploadState === 'error',
  };

  const resetForm = () => {
    setTitle('');
    setImage(null);
    setErrors({ title: '', image: '', api: '' });
    setErrorSource(null);
  };

  const handleClose = () => {
    reset();
    resetForm();
    onClose();
  };

  const validateForm = () => {
    const newErrors = { title: '', image: '', api: '' };

    if (!title.trim()) newErrors.title = 'Post title is required';
    if (!image) newErrors.image = 'Please upload an image';

    setErrors(newErrors);

    return !newErrors.title && !newErrors.image;
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setErrors((prev) => ({ ...prev, image: '' }));

    if (file.size > MAX_FILE_SIZE) {
      setErrorSource('size');
      triggerError();
      return;
    }

    await simulateUpload();
  };

  const handleConfirm = async () => {
    if (!validateForm()) return;

    if (uploadState !== 'uploaded') return;

    try {
      await confirmPost(title, image!);
    } catch {
      setErrorSource('api');
      setErrors((e) => ({
        ...e,
        api: 'Something went wrong. Please try again.',
      }));
    }
  };

  const handleRetry = async () => {
    if (errorSource === 'api' && image && title) {
      setErrors((e) => ({ ...e, api: '' }));
      setErrorSource(null);

      try {
        await confirmPost(title, image);
      } catch {
        setErrorSource('api');
        setErrors((e) => ({
          ...e,
          api: 'Something went wrong. Please try again.',
        }));
      }

      return;
    }

    setErrorSource(null);
    reset();
    setImage(null);
  };

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

        {state.success ? (
          <div className="flex flex-col items-center gap-12 py-6">
            <p className="text-purple-dark font-medium text-[35px] leading-[120%] text-center">
              Your post was successfully uploaded!
            </p>

            <Button variant="black" onClick={handleClose}>
              Done
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2 items-center px-10">
              <h2 className="text-purple-dark font-medium text-[35px] leading-[120%] text-center">
                Upload your post
              </h2>

              <p className="text-center text-gray-dark text-[18px] leading-[180%]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse commodo libero.
              </p>
            </div>

            <div className="flex flex-col gap-6 items-center">
              <div className={fieldWrapper}>
                <Input
                  placeholder="Post Title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (errors.title) {
                      setErrors((prev) => ({ ...prev, title: '' }));
                    }
                  }}
                  error={errors.title || undefined}
                />
              </div>

              {state.idle && (
                <>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                    className="hidden"
                    onChange={handleFileChange}
                  />

                  <div className={`${fieldWrapper} flex flex-col gap-1`}>
                    <button
                      onClick={handleUploadClick}
                      className="
                        w-full h-[56px]
                        border-[2px] border-black bg-lime
                        flex items-center justify-center gap-2
                        text-black text-[16px]
                      "
                    >
                      {image?.name ?? 'Upload image'}
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

                    {errors.image && (
                      <span className="text-error text-sm">{errors.image}</span>
                    )}
                  </div>
                </>
              )}

              {(state.uploading || state.uploaded) && (
                <div className={`${fieldWrapper} flex flex-col gap-2`}>
                  <Loader
                    status={state.uploading ? 'loading' : 'success'}
                    progress={uploadProgress}
                    onCancel={reset}
                  />

                  {errors.api && (
                    <span className="text-error text-sm">{errors.api}</span>
                  )}
                </div>
              )}

              {state.error && (
                <div className={fieldWrapper}>
                  <Loader status="error" progress={0} onRetry={handleRetry} />
                </div>
              )}
            </div>

            <div className="flex justify-center">
              <Button
                variant="black"
                onClick={handleConfirm}
                disabled={state.uploading}
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
