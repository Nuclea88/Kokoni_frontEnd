import { useState } from 'react';
import { Search, Flame, Check, Plus } from 'lucide-react';
import { useNavigate } from 'react-router';
// Rutas de tus componentes Atómicos y Moleculares
import Input from '../components/atoms/Input';
import Tag from '../components/atoms/Tag';
import  MediaCard  from '../components/molecules/MediaCard';
import  MangaListItem  from '../components/molecules/MangaListItem';
import ListButton from '../components/atoms/ListButton';


const Explore = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const categories = ['Todos', 'Acción', 'Romance', 'Seinen', 'Cyberpunk', 'Fantasía'];
  // Datos simulados estructurados
  const allManga = [
    { id: 1, title: 'Obsidian Protocol', chapters: 124, cover: 'https://images.unsplash.com/photo-1541560052-77ec1bbc09f7?q=80&w=400', isAdded: true },
    { id: 2, title: 'Cyber Spirit', chapters: 45, cover: 'https://images.unsplash.com/photo-1560972550-aba3456b5564?q=80&w=400', isAdded: false },
    { id: 3, title: 'Golden Hour', chapters: 12, cover: 'https://images.unsplash.com/photo-1580477667995-2b94f01c9516?q=80&w=400', isAdded: false },
    { id: 4, title: 'Neon Pulse', chapters: 2, cover: 'https://images.unsplash.com/photo-1614728263952-84ea206f99b6?q=80&w=400', isAdded: true },
    { id: 5, title: 'Silent Voice', chapters: 1, cover: 'https://images.unsplash.com/photo-1578632738981-43c9ad4698d8?q=80&w=400', isAdded: false },
  ];
  const handleToggleAdd = (id) => {
    // Aquí implementaremos la llamada a Spring Boot
    console.log("Manga ID pulsado para añadir/quitar:", id);
  };
  return (
    <div className="flex flex-col min-h-screen bg-background pb-32 animate-fade-in-up">
      
      {/* 1. Área Superior Fija (Buscador) */}
      <div className="px-6 pt-10 pb-4 sticky top-0 bg-background/90 backdrop-blur-md z-30 border-b border-white/5">
        <h1 className="text-2xl font-black text-white mb-6 tracking-tight">
          Explorar <span className="text-primary">Manga</span>
        </h1>
        
        <Input 
          type="text" 
          placeholder="Buscar por título, autor o género..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={Search}
        />
      </div>
      <div className="px-6 flex flex-col space-y-6 pt-4">
        
        {/* 2. Filtros de Categoría */}
        <div>
          <div className="flex space-x-3 overflow-x-auto scrollbar-hide pb-2">
            {categories.map(cat => (
              <Tag 
                key={cat} 
                active={activeCategory === cat} 
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Tag>
            ))}
          </div>
        </div>
        {/* 3. Sección de Resultados */}
        <div className="pt-2">
          <div className="flex items-center space-x-2 mb-4">
            <Flame className="w-5 h-5 text-secondary" />
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">
              {searchTerm ? 'Resultados' : 'Tendencias Actuales'}
            </h2>
          </div>
          {/* ========================================= */}
          {/* MÓVIL: VISTA DE LISTA HORIZONTAL CON BOTÓN  */}
          {/* ========================================= */}
          <div className="flex flex-col space-y-3 md:hidden">
            {allManga.map((manga) => (
              <MangaListItem 
                key={manga.id} 
                title={manga.title}
                chapters={manga.chapters}
                cover={manga.cover}
                isAdded={manga.isAdded}
                onClick={() => navigate(`/dashboard/manga/${manga.id}`)}
                onAddClick={() => handleToggleAdd(manga.id)}
                genres = { ["Acción", "Romance"]}
              />
            ))}
          </div>
          {/* ========================================= */}
          {/* ESCRITORIO/TABLET: VISTA DE GRID (Oculta en móviles) */}
          {/* ========================================= */}
          <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {allManga.map((manga) => (
              <div key={manga.id} className="relative group cursor-pointer" onClick={() => navigate(`/dashboard/manga/${manga.id}`)}>
                {/* Reutilizamos el MediaCard */}
                <MediaCard 
                  title={manga.title}
                  subtitle={`${manga.chapters} Capítulos`}
                  cover={manga.cover}
                />
                
                {/* Inyectamos tu nuevo Átomo ActionBtn superpuesto */}
                <ListButton 
                  icon={manga.isAdded ? Check : Plus}
                  variant={manga.isAdded ? "active" : "primary"}
                  onClick={(e) => { e.stopPropagation(); handleToggleAdd(manga.id); }}
                  className="absolute top-2 right-2 w-10 h-10 shadow-lg backdrop-blur-md bg-opacity-90"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Explore;