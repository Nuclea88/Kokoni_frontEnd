import { useNavigate, useLocation } from 'react-router';

const NavItem = ({ name, path, icon: Icon }) => {

  const navigate = useNavigate();
  const location = useLocation();

  const isActive = location.pathname === path || (location.pathname.startsWith(path) && path !== '/dashboard');
  return (
    <div 
      onClick={() => navigate(path)}
      className={`flex flex-col items-center justify-center space-y-1 w-16 cursor-pointer transition-all duration-300 
      ${isActive ? 'text-secondary scale-110' : 'text-textMuted hover:text-secondary'}`}
    >
      <Icon className="w-6 h-6" />
      <span className="text-[10px] uppercase font-medium tracking-tighter">{name}</span>
    </div>
  );
};
export default NavItem;