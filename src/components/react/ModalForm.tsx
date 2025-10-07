import React, { useState, useCallback, useEffect } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  MessageSquare, 
  Send,
  Check,
  AlertCircle,
  Loader2
} from 'lucide-react';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  validation?: {
    pattern?: RegExp;
    message?: string;
  };
}

export interface ModalFormData {
  [key: string]: string | boolean;
}

export type FormType = 'contact' | 'newsletter' | 'feedback' | 'custom';

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ModalFormData) => void;
  title?: string;
  description?: string;
  formType?: FormType;
  customFields?: FormField[];
  submitText?: string;
  successMessage?: string;
  className?: string;
}

const ModalForm: React.FC<ModalFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title = "Contact Us",
  description = "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
  formType = 'contact',
  customFields,
  submitText,
  successMessage = "Thank you! Your message has been sent successfully.",
  className = ""
}) => {
  const [formData, setFormData] = useState<ModalFormData>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Predefined form configurations
  const getFormFields = (): FormField[] => {
    if (customFields) return customFields;

    switch (formType) {
      case 'contact':
        return [
          {
            name: 'name',
            label: 'Full Name',
            type: 'text',
            placeholder: 'Enter your full name',
            required: true,
            validation: {
              pattern: /^[a-zA-Z\s]{2,}$/,
              message: 'Name must be at least 2 characters and contain only letters'
            }
          },
          {
            name: 'email',
            label: 'Email Address',
            type: 'email',
            placeholder: 'your.email@example.com',
            required: true,
            validation: {
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email address'
            }
          },
          {
            name: 'phone',
            label: 'Phone Number',
            type: 'tel',
            placeholder: '+1 (555) 123-4567',
            required: false,
            validation: {
              pattern: /^[\+]?[1-9][\d]{0,15}$/,
              message: 'Please enter a valid phone number'
            }
          },
          {
            name: 'subject',
            label: 'Subject',
            type: 'select',
            required: true,
            options: [
              { value: 'general', label: 'General Inquiry' },
              { value: 'support', label: 'Technical Support' },
              { value: 'sales', label: 'Sales Question' },
              { value: 'partnership', label: 'Partnership' },
              { value: 'other', label: 'Other' }
            ]
          },
          {
            name: 'message',
            label: 'Message',
            type: 'textarea',
            placeholder: 'Tell us how we can help you...',
            required: true
          }
        ];

      case 'newsletter':
        return [
          {
            name: 'email',
            label: 'Email Address',
            type: 'email',
            placeholder: 'your.email@example.com',
            required: true,
            validation: {
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email address'
            }
          },
          {
            name: 'name',
            label: 'Name (Optional)',
            type: 'text',
            placeholder: 'Enter your name',
            required: false
          },
          {
            name: 'interests',
            label: 'Interests',
            type: 'select',
            required: false,
            options: [
              { value: 'technology', label: 'Technology' },
              { value: 'design', label: 'Design' },
              { value: 'business', label: 'Business' },
              { value: 'lifestyle', label: 'Lifestyle' },
              { value: 'all', label: 'All Topics' }
            ]
          },
          {
            name: 'terms',
            label: 'I agree to receive marketing emails',
            type: 'checkbox',
            required: true
          }
        ];

      case 'feedback':
        return [
          {
            name: 'name',
            label: 'Name',
            type: 'text',
            placeholder: 'Enter your name',
            required: true
          },
          {
            name: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'your.email@example.com',
            required: true,
            validation: {
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email address'
            }
          },
          {
            name: 'rating',
            label: 'How would you rate our service?',
            type: 'select',
            required: true,
            options: [
              { value: 'excellent', label: 'Excellent' },
              { value: 'good', label: 'Good' },
              { value: 'average', label: 'Average' },
              { value: 'poor', label: 'Poor' }
            ]
          },
          {
            name: 'feedback',
            label: 'Your Feedback',
            type: 'textarea',
            placeholder: 'Please share your thoughts and suggestions...',
            required: true
          }
        ];

      default:
        return [];
    }
  };

  const fields = getFormFields();

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData({});
      setErrors({});
      setIsSubmitted(false);
    }
  }, [isOpen]);

  const validateField = useCallback((field: FormField, value: string | boolean): string | null => {
    if (field.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return `${field.label} is required`;
    }

    if (field.validation && typeof value === 'string' && value.trim()) {
      if (field.validation.pattern && !field.validation.pattern.test(value)) {
        return field.validation.message || `Invalid ${field.label.toLowerCase()}`;
      }
    }

    return null;
  }, []);

  const handleInputChange = useCallback((fieldName: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  }, [errors]);

  const validateForm = useCallback((): boolean => {
    const newErrors: { [key: string]: string } = {};

    fields.forEach(field => {
      const error = validateField(field, formData[field.name]);
      if (error) {
        newErrors[field.name] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [fields, formData, validateField]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    onSubmit(formData);
  }, [formData, validateForm, onSubmit]);

  const handleClose = useCallback(() => {
    if (!isSubmitting) {
      onClose();
    }
  }, [isSubmitting, onClose]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && !isSubmitting) {
      handleClose();
    }
  }, [handleClose, isSubmitting]);

  const getSubmitButtonText = (): string => {
    if (submitText) return submitText;
    
    switch (formType) {
      case 'contact': return 'Send Message';
      case 'newsletter': return 'Subscribe';
      case 'feedback': return 'Submit Feedback';
      default: return 'Submit';
    }
  };

  const getIcon = (): React.ReactNode => {
    switch (formType) {
      case 'contact': return <User className="w-6 h-6" />;
      case 'newsletter': return <Mail className="w-6 h-6" />;
      case 'feedback': return <MessageSquare className="w-6 h-6" />;
      default: return <Send className="w-6 h-6" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleClose}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div
        className={`relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                {getIcon()}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{title}</h2>
                <p className="text-green-100 text-sm">{description}</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="p-2 rounded-full hover:bg-white/20 transition-colors disabled:opacity-50"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  
                  {field.type === 'textarea' ? (
                    <textarea
                      value={formData[field.name] as string || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      rows={4}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none ${
                        errors[field.name] ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  ) : field.type === 'select' ? (
                    <select
                      value={formData[field.name] as string || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors[field.name] ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select {field.label}</option>
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : field.type === 'checkbox' ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData[field.name] as boolean || false}
                        onChange={(e) => handleInputChange(field.name, e.target.checked)}
                        className={`w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 ${
                          errors[field.name] ? 'border-red-500' : ''
                        }`}
                      />
                      <span className="text-sm text-gray-700">{field.label}</span>
                    </div>
                  ) : (
                    <input
                      type={field.type}
                      value={formData[field.name] as string || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors[field.name] ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  )}
                  
                  {errors[field.name] && (
                    <div className="flex items-center space-x-1 mt-1">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <p className="text-red-500 text-sm">{errors[field.name]}</p>
                    </div>
                  )}
                </div>
              ))}

              {/* Submit Button */}
              <div className="pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-green-800 focus:ring-4 focus:ring-green-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>{getSubmitButtonText()}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Success State */
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Success!</h3>
              <p className="text-gray-600 mb-6">{successMessage}</p>
              <button
                onClick={handleClose}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
