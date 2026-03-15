import { Fragment } from 'react';
import { useNavigate } from 'react-router';
import type { Post } from '../../types';
import { PostCard } from './PostCard';
import { Banner } from './Banner';
import { Button } from '../ui/Button';

interface PostGridProps {
  posts: Post[];
}

export const PostGrid = ({ posts }: PostGridProps) => {
  const navigate = useNavigate();
  const goToPost = (id: number | string) => navigate(`/post/${id}`);

  const groups = [];
  for (let i = 0; i < posts.length; i += 3) {
    groups.push(posts.slice(i, i + 3));
  }

  const DesktopGroup = ({
    group,
    reverse,
  }: {
    group: Post[];
    reverse?: boolean;
  }) => {
    if (group.length === 0) return null;

    const [a, b, c] = group;

    if (group.length === 1) {
      return <PostCard post={a} size="large" onClick={() => goToPost(a.id)} />;
    }

    if (group.length === 2) {
      return (
        <div className="flex gap-[33px]">
          <PostCard post={a} size="small" onClick={() => goToPost(a.id)} />
          <PostCard post={b} size="small" onClick={() => goToPost(b.id)} />
        </div>
      );
    }

    return (
      <div className="flex gap-[33px]">
        {!reverse && (
          <PostCard post={a} size="large" onClick={() => goToPost(a.id)} />
        )}
        <div className="flex flex-col gap-[33px]">
          <PostCard
            post={reverse ? a : b}
            size="small"
            onClick={() => goToPost((reverse ? a : b).id)}
          />
          <PostCard
            post={reverse ? b : c}
            size="small"
            onClick={() => goToPost((reverse ? b : c).id)}
          />
        </div>
        {reverse && (
          <PostCard post={c} size="large" onClick={() => goToPost(c.id)} />
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-[56px] w-full max-w-[976px]">
      <div className="flex flex-col items-center gap-8 md:hidden">
        {posts.map((post, index) => (
          <Fragment key={post.id}>
            <PostCard
              post={post}
              size="small"
              onClick={() => goToPost(post.id)}
            />
            {index === 2 && <Banner />}
          </Fragment>
        ))}
      </div>

      <div className="hidden md:flex flex-col gap-[56px]">
        {groups.map((group, index) => (
          <Fragment key={index}>
            <DesktopGroup group={group} reverse={index % 2 === 1} />
            {index === 0 && <Banner />}
          </Fragment>
        ))}
      </div>

      <div className="flex justify-center">
        <Button variant="primary" className="w-full md:w-auto">
          Load more
        </Button>
      </div>
    </div>
  );
};
