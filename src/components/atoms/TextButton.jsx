const TextButton = ({ children, onClick, className = "", type = "button", ...props }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-center text-primary font-bold cursor-pointer hover:underline bg-transparent border-0 leading-none transition-all ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
export default TextButton;