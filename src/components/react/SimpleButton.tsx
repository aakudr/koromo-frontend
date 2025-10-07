import React from 'react';
import { Check, X, ArrowRight, Download } from 'lucide-react';

interface SimpleButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: 'check' | 'x' | 'arrow' | 'download' | null;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const SimpleButton: React.FC<SimpleButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon = null,
  children,
  onClick,
  disabled = false,
  className = '',
  type = 'button'
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500';
      case 'secondary':
        return 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500';
      case 'success':
        return 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-400';
      case 'danger':
        return 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500';
      default:
        return 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'md':
        return 'px-4 py-2 text-base';
      case 'lg':
        return 'px-6 py-3 text-lg';
      default:
        return 'px-4 py-2 text-base';
    }
  };

  const getIcon = () => {
    const iconSize = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';
    
    switch (icon) {
      case 'check':
        return <Check className={iconSize} />;
      case 'x':
        return <X className={iconSize} />;
      case 'arrow':
        return <ArrowRight className={iconSize} />;
      case 'download':
        return <Download className={iconSize} />;
      default:
        return null;
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2
        font-medium rounded-lg
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        transform hover:scale-105 active:scale-95
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${className}
      `}
      aria-disabled={disabled}
    >
      {getIcon()}
      {children}
    </button>
  );
};

export default SimpleButton;
