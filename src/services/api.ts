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
  const { data } = await litebox.get(`/api/posts/${id}`);
  return data;
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
): Promise<RelatedPost> => {
  const { data } = await litetech.post('/api/post/related', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};
