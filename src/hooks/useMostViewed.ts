import { usePosts } from './usePosts';

export const useMostViewed = (limit = 4) => {
  const { posts, loading, error } = usePosts();
  const mostViewedPosts = posts.slice(0, limit);

  return { mostViewedPosts, loading, error };
};
