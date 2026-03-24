import { Play, Bookmark, ArrowDownUp } from 'lucide-react';
import  Button  from '../components/atoms/Button';
import  StatItem  from '../components/atoms/StatItem';
import  ChapterButton  from '../components/atoms/ChapterButton';
import DetailHeader from '../components/molecules/DetailHeader';
import GenreTag from '../components/atoms/GenreTag';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import mangaService from '../services/mangaService';
import trackerService from '../services/trackerService';

export const MangaDetails = () => {

const { id } = useParams(); 
  const [manga, setManga] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const fetchDetails = async () => {
      try {
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
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><p className="text-primary animate-pulse w-full text-center">Analizando datos de Kokoni...</p></div>;
  if (!manga) return <div className="min-h-screen bg-background flex items-center justify-center text-white">Manga no encontrado</div>;

  const chapters = Array.from(
    { length: Math.min(12, manga.totalChapters) }, 
    (_, i) => manga.totalChapters - i
  );

  const handleChapterClick = async (chapterNum, isAlreadyRead) => {
    if (!manga.trackerId) {
      alert("Primero añade el manga a tu biblioteca");
      return;
    }
    
    try {
      if (isAlreadyRead) {
        await progressService.unmarkAsRead(manga.trackerId, chapterNum);
      } else {
        await progressService.markAsRead(manga.trackerId, chapterNum);
      }
       if (!isAlreadyRead && manga.status === 'PLANNING') {
         await trackerService.updateStatus(manga.trackerId, 'IN_PROGRESS');
       }

      const updatedManga = await mangaService.getById(id);
      setManga(updatedManga);
    } catch (error) {
      console.error("Error al actualizar progreso", error);
    }
  };

  const handleBookmarkClick = async () => {
    try {
      if (manga.isAddedInTracker) {
        // SI YA ESTÁ: Lo borramos usando el ID único de seguimiento
        if (manga.trackerId) {
           await trackerService.remove(manga.trackerId);
           setManga(prev => ({ ...prev, isAddedInTracker: false, trackerId: null, readChapters: [] }));
        }
      } else {
        const addedTrackerItem = await trackerService.add(id); 
      
        setManga(prev => ({ 
          ...prev, 
          isAddedInTracker: true, 
          trackerId: addedTrackerItem.id,
          readChapters: [] 
        }));
      }
    } catch (error) {
      console.error("Error al gestionar el Bookmark:", error);
    }
  };

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
             <Button variant="primary" className="flex items-center justify-center py-[15px] px-0 rounded-tl-[16px] rounded-br-[16px] rounded-tr-[4px] rounded-bl-[4px]">
                <Play className="w-4 h-4 mr-2 fill-white" />
                Leer capítulo {manga.totalChapters}
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
            const readDate = progress ? new Date(progress.readDate).toLocaleDateString() : null;
            return (
              <ChapterButton 
                key={ch} 
                chapter={ch} 
                isReaded={isReaded}
                readDate={readDate} // Pásale la fecha al átomo
                onClick={() => handleChapterClick(ch, isReaded)}
              />
            );
          })}
            {/* {chapters.map((ch) => (
              <ChapterButton 
                key={ch} 
                chapter={ch} 
                isLatest={ch === manga.totalChapters} 
              />
            ))} */}
          </div>
        </div>
      </div>
  );
};