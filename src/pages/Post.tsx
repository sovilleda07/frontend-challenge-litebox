import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { PostDetail } from '../components/post/PostDetail';
import { RelatedPosts } from '../components/post/RelatedPosts';
import { getPostById, getPosts, getRelatedPosts } from '../services/api';
import type { Post, RelatedPost } from '../types';

export const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [mostViewedPosts, setMostViewedPosts] = useState<Post[]>([]);
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [postData, allPosts, relatedData] = await Promise.all([
          getPostById(Number(id)),
          getPosts(),
          getRelatedPosts(3),
        ]);
        setPost(postData);
        setMostViewedPosts(allPosts.slice(0, 4));
        setRelatedPosts(relatedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar onNewPost={() => {}} />
      <div className="pt-[81px]">
        {loading ? (
          <p className="text-black p-8">Loading...</p>
        ) : post ? (
          <>
            <PostDetail post={post} mostViewedPosts={mostViewedPosts} />
            <RelatedPosts posts={relatedPosts} />
          </>
        ) : (
          <p className="text-black p-8">Post not found</p>
        )}
      </div>
      <Footer />
    </div>
  );
};
