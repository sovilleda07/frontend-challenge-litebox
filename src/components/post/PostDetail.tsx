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
      <div className="relative w-full h-[488px] md:h-[677px] flex items-end">
        <img
          src={post.coverImg?.url}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 w-full flex flex-col gap-0 pb-8 pl-4 md:pb-16 md:pl-16 pr-4 md:pr-0">
          <div className="flex items-center gap-2 mb-[24px]">
            <Link
              label="Blog"
              onClick={() => navigate('/')}
              variant="breadcrumb"
              textColor="white"
            />
          </div>
          <div className="bg-white inline-flex w-fit max-w-full pt-6 pr-6 pl-6 pb-0">
            <div className="flex items-center gap-4">
              <img
                src={avatar}
                alt="author"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-black text-[16px] md:text-[20px] leading-[180%]">
                By {post.author}
              </span>
            </div>
          </div>
          <div className="bg-white w-full md:w-[528px] flex flex-col gap-[10px] p-6">
            <div className="flex flex-col gap-4">
              <h1 className="text-black font-bold text-[28px] md:text-[35px] leading-[120%] w-full md:w-[480px]">
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

      <div className="max-w-[1440px] mx-auto px-4 md:px-16 py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-y-0 md:gap-x-8">
          <div className="hidden md:flex flex-col gap-6 md:col-start-1 md:col-span-2 pt-2">
            <span className="text-black font-medium text-[14px]">Share on</span>
            <div className="flex items-center gap-6">
              {shareIcons.map(({ icon, label }) => (
                <button
                  key={`desktop-${label}`}
                  aria-label={label}
                  className="flex items-center justify-center text-black hover:text-gray-500 transition-colors"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-start-4 md:col-span-6">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-black font-bold text-[21px] leading-[130%] mb-4 mt-8 first:mt-0">
                    {children}
                  </h1>
                ),
                p: ({ children }) => (
                  <p className="text-gray-dark font-normal text-[16px] leading-[180%] mb-6">
                    {children}
                  </p>
                ),
                img: ({ src, alt }) => (
                  <img
                    src={src}
                    alt={alt}
                    className="w-full h-[294px] md:h-auto object-cover my-8"
                  />
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-lime pl-6 my-8">
                    <div className="text-black font-bold text-[21px] leading-[150%] [&>p]:mb-0">
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

            <div className="flex md:hidden flex-col gap-4 mt-8">
              <span className="text-black font-medium text-[14px]">
                Share on
              </span>
              <div className="flex items-center gap-6">
                {shareIcons.map(({ icon, label }) => (
                  <button
                    key={`mobile-${label}`}
                    aria-label={label}
                    className="flex items-center justify-center text-black hover:text-gray-500 transition-colors"
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-start-10 md:col-span-3">
            <MostViewed posts={mostViewedPosts} titleColor="black" />
          </div>
        </div>
      </div>
    </div>
  );
};
