const ListButton = ({ icon: Icon, variant = "primary", onClick, className = "" }) => {
  const styles = {
    primary: "bg-secondary/20 border border-primary/10 text-secondary hover:text-primary hover:border-primary/50 ",
    active: "bg-primary/20 border border-primary/10  text-primary shadow-[0_0_15px_rgba(163,44,196,0.2)]",
    solid: "bg-kokoni-gradient shadow-2xl shadow-primary/40 text-white"
  };
  return (
    <button 
      onClick={onClick}
      className={`w-12 h-12 flex items-center justify-center rounded-full shrink-0 transition-all active:scale-90 ${styles[variant] || styles.primary} ${className}`}
    >
      <Icon className="w-5 h-5" strokeWidth={3} />
    </button>
  );
};
export default ListButton;