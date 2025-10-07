import React, { useState } from 'react';
import { 
  MessageSquare, 
  Mail, 
  User, 
  Send,
  Plus,
  Edit3
} from 'lucide-react';
import ModalForm, { FormType, ModalFormData } from './ModalForm';

interface ModalButtonProps {
  formType?: FormType;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonVariant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  buttonSize?: 'sm' | 'md' | 'lg';
  buttonIcon?: 'message' | 'mail' | 'user' | 'send' | 'plus' | 'edit' | 'none';
  customFields?: any[];
  submitText?: string;
  successMessage?: string;
  onFormSubmit?: (data: ModalFormData) => void;
  className?: string;
}

const ModalButton: React.FC<ModalButtonProps> = ({
  formType = 'contact',
  title,
  description,
  buttonText,
  buttonVariant = 'primary',
  buttonSize = 'md',
  buttonIcon = 'message',
  customFields,
  submitText,
  successMessage,
  onFormSubmit,
  className = ""
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFormSubmit = (data: ModalFormData) => {
    console.log('Form submitted:', data);
    onFormSubmit?.(data);
  };

  const getButtonText = (): string => {
    if (buttonText) return buttonText;
    
    switch (formType) {
      case 'contact': return 'Contact Us';
      case 'newsletter': return 'Subscribe';
      case 'feedback': return 'Give Feedback';
      default: return 'Open Form';
    }
  };

  const getButtonIcon = (): React.ReactNode => {
    if (buttonIcon === 'none') return null;
    
    const iconSize = buttonSize === 'sm' ? 'w-4 h-4' : buttonSize === 'lg' ? 'w-6 h-6' : 'w-5 h-5';
    
    switch (buttonIcon) {
      case 'message': return <MessageSquare className={iconSize} />;
      case 'mail': return <Mail className={iconSize} />;
      case 'user': return <User className={iconSize} />;
      case 'send': return <Send className={iconSize} />;
      case 'plus': return <Plus className={iconSize} />;
      case 'edit': return <Edit3 className={iconSize} />;
      default: return <MessageSquare className={iconSize} />;
    }
  };

  const getVariantClasses = (): string => {
    switch (buttonVariant) {
      case 'primary':
        return 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl';
      case 'secondary':
        return 'bg-gray-600 text-white hover:bg-gray-700 shadow-lg hover:shadow-xl';
      case 'outline':
        return 'border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white';
      case 'ghost':
        return 'text-green-600 hover:bg-green-50';
      default:
        return 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl';
    }
  };

  const getSizeClasses = (): string => {
    switch (buttonSize) {
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

  const getFormTitle = (): string => {
    if (title) return title;
    
    switch (formType) {
      case 'contact': return 'Contact Us';
      case 'newsletter': return 'Subscribe to Newsletter';
      case 'feedback': return 'Share Your Feedback';
      default: return 'Form';
    }
  };

  const getFormDescription = (): string => {
    if (description) return description;
    
    switch (formType) {
      case 'contact': return "We'd love to hear from you. Send us a message and we'll respond as soon as possible.";
      case 'newsletter': return 'Stay updated with our latest news, tips, and exclusive offers.';
      case 'feedback': return 'Help us improve by sharing your thoughts and suggestions.';
      default: return 'Please fill out the form below.';
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`
          inline-flex items-center justify-center space-x-2
          font-medium rounded-lg
          transition-all duration-200 ease-in-out
          focus:outline-none focus:ring-4 focus:ring-green-500/50
          transform hover:scale-105 active:scale-95
          ${getVariantClasses()}
          ${getSizeClasses()}
          ${className}
        `}
      >
        {getButtonIcon()}
        <span>{getButtonText()}</span>
      </button>

      <ModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        title={getFormTitle()}
        description={getFormDescription()}
        formType={formType}
        customFields={customFields}
        submitText={submitText}
        successMessage={successMessage}
      />
    </>
  );
};

export default ModalButton;
