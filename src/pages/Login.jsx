import { useState, useContext } from 'react';
import { Mail, Lock } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import  Input  from '../components/atoms/Input';
import  Button  from '../components/atoms/Button';
import { useNavigate } from 'react-router';
import logoLila from '../assets/kokoni_lila.png';
import TextButton from '../components/atoms/TextButton';

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
      console.error("Fallo de login:", err);
      if (!err.response || err.message === 'Network Error'){
        setError('Upss!! El servidor está inactivo en este momento. Inténtalo más tarde ¡o dale un minutillo que se despierte!')
      }else if (err.response && (err.response.status === 401 || err.response.status === 403)){
        setError('Usuario o contraseña incorrectos.');
      }else{
        setError('Ha ocurrido un error inesperado al iniciar sesión.');
      }
    };
  }
  
  return (
    <main className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-background">
      <i className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-secondary/30 rounded-full blur-[120px] pointer-events-none" />
      <i className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <section className="glass-panel w-full max-w-md p-8 relative z-10 flex flex-col items-center animate-fade-in-up">
       <figure className="w-20 h-20 mb-6 flex items-center justify-center animate-pulse">
            <img 
                src={logoLila} 
                alt="Kokoni Logo" 
                className="w-full h-full object-contain drop-shadow-[0_0_15px_var(--color-secondary)]" 
            />
        </figure>
        <h1 className="text-3xl font-bold mb-4"><mark className="text-gradient bg-transparent">Kokoni</mark></h1>
        <h2 className = "text-textMuted text-l mb-8 text-center">Todo lo que necesitas... Está aquí</h2>
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
          {/* <footer className="flex justify-end w-full pb-2">
            <button type = "button" className="text-xs text-primary cursor-pointer hover:underline bg-transparent border-0">¿Olvidaste tu contraseña?</button>
          </footer> */}
          <Button variant="primary" type="submit">
            Iniciar Sesión
          </Button>
          {error && <p className="text-red-500 text-xs text-center mb-4 font-bold">{error}</p>}
        </form>
        <footer className="mt-6 flex items-center space-x-2 text-sm text-textMuted">
          <p className="m-1">¿No tienes cuenta?  </p>
          <TextButton onClick={() => navigate('/register')} className="text-sm font-semibold">
              Regístrate
          </TextButton>
          </footer>
      </section>
    </main>
  );
}