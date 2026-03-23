import { Check, Plus } from 'lucide-react';
import ListButton from "../atoms/ListButton";
import GenreTag from '../atoms/GenreTag';

const MangaListItem = ({ title, chapters, cover, isAdded, onClick, onAddClick, genres = []}) => {
  return (
    <div 
      className="flex items-center space-x-4 bg-surface/30 border border-white/5 rounded-2xl p-2.5 hover:bg-surface/50 transition-colors cursor-pointer group"
      onClick={onClick}
    >
      
      {/* Imagen Izquierda */}
      <div className="relative w-[60px] h-[85px] shrink-0 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.5)]">
        <img 
          src={cover} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 rounded-tl-[30px] rounded-br-[30px] rounded-tr-[1px] rounded-bl-[1px] " 
        />
        {/* Sombra integrada en la base de la imagen */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60"></div>
      </div>
      {/* Info Central */}
      <div className="flex-1 flex flex-col justify-center overflow-hidden">
        <h3 className="text-sm font-black text-white uppercase tracking-tight truncate group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-[10px] text-textMuted font-bold mt-1 uppercase tracking-widest truncate">
          {chapters} Capítulos
        </p>
        {genres && genres.length > 0 && (
          <div className="flex space-x-2 mt-2">
            {genres.slice(0, 2).map((g, idx) => (
               <GenreTag key={g} text={g} variant={idx % 2 === 0 ? "secondary" : "primary"} /> 
            ))}
          </div>
        )}
      </div>
      {/* Botón de Añadir / Check Derecha */}
      <div className="pr-1">
        <ListButton 
          icon={isAdded ? Check : Plus} 
          variant={isAdded ? "active" : "primary"}
          onClick={(e) => { 
            e.stopPropagation(); // Evita que al dar al botón se abra la página de detalles
            onAddClick(e); 
          }}
        />
      </div>
    </div>
  );
};
export default MangaListItem