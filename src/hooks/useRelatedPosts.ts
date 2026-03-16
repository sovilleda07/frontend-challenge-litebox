import { useState, useEffect } from 'react';
import { getRelatedPosts } from '../services/api';
import type { RelatedPost } from '../types';

export const useRelatedPosts = (limit = 3) => {
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        const data = await getRelatedPosts(limit);
        setRelatedPosts(data);
      } catch (err) {
        console.error('Error fetching related posts:', err);
        setError('Failed to fetch related posts');
      } finally {
        setLoading(false);
      }
    };
    fetchRelatedPosts();
  }, [limit]);

  return { relatedPosts, loading, error };
};
