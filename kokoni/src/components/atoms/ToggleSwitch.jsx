const ToggleSwitch = ({ checked, onChange, colorCls = "bg-primary" }) => {
  return (
    <div 
      onClick={onChange}
      className={`relative w-12 h-6 flex items-center rounded-full cursor-pointer transition-colors duration-300 ${
        checked ? colorCls : 'bg-white/20 border border-white/10'
      }`}
    >
      <div 
        className={`absolute w-5 h-5 bg-background rounded-full shadow-md transition-transform duration-300 ${
          checked ? 'translate-x-[26px]' : 'translate-x-1 opacity-80'
        }`}
      />
    </div>
  );
};
export default ToggleSwitch;