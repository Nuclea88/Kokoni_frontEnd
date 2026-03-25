const GenreTag = ({ text, variant = "secondary" }) => {

    const variants = {
    primary: "text-primary bg-primary/10 border-primary/20",
    secondary: "text-secondary bg-secondary/10 border-secondary/20",
    white: "text-white bg-white/10 border-white/20",
    danger: "text-red-500 bg-red-500/10 border-red-500/20"
    };

    const colorStyles = variants[variant] || variants.secondary;
    return (
    <span aria-label= "genero" className={`text-[9px] font-bold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full uppercase tracking-widest border ${colorStyles}`}>
      {text}
    </span>
  );
};
export default GenreTag;