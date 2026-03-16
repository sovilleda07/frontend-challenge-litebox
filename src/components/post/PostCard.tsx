import type { Post } from '../../types';
import { TopicPill } from '../ui/TopicPill';
import { Link } from '../ui/Link';
import readIcon from '../../assets/readIcon.png';

const cardVariants = {
  sm: {
    wrapper: 'md:w-[393px] md:h-[628px]',
    info: 'w-full md:w-[345px]',
    title: 'text-[18px] leading-[150%]',
  },
  md: {
    wrapper: 'md:w-[412px] md:h-[378px]',
    info: 'w-full md:w-[364px]',
    title: 'text-[18px] leading-[150%]',
  },
  lg: {
    wrapper: 'md:w-[528px] md:h-[790px]',
    info: 'w-full md:w-[508px]',
    title: 'text-[18px] leading-[150%]',
  },
  related: {
    wrapper: 'w-full md:h-[378px]',
    info: 'w-full',
    title: 'text-[18px] leading-[150%]',
  },
  hero: {
    wrapper: 'w-full md:h-[348px]',
    info: 'w-full md:w-[557px]',
    title: 'text-[18px] md:text-[41px] leading-[150%] md:leading-[130%]',
  },
} as const;

type CardVariant = keyof typeof cardVariants;
type CardTheme = 'light' | 'dark';

interface PostCardProps {
  post: Post;
  variant?: CardVariant;
  theme?: CardTheme;
  onClick?: () => void;
}

const themeVariants = {
  light: {
    bg: 'bg-white',
    title: 'text-black',
    link: 'black',
  },
  dark: {
    bg: 'bg-black',
    title: 'text-white',
    link: 'white',
  },
};

interface InfoPanelProps {
  post: Post;
  variant: CardVariant;
  theme: CardTheme;
  onClick?: () => void;
}

const InfoPanel = ({ post, variant, theme, onClick }: InfoPanelProps) => {
  const themeStyles = themeVariants[theme];
  const styles = cardVariants[variant];

  return (
    <div className="absolute bottom-6 left-6 right-6 flex flex-col">
      <div className={`${themeStyles.bg} w-fit px-6 pt-6`}>
        <TopicPill label={post.topic} active showClose={false} />
      </div>

      <div
        className={`
          ${themeStyles.bg}
          ${styles.info}
          px-6 py-3
          flex flex-col gap-[10px]
        `}
      >
        <h2
          className={`${themeStyles.title} ${styles.title} font-bold`}
        >
          {post.title}
        </h2>

        <div className="flex items-center justify-between">
          <Link
            onClick={onClick}
            arrowColor="purple"
            textColor={themeStyles.link}
          />

          <div className="flex items-center gap-2">
            <img src={readIcon} alt="read time" className="w-4 h-4" />
            <span
              className="text-gray-dark text-[14px] leading-[160%]"
            >
              {post.readTime} mins
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PostCard = ({
  post,
  variant = 'md',
  theme = 'light',
  onClick,
}: PostCardProps) => {
  const imageUrl = post.coverImg?.url ?? '';
  const styles = cardVariants[variant];

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden cursor-pointer w-full h-[378px] ${styles.wrapper}`}
    >
      <img
        src={imageUrl}
        alt={post.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <InfoPanel
        post={post}
        variant={variant}
        theme={theme}
        onClick={onClick}
      />
    </div>
  );
};
