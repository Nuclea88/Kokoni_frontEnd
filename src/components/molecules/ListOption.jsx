import { Bookmark, ListOrdered } from 'lucide-react';

const ListOption = ({ title, subtitle, onClick, type = "list", isActive = false }) => {

  const isLibrary = type === "library";
  const Icon = isLibrary ? Bookmark : ListOrdered;
  const iconColor = isLibrary ? "text-secondary" : "text-primary";
  const bgColor = isLibrary ? "bg-secondary/20" : "bg-primary/20";
  
  return (
    <button 
      onClick={onClick}
      className={`w-full p-4 rounded-2xl border transition-all text-left flex items-center space-x-4 group ${
        isActive 
          ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(0,229,255,0.15)]" 
          : "border-white/5 bg-white/5 hover:bg-white/10"
      }`}
    >
      <i className={`p-3 ${bgColor} rounded-xl group-hover:scale-110 transition-transform flex`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </i>
      <hgroup className="m-0">
        <p className="font-bold text-white">{title}</p>
        <p className={`text-[10px] uppercase tracking-wider font-extrabold ${isActive ? 'text-primary' : 'text-textMuted'}`}>{subtitle}</p>
      </hgroup>
    </button>
  );
};
export default ListOption;