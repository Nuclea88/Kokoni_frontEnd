import { useCallback, useEffect, useRef, useState } from 'react';
import { Search, Flame, Check, Plus, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router';
import Input from '../components/atoms/Input';
import Tag from '../components/atoms/Tag';
import MediaCard from '../components/molecules/MediaCard';
import MangaListItem from '../components/molecules/MangaListItem';
import ListButton from '../components/atoms/ListButton';
import mangaService from '../services/mangaService';
import trackerService from '../services/trackerService';
import logoLila from '../assets/kokoni_lila.png';

const Explore = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const categories = ['Todos', 'Acción', 'Romance', 'Seinen', 'Cyberpunk', 'Fantasía'];
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setPage(0);
    setHasMore(true);
    setMangas([]);
  }, [searchTerm]);

  useEffect(() => {
    const fetchMangas = async () => {
      if (!searchTerm.trim()) return;
      setLoading(true);
      try {
        setError(null);
        const data = await mangaService.search(searchTerm, page);
        setMangas(prev => (page === 0 ? data : [...prev, ...data]));
        setHasMore(data.length > 0);
      } catch (err) {
        console.error("Error buscando mangas", err);
        setError("Error de conexión con la base de datos.");
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchMangas, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, page]);

  const handleToggleAdd = async (externalId, event) => {
    if (event) event.stopPropagation();
    const targetManga = mangas.find(m => m.externalId === externalId);
    try {
      if (targetManga.isAddedToLibrary) return;
      await trackerService.add(externalId);
      setMangas(prev => prev.map(m => 
        m.externalId === externalId ? { ...m, isAddedToLibrary: true } : m
      ));
    } catch (err) {
      console.error("Error en tracker:", err);
    }
  };

  const observer = useRef();

  const lastMangaElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    }, { rootMargin: '250px' });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  return (
    <main className="flex flex-col bg-background pb-32 animate-fade-in-up">
      <header className="px-6 pt-10 pb-4 sticky top-0 bg-background/90 backdrop-blur-md z-30 border-b border-white/5">
        <h1 className="text-2xl font-black text-white mb-6 tracking-tight">
          Explorar <span className="text-primary">Manga</span>
        </h1>
        <Input 
          type="text" 
          placeholder="Busca por título..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={Search}
        />
      </header>
      <section className="px-6 flex flex-col space-y-6 pt-4">
        <div className="flex flex-col space-y-4 border-0">
          <nav className="flex space-x-3 overflow-x-auto scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map(cat => (
              <Tag key={cat} active={activeCategory === cat} onClick={() => setActiveCategory(cat)}>
                {cat}
              </Tag>
            ))}
          </nav>
          <button 
            onClick={() => navigate('/dashboard/Lista Personalizada')}
            className="flex items-center space-x-2 text-primary font-bold text-xs hover:opacity-80 transition-opacity w-fit px-2 py-1"
          >
            <PlusCircle className="w-4 h-4" />
            <span>¿No encuentras lo que buscas? Añádela tú mismo</span>
          </button>
        </div>
        <section className="pt-2">
          <header className="flex items-center space-x-2 mb-6">
            <Flame className="w-5 h-5 text-secondary" />
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">
              {searchTerm ? 'Resultados' : 'Tendencias'}
            </h2>
          </header>
          {loading && page === 0 && (
            <figure className="flex flex-col items-center justify-center py-20 animate-pulse">
              <img src={logoLila} alt="C" className="w-16 h-16 object-contain drop-shadow-[0_0_15px_rgba(186,104,200,0.5)] mb-4" />
              <p className="text-secondary font-black text-[9px] tracking-[0.3em] uppercase">Sincronizando...</p>
            </figure>
          )}
          {mangas.length > 0 && (
            <article className="m-0">
              <nav className="md:hidden flex flex-col space-y-3">
                {mangas.map((manga) => (
                  <MangaListItem 
                    key={manga.externalId}
                    title={manga.title} author={manga.author} cover={manga.imageUrl}
                    isAdded={manga.isAddedToLibrary}
                    genres={manga.genres || []}
                    onClick={() => navigate(`/dashboard/manga/${manga.externalId}`)}
                    onAddClick={(e) => handleToggleAdd(manga.externalId, e)}
                  />
                ))}
              </nav>
              <nav className="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {mangas.map((manga) => (
                  <figure key={manga.externalId} className="relative group cursor-pointer" onClick={() => navigate(`/dashboard/manga/${manga.externalId}`)}>
                    <MediaCard title={manga.title} subtitle={manga.author || "Autor..."} cover={manga.imageUrl} />
                    <ListButton 
                      icon={manga.isAddedToLibrary ? Check : Plus}
                      variant={manga.isAddedToLibrary ? "active" : "primary"}
                      onClick={(e) => { e.stopPropagation(); handleToggleAdd(manga.externalId, e); }}
                      className="absolute top-2 right-2 w-10 h-10 shadow-xl backdrop-blur-md bg-background/60 border border-white/10 hover:bg-background/80"
                    />
                  </figure>
                ))}
              </nav>
              {loading && page > 0 && (
                 <figure className="w-full flex justify-center py-8">
                    <i className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></i>
                 </figure>
              )}
              {hasMore && <figure ref={lastMangaElementRef} className="h-10 w-full" />}
            </article>
          )}
          {!loading && searchTerm && mangas.length === 0 && (
            <figure className="py-20 text-center opacity-50">
              <Search className="w-10 h-10 text-white mx-auto mb-4" />
              <p className="text-white font-bold">Sin resultados en la base de datos</p>
              <p className="text-textMuted text-xs">Prueba con otro título o añádela arriba</p>
            </figure>
          )}
        </section>
      </section>
    </main>
  );
};
export default Explore;