export const translateText = async (text, sourceLang = 'en', targetLang = 'es') => {
    if (!text) return "";
    
    try {
        const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);
        const data = await res.json();
        
        if (data && data[0]) {
            return data[0].map(item => item[0]).join('');
        }
        return text; 
    } catch (error) {
        console.error("Error en la utilidad de traducción:", error);
        return text; 
    }
};