const Button = ({ children, onClick, variant = "primary", icon: Icon, className = "" }) => {
  const baseStyle = "w-full py-4 leaf-shape font-bold text-sm transition-all duration-300 active:scale-95 flex items-center justify-center space-x-3";
  const variants = {
    primary: "bg-kokoni-gradient text-white shadow-lg shadow-primary/20]",
    secondary: "bg-surface text-white border border-white/10 hover:bg-surface/80",
     danger: "bg-white/5 text-[#ff8a8a] border border-white/10 hover:bg-red-500/10"
  };
  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
        {Icon && <Icon className="w-12 h-5" />}
        {children}
    </button>
  );
};
export default Button;