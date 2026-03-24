const DetailHeader = ({ cover, title, author, badge }) => {
  return (
    <div className="relative w-full h-[400px]">
      <img src={cover} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
      
      <div className="absolute bottom-0 left-0 w-full px-6 pb-2 text-center flex flex-col items-center">
        {badge && (
          <div className="bg-primary/20 text-primary border border-primary/30 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow-[0_0_10px_var(--color-primary)]">
            {badge}
          </div>
        )}
        <h1 className="text-3xl font-black text-white leading-tight">{title}</h1>
        <p className="text-textMuted text-xs font-semibold flex items-center mt-2 group cursor-pointer hover:text-white transition-colors">
           {author}
        </p>
      </div>
    </div>
  );
};
export default DetailHeader;