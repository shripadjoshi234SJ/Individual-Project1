import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import { formatDate } from '../utils/helpers';

const Summary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data.data);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load summary');
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleRename = async () => {
    const title = window.prompt('Rename your note', note?.title || '');
    if (!title || !title.trim()) return;

    try {
      const res = await api.put(`/notes/${id}`, { title: title.trim() });
      setNote({ ...note, title: res.data.data.title });
      toast.success('Note renamed');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Rename failed');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this note permanently?')) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success('Note deleted');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Delete failed');
    }
  };

  const handleDownload = async () => {
    try {
      const response = await api.get(`/notes/${id}/download`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${note?.title || 'summary'}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success('PDF downloaded');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Download failed');
    }
  };

  if (loading) return <Loader message="Loading summary..." />;
  if (!note) return <div className="p-10 text-center text-slate-400">Summary not found.</div>;

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white">{note.title}</h1>
            <p className="text-sm text-slate-400">Created on {formatDate(note.createdAt)}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={handleRename} className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300">
              Rename
            </button>
            <button onClick={handleDownload} className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white">
              Download PDF
            </button>
            <button onClick={handleDelete} className="rounded-lg border border-rose-700 px-4 py-2 text-sm text-rose-300">
              Delete
            </button>
            <Link to="/dashboard" className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300">
              Back
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
            <h3 className="mb-3 text-xl font-semibold text-white">Summary</h3>
            <p className="text-sm leading-7 text-slate-400">{note.summary}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
            <h3 className="mb-3 text-xl font-semibold text-white">Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {note.keywords?.map((keyword) => (
                <span key={keyword} className="rounded-full bg-violet-600/20 px-3 py-1 text-sm text-violet-300">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
          <h3 className="mb-3 text-xl font-semibold text-white">MCQs</h3>
          {note.mcqs?.length > 0 ? (
            note.mcqs.map((mcq, idx) => (
              <div key={idx} className="mb-4 rounded-xl border border-slate-800 p-4">
                <p className="font-medium text-slate-200">{mcq.question}</p>
                <ul className="mt-2 space-y-1 text-sm text-slate-400">
                  {mcq.options?.map((option) => (
                    <li key={option}>{option}</li>
                  ))}
                </ul>
                <p className="mt-2 text-sm text-violet-300">Answer: {mcq.answer}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-400">No MCQs available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Summary;
