const Loader = ({ message = 'Loading...' }) => (
  <div className="flex items-center justify-center py-10">
    <div className="flex flex-col items-center gap-3">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
      <p className="text-sm text-slate-400">{message}</p>
    </div>
  </div>
);

export default Loader;
