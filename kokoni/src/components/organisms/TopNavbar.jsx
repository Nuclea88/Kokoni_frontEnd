import { Menu, Search } from 'lucide-react';

const TopNavbar = () => {
  return (
    <header className="fixed top-0 w-full z-40 bg-background/80 backdrop-blur-md border-b border-white/5 h-16 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <Menu className="w-6 h-6 text-textMuted cursor-pointer hover:text-white transition-all shadow-sm" />
        <h1 className="text-xl font-bold tracking-tight text-white">Kokoni</h1>
      </div>
      <div className="p-2 transition-all hover:bg-white/5 rounded-full cursor-pointer group">
         <Search className="w-6 h-6 text-secondary group-hover:scale-110 active:scale-95 transition-all" /> 
      </div>
    </header>
  );
};
export default TopNavbar;