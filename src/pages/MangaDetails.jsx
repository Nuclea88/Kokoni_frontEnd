import  Button  from '../components/atoms/Button';
import DetailHeader from '../components/molecules/DetailHeader';
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
import Input from '../components/atoms/Input';
import MangaStats from '../components/molecules/MangaStats';
import MangaActions from '../components/molecules/MangaActions';
import MangaSynopsis from '../components/molecules/MangaSynopsis';
import MangaChapterList from '../components/molecules/MangaChapterList';
import BookmarkModalContent from '../components/molecules/BookmarkModalContent';
import CustomizeModalContent from '../components/molecules/CustomizeModalContent';

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

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!manga) return <NotFoundState />;
 
  const chapters = Array.from(
    { length: manga.totalChapters }, 
    (_, i) => isReversed ? i + 1 : manga.totalChapters - i
  );

  const checkAndSyncStatus = (totalLeidos) => {
      if (!manga.isAddedInTracker) return;
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
  };

  const markSingle = async (chapterNum) => {
      try {
          const newProgress = await progressService.markAsRead(manga.trackerId, chapterNum);
          setManga(prev => {
              const updatedReadChapters = [...(prev.readChapters || []), newProgress];
              checkAndSyncStatus(updatedReadChapters.length);
              
              return {
                  ...prev,
                  readChapters: updatedReadChapters
              };
          });
      } catch (error) {
          console.error("Error al marcar capítulo individual", error);
          showAlert("Error", "No se pudo marcar el capítulo.");
      }
  };

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
       if (chapterNum > lastRead + 1) {
          openModal({
            title: "Completar capítulos",
            content: (
              <ConfirmActionContent
                title={`¿Quieres marcar hasta el capítulo ${chapterNum}?`}
                description={`Se marcarán todos los capítulos del ${lastRead + 1} al ${chapterNum} como leídos.`}
                confirmText="Sí, marcar todos"
                cancelText="Solo este"
                onCancel={() => {
                    markSingle(chapterNum);
                    closeModal();
                }}
                onConfirm={async () => {
                  try {
                    setLoading(true); 
                    const newProgressList = [];
                    
                    for (let i = 1; i <= chapterNum; i++) {
                        if (!manga.readChapters?.some(p => p.progressUnit === i)) {
                            const res = await progressService.markAsRead(manga.trackerId, i);
                            newProgressList.push(res);
                        }
                    }
                    setManga(prev => ({
                      ...prev,
                      readChapters: [...(prev.readChapters || []), ...newProgressList]
                    }));
                    
                    const totalChaptersReadTotal = (manga.readChapters?.length || 0) + newProgressList.length;
                    checkAndSyncStatus(totalChaptersReadTotal);
                    
                    closeModal();
                    showAlert("Progreso guardado", `Has marcado hasta el capítulo ${chapterNum}.`);
                  } catch (e) {
                    showAlert("Error", "Hubo un problema al marcar los capítulos.");
                  } finally {
                    setLoading(false);
                  }
                }}
              />
            )
          });
          return; 
        }
        markSingle(chapterNum);
      }
      checkAndSyncStatus(isAlreadyRead ? (manga.readChapters?.length || 1) - 1 : (manga.readChapters?.length || 0) + 1);
    } catch (error) {
      console.error("Error al gestionar el capítulo", error);
      showAlert("Error al gestionar el capítulo", error.message || "Hubo un problema con el capítulo.");
    }
  };

  const handleBookmarkClick = async () => {
      openModal({
        title: manga.isAddedInTracker ? "Gestionar en mi biblioteca" : "Elije dónde guardarlo",
        content: (

        <BookmarkModalContent 
            manga={manga}
            lists={lists}
            currentListId={currentListId}
            onUpdateStatus={async (statusValue) => {
                try {
                    await trackerService.updateStatus(manga.trackerId, statusValue);
                    setManga(prev => ({ ...prev, userStatus: statusValue }));
                    closeModal();
                    showAlert("Has movido este manga satisfactoriamente.", `Estantería`);
                } catch (e) {
                    showAlert("No se pudo cambiar de estante.", "Error");
                }
            }}
            onSaveToList={confirmSave}
            onOpenCreateList={handleOpenCreateList}
            onRemoveFromLibrary={async () => {
                try {
                    await trackerService.remove(manga.trackerId);
                    await customListService.removeFromAllLists(id);
                    setManga(prev => ({ 
                        ...prev, 
                        isAddedInTracker: false, 
                        trackerId: null, 
                        readChapters: [] 
                    }));
                    setCurrentListId(null);
                    closeModal();
                    showAlert("Eliminado", "Se ha borrado de tu biblioteca.");
                } catch(e) {
                    showAlert("Error", "No se pudo eliminar de la biblioteca.");
                }
            }}
            onOpenModal={openModal}
        />
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
  
      openModal({
        title: isOfficialManga ? "Personalizar Ficha" : "Editar Ficha",
        content: (
            <CustomizeModalContent 
                manga={manga}
                isOfficialManga={isOfficialManga}
                onCancel={closeModal}
                onSave={async (customTitle, customChapters) => {
                    if (!customChapters || customChapters <= 0) return;
                    try {
                        const parsedChapters = parseInt(customChapters);
                        const totalLeidos = manga.readChapters?.length || 0;
                        let estadoCalculado = manga.userStatus;
                        if (estadoCalculado === 'COMPLETED' && totalLeidos < parsedChapters) {
                            estadoCalculado = 'IN_PROGRESS';
                        } else if ((estadoCalculado === 'IN_PROGRESS' || estadoCalculado === 'PLANNING') && totalLeidos > 0 && totalLeidos >= parsedChapters) {
                            estadoCalculado = 'COMPLETED';
                        }
                        if (isOfficialManga) {
                            const newCustom = await customMediaService.create({
                                title: customTitle || manga.title, 
                                baseMangaId: manga.id,    
                                customTotalChapters: parsedChapters,
                                imageUrl: manga.imageUrl,
                                description: typeof manga.description === 'object' && manga.description !== null ? JSON.stringify(manga.description) : manga.description,
                                customAuthor: manga.author,
                                status: estadoCalculado
                            });
                            closeModal();
                            showAlert("Ficha Creada", "Cargando tu versión...");
                            window.location.href = `/dashboard/manga/${newCustom.id}`;
                        } else {
                            await customMediaService.update(id, {
                                title: customTitle,
                                customTotalChapters: parsedChapters
                            });
                            setManga(prev => ({ 
                                ...prev, 
                                title: customTitle, 
                                totalChapters: parsedChapters,
                                userStatus: estadoCalculado
                            }));
                            closeModal();
                            showAlert("Actualizado", "Ficha reajustada correctamente.");
                        }
                    } catch (e) {
                        showAlert("Error", "No se pudo actualizar el sistema.");
                    }
                }}
            />
        )
    });
};


  return (
    <main className="flex flex-col bg-background min-h-screen pb-10 animate-fade-in-up">

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} />
      ) : !manga ? (
        <NotFoundState />
      ) : (
        <>
      <DetailHeader 
        cover={manga.imageUrl} 
        title={manga.title} 
        author={manga.author}
        badge={!isNaN(id)?"LISTA PRIVADA": null}
         
      />
      <section className="px-6 flex flex-col space-y-6 mt-6">

            <MangaStats 
              averageScore={manga.averageScore}
              status={manga.status}
              rankPosition={manga.rankPosition}
              readersCount={manga.readersCount}
            />
          </section>  
            <MangaActions 
                manga={manga}
                nextChapter={nextChapter}
                isAllRead={isAllRead}
                onChapterClick={handleChapterClick}
                onBookmarkClick={handleBookmarkClick}
            />
            <MangaSynopsis 
                description={manga.description}
                genres={manga.genres}
            />
            <MangaChapterList 
                manga={manga}
                chapters={chapters}
                isReversed={isReversed}
                lastRead={lastRead}
                isOfficialManga={isOfficialManga}
                onReverse={() => setIsReversed(!isReversed)}
                onChapterClick={handleChapterClick}
                onCustomizeClick={handleOpenCustomizeModal}
            />
        </>
      )}
    </main>
  );
};

const LoadingState = () => (
  <section className="min-h-screen bg-background flex flex-col items-center justify-center p-6" aria-busy="true">
    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
    <p className="text-primary font-bold animate-pulse text-center tracking-widest uppercase text-[10px]">
      Analizando datos de Kokoni...
    </p>
  </section>
);

const ErrorState = ({ message }) => (
  <article className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
    <header className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
      <span className="text-4xl" role="img" aria-label="Error de conexión">📡</span>
    </header>
    <h2 className="text-xl font-black text-white mb-2">Error de Conexión</h2>
    <p className="text-textMuted text-sm mb-8 max-w-xs">{message}</p>
    <Button variant="primary" onClick={() => window.location.reload()}>Reintentar conexión</Button>
  </article>
);

const NotFoundState = () => (
  <section className="min-h-screen bg-background flex items-center justify-center">
     <p className="text-white font-black tracking-widest uppercase">Manga no encontrado</p>
  </section>
);