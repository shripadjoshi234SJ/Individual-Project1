import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { features } from '../utils/constants';

const Landing = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.22),_transparent_45%)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-violet-500/30 bg-violet-600/10 px-3 py-1 text-sm text-violet-300">
            AI-powered note intelligence for students
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Turn your lecture notes into smart summaries instantly.
          </h1>
          <p className="mt-6 text-lg text-slate-400 sm:text-xl">
            Upload PDFs, DOCX, and TXT files, extract content, and generate summaries, key points, keywords, and MCQs using Gemini AI.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/register" className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-500">
              Get Started
            </Link>
            <Link to="/login" className="rounded-xl border border-slate-700 px-6 py-3 font-semibold text-slate-200 transition hover:border-violet-500">
              Login
            </Link>
          </div>
        </motion.div>

        <div className="mt-16 grid w-full max-w-5xl gap-6 md:grid-cols-3">
          {features.map((feature, idx) => (
            <motion.div key={feature} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 text-left shadow-xl">
              <h3 className="text-lg font-semibold text-white">{feature}</h3>
              <p className="mt-2 text-sm text-slate-400">Built for efficient study and speedy note review.</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;
