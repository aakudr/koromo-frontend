import React, { useState } from 'react';
import { 
  Heart, 
  Star, 
  Share2, 
  Eye, 
  ChevronRight,
  Check,
  X
} from 'lucide-react';

interface InteractiveCardProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  isLiked?: boolean;
  rating?: number;
  onLike?: () => void;
  onShare?: () => void;
  onView?: () => void;
  className?: string;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({
  title = "Sample Card",
  description = "This is a sample interactive card component with Tailwind CSS styling, animations, and accessibility features.",
  imageUrl,
  isLiked = false,
  rating = 4.5,
  onLike,
  onShare,
  onView,
  className = ""
}) => {
  const [liked, setLiked] = useState(isLiked);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    onLike?.();
  };

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  return (
    <div
      className={`
        group relative bg-white border border-gray-200 rounded-lg shadow-sm
        transition-all duration-300 ease-in-out
        hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1
        focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2
        ${isFocused ? 'ring-2 ring-green-500 ring-offset-2' : ''}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      tabIndex={0}
      role="article"
      aria-label={`Card: ${title}`}
    >
      {/* Image Section */}
      {imageUrl && (
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>
      )}

      {/* Content Section */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-200">
            {title}
          </h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 font-medium">{rating}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Like Button */}
            <button
              onClick={handleLike}
              onKeyDown={(e) => handleKeyDown(e, handleLike)}
              className={`
                flex items-center justify-center w-10 h-10 rounded-full
                transition-all duration-200 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                ${liked 
                  ? 'bg-red-50 text-red-500 hover:bg-red-100' 
                  : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-red-500'
                }
                transform hover:scale-110 active:scale-95
              `}
              aria-label={liked ? 'Unlike this item' : 'Like this item'}
              aria-pressed={liked}
            >
              <Heart 
                className={`w-5 h-5 transition-all duration-200 ${
                  liked ? 'fill-current scale-110' : 'group-hover:scale-110'
                }`} 
              />
            </button>

            {/* Share Button */}
            <button
              onClick={onShare}
              onKeyDown={(e) => handleKeyDown(e, onShare || (() => {}))}
              className="
                flex items-center justify-center w-10 h-10 rounded-full
                bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-green-500
                transition-all duration-200 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                transform hover:scale-110 active:scale-95
              "
              aria-label="Share this item"
            >
              <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            </button>

            {/* View Button */}
            <button
              onClick={onView}
              onKeyDown={(e) => handleKeyDown(e, onView || (() => {}))}
              className="
                flex items-center justify-center w-10 h-10 rounded-full
                bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-green-500
                transition-all duration-200 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                transform hover:scale-110 active:scale-95
              "
              aria-label="View details"
            >
              <Eye className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            </button>
          </div>

          {/* Action Arrow */}
          <div className="flex items-center text-gray-400 group-hover:text-green-500 transition-colors duration-200">
            <span className="text-sm font-medium mr-1 hidden sm:block">View</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </div>

      {/* Hover Overlay Effect */}
      <div className={`
        absolute inset-0 rounded-lg border-2 border-transparent
        transition-all duration-300 ease-in-out pointer-events-none
        ${isHovered ? 'border-green-200 bg-green-50/20' : ''}
      `} />

      {/* Loading State (for demonstration) */}
      <div className="absolute inset-0 bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500" />
      </div>
    </div>
  );
};

export default InteractiveCard;
