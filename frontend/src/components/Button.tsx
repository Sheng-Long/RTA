import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const Button = ({ variant = 'primary', size = 'md', className = '', disabled, children, ...props }: ButtonProps) => {
  const baseStyles = 'rounded transition-colors';
  const cursorStyle = disabled ? 'cursor-not-allowed' : 'cursor-pointer';
  
  const variantStyles = {
    primary: 'bg-washedBlack border border-sightful text-sightful hover:bg-satinDeepBlack',
    secondary: 'bg-sightful text-blueCharcoal hover:bg-ducati',
    danger: 'text-bloodRush border border-bloodRush hover:bg-satinDeepBlack',
  };

  const sizeStyles = {
    sm: 'px-3 py-1',
    md: 'px-4 py-2',
    lg: 'px-6 py-3',
  };

  const classes = `${baseStyles} ${cursorStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
