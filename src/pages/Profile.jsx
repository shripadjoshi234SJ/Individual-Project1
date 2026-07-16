import { useEffect, useState } from 'react';
import api from '../services/api';
import { formatDate } from '../utils/helpers';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/user/profile');
        setProfile(res.data.data);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Unable to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <Loader message="Loading profile..." />;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl">
        <h1 className="text-3xl font-semibold text-white">Your Profile</h1>
        <div className="mt-6 space-y-4 text-slate-400">
          <div>
            <p className="text-sm uppercase tracking-wider text-slate-500">Name</p>
            <p className="text-lg text-white">{profile?.name}</p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-wider text-slate-500">Email</p>
            <p className="text-lg text-white">{profile?.email}</p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-wider text-slate-500">Member Since</p>
            <p className="text-lg text-white">{formatDate(profile?.createdAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
