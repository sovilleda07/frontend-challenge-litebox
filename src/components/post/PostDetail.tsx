import { useNavigate } from 'react-router';
import ReactMarkdown from 'react-markdown';
import { FaLinkedinIn, FaFacebookF, FaXTwitter } from 'react-icons/fa6';
import type { Post } from '../../types';
import { Link } from '../ui/Link';
import { MostViewed } from '../home/MostViewed';
import readIcon from '../../assets/readIcon.png';
import avatar from '../../assets/avatar.png';
import POST_MARKDOWN from './postContent.md?raw';

interface PostDetailProps {
  post: Post;
  mostViewedPosts?: Post[];
}

export const PostDetail = ({ post, mostViewedPosts = [] }: PostDetailProps) => {
  const navigate = useNavigate();

  const shareIcons = [
    { icon: <FaLinkedinIn size={18} />, label: 'LinkedIn' },
    { icon: <FaFacebookF size={18} />, label: 'Facebook' },
    { icon: <FaXTwitter size={18} />, label: 'X' },
  ];

  return (
    <div className="w-full bg-white">
      <div className="relative w-full h-[677px] min-h-[677px] flex items-end">
        <img
          src={post.coverImg?.url}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 flex flex-col gap-0 pb-16 pl-16">
          <div className="flex items-center gap-2 mb-[24px]">
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

      <div className="max-w-[1440px] mx-auto px-4 md:px-16 py-16">
        <div className="flex gap-8">
          <div className="hidden md:flex flex-col gap-6 w-[168px] shrink-0 pt-2">
            <span className="text-black font-medium text-[14px]">Share on</span>
            <div className="flex flex-col gap-3">
              {shareIcons.map(({ icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-10 h-10 border-2 border-black flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 max-w-[641px]">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-black font-bold text-[24px] leading-[130%] mb-4 mt-8 first:mt-0">
                    {children}
                  </h1>
                ),
                p: ({ children }) => (
                  <p className="text-black text-[16px] leading-[180%] mb-6">
                    {children}
                  </p>
                ),
                img: ({ src, alt }) => (
                  <img
                    src={src}
                    alt={alt}
                    className="w-full object-cover my-8"
                  />
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-lime pl-6 my-8">
                    <div className="text-black font-bold text-[18px] leading-[150%] [&>p]:mb-0">
                      {children}
                    </div>
                  </blockquote>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold text-black">{children}</strong>
                ),
              }}
            >
              {POST_MARKDOWN}
            </ReactMarkdown>

            <div className="flex md:hidden items-center gap-4 mt-8">
              <span className="text-black font-medium text-[14px]">
                Share on
              </span>
              {shareIcons.map(({ icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-10 h-10 border-2 border-black flex items-center justify-center text-black"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:block w-[304px] shrink-0">
            <MostViewed posts={mostViewedPosts} />
          </div>
        </div>

        <div className="md:hidden mt-12">
          <MostViewed posts={mostViewedPosts} />
        </div>
      </div>
    </div>
  );
};
