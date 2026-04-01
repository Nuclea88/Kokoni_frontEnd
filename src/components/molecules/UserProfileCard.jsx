const UserProfileCard = ({ username, rank, avatar, level }) => {

  return (
    <section className="bg-surface/100 leaf-shape p-4 flex items-center justify-between border border-white/5 relative">
      <header className="flex items-center space-x-4">
        <figure className="relative">
          <div className="w-16 h-16 block aspect-square leaf-shape rounded-bl-[1px] bg-surface p-[2px]">
            <img 
              src={avatar} 
              alt={username} 
              className="w-full h-full leaf-shape object-cover bg-background" 
            />
          </div>
          <mark className="absolute -bottom-2 -right-2 bg-primary text-background text-[10px] font-black px-2 py-0.5 rounded-full border-[3px] border-surface">
            LV.{level}
          </mark>
        </figure>
        <hgroup className="flex flex-col">
          <h2 className="text-lg font-bold text-white tracking-tight">{username}</h2>
          <p className="text-[10px] text-textMuted uppercase tracking-widest mt-0.5">{rank}</p>
        </hgroup>
      </header>
      {/* <button className="text-[10px] font-bold text-white border border-white/10 px-4 py-1.5 rounded-full hover:bg-white/5 transition-colors">
        Gestionar
      </button> */}
    </section>
  );
};
export default UserProfileCard;