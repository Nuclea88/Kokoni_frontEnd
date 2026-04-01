import { Play, Bookmark, ArrowDownUp} from 'lucide-react';
import  Button  from '../components/atoms/Button';
import  StatItem  from '../components/atoms/StatItem';
import  ChapterButton  from '../components/atoms/ChapterButton';
import DetailHeader from '../components/molecules/DetailHeader';
import GenreTag from '../components/atoms/GenreTag';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';
import mangaService from '../services/mangaService';
import trackerService from '../services/trackerService';
import progressService from '../services/progressService';
import customMediaService from '../services/customMediaService';
import { useModal } from '../context/ModalContext';
import ListOption from '../components/molecules/ListOption';
import customListService from '../services/customListService';
import CreateListForm from '../components/molecules/CreateListForm';
import ConfirmActionContent from '../components/molecules/ConfirmActionContent';
import { Edit2 } from 'lucide-react';
import Input from '../components/atoms/Input';

export const MangaDetails = () => {

const { id } = useParams(); 
  const [manga, setManga] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showAlert, openModal, closeModal } = useModal();
  const [lists, setLists] = useState([]);
  const fetchedId = useRef(null);
  const [currentListId, setCurrentListId] = useState(null);
  const [isReversed, setIsReversed] = useState(false);
  const isOfficialManga = isNaN(id);

  useEffect(() => {
        const fetchListsAndLocation = async () => {
        try {
            const myLists = await customListService.getMyLists();
            setLists(myLists);
            
            for (const list of myLists) {
                const details = await customListService.getListDetails(list.id);
              
                if (details.items.some(item => String(item.externalId) === String(id))) {
                    setCurrentListId(list.id);
                    break;
                }
            }
        } catch (e) {
            console.error(e);
        }
    }
    fetchListsAndLocation();
}, [id]);

  useEffect(() => {
    if (fetchedId.current === id) return;
    fetchedId.current = id;

    const fetchDetails = async () => {
      try {
        setError(null);
        const isCustomMedia = !isNaN(id);
          if (isCustomMedia) {
          const data = await customMediaService.getById(id);
          setManga(data);
        } else {
          const data = await mangaService.getById(id);
          setManga(data);
       }
      } catch (error) {
        console.error("Error al obtener los detalles del manga:", error);
        setError("¡Ups! Parece que los servidores de MangaDex están tomando un café. Reinténtalo en unos segundos.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><p className="text-primary animate-pulse w-full text-center">Analizando datos de Kokoni...</p></div>;
    if (error) return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <p className="text-4xl">📡</p>
      </div>
      <h2 className="text-xl font-black text-white mb-2">Error de Conexión</h2>
      <p className="text-textMuted text-sm mb-8 max-w-xs">{error}</p>
      <Button variant="primary" onClick={() => window.location.reload()}>Reintentar conexión</Button>
    </main>
  );
  if (!manga) return <div className="min-h-screen bg-background flex items-center justify-center text-white">Manga no encontrado</div>;

  const chapters = Array.from(
    { length: manga.totalChapters }, 
    (_, i) => isReversed ? i + 1 : manga.totalChapters - i
  );

  const handleChapterClick = async (chapterNum, isAlreadyRead) => {
    if (!chapterNum || chapterNum <= 0) {
      showAlert("Próximamente", "Este manga aún no tiene capítulos registrados. ¡Vuelve más adelante!");
      return;
    }
    if (!manga.trackerId) {
      showAlert("Primero añade el manga a tu biblioteca");
      return;
    }
    if (loading) return;
    try {
      if (isAlreadyRead) {
        await progressService.unmarkAsRead(manga.trackerId, chapterNum);
        setManga(prev => ({
          ...prev,
          readChapters: prev.readChapters.filter(p => p.progressUnit !== chapterNum)
        }));
      } else {
        if (manga.readChapters?.some(p => p.progressUnit === chapterNum)) return;

        const newProgress = await progressService.markAsRead(manga.trackerId, chapterNum);
        setManga(prev => ({
          ...prev,
          readChapters: [...(prev.readChapters || []), newProgress]
        }));
      }
       if (manga.isAddedInTracker) {
         const totalLeidos = isAlreadyRead ? (manga.readChapters?.length || 1) - 1 : (manga.readChapters?.length || 0) + 1;
         let nuevoEstado = 'IN_PROGRESS';
         if (totalLeidos === 0) {
             nuevoEstado = 'PLANNING';
         } 
         else if (totalLeidos >= manga.totalChapters && manga.totalChapters > 0) {
             nuevoEstado = 'COMPLETED';
         }
         if (manga.userStatus !== nuevoEstado) {
             trackerService.updateStatus(manga.trackerId, nuevoEstado).catch(e => console.error(e));
             setManga(prev => ({ ...prev, userStatus: nuevoEstado }));
       } 
      }
    } catch (error) {
      console.error("Error al gestionar el capítulo", error);
      showAlert("Error al gestionar el capítulo", error.message || "Hubo un problema con el capítulo.");
    }
  };

const handleBookmarkClick = async () => {
    openModal({
      title: manga.isAddedInTracker ? "Gestionar en mi biblioteca" : "Elije dónde guardarlo",
      content: (
        <section className="space-y-3">

<div className="flex items-center space-x-2 py-2">
              <hr className="h-[1px] flex-1 bg-white/5"></hr>
              <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Estado de lectura</p>
              <hr className="h-[1px] flex-1 bg-white/5"></hr>
           </div>
           
           {manga.isAddedInTracker ? (
             <div className="grid grid-cols-4 gap-2 mb-2">
                 {[
                   { value: 'PLANNING', label: 'Pendiente' },
                   { value: 'IN_PROGRESS', label: 'Leyendo' },
                   { value: 'COMPLETED', label: 'Leído' },
                   { value: 'DROPPED', label: 'Pospuesto' }
                 ].map(status => {
                     const isCurrent = manga.userStatus === status.value; 
                     
                     return (
                         <Button 
                             key={status.value}
                             variant={isCurrent ? "primary" : "secondary"}
                             className={`text-[9px] py-1.5 px-0.5 whitespace-nowrap transition-all ${isCurrent ? 'opacity-100 font-bold shadow-lg' : 'opacity-50 hover:opacity-100 border-white/5'}`}
                             onClick={async () => {
                                 if (isCurrent) return;
                                 try {
                                     await trackerService.updateStatus(manga.trackerId, status.value);
                                    setManga(prev => ({ ...prev, userStatus: status.value }));
                                     closeModal();
                                     showAlert("Estantería", `Has movido este manga a ${status.label}.`);
                                 } catch (e) {
                                     showAlert("Error", "No se pudo cambiar de estante.");
                                 }
                             }}
                         >
                             {status.label}
                         </Button>
                     );
                 })}
             </div>
           ) : (
             <p className="text-[10px] text-center text-textMuted/50 mb-2 italic">Añade tu manga a una lista para organizar su lectura.</p>
           )}

           <ListOption 
              type="library" 
              title="Biblioteca General" 
              subtitle={(currentListId === null && manga.isAddedInTracker) ? "◆ UBICACIÓN ACTUAL" : "Sin lista específica"}
              isActive={currentListId === null && manga.isAddedInTracker}
              onClick={() => confirmSave(null)} 
           />
           
           <div className="flex items-center space-x-2 py-2">
              <hr className="h-[1px] flex-1 bg-white/5"></hr>
              <p className="text-[10px] font-black text-white/20 uppercase tracking-widest"> Listas personalizadas</p>
              <hr className="h-[1px] flex-1 bg-white/5"></hr>
           </div>
           
           {lists.map(list => {
              const isCurrent = currentListId === list.id;
              return (
                  <ListOption 
                    key={list.id} 
                    title={list.name} 
                    subtitle={isCurrent ? "◆ UBICACIÓN ACTUAL" : `${list.isPublic ? 'Pública' : 'Privada'} • ${list.itemCount} items`}
                    isActive={isCurrent}
                    onClick={() => confirmSave(list.id)} 
                  />
              );
           })}
           
           <Button 
               variant="secondary" 
               className="w-full mt-2 text-primary border-primary/20 hover:bg-primary/10" 
               onClick={handleOpenCreateList}
            >
               + Crear Nueva Lista
            </Button>
           {manga.isAddedInTracker && (
             <footer className="pt-4 mt-2 border-t border-white/5">
              
                <Button 
                   variant="secondary" 
                   className="w-full text-red-500 bg-red-500/10 border-red-500/20 hover:bg-red-500/20 font-bold"
                   onClick={() => {
                        openModal({
                            title: "Cuidado",
                            content: (
                                <ConfirmActionContent
                                    title="¿Borrar este manga?"
                                    description="Perderás tu progreso actual y desaparecerá de todas tus listas. No se puede deshacer."
                                    confirmText="Sí, borrarlo"
                                    cancelText="Cancelar"
                                    onCancel={handleBookmarkClick} 
                                    onConfirm={async () => {
                                        try {
                                            await trackerService.remove(manga.trackerId);
                                            await customListService.removeFromAllLists(id);
                                            setManga(prev => ({ ...prev, isAddedInTracker: false, trackerId: null, readChapters: [] }));
                                            setCurrentListId(null);
                                            closeModal();
                                            showAlert("Eliminado", "Se ha borrado de tu biblioteca.");
                                        } catch(e) {
                                            showAlert("Error", "No se pudo eliminar de la biblioteca.");
                                        }
                                    }}
                                />
                            )
                        });
                   }}
                >
                  Eliminar de la biblioteca (borra progreso)
                </Button>
             </footer>
           )}
        </section>
      )
    });
};

  const handleOpenCreateList = () => {
  openModal({
    title: "Crear Nueva Lista",
    content: (
      <CreateListForm 
        onCancel={handleBookmarkClick} 
        saveText="Crear y Guardar"
        onSave={async (name) => {
          if (!name.trim()) return;
          try {
            const newList = await customListService.createList(name);
            setLists(prev => [...prev, newList]);
            await confirmSave(newList.id);
          } catch (e) {
            showAlert("Error", "No se ha podido crear la lista.");
          }
        }}
      />
    )
  });
};

const confirmSave = async (listId) => {
  if (manga.isAddedInTracker && currentListId === (listId || null)) {
        closeModal();
        return; 
    }
    try {
      let currentTrackerId = manga.trackerId;
      let newInternalMangaId = null;

      if (!manga.isAddedInTracker) {
        const resp = await trackerService.add(id); 
        currentTrackerId = resp.trackerId;
        newInternalMangaId = resp.mangaId;
      }
         await customListService.removeFromAllLists(id);
      if (listId) {
        await customListService.addCustomMediaToList(listId, id);
      }
      
      setManga(prev => ({ 
          ...prev, 
          isAddedInTracker: true, 
          trackerId: currentTrackerId, 
          userStatus: 'PLANNING',
          ...(newInternalMangaId && { id: newInternalMangaId })
      }));
      setCurrentListId(listId || null);
      closeModal();
      showAlert("Actualizado", listId ? "Movido a tu lista personalizada." : "Movido a la biblioteca general.");
    } catch (e) {
      console.error(e);
      showAlert("Error", "No se pudo actualizar la ubicación.");
    }
  };
    
  const lastRead = manga.readChapters?.length > 0 
    ? Math.max(...manga.readChapters.map(c => c.progressUnit)) 
    : 0;

  const nextChapter = lastRead < manga.totalChapters ? lastRead + 1 : manga.totalChapters;
  const isAllRead = lastRead === manga.totalChapters && manga.totalChapters > 0;

const handleOpenCustomizeModal = () => {
    let customChapters = manga.totalChapters || '';
    let customTitle = manga.title || '';
    openModal({
        title: isOfficialManga ? "Personalizar Ficha" : "Editar Ficha",
        content: (
            <div className="space-y-4 pt-2">
                <p className="text-xs text-textMuted px-2 text-center">
                    {isOfficialManga 
                        ? "¿MangaDex se equivocó? Créate una versión privada con los datos reales."
                        : "Actualiza los datos de tu ficha (ej: suma capítulos nuevos)."}
                </p>
                <fieldset className="border-0">
                    <label className="text-[10px] font-black tracking-[0.2em] text-textMuted uppercase mb-2">
                        Título
                    </label>
                    <Input 
                        placeholder="Título" 
                        defaultValue={customTitle} 
                        onChange={e => customTitle = e.target.value} o
                    />
                </fieldset>
                <fieldset className="border-0">
                    <label className="text-[10px] font-black tracking-[0.2em] text-textMuted uppercase mb-2">
                        Total de Capítulos Real
                    </label>
                    <Input 
                        type="number" 
                        placeholder="Ej: 50" 
                        defaultValue={customChapters} 
                        onChange={e => customChapters = e.target.value} 
                    />
                </fieldset>
                
                <div className="flex space-x-3 pt-4">
                    <Button onClick={closeModal} variant="secondary" className="w-[50%] py-2">
                        Cancelar
                    </Button>



                    <Button 
                        onClick={async () => {
                            if (!customChapters || customChapters <= 0) return;
                            try {
                                const parsedChapters = parseInt(customChapters);
                                const totalLeidos = manga.readChapters?.length || 0;
                                let estadoCalculado = manga.userStatus;
                                
                                if (estadoCalculado === 'COMPLETED' && totalLeidos < parsedChapters) {
                                    estadoCalculado = 'IN_PROGRESS';
                                } 
                                else if ((estadoCalculado === 'IN_PROGRESS' || estadoCalculado === 'PLANNING') && totalLeidos > 0 && totalLeidos >= parsedChapters) {
                                    estadoCalculado = 'COMPLETED';
                                }
                                if (isOfficialManga) {
                                    const newCustom = await customMediaService.create({
                                        title: customTitle || manga.title, 
                                        baseMangaId: manga.id,    
                                        customTotalChapters: parsedChapters,
                                        imageUrl: manga.imageUrl,
                                        description: manga.description,
                                        customAuthor: manga.author,
                                        status: estadoCalculado
                                    });
                                    if (manga.trackerId && manga.userStatus !== estadoCalculado) {
                                        await trackerService.updateStatus(manga.trackerId, estadoCalculado);
                                    }
                                    
                                    closeModal();
                                    showAlert("Ficha Creada", "Cargando tu versión...");
                                    window.location.href = `/dashboard/manga/${newCustom.id}`;
                                } else {
                                    await customMediaService.update(id, {
                                        title: customTitle,
                                        customTotalChapters: parsedChapters
                                    });
                                    if (manga.userStatus !== estadoCalculado) {
                                        await trackerService.updateStatus(manga.trackerId, estadoCalculado);
                                    }
                                    setManga(prev => ({ 
                                      ...prev, 
                                      title: customTitle, 
                                      totalChapters: parsedChapters,
                                      userStatus: estadoCalculado
                                    }));
                                    
                                    closeModal();
                                    showAlert("Actualizado", "Ficha e historial reajustados automáticamente.");
                                }
                            } catch (e) {
                                showAlert("Error", "No se pudo actualizar el sistema.");
                            }
                        }} 
                        className="w-[50%] py-2 bg-primary/20 text-primary hover:bg-primary/30 font-bold"
                    >
                        {isOfficialManga ? "Crear versión" : "Guardar cambios"}
                    </Button>
                </div>
            </div>
        )
    });
};

  return (
    <main className="flex flex-col bg-background min-h-screen pb-10 animate-fade-in-up">
      
      <DetailHeader 
        cover={manga.imageUrl} 
        title={manga.title} 
        author={manga.author}
        badge={!isNaN(id)?"LISTA PRIVADA": null}
         
      />
      <section className="px-6 flex flex-col space-y-6 mt-6">
      
          <div className="flex justify-between items-center text-center">
            <StatItem label="Score" value={manga.averageScore?.toString()} valueColor="text-primary" hasGlow />
            <StatItem label="Status" value={manga.status} valueColor="text-secondary" />
            <StatItem label="Rank" value={manga.rankPosition ? `#${manga.rankPosition}` : '-'} />
            <StatItem label="Read" value={`${manga.readersCount || 0}`} />
          </div>
        </section>
        <div className="flex space-x-3 pt-2">
          <div className="flex-1">
             <Button  onClick={() => handleChapterClick(nextChapter, false)} 
                      variant="primary" disabled={!nextChapter || nextChapter <= 0} className="flex items-center justify-center py-[15px] px-0 rounded-tl-[16px] rounded-br-[16px] rounded-tr-[4px] rounded-bl-[4px]">
                <Play className="w-4 h-4 mr-2 fill-white" />
                {(!nextChapter || nextChapter <= 0) ? "Sin capítulos" : (isAllRead ? `Releer capítulo ${manga.totalChapters}` : `Leer capítulo ${nextChapter}`)}
             </Button>
          </div>
          <div className="w-16">
             <Button onClick={handleBookmarkClick} variant={manga.isAddedInTracker ? "active" : "secondary"} className="flex items-center justify-center py-[15px] px-0 rounded-tl-[24px] rounded-br-[24px] rounded-tr-[6px] rounded-bl-[6px]">
              <Bookmark className={`w-5 h-5 stroke-[2.5px] ${manga.isAddedInTracker ? 'text-white fill-white' : 'text-primary'}`} />
            </Button>
          </div>
        </div>
        <section className="pt-2">
          <h3 className="text-[11px] text-textMuted uppercase font-black tracking-[0.2em] mb-3">SINOPSIS</h3>
          <p className="text-xs text-white/70 leading-relaxed font-medium mb-4">{manga.description}</p>
          
          <div className="flex flex-wrap gap-2 pb-8 border-b border-white/5">
            {(manga.genres || []).map((g, index) => {
            const badgeColor = index % 2 === 0 ? "secondary" : "primary";
            return <GenreTag key={g} text={g} variant={badgeColor} />;
            })}
          </div>
        </section>
        <section className="pt-2">
          <header className="flex justify-between items-center mb-6">
            <div className="flex items-baseline space-x-3m-0">
              <h3 className="text-lg font-bold text-white tracking-tight m-3">Capítulos </h3>
              <span className="text-[10px] text-textMuted font-bold uppercase tracking-widest">{manga.totalChapters} Total</span>
            </div>

            {manga.isAddedInTracker &&(
            <button 
                onClick={() => handleOpenCustomizeModal()} 
                className="flex items-center text-[10px] font-black tracking-widest text-primary/80 hover:text-primary uppercase mt-4 mb-2 bg-primary/10 px-3 py-1.5 rounded-full transition-all border border-primary/20"
            >
                <Edit2 className="w-3 h-3 mr-2" />
                {isOfficialManga ? "Personalizar Ficha" : "Editar Ficha"}
            </button>
            )}
            <button 
                onClick={() => setIsReversed(!isReversed)}
                className={`p-2 rounded-full transition-all ${isReversed ? 'bg-primary/20 text-primary' : 'bg-white/5 text-textMuted hover:bg-white/10 hover:text-white'}`}
            >
                <ArrowDownUp className="w-4 h-4" />
            </button>
          </header>
          <div className="flex flex-wrap gap-3 justify-start">
            {chapters.map((ch) => {
            const progress = manga.readChapters?.find(p => p.progressUnit === ch);
            const isReaded = !!progress;
            const isLatestRead = ch === lastRead;
            const readDate = progress ? new Date(progress.readDate).toLocaleDateString() : null;
            return (
              <ChapterButton 
                key={ch} 
                chapter={ch} 
                isReaded={isReaded}
                isLatest={isLatestRead} 
                readDate={readDate} 
                onClick={() => handleChapterClick(ch, isReaded)}
              />
            );
          })}
          </div>
        </section>
      </main>
  );
};