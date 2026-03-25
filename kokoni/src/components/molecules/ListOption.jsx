import { Bookmark, ListOrdered } from 'lucide-react';

const ListOption = ({ title, subtitle, onClick, type = "list" }) => {

  const isLibrary = type === "library";
  const Icon = isLibrary ? Bookmark : ListOrdered;
  const iconColor = isLibrary ? "text-secondary" : "text-primary";
  const bgColor = isLibrary ? "bg-secondary/20" : "bg-primary/20";
  
  return (
    <button 
      onClick={onClick}
      className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all text-left flex items-center space-x-4 group"
    >
      <i className={`p-3 ${bgColor} rounded-xl group-hover:scale-110 transition-transform flex`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </i>
      <hgroup className="m-0">
        <p className="font-bold text-white">{title}</p>
        <p className="text-[10px] text-textMuted uppercase tracking-wider">{subtitle}</p>
      </hgroup>
    </button>
  );
};
export default ListOption;