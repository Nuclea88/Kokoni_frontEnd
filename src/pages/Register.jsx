import { useState, useContext } from 'react';
import { Mail, Lock, User} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import  Input  from '../components/atoms/Input';
import  Button  from '../components/atoms/Button';
import { useNavigate } from 'react-router';
import logoLila from '../assets/kokoni_lila.png';
import TextButton from '../components/atoms/TextButton';

export default function Register() {

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
    });
  const { login, register } = useContext(AuthContext); 
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm({
    ...form,
    [event.target.name]: event.target.value
    });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
     setError(""); 
    try {
      await register(form.username, form.email, form.password); 
        await login(form.email, form.password);
        navigate('/dashboard');
    } catch (err) {
      console.error("Fallo de registro:", err);
      const serverError = err.response?.data?.details || err.response?.data?.message || "Error al conectar con el servidor";
        setError(serverError);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-background">
      <i className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-secondary/30 rounded-full blur-[120px] pointer-events-none" />
      <i className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <section className="glass-panel w-full max-w-md p-8 relative z-10 flex flex-col items-center animate-fade-in-up">
        
        <figure className="w-20 h-20 mb-6 flex items-center justify-center animate-pulse ">
            <img 
                src={logoLila} 
                alt="Kokoni Logo" 
                className="w-full h-full object-contain drop-shadow-[0_0_15px_var(--color-secondary)]" 
            />
        </figure>
        <h1 className="text-3xl font-bold mb-2">Únete a <span className="text-gradient">Kokoni</span></h1>
        <p className="text-textMuted text-sm mb-8 text-center">Crea tu cuenta y empieza a trackear sin límites.</p>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <Input 
            icon={User} 
            type="text" 
            name= "username"
            placeholder="Nombre de Usuario" 
            value={form.username}
            onChange={handleChange} required
          />
          <Input 
            icon={Mail} 
            type="email"
            name= "email" 
            placeholder="Correo electrónico" 
            value={form.email}
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
          {error && (
              <p className="text-red-500 text-xs text-center mb-4 font-bold animate-pulse">
                  {error}
              </p>
          )}

          <Button variant="primary" type="submit" className="mt-4">
            Crear Cuenta
          </Button>
        </form>
        <footer className="mt-6 flex items-center space-x-2 text-sm text-textMuted">
          <p className="m-1">¿Ya tienes cuenta?</p>
          <TextButton onClick={() => navigate('/login')} className="text-sm font-semibold">
              Inicia Sesión
          </TextButton>
          </footer>
      </section>
    </main>
  );
}