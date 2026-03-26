import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import  Tag  from '../components/atoms/Tag';
import MediaCard from '../components/molecules/MediaCard';
import { Plus, Trash } from 'lucide-react';
import ListButton from '../components/atoms/ListButton';
import trackerService from '../services/trackerService';
import customListService from '../services/customListService';
import { useModal } from '../context/ModalContext';
import CreateListForm from '../components/molecules/CreateListForm';
import CustomListHeader from '../components/molecules/CustomListHeader';
import ConfirmActionContent from '../components/molecules/ConfirmActionContent';

const Home = () => {

    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState('Pendiente');
    const [trackers, setTrackers] = useState([]);
    const [customLists, setCustomLists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [listItems, setListItems] = useState([]);
    const { openModal, closeModal, showAlert } = useModal();

    const statusMap = {
        'Pendiente': 'PLANNING',
        'Leyendo': 'IN_PROGRESS',
        'Leído': 'COMPLETED',
        'Pospuesto': 'DROPPED'
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const [trackerData, listData] = await Promise.all([
                    trackerService.getMyTrackers(),
                    customListService.getMyLists()
                ]);
                setTrackers(trackerData);
                setCustomLists(listData);
            } catch (error) {
                console.error("Error cargando el Home:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    useEffect(() => {
        const fetchListItems = async () => {
            const targetList = customLists.find(l => l.name === activeFilter);
            if (targetList) {
                const detailedList = await customListService.getListDetails(targetList.id);
                setListItems(detailedList.items || []);
            } else {
                setListItems([]);
            }
        };
        fetchListItems();
    }, [activeFilter, customLists]);

    const filteredDisplay = () => {
        
        if (statusMap[activeFilter]) {
            return trackers
                .filter(t => t.userStatus === statusMap[activeFilter])
                .map(t => ({
                    id: t.externalId,
                    title: t.mangaTitle,
                    image: t.mangaImageUrl,
                    chapter: `Cap. ${t.progressUnit || 0} / ${t.totalChapters || '??'}`
                }));
        }
        return listItems.map(item => ({
            id: item.externalId,
            title: item.title,
            image: item.imageUrl,
            chapter: "En lista"
        }));
    };
    if (loading) return <div className="text-primary p-10 text-center animate-pulse">Abriendo Kokoni...</div>;

const handleCreateList = () => {
    openModal({
        title: "Crear Nueva Lista",
        content: (
           <CreateListForm 
                onCancel={closeModal} 
                saveText="Crear Lista"
                onSave={async (name) => {
                    if (!name.trim()) return;
                    try {
                        const newList = await customListService.createList(name);
                        setCustomLists(prev => [...prev, newList]);
                        setActiveFilter(newList.name);
                        closeModal();
                        showAlert("Lista Creada", `La lista "${name}" está lista para usarse.`);
                    } catch (e) {
                        showAlert("Error", "No se pudo crear la lista.");
                    }
                }}
            />
        )
    });
};






const handleDeleteList = (listId, listName) => {
    openModal({
        title: "Atención",
        content: (
            <ConfirmActionContent
                title={`¿Estás seguro de que quieres borrar la lista ${listName}?`}
                description="Tus mangas no se eliminarán de tu biblioteca general, solo perderán esta etiqueta."
                confirmText="Sí, borrarla"
                cancelText="Mantenla"
                onCancel={closeModal}
                onConfirm={async () => {
                    try {
                        await customListService.deleteList(listId);
                        setCustomLists(prev => prev.filter(l => l.id !== listId));
                        setActiveFilter('Pendiente');
                        closeModal();
                        showAlert("Lista Eliminada", `Has borrado ${listName} con éxito.`);
                    } catch (e) {
                        showAlert("Error", "No se pudo eliminar la lista.");
                    }
                }}
            />
        )
    });
};









  return (
    <main className="flex flex-col space-y-8 animate-fade-in">
      {trackers.filter(t => t.userStatus === 'IN_PROGRESS').length > 0 && (
      <section>
        <header className="flex justify-between items-end mb-4 px-2">
            <h2 className="text-textMuted text-[10px] font-black tracking-[0.2em] uppercase">CONTINÚA LEYENDO</h2>
            <button type="button" className="text-primary text-xs font-bold cursor-pointer hover:underline bg-transparent border-0 leading-none">Ver todo</button>
        </header>
        <nav className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
         {trackers.filter(t => t.userStatus === 'IN_PROGRESS').map((manga) => (
                            <article key={manga.trackerId} 
                                 onClick={() => navigate(`/dashboard/manga/${manga.externalId}`)}
             className="min-w-[280px] bg-surface/40 border border-white/5 leaf-shape p-3 flex space-x-4 items-center cursor-pointer hover:bg-surface/60 transition-all">
                <img src={manga.mangaImageUrl} className="w-16 h-20 object-cover rounded-lg shadow-lg" alt={manga.mangaTitle} onClick={() => navigate(`/dashboard/manga/${manga.externalId}`)}/>
                <section className="flex flex-col flex-1">
                  <h4 className="text-sm font-bold text-white uppercase">{manga.mangaTitle}</h4>
                  <p className="text-[10px] text-textMuted mb-2"> Capítulo {manga.progressUnit} • {manga.totalChapters}</p>
                  <figure className="w-full bg-background/50 h-1 rounded-full overflow-hidden mt-auto">
                    <div className="bg-kokoni-gradient h-full rounded-full shadow-[0_0_10px_rgba(0,229,255,0.5)]"
                         style={{ width: `${(manga.progressUnit / manga.totalChapters || 1) * 100}%` }}></div>
                  </figure>
                </section>
              </article>
            ))}
        </nav>
      </section>
      )}
      <section className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
        {['Leyendo', 'Leído', 'Pospuesto', 'Pendiente', ...customLists.map(l => l.name)].map(f => (
                    <Tag key={f} active={activeFilter === f} onClick={() => setActiveFilter(f)}>{f}</Tag>
                    ))}
                    <button 
                        onClick={handleCreateList} 
                        className="text-primary text-sm font-bold whitespace-nowrap ml-2 cursor-pointer hover:underline"
                    >
                        + Nueva Lista
                    </button>
            </section>





{(() => {
    const currentCustomList = customLists.find(l => l.name === activeFilter);
    if (!currentCustomList) return null; 
    return (
        <CustomListHeader 
            listName={currentCustomList.name} 
            onDeleteClick={() => handleDeleteList(currentCustomList.id, currentCustomList.name)} 
        />
    );
})()}












      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
         {filteredDisplay().map((manga) => (
                    <MediaCard 
                        key={manga.id} 
                        title={manga.title} 
                        cover={manga.image} 
                        subtitle={manga.chapter}
                        onClick={() => navigate(`/dashboard/manga/${manga.id}`)}
                    />
                ))}
            </section>
            <aside className="fixed bottom-24 right-6 z-50">
                <ListButton icon={Plus} variant="solid" className="w-14 h-14 shadow-2xl" onClick={() => navigate('/dashboard/explorar')} />
            </aside>
    </main>
  );
};
export default Home;