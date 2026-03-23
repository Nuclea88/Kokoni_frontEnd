import { useState } from 'react';
import  Tag  from '../components/atoms/Tag';
import MediaCard from '../components/molecules/MediaCard';
import { Plus } from 'lucide-react';

const Home = () => {
    const [activeFilter, setActiveFilter] = useState('Leyendo');

    const filters = ['Leyendo', 'Leído', 'Pospuesto', 'Lista XX'];

    const trendingManga = [
    { title: 'Naon Ganasis', chapter: 'Capítulo 82 • 85% leido', image: 'https://images.unsplash.com/photo-1578632738981-43c9ad4698d8?q=80&w=400', status: 'Updating' },
    { title: 'Shadow Realm', chapter: 'Vol03 • Hall 06', image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=400', status: 'Hot' },
  ];
  const allManga = [
    { title: 'Obsidian Protocol', chapter: 'Leer capítulo 124', image: 'https://images.unsplash.com/photo-1541560052-77ec1bbc09f7?q=80&w=400' },
    { title: 'Cyber Spirit', chapter: 'Capítulo 45', image: 'https://images.unsplash.com/photo-1560972550-aba3456b5564?q=80&w=400' },
    { title: 'Golden Hour', chapter: 'Capítulo 12', image: 'https://images.unsplash.com/photo-1580477667995-2b94f01c9516?q=80&w=400' },
    { title: 'Neon Pulse', chapter: 'Vol 02', image: 'https://images.unsplash.com/photo-1614728263952-84ea206f99b6?q=80&w=400' },
  ];

  return (
    <div className="flex flex-col space-y-8">
      
      <section>
        <div className="flex justify-between items-end mb-4 px-2">
            <h2 className="text-textMuted text-[10px] font-black tracking-[0.2em] uppercase">CONTINÚA LEYENDO</h2>
            <span className="text-primary text-xs font-bold cursor-pointer hover:underline">Ver todo</span>
        </div>
        
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {trendingManga.map((manga, idx) => (
              <div key={idx} className="min-w-[280px] bg-surface/40 border border-white/5 rounded-2xl p-3 flex space-x-4 items-center">
                <img src={manga.image} className="w-16 h-20 object-cover rounded-lg shadow-lg" alt="" />
                <div className="flex flex-col">
                  <h4 className="text-sm font-bold text-white uppercase">{manga.title}</h4>
                  <p className="text-[10px] text-textMuted mb-2">{manga.chapter}</p>
                  <div className="w-full bg-background/50 h-1 rounded-full overflow-hidden">
                    <div className="bg-kokoni-gradient h-full w-[85%] rounded-full shadow-[0_0_10px_rgba(0,229,255,0.5)]"></div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
      {/* Filtros de Estado */}
      <section className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
        {filters.map(f => (
          <Tag key={f} active={activeFilter === f} onClick={() => setActiveFilter(f)}>{f}</Tag>
        ))}
      </section>
      <section className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {allManga.map((manga, idx) => (
          <MediaCard key={idx} {...manga} />
        ))}
        
        <div className="fixed bottom-24 right-6 z-50">
          <button className="bg-kokoni-gradient p-4 rounded-full shadow-2xl shadow-primary/40 text-white active:scale-90 transition-all">
            <Plus className="w-6 h-6 stroke-[3px]" />
          </button>
        </div>
      </section>
      <section className="glass-panel p-6 flex justify-around">
        <div className="text-center">
          <p className="text-xs text-textMuted uppercase font-bold tracking-tighter">Capítulos</p>
          <p className="text-xl font-black text-white">1,248</p>
        </div>
        <div className="w-[1px] bg-white/5 h-10 self-center"></div>
        <div className="text-center">
          <p className="text-xs text-textMuted uppercase font-bold tracking-tighter">Streak</p>
          <p className="text-xl font-black text-white">14 <span className="text-[10px] text-primary">DayS</span></p>
        </div>
      </section>
    </div>
  );
};
export default Home;