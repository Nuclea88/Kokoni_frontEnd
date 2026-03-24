import { useCallback, useEffect, useRef, useState } from 'react';
import { Search, Flame, Check, Plus } from 'lucide-react';
import { useNavigate } from 'react-router';
// Rutas de tus componentes Atómicos y Moleculares
import Input from '../components/atoms/Input';
import Tag from '../components/atoms/Tag';
import  MediaCard  from '../components/molecules/MediaCard';
import  MangaListItem  from '../components/molecules/MangaListItem';
import ListButton from '../components/atoms/ListButton';
import mangaService from '../services/mangaService';
import trackerService from '../services/trackerService';


const Explore = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const categories = ['Todos', 'Acción', 'Romance', 'Seinen', 'Cyberpunk', 'Fantasía'];
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        setPage(0);
        setHasMore(true);
         setMangas([]); 
    }, [searchTerm]);

    useEffect(() => {
        const fetchMangas = async () => {
            if (!searchTerm.trim()) 
            return;
            setLoading(true);

            try {
            const data = await mangaService.search(searchTerm, page);
            setMangas(prev => (page === 0 ? data : [...prev, ...data]));
            setHasMore(data.length > 0);;
            } catch (error) {
            console.error("Error buscando mangas", error);
            } finally {
            setLoading(false);
            }
        };
        const timeoutId = setTimeout(fetchMangas, 500);
        return () => clearTimeout(timeoutId);
    }, [searchTerm, page]);

  const handleToggleAdd = async (externalId, event) => {
    event.stopPropagation(); 
    
    const targetManga = mangas.find(m => m.externalId === externalId);
    
    try {
      if (targetManga.isAddedToLibrary) {
        // En un futuro borraremos de aquí. Como Explore no sabe el trackerId exacto por el DTO, 
        // de momento dejaremos que si pulsas de nuevo, te mande a MangaDetails para borrarlo.
        console.log("Ya está en tu biblioteca.");
        return;
      }
      await trackerService.add(externalId);
      setMangas(prevMangas => prevMangas.map(m => 
        m.externalId === externalId ? { ...m, isAddedToLibrary: true } : m
      ));
      
    } catch (error) {
      console.error("Error al interactuar con el Tracker:", error);
      alert("Hubo un problema de conexión con tu biblioteca.");
    }
  };

    const observer = useRef();
    const lastMangaElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
        }
    }, { rootMargin: '200px' } );
    
    if (node) observer.current.observe(node);
    }, [loading, hasMore]);

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
            {loading && <p className="text-primary text-xs animate-pulse">Buscando en los archivos de Kokoni...</p>}
            
            {mangas.map((manga, index) => (
              <div 
                key={manga.externalId}
                >
              <MangaListItem 
                title={manga.title}
                author={manga.author || "???"} 
                cover={manga.imageUrl}
                isAdded={manga.isAddedToLibrary}
                onClick={() => navigate(`/dashboard/manga/${manga.externalId}`)}
                onAddClick={() => handleToggleAdd(manga.externalId)}
                genres={manga.genres || []}
              />
              </div>
            ))}

            {!loading && searchTerm && mangas.length === 0 && (
              <p className="text-textMuted text-sm text-center py-10">No hemos encontrado nada con ese nombre...</p>
            )}
          </div>

          {/* ========================================= */}
          {/* ESCRITORIO/TABLET: VISTA DE GRID (Oculta en móviles) */}
          {/* ========================================= */}
          <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            { mangas.map((manga, index) => (
              <div key={manga.externalId}  className="relative group cursor-pointer" onClick={() => navigate(`/dashboard/manga/${manga.externalId}`)}>
                <MediaCard 
                  title={manga.title}
                  subtitle={manga.author || "Autor desconocido"}
                  cover={manga.imageUrl}
                />
                
                <ListButton 
                  icon={manga.isAddedToLibrary ? Check : Plus}
                  variant={manga.isAddedToLibrary ? "active" : "primary"}
                  onClick={(e) => { e.stopPropagation(); handleToggleAdd(manga.externalId); }}
                  className="absolute top-2 right-2 w-10 h-10 shadow-lg backdrop-blur-md bg-opacity-90"
                />
              </div>
            ))}
          </div>
          {!loading && hasMore && mangas.length > 0 && (
            <div ref={lastMangaElementRef} className="h-10 w-full" />
          )}
        </div>
      </div>
    </div>
  );
};
export default Explore;