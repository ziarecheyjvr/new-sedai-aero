import React from 'react';

interface SlantedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: boolean;
  className?: string;
}

const SlantedButton: React.FC<SlantedButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon = true,
  className = '',
  ...props
}) => {
  const baseStyles = "relative inline-flex items-center justify-center transform -skew-x-12 transition-all duration-300 font-black tracking-[0.25em] uppercase group select-none cursor-pointer";
  
  const sizeStyles = {
    sm: "px-5 py-2.5 text-[9px]",
    md: "px-7 py-3.5 text-[10px]",
    lg: "px-9 py-4.5 text-[11px]"
  };

  const badgeSize = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-4.5 h-4.5"
  };

  const iconSize = {
    sm: "w-2 h-2",
    md: "w-2.5 h-2.5",
    lg: "w-3 h-3"
  };

  const variantStyles = {
    primary: "bg-zinc-900/90 border border-white/20 text-white hover:border-[#b46c00] hover:shadow-[0_0_25px_rgba(180,108,0,0.35)]",
    secondary: "bg-black/60 backdrop-blur-xl border border-white/15 text-zinc-300 hover:border-white/40 hover:text-white",
    accent: "bg-[#b46c00] text-white border border-[#b46c00] hover:bg-[#c97b00] hover:shadow-[0_0_30px_rgba(180,108,0,0.5)]",
    ghost: "bg-transparent border border-white/10 text-zinc-400 hover:text-white hover:border-white/30"
  };

  const badgeBg = {
    primary: "bg-[#b46c00] text-black group-hover:bg-white transition-colors duration-300",
    secondary: "bg-white/10 text-white group-hover:bg-[#b46c00] group-hover:text-black transition-colors duration-300",
    accent: "bg-black text-[#b46c00] group-hover:bg-white group-hover:text-black transition-colors duration-300",
    ghost: "bg-white/10 text-zinc-400 group-hover:bg-[#b46c00] group-hover:text-white transition-colors duration-300"
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-3 transform skew-x-12">
        {icon && (
          <span className={`${badgeSize[size]} rounded-[3px] flex items-center justify-center flex-shrink-0 ${badgeBg[variant]} transition-transform duration-300 group-hover:scale-105`}>
            <svg className={`${iconSize[size]} fill-current transform translate-x-[0.5px]`} viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        )}
        <span className="leading-none">{children}</span>
      </span>
    </button>
  );
};

export default SlantedButton;
