import type { Post } from '../../types';
import { TopicPill } from '../ui/TopicPill';
import { Link } from '../ui/Link';
import readIcon from '../../assets/readIcon.png';

type CardSize = 'large' | 'small';

interface PostCardProps {
  post: Post;
  size?: CardSize;
  onClick?: () => void;
}

interface InfoPanelProps {
  isLarge: boolean;
  post: Post;
  onClick?: () => void;
}

const InfoPanel = ({ isLarge, post, onClick }: InfoPanelProps) => (
  <div className="absolute bottom-0 left-0 right-0 flex flex-col p-6">
    <div className="bg-white inline-flex w-fit px-6 pt-6 pb-2">
      <TopicPill label={post.topic} active showClose={false} />
    </div>
    <div
      className={`bg-white flex flex-col gap-2.5 px-6 ${
        isLarge ? 'py-6' : 'py-3'
      }`}
    >
      <h2
        className={`text-black font-bold leading-[150%] ${
          isLarge ? 'text-[21px]' : 'text-[18px]'
        }`}
      >
        {post.title}
      </h2>

      <div className="flex items-center justify-between w-full">
        <Link onClick={onClick} arrowColor="purple" textColor="black" />

        <div className="flex items-center gap-2">
          <img src={readIcon} alt="read time" className="w-4 h-4" />
          <span className="text-gray-dark text-sm">{post.readTime} mins</span>
        </div>
      </div>
    </div>
  </div>
);

export const PostCard = ({ post, size = 'small', onClick }: PostCardProps) => {
  const imageUrl = post.coverImg?.url ?? '';
  const isLarge = size === 'large';

  return (
    <div
      onClick={onClick}
      className={`
        relative overflow-hidden cursor-pointer
        w-[327px] h-[378px]
        ${isLarge ? 'md:w-[528px] md:h-[790px]' : 'md:w-[412px] md:h-[379px]'}
      `}
    >
      <img
        src={imageUrl}
        alt={post.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <InfoPanel isLarge={isLarge} post={post} onClick={onClick} />
    </div>
  );
};
