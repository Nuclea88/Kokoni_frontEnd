import { useState, useContext } from 'react';
import { Mail, Lock, User, Sparkles } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { Input } from '../components/atoms/Input';
import { Button } from '../components/atoms/Button';
import { useNavigate } from 'react-router';
import logoLila from '../assets/kokoni_lila.png';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext); 
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    /*
      En el futuro harías: await fetch('http://localhost:8080/register', { ... });
    */
    // Tras el registro exitoso, auto-logueamos:
    await login(email, password);
    navigate('/dashboard');
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-background">
      {/* Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-secondary/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="glass-panel w-full max-w-md p-8 relative z-10 flex flex-col items-center animate-fade-in-up">
        
        <div className="w-20 h-20 mb-6 flex items-center justify-center animate-pulse">
            <img 
                src={logoLila} 
                alt="Kokoni Logo" 
                className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(163,44,196,0.5)]" 
            />
        </div>
        <h1 className="text-3xl font-bold mb-2">Únete a <span className="text-gradient">Kokoni</span></h1>
        <p className="text-textMuted text-sm mb-8 text-center">Crea tu cuenta y empieza a trackear tu lectura sin límites.</p>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <Input 
            icon={User} 
            type="text" 
            placeholder="Nombre de Usuario" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input 
            icon={Mail} 
            type="email" 
            placeholder="Correo electrónico" 
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
          
          <Button variant="primary" type="submit" className="mt-4">
            Crear Cuenta
          </Button>
        </form>
        <div className="mt-6 flex items-center space-x-2 text-sm text-textMuted">
          <span>¿Ya tienes cuenta?</span>
          <span onClick={() => navigate('/login')} className="text-primary font-semibold cursor-pointer hover:underline">Inicia Sesión</span>
        </div>
      </div>
    </div>
  );
}