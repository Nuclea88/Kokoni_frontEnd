const ChapterButton = ({ chapter, isLatest = false, onClick, isReaded= false, readDate }) => {

  let stateClasses = "bg-surface border-white/5 text-textMuted hover:bg-white/10 hover:text-white"; 

  if (isLatest) {
    stateClasses = "bg-secondary/20 border-secondary/50 text-white shadow-[0_0_20px_rgba(163,44,196,0.35)]";
  } else if (isReaded) {
    stateClasses = "bg-primary/10 border-primary/20 text-primary/80";
  }
  return (
    <button 
      onClick={onClick}
      className={`relative w-[72px] h-[64px] flex flex-col items-center justify-center shrink-0 
      leaf-shape text-sm font-black transition-all hover:scale-105 active:scale-95 border-2 ${stateClasses}`}
        
    >
      <span className={`${isLatest  || isReaded ? 'text-primary' : ''}text-base`}>{chapter}</span>
       {isLatest ? (
        <span className="block text-[8px] text-secondary tracking-widest uppercase mt-0.5 font-black">
            Visto
        </span>
      ) : isReaded ? (
        <span className="block text-[7px] text-primary/60 tracking-tighter mt-1 font-bold">
            {readDate ? readDate : 'LEÍDO'}
        </span>
      ) : null}
    </button>
  );
};
export default ChapterButton;