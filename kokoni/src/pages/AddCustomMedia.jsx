import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import customMediaService from '../services/customMediaService';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import { ArrowLeft } from 'lucide-react';
import customListService from '../services/CustomListService';

const AddCustomMedia = () => {
  const navigate = useNavigate();

  
  const [lists, setLists] = useState([]);
  const [showNewListInput, setShowNewListInput] = useState(false);
  const [newListName, setNewListName] = useState('');


  const [formData, setFormData] = useState({
    title: '', customAuthor: '', customTotalChapters: '', imageUrl: '', description: '', listId: ''
  });
  const [loading, setLoading] = useState(false);

   useEffect(() => {
    const fetchLists = async () => {
      try {
        const misListas = await customListService.getMyLists();
        setLists(misListas);
      } catch (error) {
        console.error("Error cargando las listas de tu biblioteca:", error);
      }
    };
    fetchLists();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleListSelect = (e) => {
    const val = e.target.value;
    if (val === 'CREATE_NEW') {
      setShowNewListInput(true);
      setFormData({ ...formData, listId: '' });
    } else {
      setShowNewListInput(false);
      setFormData({ ...formData, listId: val });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) return alert("El título es obligatorio");
    
    setLoading(true);
    try {
            const newMedia = await customMediaService.create({
        ...formData,
        customTotalChapters: formData.customTotalChapters ? parseInt(formData.customTotalChapters) : null
      });
      
      // Paso B: Evaluar la Lista de destino
      let targetListId = formData.listId;
      if (showNewListInput && newListName.trim() !== '') {
          // Usa el servicio limpio en vez de Axios al aire
          const nuevaLista = await customListService.createList(newListName);
          targetListId = nuevaLista.id;
      }
      
      // Paso C: Relacionar Objeto y Lista si la hubiese
      if (targetListId) {
          await customListService.addCustomMediaToList(targetListId, newMedia.id);
      }

      // 🚀 Magia: Al terminar, te redirige directo a la página de Detalles con tu nuevo ID local
      navigate(`/dashboard/manga/${newMedia.id}`);
    } catch (error) {
      console.error(error);
      alert("Error en la creación de ficha o asignación a lista.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-background text-white p-6 pb-24 animate-fade-in-up">
      <div className="flex items-center space-x-3 mb-8 pt-4">
        <ArrowLeft className="w-6 h-6 text-textMuted cursor-pointer" onClick={() => navigate(-1)} />
        <h1 className="text-2xl font-black tracking-tight">Crear Ficha Propia</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
            <label className="text-[10px] font-black tracking-[0.2em] text-textMuted uppercase mb-2 block">Título *</label>
            <Input name="title" placeholder="Ej. Jinx" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="text-[10px] font-black tracking-[0.2em] text-textMuted uppercase mb-2 block">Autor</label>
                <Input name="customAuthor" placeholder="Ej. Mingwa" value={formData.customAuthor} onChange={handleChange} />
            </div>
            <div>
                <label className="text-[10px] font-black tracking-[0.2em] text-textMuted uppercase mb-2 block">Capítulos</label>
                <Input type="number" name="customTotalChapters" placeholder="Ej. 50" value={formData.customTotalChapters} onChange={handleChange} />
            </div>
        </div>
        <div>
            <label className="text-[10px] font-black tracking-[0.2em] text-textMuted uppercase mb-2 block">URL de Portada</label>
            <Input name="imageUrl" placeholder="https://..." value={formData.imageUrl} onChange={handleChange} />
            {formData.imageUrl && (
                <div className="mt-3 w-28 h-40 rounded-xl bg-surface relative overflow-hidden border border-white/10 shadow-lg">
                    <img src={formData.imageUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                </div>
            )}
        </div>
        <div>
            <label className="text-[10px] font-black tracking-[0.2em] text-textMuted uppercase mb-2 block">Sinopsis</label>
            <textarea 
                name="description" rows={4} value={formData.description} onChange={handleChange}
                className="w-full bg-surface/50 text-white rounded-[16px] border border-white/5 py-4 px-5 text-sm outline-none transition-all placeholder:text-white/20 focus:bg-surface focus:border-primary/50"
                placeholder="Escribe de qué trata..." 
            />
        </div>
        <div className="flex flex-col space-y-3">
            <label className="text-[10px] font-black tracking-[0.2em] text-textMuted uppercase block">Añadir a Custom List</label>
            <select 
                value={showNewListInput ? 'CREATE_NEW' : formData.listId}
                onChange={handleListSelect}
                className="w-full bg-surface/50 text-white rounded-[16px] border border-white/5 py-4 px-5 text-sm outline-none transition-all focus:bg-surface focus:border-primary/50"
            >
                <option value="">(No añadir a ninguna lista temporalmente)</option>
                {lists.map(list => (
                    // Aquí la etiqueta mostrará si la lista es privada o pública directamente usando tu DTO
                    <option key={list.id} value={list.id}>
                        {list.name} {list.isPublic ? "(Pública)" : "(Privada)"}
                    </option>
                ))}
                <option value="CREATE_NEW" className="text-secondary font-bold">+ Crear Nueva Lista Privada...</option>
            </select>
            
            {showNewListInput && (
                <Input 
                    placeholder="Escribe el nombre de la nueva lista secreta..." 
                    value={newListName} 
                    onChange={(e) => setNewListName(e.target.value)} 
                />
            )}
        </div>
        <Button type="submit" variant="primary" className="w-full py-[15px] mt-2 rounded-[16px]">
          {loading ? 'Creando joya oculta...' : 'Subir Manga a Kokoni'}
        </Button>
      </form>
    </div>
  );
};
export default AddCustomMedia;