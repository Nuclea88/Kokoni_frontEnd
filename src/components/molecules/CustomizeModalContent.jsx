import Button from '../atoms/Button';
import Input from '../atoms/Input';
const CustomizeModalContent = ({ 
    manga, 
    isOfficialManga, 
    onCancel, 
    onSave 
}) => {
    let customTitle = manga.title || '';
    let customChapters = manga.totalChapters || '';
    return (
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
                    defaultValue={manga.title} 
                    onChange={e => customTitle = e.target.value} 
                />
            </fieldset>
            <fieldset className="border-0">
                <label className="text-[10px] font-black tracking-[0.2em] text-textMuted uppercase mb-2">
                    Total de Capítulos Real
                </label>
                <Input 
                    type="number" 
                    placeholder="Ej: 50" 
                    defaultValue={manga.totalChapters} 
                    onChange={e => customChapters = e.target.value} 
                />
            </fieldset>
            
            <div className="flex space-x-3 pt-4">
                <Button onClick={onCancel} variant="secondary" className="w-[50%] py-2">
                    Cancelar
                </Button>
                <Button 
                    onClick={() => onSave(customTitle, customChapters)} 
                    className="w-[50%] py-2 bg-primary/20 text-primary hover:bg-primary/30 font-bold"
                >
                    {isOfficialManga ? "Crear versión" : "Guardar cambios"}
                </Button>
            </div>
        </div>
    );
};
export default CustomizeModalContent;