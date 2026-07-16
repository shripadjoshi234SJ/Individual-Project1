import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import UploadCard from '../components/UploadCard';
import toast from 'react-hot-toast';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [extractedText, setExtractedText] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('title', title);

    try {
      const uploadRes = await api.post('/notes/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { extractedText } = uploadRes.data.data;
      setExtractedText(extractedText);

      const summarizeRes = await api.post('/notes/summarize', {
        title: title || uploadRes.data.data.title,
        originalText: extractedText,
      });

      toast.success('Summary generated successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to process note');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-white">Upload and summarize</h1>
          <p className="text-slate-400">Upload a lecture note and create an AI summary in seconds.</p>
        </div>

        <UploadCard onFileSelect={handleFileSelect} selectedFile={selectedFile} onTitleChange={setTitle} title={title} />

        <div className="mt-6 flex justify-end">
          <button onClick={handleUpload} disabled={loading} className="rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white disabled:opacity-50">
            {loading ? 'Processing...' : 'Generate Summary'}
          </button>
        </div>

        {extractedText && (
          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <h3 className="mb-3 text-lg font-semibold text-white">Extracted Text</h3>
            <p className="whitespace-pre-wrap text-sm text-slate-400">{extractedText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
