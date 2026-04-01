import Button from '../atoms/Button';

const ConfirmActionContent = ({ 
  title, 
  description, 
  confirmText = "Sí, borrar", 
  cancelText = "Cancelar", 
  onConfirm, 
  onCancel, 
  isDestructive = true 
}) => {

  return (
    <section className="space-y-4 pt-2 text-center text-sm text-white/80">
      <p className="font-bold text-base">{title}</p>
      
      {description && (
        <p className="text-[10px] text-textMuted uppercase px-4">
          {description}
        </p>
      )}
      
      <div className="flex space-x-3 pt-4">
        <Button onClick={onCancel} variant="secondary" className="w-[50%] py-2 text-sm">
          {cancelText}
        </Button>
        
        <Button 
          onClick={onConfirm} 
          className={`w-[50%] py-2 text-sm font-bold rounded-[32px] transition-all ${
            isDestructive 
              ? "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20" 
              : "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20"
          }`}
        >
          {confirmText}
        </Button>
      </div>
    </section>
  );
};
export default ConfirmActionContent;