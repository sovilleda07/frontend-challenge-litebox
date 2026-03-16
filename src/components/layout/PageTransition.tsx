import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  keyProp: string;
}

export const PageTransition = ({ children, keyProp }: PageTransitionProps) => {
  return (
    <motion.div
      key={keyProp}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
};
