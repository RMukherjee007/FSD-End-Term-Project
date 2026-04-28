import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  return (
    <div className="animated-background">
      <motion.div
        className="blob blob-1"
        animate={{ x:[0,120,0], y:[0,60,0], scale:[1,1.15,1] }}
        transition={{ duration:22, repeat:Infinity, ease:"easeInOut" }}
      />
      <motion.div
        className="blob blob-2"
        animate={{ x:[0,-100,0], y:[0,-80,0], scale:[1,1.2,1] }}
        transition={{ duration:28, repeat:Infinity, ease:"easeInOut" }}
      />
      <motion.div
        className="blob blob-3"
        animate={{ x:[0,60,-60,0], y:[0,80,-40,0], scale:[1,1.1,0.95,1] }}
        transition={{ duration:20, repeat:Infinity, ease:"easeInOut" }}
      />
      <motion.div
        className="blob blob-4"
        animate={{ x:[0,-80,0], y:[0,100,0], scale:[1,1.3,1] }}
        transition={{ duration:26, repeat:Infinity, ease:"easeInOut" }}
      />
      <div className="noise-overlay" />
    </div>
  );
}
