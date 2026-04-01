import { useState, useEffect } from 'react';
import logoLila from '../../assets/kokoni_lila.png';
import api from '../../services/api';
export default function ServerWakeUp({ children }) {
  const [awake, setAwake] = useState(false);
  useEffect(() => {
    
    api.get('/api/mangas?page=0&size=1')
      .then(() => setAwake(true))
      .catch(() => setAwake(true)); 
  }, []);
  if (awake) return children;
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background gap-6 relative overflow-hidden">
      <i className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-secondary/30 rounded-full blur-[120px] pointer-events-none" />
      <i className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <figure className="w-24 h-24 animate-pulse">
        <img
          src={logoLila}
          alt="Kokoni Logo"
          className="w-full h-full object-contain drop-shadow-[0_0_20px_var(--color-secondary)]"
        />
      </figure>
      <p className="text-textMuted text-sm font-semibold tracking-widest uppercase animate-pulse">
        Despertando los servidores...
      </p>
    </main>
  );
}