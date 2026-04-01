import { Trash } from 'lucide-react';

const CustomListHeader = ({ listName, onDeleteClick }) => {
    
  return (
    <header className="flex justify-between items-center px-1 pb-4 animate-fade-in">
        <p className="text-textMuted text-[10px] uppercase font-black tracking-widest flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary mr-2 shadow-[0_0_10px_rgba(255,107,107,0.5)]"></span>
            Lista Personalizada
        </p>
        <button 
            onClick={onDeleteClick} 
            className="text-red-400/80 text-xs font-bold hover:text-red-400 flex items-center bg-red-400/5 px-3 py-1.5 rounded-full border border-red-400/10 transition-all hover:border-red-400/30"
        >
            <Trash className="w-3 h-3 mr-1" strokeWidth={3} />
            Borrar {listName}
        </button>
    </header>
  );
};
export default CustomListHeader;