import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../services/api';
import SummaryCard from '../components/SummaryCard';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import Sidebar from '../components/Sidebar';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      const res = await api.get('/notes');
      setNotes(res.data.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to load notes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) || note.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loader message="Loading your notes..." />;

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl gap-6">
        <Sidebar />
        <div className="flex-1">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-white">Dashboard</h1>
              <p className="text-slate-400">Your saved summaries and notes.</p>
            </div>
            <Link to="/upload" className="rounded-xl bg-violet-600 px-4 py-2 font-semibold text-white">
              + New Summary
            </Link>
          </div>

          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          {filteredNotes.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-10 text-center text-slate-400">
              No notes yet. Upload one to get started.
            </motion.div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
              {filteredNotes.map((note) => (
                <SummaryCard key={note._id} note={note} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
