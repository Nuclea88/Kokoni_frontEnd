import { Play, Bookmark, ArrowDownUp, ListOrdered, CheckCircle } from 'lucide-react';
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



export const MangaDetails = () => {

const { id } = useParams(); 
  const [manga, setManga] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showAlert, openModal, closeModal } = useModal();
  const [lists, setLists] = useState([]);
  const fetchedId = useRef(null);

  useEffect(() => {
        customListService.getMyLists().then(setLists).catch(console.error);
    }, []);

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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <span className="text-4xl">📡</span>
      </div>
      <h2 className="text-xl font-black text-white mb-2">Error de Conexión</h2>
      <p className="text-textMuted text-sm mb-8 max-w-xs">{error}</p>
      <Button variant="primary" onClick={() => window.location.reload()}>Reintentar conexión</Button>
    </div>
  );
  if (!manga) return <div className="min-h-screen bg-background flex items-center justify-center text-white">Manga no encontrado</div>;

  const chapters = Array.from(
    { length: Math.min(manga.totalChapters) }, 
    (_, i) => manga.totalChapters - i
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
      
       if (!isAlreadyRead && manga.isAddedInTracker) {
         trackerService.updateStatus(manga.trackerId, 'IN_PROGRESS').catch(e => console.error(e));
       }
    } catch (error) {
      console.error("Error al gestionar el capítulo", error);
      showAlert("Error al gestionar el capítulo", error.message || "Hubo un problema con el capítulo.");
    }
  };

 const handleBookmarkClick = async () => {

    // if (manga.isAddedInTracker) {
    //   try{
    //     await trackerService.remove(manga.trackerId);
    //     await customListService.removeFromAllLists(id);
    //     setManga(prev => ({ ...prev, isAddedInTracker: false, trackerId: null, readChapters: [] }));
    //     showAlert("Eliminado", "Se ha quitado de tu biblioteca y de todas tus listas.");
    //    } catch (e) {
    //     console.error(e);
    //     showAlert("Error", "No se pudo limpiar la biblioteca correctamente.");
    //   }
    //   return;
    // }
    
    openModal({
      title: manga.isAddedInTracker ? "Gestionar en mi biblioteca" : "Elije dónde guardarlo",
      content: (
        <div className="space-y-3">
           <ListOption 
              type="library" 
              title="Biblioteca General" 
              subtitle="Sin lista específica" 
              onClick={() => confirmSave(null)} 
           />
           <div className="flex items-center space-x-2 py-2">
              <div className="h-[1px] flex-1 bg-white/5"></div>
              <span className="text-[10px] font-black text-white/20 uppercase tracking-widest"> Listas personalizadas</span>
              <div className="h-[1px] flex-1 bg-white/5"></div>
           </div>
           {/* OPCIÓN 2: Recorremos tus Custom Lists */}
           {lists.map(list => (
              <ListOption 
                key={list.id} 
                title={list.name} 
                subtitle={`${list.isPublic ? 'Pública' : 'Privada'} • ${list.itemCount} items`}
                onClick={() => confirmSave(list.id)} 
              />
           ))}
           {manga.isAddedInTracker && (
             <div className="pt-4 mt-2 border-t border-white/5">
                <Button 
                   variant="secondary" 
                   className="w-full text-red-400 border-red-400/20 hover:bg-red-400/10"
                   onClick={handleTotalDelete}
                >
                  Eliminar de la biblioteca (borra progreso)
                </Button>
             </div>
           )}
        </div>
      )
    });
  };
           
           
           
           
  //          : (
  //              <p className="text-center text-[10px] text-white/30 italic">No tienes listas personalizadas creadas aún.</p>
  //          )}
  //       </div>
  //     )
  //   });
  // };

