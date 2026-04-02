import GenreTag from '../atoms/GenreTag';
const MangaSynopsis = ({ description, genres }) => (
    <section className="pt-2">
        <h3 className="text-[11px] text-textMuted uppercase font-black tracking-[0.2em] mb-3">SINOPSIS</h3>
        <p className="text-xs text-white/70 leading-relaxed font-medium mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2 pb-8 border-b border-white/5">
            {(genres || []).map((g, index) => {
                const badgeColor = index % 2 === 0 ? "secondary" : "primary";
                return <GenreTag key={g} text={g} variant={badgeColor} />;
            })}
        </div>
    </section>
);
export default MangaSynopsis;