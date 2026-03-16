import { useNavigate } from 'react-router';
import type { RelatedPost, Post } from '../../types';
import { PostCard } from './PostCard';
import { Link } from '../ui/Link';

interface RelatedPostsProps {
  posts: RelatedPost[];
}

export const RelatedPosts = ({ posts }: RelatedPostsProps) => {
  const navigate = useNavigate();

  if (!posts || posts.length === 0) return null;

  return (
    <div className="w-full bg-white pt-16 pb-16 md:pb-24 border-t border-t-gray-light">
      <div className="max-w-[1440px] mx-auto px-4 md:px-16">
        <div className="md:grid md:grid-cols-12 md:gap-x-8">
          <div className="md:col-start-2 md:col-span-10">
            <div className="flex items-center justify-between mb-8 md:mb-12">
              <h2 className="text-black font-bold text-[32px] md:text-[40px] leading-[120%] tracking-[-0.02em]">
                Related posts
              </h2>
          <Link
            label="New post"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              navigate('/');
            }}
            arrowColor="purple"
            textColor="black"
          />
        </div>

        <div className="flex md:grid md:grid-cols-3 overflow-x-auto gap-4 md:gap-8 pb-4 md:pb-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className="w-[300px] md:w-auto shrink-0 snap-start"
            >
              <PostCard 
                post={{
                  id: post.id,
                  title: post.title,
                  coverImg: { id: 0, url: post.imageUrl, name: '' },
                  readTime: 6,
                  topic: 'Tech companies',
                } as Post} 
                variant="related" 
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  navigate(`/post/${post.id}`);
                }} 
              />
            </div>
          ))}
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};
