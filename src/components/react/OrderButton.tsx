import React, { useState } from 'react';
import { ShoppingCart, CreditCard, Star, Shield, Truck } from 'lucide-react';
import OrderForm, { OrderData } from './OrderForm';

interface OrderButtonProps {
  productTitle?: string;
  productPrice?: string;
  productImage?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  showTrustSignals?: boolean;
  onOrderSubmit?: (data: OrderData) => void;
  className?: string;
}

const OrderButton: React.FC<OrderButtonProps> = ({
  productTitle = "Premium Product",
  productPrice = "$99.99",
  productImage,
  variant = 'primary',
  size = 'md',
  showTrustSignals = true,
  onOrderSubmit,
  className = ""
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOrderSubmit = (data: OrderData) => {
    console.log('Order submitted:', data);
    onOrderSubmit?.(data);
    // Here you would typically send the data to your backend
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl';
      case 'secondary':
        return 'bg-gray-600 text-white hover:bg-gray-700 shadow-lg hover:shadow-xl';
      case 'outline':
        return 'border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white';
      default:
        return 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'md':
        return 'px-6 py-3 text-base';
      case 'lg':
        return 'px-8 py-4 text-lg';
      default:
        return 'px-6 py-3 text-base';
    }
  };

  return (
    <>
      <div className={`${className}`}>
        {/* Trust Signals */}
        {showTrustSignals && (
          <div className="flex items-center justify-center space-x-6 mb-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Secure</span>
            </div>
            <div className="flex items-center space-x-1">
              <Truck className="w-4 h-4 text-green-500" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>4.9/5 Rating</span>
            </div>
          </div>
        )}

        {/* Order Button */}
        <button
          onClick={() => setIsFormOpen(true)}
          className={`
            w-full flex items-center justify-center space-x-2
            font-semibold rounded-lg
            transition-all duration-200 ease-in-out
            focus:outline-none focus:ring-4 focus:ring-green-500/50
            transform hover:scale-105 active:scale-95
            ${getVariantClasses()}
            ${getSizeClasses()}
          `}
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Order Now - {productPrice}</span>
        </button>

        {/* Urgency Text */}
        <p className="text-center text-sm text-gray-500 mt-2">
          ⚡ Limited time offer - Order today and save 20%!
        </p>
      </div>

      {/* Order Form Modal */}
      <OrderForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleOrderSubmit}
        productTitle={productTitle}
        productPrice={productPrice}
        productImage={productImage}
      />
    </>
  );
};

export default OrderButton;
