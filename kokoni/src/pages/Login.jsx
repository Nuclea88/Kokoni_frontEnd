import { useState, useContext } from 'react';
import { Mail, Lock, Sparkles } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import  Input  from '../components/atoms/Input';
import  Button  from '../components/atoms/Button';
import { useNavigate } from 'react-router';
import logoLila from '../assets/kokoni_lila.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate('/dashboard'); 
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-background">
      {/* Background Glows (Micro-estética) */}
      <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-secondary/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      {/* Main Container */}
      <div className="glass-panel w-full max-w-md p-8 relative z-10 flex flex-col items-center animate-fade-in-up">
        
        {/* Logo/Title */}
       <div className="w-20 h-20 mb-6 flex items-center justify-center animate-pulse">
            <img 
                src={logoLila} 
                alt="Kokoni Logo" 
                className="w-full h-full object-contain drop-shadow-[0_0_15px_var(--color-secondary)]" 
            />
        </div>
        <h1 className="text-3xl font-bold mb-4"><span className="text-gradient">Kokoni</span></h1>
        <h2 className = "text-textMuted text-l mb-8 text-center">Todo lo que necesitas... Está aquí</h2>
        {/* Formulario */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <Input 
            icon={Mail} 
            type="email" 
            placeholder="Correo electrónico o Usuario" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input 
            icon={Lock} 
            type="password" 
            placeholder="Contraseña" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <div className="flex justify-end w-full pb-2">
            <span className="text-xs text-primary cursor-pointer hover:underline">¿Olvidaste tu contraseña?</span>
          </div>
          <Button variant="primary" type="submit">
            Iniciar Sesión
          </Button>
        </form>
        <div className="mt-6 flex items-center space-x-2 text-sm text-textMuted">
          <span>¿No tienes cuenta?</span>
          <span className="text-primary font-semibold cursor-pointer hover:underline">Regístrate</span>
        </div>
      </div>
    </div>
  );
}