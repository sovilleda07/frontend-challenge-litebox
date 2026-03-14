import type { Post } from '../../types';
import { TopicPill } from '../ui/TopicPill';
import { Link } from '../ui/Link';
import readIcon from '../../assets/readIcon.png';

interface HeroPostProps {
  post: Post;
  onRead?: () => void;
}

export const HeroPost = ({ post, onRead }: HeroPostProps) => {
  const imageUrl = post.coverImg?.url || '';

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1309px]">
      <h2 className="text-white font-semibold text-[18px] leading-none">
        Today story
      </h2>

      <div className="relative w-full h-[378px] md:h-[348px] overflow-hidden">
        <img
          src={imageUrl}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute bottom-6 left-6 z-10 flex flex-col">
          <div
            className="bg-black inline-flex w-fit"
            style={{
              paddingTop: '24px',
              paddingRight: '24px',
              paddingLeft: '24px',
              paddingBottom: '8px',
            }}
          >
            <TopicPill label={post.topic} active showClose={false} />
          </div>

          <div
            className="bg-black flex flex-col gap-2.5 w-[279px] md:w-[557px]"
            style={{
              paddingTop: '12px',
              paddingRight: '24px',
              paddingBottom: '12px',
              paddingLeft: '24px',
            }}
          >
            <h1
              className="text-white font-bold text-[18px] md:text-[41px]"
              style={{ lineHeight: '130%' }}
            >
              {post.title}
            </h1>

            <div className="flex items-center justify-between w-full">
              <Link onClick={onRead} arrowColor="purple" />
              <div className="flex items-center gap-2">
                <img src={readIcon} alt="read time" className="w-4 h-4" />
                <span className="text-gray-dark text-sm">
                  {post.readTime} mins
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
