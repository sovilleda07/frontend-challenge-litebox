import { useNavigate } from 'react-router';
import type { Post } from '../../types';
import { Link } from '../ui/Link';
import readIcon from '../../assets/readIcon.png';
import avatar from '../../assets/avatar.png';

interface PostDetailProps {
  post: Post;
}

export const PostDetail = ({ post }: PostDetailProps) => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <div className="relative w-full h-[677px] min-h-[677px] flex items-end">
        <img
          src={post.coverImg?.url}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-10 flex flex-col gap-0 pb-16 pl-16">
          <div className="flex items-center gap-2 mb-[24px] text-white">
            <Link
              label="Blog"
              onClick={() => navigate('/')}
              variant="breadcrumb"
              textColor="white"
            />
          </div>

          <div className="bg-white inline-flex w-fit pt-6 pr-6 pl-6 pb-0">
            <div className="flex items-center gap-4">
              <img
                src={avatar}
                alt="author"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-black text-[20px] leading-[180%]">
                By {post.author}
              </span>
            </div>
          </div>

          <div className="bg-white w-[528px] flex flex-col gap-[10px] p-6">
            <div className="flex flex-col gap-4">
              <h1 className="text-black font-bold text-[35px] leading-[120%] w-[480px]">
                {post.title}
              </h1>

              <div className="flex items-center gap-[10px]">
                <img src={readIcon} alt="read time" className="w-4 h-4" />
                <span className="text-gray-dark text-[14px] leading-[160%]">
                  {post.readTime} mins read
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
