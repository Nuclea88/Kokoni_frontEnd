const StatCard = ({ title, value, unit, icon: Icon, progress, progressColor = "bg-primary", borderColor = "border-l-primary" }) => {
 
  return (
    <output className={`relative bg-surface leaf-shape p-4 flex flex-col justify-between overflow-hidden border border-white/5 border-l-[3px] flex-block ${borderColor}`}>
      <header className="flex justify-between items-start">
        <hgroup className="m-0">
          <h4 className="text-[9px] font-black text-textMuted uppercase tracking-widest mb-2">{title}</h4>
          <div className="flex items-baseline space-x-1">
            <p className="text-3xl font-black text-white">{value}</p>
            {unit && <p className="text-[10px] font-bold text-primary">{unit}</p>}
          </div>
        </hgroup >
        {Icon && <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />}
      </header>
      
      {progress !== undefined && (
        <figure className="w-full bg-white/5 h-1 rounded-full mt-4">
          <i className={`h-full ${progressColor} rounded-full relative`} style={{ width: `${progress}%` }}>
            <p className={`absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 ${progressColor} rounded-full blur-sm opacity-50`} />
          </i>
        </figure>
      )}
    </output>
  );
};
export default StatCard;