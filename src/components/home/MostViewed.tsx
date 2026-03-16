import type { Post } from '../../types';

interface MostViewedProps {
  posts: Post[];
  titleColor?: 'white' | 'black';
}

export const MostViewed = ({
  posts,
  titleColor = 'white',
}: MostViewedProps) => {
  const topPosts = posts.slice(0, 4);

  return (
    <div className="hidden md:flex flex-col gap-6 w-[304px]">
      <h3
        className={`font-semibold text-[18px] leading-none ${
          titleColor === 'black' ? 'text-black' : 'text-white'
        }`}
      >
        Most viewed
      </h3>
      <div className="flex flex-col gap-[12px]">
        {topPosts.map((post, index) => (
          <div key={post.id}>
            <div className="flex items-center justify-between w-[304px] h-[80px]">
              <p className="text-gray-light font-medium text-sm leading-[150%] w-[216px]">
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
