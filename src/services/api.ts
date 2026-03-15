import axios from 'axios';
import type { Post, RelatedPost } from '../types';

const litebox = axios.create({
  baseURL: import.meta.env.VITE_LITEBOXAPI_URL,
});

const litetech = axios.create({
  baseURL: import.meta.env.VITE_LITETECHAPI_URL,
});

export const getPosts = async (): Promise<Post[]> => {
  const { data } = await litebox.get('/api/posts', {
    params: { populate: 'coverImg' },
  });

  return data.data.map((item: any) => ({
    id: item.id,
    ...item.attributes,
    coverImg: {
      id: item.attributes.coverImg.data.id,
      ...item.attributes.coverImg.data.attributes,
      url: `${import.meta.env.VITE_LITEBOXAPI_URL}${item.attributes.coverImg.data.attributes.url}`,
    },
  }));
};

export const getPostById = async (id: number): Promise<Post> => {
  const { data } = await litebox.get(`/api/post/${id}`);
  const item = data.data;
  return {
    id: item.id,
    ...item.attributes,
    coverImg: {
      id: item.attributes.coverImg.data.id,
      ...item.attributes.coverImg.data.attributes,
    },
  };
};

export const getRelatedPosts = async (
  limit?: number,
): Promise<RelatedPost[]> => {
  const { data } = await litetech.get('/api/posts/related', {
    params: limit ? { limit } : {},
  });
  return data;
};

export const createRelatedPost = async (
  formData: FormData,
  onProgress?: (progress: number) => void,
): Promise<RelatedPost> => {
  const { data } = await litetech.post('/api/post/related', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        onProgress(progress);
      }
    },
  });
  return data;
};
