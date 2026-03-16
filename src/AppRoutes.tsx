import { Routes, Route, useLocation } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import { PostPage } from './pages/Post.tsx';
import { Home } from './pages/Home.tsx';
import { PageTransition } from './components/layout/PageTransition.tsx';

export const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition keyProp="home">
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/post/:id"
          element={
            <PageTransition keyProp={location.pathname}>
              <PostPage />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};
