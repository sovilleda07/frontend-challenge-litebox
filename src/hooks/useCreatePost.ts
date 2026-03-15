import { useState, useRef, useEffect } from 'react';
import { createRelatedPost } from '../services/api';

export type UploadState =
  | 'idle'
  | 'uploading'
  | 'uploaded'
  | 'success'
  | 'error';

export const useCreatePost = () => {
  const [uploadState, setUploadState] = useState<UploadState>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const simulateUpload = async () => {
    setUploadState('uploading');
    setUploadProgress(0);

    await new Promise<void>((resolve) => {
      let progress = 0;

      intervalRef.current = setInterval(() => {
        progress += Math.random() * 20;

        if (progress >= 100) {
          progress = 100;

          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }

          setUploadProgress(100);
          resolve();
        } else {
          setUploadProgress(Math.round(progress));
        }
      }, 200);
    });

    setUploadState((prev) => (prev === 'uploading' ? 'uploaded' : prev));
  };

  const triggerError = () => {
    setUploadState('error');
  };

  const confirmPost = async (title: string, image: File) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);

    await createRelatedPost(formData);

    setUploadState('success');
  };

  const reset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setUploadState('idle');
    setUploadProgress(0);
  };

  return {
    uploadState,
    uploadProgress,
    simulateUpload,
    confirmPost,
    triggerError,
    reset,
  };
};
