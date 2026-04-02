import { Edit2, ArrowDownUp } from 'lucide-react';
import ChapterButton from '../atoms/ChapterButton';
const MangaChapterList = ({ 
    manga, 
    chapters, 
    isReversed, 
    lastRead, 
    onReverse, 
    onChapterClick, 
    onCustomizeClick,
    isOfficialManga 
}) => {
    return (
        <section className="pt-2">
            <header className="flex justify-between items-center mb-6">
                <div className="flex items-baseline space-x-3m-0">
                    <h3 className="text-lg font-bold text-white tracking-tight m-3">Capítulos </h3>
                    <span className="text-[10px] text-textMuted font-bold uppercase tracking-widest">{manga.totalChapters} Total</span>
                </div>
                <div className="flex items-center space-x-2">
                    {manga.isAddedInTracker && (
                        <button 
                            onClick={onCustomizeClick} 
                            className="flex items-center text-[10px] font-black tracking-widest text-primary/80 hover:text-primary uppercase mt-4 mb-2 bg-primary/10 px-3 py-1.5 rounded-full transition-all border border-primary/20"
                        >
                            <Edit2 className="w-3 h-3 mr-2" />
                            {isOfficialManga ? "Personalizar Ficha" : "Editar Ficha"}
                        </button>
                    )}
                    <button 
                        onClick={onReverse}
                        className={`p-2 rounded-full transition-all ${isReversed ? 'bg-primary/20 text-primary' : 'bg-white/5 text-textMuted hover:bg-white/10 hover:text-white'}`}
                    >
                        <ArrowDownUp className="w-4 h-4" />
                    </button>
                </div>
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
                            onClick={() => onChapterClick(ch, isReaded)}
                        />
                    );
                })}
            </div>
        </section>
    );
};
export default MangaChapterList;