const confirmSave = async (listId) => {
    try {
      let currentTrackerId = manga.trackerId;

      if (!manga.isAddedInTracker) {
        const resp = await trackerService.add(id); 
        currentTrackerId = resp.trackerId;
      }
         await customListService.removeFromAllLists(id);




      
      
      // 2. Si eligió una lista, lo vinculamos también
      if (listId) {
        await customListService.addCustomMediaToList(listId, id);
      }
      
      // 3. Actualizamos el estado visual de la página
      setManga(prev => ({ ...prev, isAddedInTracker: true, trackerId: currentTrackerId }));
      
      // 4. Cerramos el modal
      closeModal();
      
      // 5. ¡Aviso visual premium!
      showAlert("Actualizado", listId ? "Movido a tu lista personalizada." : "Movido a la biblioteca general.");
    } catch (e) {
      console.error(e);
      showAlert("Error", "No se pudo actualizar la ubicación.");
    }
  };
    const handleTotalDelete = async () => {
    try {
      // Borramos el tracker (progreso) y todas las listas
      await trackerService.remove(manga.trackerId);
      await customListService.removeFromAllLists(id);
      
      setManga(prev => ({ ...prev, isAddedInTracker: false, trackerId: null, readChapters: [] }));
      closeModal();
      showAlert("Eliminado", "Se ha borrado el progreso y quitado de tus listas.");
    } catch (e) {
      console.error(e);
      showAlert("Error", "No se pudo eliminar el manga.");
    }
  };



  //   try {
  //     if (manga.isAddedInTracker) {
  //       // ¿Qué pasa al desmarcar?
  //       if (manga.trackerId) {
  //          await trackerService.remove(manga.trackerId);
  //          setManga(prev => ({ ...prev, isAddedInTracker: false, trackerId: null, readChapters: [] }));
  //       }
  //     } else {
  //       // ¿Qué pasa al guardar?
  //       const response = await trackerService.add(id); 
  //       console.log("RESPUESTA DEL SERVIDOR:", response);
  //       setManga(prevManga => ({ 
  //           ...prevManga, 
  //           isAddedInTracker: true, 
  //           trackerId: response.trackerId, // <--- ¡¡OJO AQUÍ!! TIENE QUE PONER ".trackerId"
  //           readChapters: [] 
  //       }));
  //     }
  //   } catch (error) { 
  //       console.error("Error al gestionar el Bookmark:", error);
  //   }
  // };

  const lastRead = manga.readChapters?.length > 0 
    ? Math.max(...manga.readChapters.map(c => c.progressUnit)) 
    : 0;

  const nextChapter = lastRead < manga.totalChapters ? lastRead + 1 : manga.totalChapters;
  const isAllRead = lastRead === manga.totalChapters && manga.totalChapters > 0;

  return (
    <div className="flex flex-col bg-background min-h-screen pb-10 animate-fade-in-up">
      
      <DetailHeader 
        cover={manga.imageUrl} 
        title={manga.title} 
        author={manga.author} 
        badge="NOVEDAD" 
      />
      <div className="px-6 flex flex-col space-y-6 mt-6">
      
          <div className="flex justify-between items-center text-center">
            <StatItem label="Score" value={manga.averageScore?.toString()} valueColor="text-primary" hasGlow />
            <StatItem label="Status" value={manga.status} valueColor="text-secondary" />
            <StatItem label="Rank" value={manga.rankPosition ? `#${manga.rankPosition}` : '-'} />
            <StatItem label="Read" value={`${manga.readersCount || 0}`} />
          </div>
        </div>
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
        <div className="pt-2">
          <h3 className="text-[11px] text-textMuted uppercase font-black tracking-[0.2em] mb-3">SINOPSIS</h3>
          <p className="text-xs text-white/70 leading-relaxed font-medium mb-4">{manga.description}</p>
          
          <div className="flex flex-wrap gap-2 pb-8 border-b border-white/5">
            {(manga.genres || []).map((g, index) => {
            const badgeColor = index % 2 === 0 ? "secondary" : "primary";
            return <GenreTag key={g} text={g} variant={badgeColor} />;
            })}
          </div>
        </div>
        {/* 5. GRID DE CAPÍTULOS (Átomos en un loop) */}
        <div className="pt-2">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-baseline space-x-3">
              <h3 className="text-lg font-bold text-white tracking-tight">Capítulos</h3>
              <span className="text-[10px] text-textMuted font-bold uppercase tracking-widest">{manga.totalChapters} Total</span>
            </div>
            <ArrowDownUp className="w-5 h-5 text-textMuted cursor-pointer hover:text-white transition-colors" />
          </div>
          <div className="flex flex-wrap gap-3 justify-start">
            {chapters.map((ch) => {
            // Buscamos si este capítulo concreto está en la lista de leídos
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
        </div>
      </div>
  );
};