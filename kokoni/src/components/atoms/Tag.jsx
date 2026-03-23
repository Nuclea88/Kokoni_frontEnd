const Tag = ({ children, active = false, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`px-5 py-2 text-xs font-bold transition-all duration-300 whitespace-nowrap
      rounded-tl-3xl rounded-br-3xl  
      ${active 
        ? 'bg-secondary text-white shadow-lg shadow-secondary/20 border-transparent' 
        : 'bg-surface text-textMuted border border-white/5 hover:bg-white/10'}`}
    >
      {children}
    </button>
  );
};
export default Tag;