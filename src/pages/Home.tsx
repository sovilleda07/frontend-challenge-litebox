import { useState, useEffect } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HeroPost } from '../components/home/HeroPost';
import { TopicsFilter } from '../components/home/TopicsFilter';
import { PostGrid } from '../components/home/PostGrid';
import { MostViewed } from '../components/home/MostViewed';
import { NewPostModal } from '../components/modal/NewPostModal';
import { getPosts } from '../services/api';
import type { Post } from '../types';

export const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [activeTopics, setActiveTopics] = useState<string[]>(['All']);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleToggleTopic = (topic: string) => {
    if (topic === 'All') {
      setActiveTopics(['All']);
      setFilteredPosts(posts);
      return;
    }
    const newTopics = activeTopics.includes(topic)
      ? activeTopics.filter((t) => t !== topic)
      : [...activeTopics.filter((t) => t !== 'All'), topic];
    if (newTopics.length === 0) {
      setActiveTopics(['All']);
      setFilteredPosts(posts);
    } else {
      setActiveTopics(newTopics);
      setFilteredPosts(posts.filter((p) => newTopics.includes(p.topic)));
    }
  };

  const heroPost = posts[0];
  const mostViewedPosts = posts.slice(0, 4);
  const topics = ['All', ...new Set(posts.map((p) => p.topic))];
  const isFiltered = !activeTopics.includes('All');
  const gridPosts = isFiltered ? filteredPosts : filteredPosts.slice(1, 10);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar onNewPost={() => setShowModal(true)} />
      <main className="flex flex-col gap-14 px-4 md:px-16 max-w-[1440px] mx-auto w-full pt-[81px]">
        {heroPost && <HeroPost post={heroPost} />}
        <TopicsFilter
          topics={topics}
          activeTopics={activeTopics}
          onToggle={handleToggleTopic}
        />
        <div className="flex gap-[29px] md:mb-[238px]">
          {loading ? (
            <p className="text-white">Loading...</p>
          ) : (
            <>
              <PostGrid posts={gridPosts} />
              <MostViewed posts={mostViewedPosts} />
            </>
          )}
        </div>
      </main>
      <Footer />
      <NewPostModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};
