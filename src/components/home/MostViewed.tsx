import { useNavigate } from 'react-router';
import type { Post } from '../../types';

interface MostViewedProps {
  posts: Post[];
}

export const MostViewed = ({ posts }: MostViewedProps) => {
  const navigate = useNavigate();
  const topPosts = posts.slice(0, 4);

  return (
    <div className="hidden md:flex flex-col gap-6 w-[304px]">
      <h3 className="text-white font-semibold text-[18px] leading-none">
        Most viewed
      </h3>

      <div className="flex flex-col gap-[12px]">
        {topPosts.map((post, index) => (
          <div key={post.id}>
            <div
              className="flex items-center justify-between cursor-pointer w-[304px] h-[80px]"
              onClick={() => navigate(`/post/${post.id}`)}
            >
              <p
                className="text-white font-medium text-sm leading-[150%]"
                style={{ width: '216px' }}
              >
                {post.title}
              </p>
              <div className="overflow-hidden shrink-0 w-[80px] h-[80px] p-[10px]">
                <img
                  src={post.coverImg?.url || ''}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {index < topPosts.length && (
              <div className="w-full border-b border-gray-light" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
