import { useContext, useState } from 'react';
import { Menu, Search, BookOpen, Palette, Grid, AlignLeft, Cloud, LogOut } from 'lucide-react';
import  UserProfileCard  from '../components/molecules/UserProfileCard';
import  StatCard  from '../components/molecules/StatCard';
import  SettingToggleRow  from '../components/molecules/SettingToggleRow';
import Button from '../components/atoms/Button';
import { AuthContext } from '../context/AuthContext';
import defaultUser from "../assets/defaultUser.png";

const Settings = () => {
  const { user, logout } = useContext(AuthContext);
  const [theme, setTheme] = useState(true);
  const [glass, setGlass] = useState(false);
  const [density, setDensity] = useState(true);

  return (
    <main className="flex flex-col min-h-screen bg-background pb-32 animate-fade-in-up md:max-w-md md:mx-auto">
      <div className="px-6 flex flex-col space-y-6 pt-2">
        <UserProfileCard 
          username={user?.username || 'Reaper'}
          rank={user?.rankName || 'NOVICE RANK'}
          level={user?.level || 1}
          avatar={user?.avatarUrl || defaultUser}  
        />
        <div className="flex flex-col space-y-4">
          <StatCard 
            title="TOTAL CAPÍTULOS LEÍDOS"
            value={user?.totalChaptersRead || 0}
            // icon={BookOpen}
            borderColor="border-l-primary"
          />
          <div className="grid grid-cols-2 gap-4">
            <StatCard 
              title="RACHA"
              value={user?.streakDays || 0}
              unit="DÍAS"
              progress={Math.min((user?.streakDays || 0) * 3.33, 100)} 
              progressColor="bg-primary"
              borderColor="border-l-secondary"
            />
            <StatCard 
              title="TIEMPO"
              value={user?.timeReadHours || 0}
              unit="HRS"
              progress={Math.min((user?.timeReadHours || 0) * 0.2, 100)} 
              progressColor="bg-secondary"
              borderColor="border-l-secondary"
            />
          </div>
        </div>
        <fieldset className="border-0">
          {/* <h3 className="text-[10px] uppercase font-bold tracking-[0.15em] text-textMuted mb-3 px-2">
            APARIENCIA E INTERFAZ (EN CONSTRUCCION)
          </h3> */}
          {/* <div className="flex flex-col rounded-[24px] border border-white/5 bg-surface/20 overflow-hidden">
            <SettingToggleRow 
              icon={Palette} 
              title="Tema Oscuro Obsidian" 
              active={theme} 
              onToggle={() => setTheme(!theme)} 
            />
            <SettingToggleRow 
              icon={Grid} 
              title="Efectos de Transparencia" 
              active={glass} 
              onToggle={() => setGlass(!glass)} 
            />
            <SettingToggleRow 
              icon={AlignLeft} 
              title="Densidad Editorial" 
              active={density} 
              onToggle={() => setDensity(!density)} 
            />
          </div> */}
        </fieldset>
        <div className="flex flex-col space-y-3 pt-2">
          {/* <Button 
            variant="primary" 
            icon={Cloud} 
            className="py-5" 
            onClick={() => console.log('Sincronizando...')}
            >
            Sincronizar Cloud Nebular
        </Button> */}
        <Button 
            variant="danger" 
            icon={LogOut} 
            className="py-5"
            onClick={logout}
            >
            Cerrar Sesión
        </Button>
        </div>
      </div>
    </main>
  );
};
export default Settings;