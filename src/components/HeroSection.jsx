import { motion } from 'framer-motion';

export function HeroSection({ name, tagline, cta }) {
  return (
    <section className="text-center py-10">
      <motion.h1 className="text-4xl font-bold mb-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {name}
      </motion.h1>
      <motion.p className="text-xl mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        {tagline}
      </motion.p>
      <button className="bg-blue-600 text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
        {cta}
      </button>
    </section>
  );
}
