import { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
const CreateListForm = ({ onCancel, onSave, saveText = "Crear Lista" }) => {
  const [name, setName] = useState('');
  
  return (
    <div className="space-y-4 pt-2">
      <Input 
        placeholder="Nombre de la nueva lista..." 
        value={name} 
        onKeyDown={(e) => e.key === 'Enter' && onSave(name)}
        onChange={e => setName(e.target.value)} 
      />
      <div className="flex space-x-3 pt-2">
        <Button onClick={onCancel} variant="secondary" className="w-[50%] py-2">
          Cancelar
        </Button>
        <Button onClick={() => onSave(name)} variant="primary" className="w-[50%] py-2">
          {saveText}
        </Button>
      </div>
    </div>
  );
};
export default CreateListForm;