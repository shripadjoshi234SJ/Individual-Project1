export const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const truncate = (text, length = 80) => {
  if (!text) return '';
  return text.length > length ? `${text.slice(0, length)}...` : text;
};
