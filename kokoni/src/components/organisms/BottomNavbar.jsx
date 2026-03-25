import { BookMarked, Sparkles, Compass, Settings } from 'lucide-react';
import NavItem from '../molecules/NavItem';

const BottomNavbar = () => {
  const navItems = [
    { name: 'Mis listas', path: '/dashboard', icon: BookMarked },
    { name: 'Añadir ', path: '/dashboard/Lista Personalizada', icon: Sparkles },
    { name: 'Explorar', path: '/dashboard/explorar', icon: Compass },
    { name: 'Ajustes', path: '/dashboard/ajustes', icon: Settings },
  ];
  
  return (
    <nav className="fixed bottom-0 w-full z-40 border-t border-white/5 bg-surface/90 backdrop-blur-xl h-20 flex px-8 justify-between items-center">
        {navItems.map((item) => (
          <NavItem key={item.name} {...item} />
        ))}
    </nav>
  );
};
export default BottomNavbar;