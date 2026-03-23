const ChapterButton = ({ chapter, isLatest = false, onClick, isReaded= true }) => {
  return (
    <button 
      onClick={onClick}
      className={`relative w-[72px] h-[64px] flex flex-col items-center justify-center shrink-0 
      rounded-tl-[42px] rounded-br-[42px] rounded-tr-[1px] rounded-bl-[1px] 
      text-sm font-black transition-all group
      ${isLatest 
        ? 'bg-secondary/20 border border-secondary/50 text-white shadow-[0_0_20px_rgba(163,44,196,0.2)] hover:border-primary/50' 
        : 'bg-surface/100 border border-textMuted/5 text-textMuted hover:bg-white/10 hover:text-white'}`}
    >
      <span className={`${isLatest ? 'text-primary' : ''}`}>{chapter}</span>
      {isLatest && <span className="block text-[8px] text-secondary tracking-widest uppercase mt-0.5">Último</span>}
      {isReaded && <span className="block text-[8px] text-textMuted tracking-widest mt-0.5">01/02/03</span>}
    </button>
  );
};
export default ChapterButton;