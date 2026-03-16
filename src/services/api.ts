import axios from 'axios';
import type { Post, RelatedPost } from '../types';

const LITEBOX_URL = import.meta.env.VITE_LITEBOXAPI_URL;
const LITETECH_URL = import.meta.env.VITE_LITETECHAPI_URL;

const litebox = axios.create({
  baseURL: LITEBOX_URL,
});

const litetech = axios.create({
  baseURL: LITETECH_URL,
});

const mapPost = (item: any): Post => ({
  id: item.id,
  ...item.attributes,
  coverImg: {
    id: item.attributes.coverImg.data.id,
    ...item.attributes.coverImg.data.attributes,
    url: `${LITEBOX_URL}${item.attributes.coverImg.data.attributes.url}`,
  },
});

export const getPosts = async (): Promise<Post[]> => {
  const { data } = await litebox.get('/api/posts', {
    params: { populate: 'coverImg' },
  });

  return data.data.map(mapPost);
};

export const getPostById = async (id: number): Promise<Post> => {
  const { data } = await litebox.get(`/api/posts/${id}`);

  return mapPost(data.data);
};

export const getRelatedPosts = async (
  limit?: number,
): Promise<RelatedPost[]> => {
  const { data } = await litetech.get('/api/posts/related', {
    params: limit ? { limit } : undefined,
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
