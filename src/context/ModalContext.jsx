import { createContext, useContext, useState, useEffect } from 'react';
import Modal from '../components/atoms/Modal';
import Button from '../components/atoms/Button';
import { Info } from 'lucide-react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    content: null,
    content: null,
    footer: null,
  });

  useEffect(() => {
    const handleGlobalAlert = (e) => {
      showAlert(e.detail.message, e.detail.title);
    };
    window.addEventListener('globalAlert', handleGlobalAlert);
    return () => window.removeEventListener('globalAlert', handleGlobalAlert);
  }, []);

  const openModal = (config) => {
    setModalConfig({ ...config, isOpen: true });
  };

  const closeModal = () => {
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
  };

  const showAlert = (message, title = "Aviso") => {
    openModal({
      title: title,
      content: (
        <section className="flex flex-col items-center text-center space-y-4">
          <figure className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Info className="w-8 h-8 text-primary" />
          </figure>
          <p className="text-textMuted text-sm font-medium leading-relaxed">
            {message}
          </p>
        </section>
      ),
      footer: (
        <Button variant="primary" onClick={closeModal}>
          Entendido
        </Button>
      )
    });

  };
  return (
    <ModalContext.Provider value={{ openModal, closeModal, showAlert }}>
      {children}
      <Modal 
        isOpen={modalConfig.isOpen} 
        onClose={closeModal} 
        title={modalConfig.title} 
        footer={modalConfig.footer}
      >
        {modalConfig.content}
      </Modal>
    </ModalContext.Provider>
  );
};
export const useModal = () => useContext(ModalContext);