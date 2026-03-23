const StatItem = ({ value, label, valueColor = "text-white", hasGlow = false }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-surface/80  rounded-tl-[40px] rounded-br-[40px] rounded-tr-[1px] rounded-bl-[1px] min-w-[76px] px-2 py-3">
      <p className={`font-bold text-lg ${valueColor} ${hasGlow ? 'drop-shadow-[0_0_8px_var(--color-primary)]' : ''}`}>
        {value}
      </p>
      <p className="text-[10px] text-textMuted uppercase tracking-widest font-black mt-1">
        {label}
      </p>
    </div>
  );
};
export default StatItem;