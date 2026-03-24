const INPUT_STYLES = "w-full bg-surface/50 border border-white/10 rounded-xl py-3 px-4 pl-12 text-sm text-white placeholder-textMuted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300";


const Input = ({ type = "text", placeholder, value, onChange, icon: Icon }) => {
  return (
    <div className="relative w-full flex items-center">
      {Icon && <Icon className="absolute left-4 text-textMuted w-5 h-5" />}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={INPUT_STYLES}
      />
    </div>
  );
};
export default Input;