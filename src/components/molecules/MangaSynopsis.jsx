import GenreTag from '../atoms/GenreTag';
import { Languages } from 'lucide-react';
import { useState } from 'react';
import TextButton from '../atoms/TextButton';
import { translateText } from '../../utils/translator';


const MangaSynopsis = ({ description, genres }) => {
    const isMap = typeof description === 'object' && description !== null;
    const availableLangs = isMap ? Object.keys(description) : [];

    const [selectedLang, setSelectedLang] = useState(null);
    const [translatedText, setTranslatedText] = useState(null);
    const [isTranslating, setIsTranslating] = useState(false);

    const [prevDesc, setPrevDesc] = useState(description);
    if (description !== prevDesc) {
        setPrevDesc(description);
        setSelectedLang(null);
        setTranslatedText(null);
    }

    let currentLang = selectedLang;
    if (!currentLang) {
        if (isMap) {
            currentLang = availableLangs.includes('es') ? 'es' : (availableLangs[0] || 'en');
        } else {
            currentLang = 'en';
        }
    }


    const originalText = isMap ? (description[currentLang] || "Sin descripción") : description;
    const textToShow = translatedText || originalText;

    const handleLangChange = (e) => {
        setSelectedLang(e.target.value);
        setTranslatedText(null); 
    };

    const handleTranslate = async () => {
        setIsTranslating(true);
        const sourceLang = typeof description === 'string' ? 'en' :currentLang;
        const result = await translateText(originalText, sourceLang, 'es');

        setTranslatedText(result);
        setIsTranslating(false);
    };

    return (
        <section className="pt-2">
            <div className="flex flex-col gap-2 mb-3">
                <div className="flex justify-between items-center">
                    <h3 className="text-[11px] text-textMuted uppercase font-black tracking-[0.2em]">SINOPSIS</h3>
                    
                    <div className="flex gap-3 items-center">
                        {isMap && availableLangs.length > 1 && (
                            <div className="flex items-center gap-1 border border-white/5 rounded-lg px-2 bg-surface/50">
                                <Languages size={12} className="text-textMuted" />
                                <select 
                                    value={currentLang} 
                                    onChange={handleLangChange}
                                    className="bg-transparent text-xs text-white/70 py-1 outline-none cursor-pointer"
                                >
                                    {availableLangs.map(l => (
                                        <option key={l} value={l} className="bg-background">{l.toUpperCase()}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        {currentLang !== 'es' && !translatedText && (
                            <TextButton
                                onClick={handleTranslate} 
                                disabled={isTranslating}
                                className="text-[11px] gap-1 opacity-90 hover:opacity-100"
                            >
                                <Languages size={12} />
                                {isTranslating ? 'Traduciendo...' : 'Traducir al Español'}
                            </TextButton>
                        )}
                    </div>
                </div>
            </div>
            
            <p className="text-xs text-white/70 leading-relaxed font-medium mb-4">{textToShow}</p>
            
            <div className="flex flex-wrap gap-2 pb-8 border-b border-white/5">
                {(genres || []).map((g, index) => {
                    const badgeColor = index % 2 === 0 ? "secondary" : "primary";
                    return <GenreTag key={g} text={g} variant={badgeColor} />;
                })}
            </div>
        </section>
    );
};


        // <section className="pt-2">
        //     <h3 className="text-[11px] text-textMuted uppercase font-black tracking-[0.2em] mb-3">SINOPSIS</h3>
        //     <p className="text-xs text-white/70 leading-relaxed font-medium mb-4">{description}</p>
            
        //     <div className="flex flex-wrap gap-2 pb-8 border-b border-white/5">
        //         {(genres || []).map((g, index) => {
        //             const badgeColor = index % 2 === 0 ? "secondary" : "primary";
        //             return <GenreTag key={g} text={g} variant={badgeColor} />;
        //         })}
        //     </div>
        // </section>
  // );
export default MangaSynopsis;