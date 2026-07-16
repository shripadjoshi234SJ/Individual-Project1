import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { formatDate, truncate } from '../utils/helpers';

const SummaryCard = ({ note }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">{note.title}</h3>
          <p className="text-xs text-slate-500">{formatDate(note.createdAt)}</p>
        </div>
      </div>
      <p className="mb-4 text-sm text-slate-400">{truncate(note.summary, 140)}</p>
      <div className="flex gap-3">
        <Link to={`/summary/${note._id}`} className="text-sm font-medium text-violet-400 hover:text-violet-300">
          View details
        </Link>
      </div>
    </motion.div>
  );
};

export default SummaryCard;
