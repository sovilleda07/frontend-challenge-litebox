import { useNavigate } from 'react-router';
import type { Post } from '../../types';
import { PostCard } from '../post/PostCard';

interface HeroPostProps {
  post: Post;
}

export const HeroPost = ({ post }: HeroPostProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1309px]">
      <h2 className="text-white font-semibold text-[18px] leading-none">
        Today story
      </h2>
      <PostCard
        post={post}
        variant="hero"
        theme="dark"
        linkSize="md"
        onClick={() => navigate(`/post/${post.id}`)}
      />
    </div>
  );
};
