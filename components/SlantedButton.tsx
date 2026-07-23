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
  
  // Increased vertical and horizontal padding for substantial, thick button height
  const sizeStyles = {
    sm: "px-7 py-3.5 text-[10px]",
    md: "px-9 py-4.5 text-[11px]",
    lg: "px-12 py-5.5 text-[12px]"
  };

  const iconSize = {
    sm: "w-3 h-3",
    md: "w-3.5 h-3.5",
    lg: "w-4 h-4"
  };

  const variantStyles = {
    primary: "bg-zinc-900 border border-white/20 text-white hover:border-[#b46c00] hover:bg-zinc-800 hover:shadow-[0_0_30px_rgba(180,108,0,0.4)]",
    secondary: "bg-black/70 backdrop-blur-xl border border-white/20 text-zinc-200 hover:border-white/50 hover:text-white hover:bg-white/10",
    accent: "bg-[#b46c00] text-black border border-[#b46c00] hover:bg-white hover:border-white hover:text-black hover:shadow-[0_0_35px_rgba(180,108,0,0.6)]",
    ghost: "bg-transparent border border-white/15 text-zinc-300 hover:text-white hover:border-white/40 hover:bg-white/5"
  };

  const iconColor = {
    primary: "text-[#b46c00] group-hover:text-white",
    secondary: "text-[#b46c00] group-hover:text-white",
    accent: "text-black group-hover:text-black",
    ghost: "text-[#b46c00] group-hover:text-white"
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-3.5 transform skew-x-12">
        {icon && (
          <svg className={`${iconSize[size]} ${iconColor[variant]} fill-current transition-all duration-300 group-hover:translate-x-0.5 flex-shrink-0`} viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
        <span className="leading-none">{children}</span>
      </span>
    </button>
  );
};

export default SlantedButton;
