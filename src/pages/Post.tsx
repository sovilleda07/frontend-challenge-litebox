import { useState } from 'react';
import { useParams } from 'react-router';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { PostDetail } from '../components/post/PostDetail';
import { RelatedPosts } from '../components/post/RelatedPosts';
import { NewPostModal } from '../components/modal/NewPostModal';
import { usePost } from '../hooks/usePost';
import { useMostViewed } from '../hooks/useMostViewed';
import { useRelatedPosts } from '../hooks/useRelatedPosts';

export const PostPage = () => {
  const { id } = useParams();
  const postId = Number(id);

  const [showModal, setShowModal] = useState(false);

  const { post, loading: postLoading } = usePost(postId);
  const { mostViewedPosts, loading: mostViewedLoading } = useMostViewed();
  const { relatedPosts, loading: relatedLoading } = useRelatedPosts(3);

  const isLoading = postLoading || mostViewedLoading || relatedLoading;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar onNewPost={() => setShowModal(true)} />
      {isLoading ? (
        <p className="text-black p-8">Loading...</p>
      ) : post ? (
        <>
          <PostDetail post={post} mostViewedPosts={mostViewedPosts} />
          <RelatedPosts
            posts={relatedPosts}
            onNewPost={() => setShowModal(true)}
          />
        </>
      ) : (
        <p className="text-black p-8">Post not found</p>
      )}
      <Footer />
      <NewPostModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};
