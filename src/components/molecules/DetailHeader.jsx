const DetailHeader = ({ cover, title, author, badge }) => {

  return (
    <header className="relative w-full h-[400px]">
      <img src={cover} alt={title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
      <i className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none"></i>
      
      <hgroup className="absolute bottom-0 left-0 w-full px-6 pb-2 text-center flex flex-col items-center">
        {badge && (
          <mark className="bg-primary/20 text-primary border border-primary/30 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow-[0_0_10px_var(--color-primary)]">
            {badge}
          </mark>
        )}
        <h1 className="text-3xl font-black text-white leading-tight">{title}</h1>
        <p className="text-textMuted text-xs font-semibold flex items-center mt-2 group cursor-pointer hover:text-white transition-colors">
           {author}
        </p>
      </hgroup>
    </header>
  );
};
export default DetailHeader;