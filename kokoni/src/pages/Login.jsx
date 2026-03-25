import { useState, useContext } from 'react';
import { Mail, Lock, Sparkles } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import  Input  from '../components/atoms/Input';
import  Button  from '../components/atoms/Button';
import { useNavigate } from 'react-router';
import logoLila from '../assets/kokoni_lila.png';

export default function Login() {;
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    usernameOrEmail: "",
    password: ""
    });

    const handleChange = (event) => {
    setForm({
    ...form,
    [event.target.name]: event.target.value
    });
    };


  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
    try {
      await login(form.usernameOrEmail, form.password);
      navigate('/dashboard'); 
    } catch (err) {
      setError('Usuario o contraseña incorrectos');
      console.error("Fallo de login:", err);
    }
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
            type="text" 
            name="usernameOrEmail"
            placeholder="Correo electrónico o Usuario" 
            value={form.usernameOrEmail}
            onChange={handleChange} required
          />
          <Input 
            icon={Lock} 
            type="password" 
            name= "password"
            placeholder="Contraseña" 
            value={form.password}
            onChange={handleChange} required
          />
          
          <div className="flex justify-end w-full pb-2">
            <span className="text-xs text-primary cursor-pointer hover:underline">¿Olvidaste tu contraseña?</span>
          </div>
          <Button variant="primary" type="submit">
            Iniciar Sesión
          </Button>
          {error && <p className="text-red-500 text-xs text-center mb-4 font-bold">{error}</p>}
        </form>
        <div className="mt-6 flex items-center space-x-2 text-sm text-textMuted">
          <span>¿No tienes cuenta?</span>
          <span onClick={() => navigate('/register')} className="text-primary font-semibold cursor-pointer hover:underline">Regístrate</span>
        </div>
      </div>
    </div>
  );
}