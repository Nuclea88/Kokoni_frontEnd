const Button = ({ children, onClick, variant = "primary", className = "" }) => {
  const baseStyle = "w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 active:scale-95";
  const variants = {
    primary: "bg-kokoni-gradient text-white shadow-[0_0_20px_rgba(163,44,196,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)]",
    secondary: "bg-surface text-white border border-white/10 hover:bg-surface/80"
  };
  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};
export default Button;