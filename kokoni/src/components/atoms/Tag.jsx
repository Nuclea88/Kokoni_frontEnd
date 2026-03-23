const Tag = ({ children, active = false, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 whitespace-nowrap
      ${active 
        ? 'bg-secondary text-white shadow-lg shadow-secondary/20' 
        : 'bg-surface text-textMuted border border-white/5 hover:bg-white/10'}`}
    >
      {children}
    </button>
  );
};
export default Tag;