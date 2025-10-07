import React, { useState, useCallback } from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  Send,
  Check,
  AlertCircle,
  Loader2
} from 'lucide-react';

export interface ContactData {
  fullName: string;
  phone: string;
  email?: string;
}

interface ContactFormProps {
  onSubmit: (data: ContactData) => void;
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  className = ""
}) => {
  const [formData, setFormData] = useState<ContactData>({
    fullName: '',
    phone: '',
    email: ''
  });

  const [errors, setErrors] = useState<Partial<ContactData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<ContactData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'ФИО обязательно для заполнения';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'ФИО должно содержать минимум 2 символа';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Номер телефона обязателен для заполнения';
    } else if (!/^[\+]?[1-9][\d\s\-\(\)]{7,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Пожалуйста, введите корректный номер телефона';
    }

    if (formData.email && formData.email.trim()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Пожалуйста, введите корректный email адрес';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = useCallback((field: keyof ContactData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    onSubmit(formData);
  }, [formData, validateForm, onSubmit]);

  const handleReset = useCallback(() => {
    setFormData({
      fullName: '',
      phone: '',
      email: ''
    });
    setErrors({});
    setIsSubmitted(false);
  }, []);

  if (isSubmitted) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Спасибо!</h3>
        <p className="text-gray-600 mb-6">
          Ваши контактные данные получены. Мы свяжемся с вами в ближайшее время для подтверждения заказа.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">Ваши данные:</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>ФИО:</strong> {formData.fullName}</p>
            <p><strong>Телефон:</strong> {formData.phone}</p>
            {formData.email && <p><strong>Email:</strong> {formData.email}</p>}
          </div>
        </div>
        <button
          onClick={handleReset}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Отправить еще один заказ
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {/* Full Name Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
          <User className="w-4 h-4 mr-2 text-green-600" />
          ФИО <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
            errors.fullName ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Введите ваше полное имя"
        />
        {errors.fullName && (
          <div className="flex items-center space-x-1 mt-2">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <p className="text-red-500 text-sm">{errors.fullName}</p>
          </div>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
          <Phone className="w-4 h-4 mr-2 text-green-600" />
          Номер телефона <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
            errors.phone ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="+7 (999) 123-45-67"
        />
        {errors.phone && (
          <div className="flex items-center space-x-1 mt-2">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <p className="text-red-500 text-sm">{errors.phone}</p>
          </div>
        )}
      </div>

      {/* Email Field (Optional) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
          <Mail className="w-4 h-4 mr-2 text-green-600" />
          Email <span className="text-gray-400 ml-1">*</span>
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="your.email@example.com"
        />
        {errors.email && (
          <div className="flex items-center space-x-1 mt-2">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <p className="text-red-500 text-sm">{errors.email}</p>
          </div>
        )}
        <p className="text-sm text-gray-500 mt-1">
          Email поможет нам быстрее связаться с вами и отправить подтверждение заказа
        </p>
      </div>

      {/* Submit Button */}
      <div className="pt-4 border-t border-gray-200">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-green-800 focus:ring-4 focus:ring-green-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Отправляем...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Отправить заказ</span>
            </>
          )}
        </button>
        <p className="text-center text-sm text-gray-500 mt-3">
          Нажимая кнопку "Отправить заказ", вы соглашаетесь с обработкой персональных данных
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
