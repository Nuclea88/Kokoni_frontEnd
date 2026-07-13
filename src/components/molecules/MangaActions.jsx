import { Play, Bookmark } from 'lucide-react';
import Button from '../atoms/Button';
const MangaActions = ({ 
    manga, 
    nextChapter, 
    isAllRead, 
    onChapterClick, 
    onBookmarkClick 
}) => {
    return (
        <div className="flex space-x-3 pt-2 px-6">
            <div className="flex-1">
                <Button 
                    onClick={() => onChapterClick(nextChapter, false)} 
                    variant="primary" 
                    disabled={!nextChapter || nextChapter <= 0} 
                    className="flex items-center justify-center py-[15px] px-0 rounded-tl-[16px] rounded-br-[16px] rounded-tr-[4px] rounded-bl-[4px]"
                >
                    <Play className="w-4 h-4 mr-2 fill-white" />
                    {(!nextChapter || nextChapter <= 0) 
                        ? "Sin capítulos" 
                        : (isAllRead ? `Remarcar capítulo ${manga.totalChapters}` : `Marcar capítulo ${nextChapter}`)}
                </Button>
            </div>
            <div className="w-16">
                <Button 
                    onClick={onBookmarkClick} 
                    variant={manga.isAddedInTracker ? "active" : "secondary"} 
                    className="flex items-center justify-center py-[15px] px-0 rounded-tl-[24px] rounded-br-[24px] rounded-tr-[6px] rounded-bl-[6px]"
                >
                    <Bookmark className={`w-5 h-5 stroke-[2.5px] ${manga.isAddedInTracker ? 'text-white fill-white' : 'text-primary'}`} />
                </Button>
            </div>
        </div>
    );
};
export default MangaActions;