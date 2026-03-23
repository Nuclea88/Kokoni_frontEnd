import { Play, Bookmark, ArrowDownUp } from 'lucide-react';
import  Button  from '../components/atoms/Button';
import  StatItem  from '../components/atoms/StatItem';
import  ChapterButton  from '../components/atoms/ChapterButton';
import DetailHeader from '../components/molecules/DetailHeader';
import GenreTag from '../components/atoms/GenreTag';

export const MangaDetails = () => {
  const manga = {
    title: 'Obsidian Protocol',
    author: 'Studio Nova',
    cover: 'https://images.unsplash.com/photo-1541560052-77ec1bbc09f7?q=80&w=600',
    stats: { score: '9.42', rank: '#12', read: '84K', status: 'ONGOING' },
    synopsis: 'In a world where memories are traded like currency, a rogue data-broker discovers an encrypted file containing the forgotten history of the human race.',
    genres: ['CYBERPUNK', 'SEINEN', 'MYSTERY'],
    totalChapters: 124,
  };
  const chapters = Array.from({ length: 12 }, (_, i) => manga.totalChapters - i);

  return (
    <div className="flex flex-col bg-background min-h-screen pb-10 animate-fade-in-up">
      
      {/* 1. HERO HEADER (Molecula) */}
      <DetailHeader 
        cover={manga.cover} 
        title={manga.title} 
        author={manga.author} 
        badge="NOVEDAD" 
      />
      <div className="px-6 flex flex-col space-y-6 mt-6">
        
        {/* 2. STATS STRIP (Átomos) */}
        <div className="flex justify-between items-center text-center">
          <StatItem label="Score" value={manga.stats.score} valueColor="text-primary" hasGlow />
          <StatItem label="Status" value={manga.stats.status} valueColor="text-secondary" />
          <StatItem label="Rank" value={manga.stats.rank} />
          <StatItem label="Read" value={manga.stats.read} />
          
        </div>
        {/* 3. BOTONES GRANDES (Reusando tu Átomo Button de la Fase 1) */}
        {/* Truco: los envolvemos para controlar sus anchos (haciendo uso del variant='primary' y 'secondary' que hiciste) */}
        <div className="flex space-x-3 pt-2">
          {/* Fíjate que al usar <Button> (y no la etiqueta HTML) el diseño original se mantiene de manera centralizada */}
          <div className="flex-1">
             <Button variant="primary" className="flex items-center justify-center py-[15px] px-0 rounded-tl-[16px] rounded-br-[16px] rounded-tr-[4px] rounded-bl-[4px]">
                <Play className="w-4 h-4 mr-2 fill-white" />
                Leer capítulo {manga.totalChapters}
             </Button>
          </div>
          
          <div className="w-16">
             <Button variant="secondary" className="flex items-center justify-center py-[15px] px-0 rounded-tl-[24px] rounded-br-[24px] rounded-tr-[6px] rounded-bl-[6px]">
                <Bookmark className="w-5 h-5 stroke-[2.5px] text-primary" />
             </Button>
          </div>
        </div>
        {/* 4. SINOPSIS & GÉNEROS */}
        <div className="pt-2">
          <h3 className="text-[11px] text-textMuted uppercase font-black tracking-[0.2em] mb-3">SYNOPSIS</h3>
          <p className="text-xs text-white/70 leading-relaxed font-medium mb-4">{manga.synopsis}</p>
          
          <div className="flex flex-wrap gap-2 pb-8 border-b border-white/5">
           {manga.genres.map((g, index) => {
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
            {chapters.map((ch) => (
              <ChapterButton 
                key={ch} 
                chapter={ch} 
                isLatest={ch === manga.totalChapters} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};