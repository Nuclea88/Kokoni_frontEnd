import Button from '../atoms/Button';
import ListOption from '../molecules/ListOption';
import ConfirmActionContent from '../molecules/ConfirmActionContent';
const BookmarkModalContent = ({ 
    manga, 
    lists, 
    currentListId, 
    onUpdateStatus, 
    onSaveToList, 
    onOpenCreateList, 
    onRemoveFromLibrary,
    onOpenModal 
}) => {
    return (
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
                                onClick={() => !isCurrent && onUpdateStatus(status.value)}
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
                onClick={() => onSaveToList(null)} 
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
                        onClick={() => onSaveToList(list.id)} 
                    />
                );
            })}
            
            <Button 
                variant="secondary" 
                className="w-full mt-2 text-primary border-primary/20 hover:bg-primary/10" 
                onClick={onOpenCreateList}
            >
                + Crear Nueva Lista
            </Button>
            {manga.isAddedInTracker && (
                <footer className="pt-4 mt-2 border-t border-white/5">
                    <Button 
                        variant="secondary" 
                        className="w-full text-red-500 bg-red-500/10 border-red-500/20 hover:bg-red-500/20 font-bold"
                        onClick={() => {
                            onOpenModal({
                                title: "Cuidado",
                                content: (
                                    <ConfirmActionContent
                                        title="¿Borrar este manga?"
                                        description="Perderás tu progreso actual y desaparecerá de todas tus listas. No se puede deshacer."
                                        confirmText="Sí, borrarlo"
                                        cancelText="Cancelar"
                                        onCancel={onOpenCreateList} 
                                        onConfirm={onRemoveFromLibrary}
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
    );
};
export default BookmarkModalContent;