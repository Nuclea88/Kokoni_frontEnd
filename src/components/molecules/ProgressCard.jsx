import React from 'react';

const ProgressCard = ({ 
  title, 
  image, 
  currentChapter, 
  totalChapters, 
  isCustom, 
  onClick 
}) => {
  const progressPercent = (currentChapter / totalChapters || 1) * 100;

  return (
    <article 
      onClick={onClick}
      className="min-w-[280px] bg-surface/40 border border-white/5 leaf-shape p-3 flex space-x-4 items-center cursor-pointer hover:bg-surface/60 transition-all"
    >
      <img 
        src={image} 
        className="w-16 h-20 object-cover rounded-lg shadow-lg" 
        alt={title}
        referrerPolicy="no-referrer"
      />
      <section className="flex flex-col flex-1 truncate">
        <h4 className="text-sm font-bold text-white uppercase flex items-center truncate">
          <span className="truncate">{title}</span>
          {isCustom && (
             <span className="text-[9px] bg-primary text-background px-2 py-1 rounded leaf-shape shrink-0 m-2 ">Personal</span>
          )}
        </h4>
        <p className="text-[10px] text-textMuted mb-2"> Capítulo {currentChapter || 0} • {totalChapters || '??'}</p>
        <figure className="w-full bg-background/50 h-1 rounded-full overflow-hidden mt-auto">
          <div 
            className="bg-kokoni-gradient h-full rounded-full shadow-[0_0_10px_rgba(0,229,255,0.5)]"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </figure>
      </section>
    </article>
  );
};

export default ProgressCard;
