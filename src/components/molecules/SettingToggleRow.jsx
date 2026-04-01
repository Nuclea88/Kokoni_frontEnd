import  ToggleSwitch  from '../atoms/ToggleSwitch';

const SettingToggleRow = ({ icon: Icon, title, active, onToggle }) => {

  return (
    <article className="flex items-center justify-between p-4 bg-surface/40 hover:bg-surface/60 transition-colors border-b border-white/5 last:border-b-0">
      <section className="flex items-center space-x-4">
        <Icon className="w-5 h-5 text-secondary" strokeWidth={2} />
        <span className="text-[13px] font-medium text-white tracking-tight">{title}</span>
      </section>
      <ToggleSwitch checked={active} onChange={onToggle} colorCls="bg-primary" />
    </article>
  );
};
export default SettingToggleRow;