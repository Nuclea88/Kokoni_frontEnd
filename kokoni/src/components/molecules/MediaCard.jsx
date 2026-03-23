const MediaCard = ({ title, subtitle, cover, badge, onClick }) => {
  return (
    <div 
      onClick={onClick} 
      className="group relative flex flex-col space-y-3 animate-fade-in-up cursor-pointer"
    >
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 shadow-xl">
        <img 
          src={cover} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-60"></div>
    
        {badge && (
          <div className="absolute bottom-3 left-3 bg-secondary/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-black text-white uppercase tracking-wider">
            {badge}
          </div>
        )}
      </div>
      <div className="px-1 flex flex-col">
        <h3 className="text-[13px] font-bold truncate text-white uppercase tracking-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-[10px] text-textMuted font-semibold mt-0.5">
          {subtitle}
        </p>
      </div>
    </div>
  );
};
export default MediaCard;