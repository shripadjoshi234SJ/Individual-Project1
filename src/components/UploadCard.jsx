import { motion } from 'framer-motion';
import { FiUploadCloud } from 'react-icons/fi';

const UploadCard = ({ onFileSelect, selectedFile, onTitleChange, title }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-xl bg-violet-600/20 p-3 text-violet-400">
          <FiUploadCloud size={24} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Upload Notes</h3>
          <p className="text-sm text-slate-400">PDF, DOCX, or TXT files supported.</p>
        </div>
      </div>

      <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-950/70 p-8 text-center transition hover:border-violet-500">
        <FiUploadCloud size={32} className="mb-3 text-violet-400" />
        <p className="text-sm text-slate-300">{selectedFile ? selectedFile.name : 'Choose a file to begin'}</p>
        <input type="file" className="hidden" onChange={onFileSelect} accept=".pdf,.docx,.txt" />
      </label>

      <input
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="mt-4 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white"
        placeholder="Optional title"
      />
    </motion.div>
  );
};

export default UploadCard;
