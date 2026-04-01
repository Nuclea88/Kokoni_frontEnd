import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in" aria-modal="true" role="dialog">
      <figure 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <article className="relative w-full max-w-md glass-panel leaf-shape-xl overflow-hidden animate-fade-in-up border-primary/20">
        <header className="px-6 py-5 flex items-center justify-between border-b border-white/5">
          <h2 className="text-lg font-black tracking-tight text-white uppercase">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-textMuted" />
          </button>
        </header>
        <main className="px-6 py-8">
          {children}
        </main>
        {footer && (
          <footer className="px-6 py-4 bg-white/5 border-t border-white/5">
            {footer}
          </footer>
        )}
      </article>
    </section>
  );
};

export default Modal;
