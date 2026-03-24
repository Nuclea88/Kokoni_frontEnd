import { useState } from 'react';
import { Menu, Search, BookOpen, Palette, Grid, AlignLeft, Cloud, LogOut } from 'lucide-react';
import  UserProfileCard  from '../components/molecules/UserProfileCard';
import  StatCard  from '../components/molecules/StatCard';
import  SettingToggleRow  from '../components/molecules/SettingToggleRow';
import Button from '../components/atoms/Button';

const Settings = () => {
  const [theme, setTheme] = useState(true);
  const [glass, setGlass] = useState(false);
  const [density, setDensity] = useState(true);
  return (
    <div className="flex flex-col min-h-screen bg-background pb-32 animate-fade-in-up md:max-w-md md:mx-auto">
      
      {/* 1. Header Exacto al Figma */}
      <div className="px-6 pt-10 pb-4 sticky top-0 bg-background/90 backdrop-blur-md z-30 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Menu className="w-6 h-6 text-textMuted cursor-pointer hover:text-white" />
          <h1 className="text-xl font-bold text-white tracking-tight">Kokoni</h1>
        </div>
        <Search className="w-6 h-6 text-secondary cursor-pointer hover:text-white" />
      </div>
      <div className="px-6 flex flex-col space-y-6 pt-2">
        
        {/* 2. Tarjeta del Perfil */}
        <UserProfileCard 
          username="KuroNeko_99"
          rank="ARCHMAGE RANK"
          level="42"
          avatar="https://img.freepik.com/vector-premium/chica-anime-chill-lofi_698903-8153.jpg" 
        />
        {/* 3. Bloque de Estadísticas */}
        <div className="flex flex-col space-y-4">
          
          <StatCard 
            title="TOTAL CHAPTERS READ"
            value="12,482"
            icon={BookOpen}
            borderColor="border-l-primary"
          />
          
          <div className="grid grid-cols-2 gap-4">
            <StatCard 
              title="STREAK"
              value="14"
              unit="DAYS"
              progress={60}
              progressColor="bg-primary"
              borderColor="border-l-secondary"
            />
            <StatCard 
              title="TIME"
              value="842"
              unit="HRS"
              progress={85}
              progressColor="bg-secondary"
              borderColor="border-l-secondary"
            />
          </div>
        </div>
        {/* 4. Preferencias y Aspecto */}
        <div>
          <h3 className="text-[10px] uppercase font-bold tracking-[0.15em] text-textMuted mb-3 px-2">
            APPEARANCE & INTERFACE
          </h3>
          <div className="flex flex-col rounded-[24px] border border-white/5 bg-surface/20 overflow-hidden">
            <SettingToggleRow 
              icon={Palette} 
              title="Obsidian Deep Theme" 
              active={theme} 
              onToggle={() => setTheme(!theme)} 
            />
            <SettingToggleRow 
              icon={Grid} 
              title="Enhanced Glass Effects" 
              active={glass} 
              onToggle={() => setGlass(!glass)} 
            />
            <SettingToggleRow 
              icon={AlignLeft} 
              title="Editorial Density" 
              active={density} 
              onToggle={() => setDensity(!density)} 
            />
          </div>
        </div>
        {/* 5. Botonera Final de Acción */}
        <div className="flex flex-col space-y-3 pt-2">
          <Button 
            variant="primary" 
            icon={Cloud} 
            className="py-5" // Un poco más de cuerpo como en el Figma
            onClick={() => console.log('Sincronizando...')}
            >
            Sync Data to Nebula Cloud
        </Button>
        <Button 
            variant="danger" 
            icon={LogOut} 
            className="py-5"
            onClick={() => console.log('deslogueando...')}
            >
            Logout Session
        </Button>
        </div>
      </div>
    </div>
  );
};
export default Settings;