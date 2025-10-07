import React, { useState, useCallback } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Share2, 
  Heart,
  Filter,
  Grid3X3,
  List,
  Search,
  ShoppingCart
} from 'lucide-react';

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  category: string;
  tags: string[];
  isLiked?: boolean;
  date?: string;
  size?: string;
  price?: string;
}

interface ResponsiveGalleryProps {
  items: GalleryItem[];
  title?: string;
  showFilters?: boolean;
  showSearch?: boolean;
  showViewToggle?: boolean;
  onItemClick?: (item: GalleryItem) => void;
  onLike?: (item: GalleryItem) => void;
  onShare?: (item: GalleryItem) => void;
  onDownload?: (item: GalleryItem) => void;
  onOrder?: (item: GalleryItem) => void;
  className?: string;
}

type ViewMode = 'grid' | 'list';
type SortBy = 'date' | 'title' | 'category';

const ResponsiveGallery: React.FC<ResponsiveGalleryProps> = ({
  items,
  title = "Gallery",
  showFilters = true,
  showSearch = true,
  showViewToggle = true,
  onItemClick,
  onLike,
  onShare,
  onDownload,
  onOrder,
  className = ""
}) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortBy>('date');
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(items.map(item => item.category)))];

  // Filter and sort items
  const filteredItems = items
    .filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'date':
        default:
          return new Date(b.date || '').getTime() - new Date(a.date || '').getTime();
      }
    });

  const handleItemClick = useCallback((item: GalleryItem) => {
    setSelectedItem(item);
    onItemClick?.(item);
  }, [onItemClick]);

  const handleLike = useCallback((item: GalleryItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const newLikedItems = new Set(likedItems);
    if (newLikedItems.has(item.id)) {
      newLikedItems.delete(item.id);
    } else {
      newLikedItems.add(item.id);
    }
    setLikedItems(newLikedItems);
    onLike?.(item);
  }, [likedItems, onLike]);

  const handleShare = useCallback((item: GalleryItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onShare?.(item);
  }, [onShare]);

  const handleDownload = useCallback((item: GalleryItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onDownload?.(item);
  }, [onDownload]);

  const handleOrder = useCallback((item: GalleryItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onOrder?.(item);
  }, [onOrder]);

  const closeModal = useCallback(() => {
    setSelectedItem(null);
  }, []);

  const navigateModal = useCallback((direction: 'prev' | 'next') => {
    if (!selectedItem) return;
    const currentIndex = filteredItems.findIndex(item => item.id === selectedItem.id);
    let newIndex;
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1;
    } else {
      newIndex = currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0;
    }
    setSelectedItem(filteredItems[newIndex]);
  }, [selectedItem, filteredItems]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') navigateModal('prev');
    if (e.key === 'ArrowRight') navigateModal('next');
  }, [closeModal, navigateModal]);

  return (
    <div className={`w-full ${className}`}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600">
          {filteredItems.length} of {items.length} items
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Search */}
        {showSearch && (
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search gallery..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        )}

        {/* Filters */}
        {showFilters && (
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
              <option value="category">Sort by Category</option>
            </select>
          </div>
        )}

        {/* View Toggle */}
        {showViewToggle && (
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 transition-colors ${
                viewMode === 'list' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Gallery Grid/List */}
      <div className={
        viewMode === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          : 'space-y-4'
      }>
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item)}
            className={`
              group relative bg-white border border-gray-200 rounded-lg shadow-sm
              transition-all duration-300 ease-in-out cursor-pointer
              hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1
              focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2
              ${viewMode === 'list' ? 'flex items-center space-x-4 p-4' : ''}
            `}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleItemClick(item);
              }
            }}
            aria-label={`View ${item.title}`}
          >
            {/* Image */}
            <div className={`
              relative overflow-hidden
              ${viewMode === 'grid' ? 'rounded-t-lg' : 'rounded-lg w-24 h-24 flex-shrink-0'}
            `}>
              <img
                src={item.imageUrl}
                alt={item.title}
                className={`
                  w-full object-cover transition-transform duration-500 group-hover:scale-105
                  ${viewMode === 'grid' ? 'h-48' : 'h-full'}
                `}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              
              {/* Overlay Actions */}
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={(e) => handleLike(item, e)}
                  className={`
                    p-2 rounded-full transition-all duration-200
                    ${likedItems.has(item.id) 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
                    }
                  `}
                  aria-label={likedItems.has(item.id) ? 'Unlike' : 'Like'}
                >
                  <Heart className={`w-4 h-4 ${likedItems.has(item.id) ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={(e) => handleShare(item, e)}
                  className="p-2 rounded-full bg-white/90 text-gray-600 hover:bg-green-500 hover:text-white transition-all duration-200"
                  aria-label="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => handleDownload(item, e)}
                  className="p-2 rounded-full bg-white/90 text-gray-600 hover:bg-blue-500 hover:text-white transition-all duration-200"
                  aria-label="Download"
                >
                  <Download className="w-4 h-4" />
                </button>
                {item.price && (
                  <button
                    onClick={(e) => handleOrder(item, e)}
                    className="p-2 rounded-full bg-white/90 text-gray-600 hover:bg-green-600 hover:text-white transition-all duration-200"
                    aria-label="Order"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Content */}
            <div className={viewMode === 'grid' ? 'p-4' : 'flex-1'}>
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-200">
                  {item.title}
                </h3>
                {item.date && (
                  <span className="text-sm text-gray-500 ml-2">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                )}
              </div>
              
              {item.description && (
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {item.description}
                </p>
              )}
              
              <div className="flex items-center justify-between">
                <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                  {item.category}
                </span>
                <div className="flex items-center space-x-2">
                  {item.price && (
                    <span className="text-sm font-bold text-green-600">{item.price}</span>
                  )}
                  {item.size && (
                    <span className="text-xs text-gray-500">{item.size}</span>
                  )}
                </div>
              </div>
              
              {item.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {item.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                  {item.tags.length > 3 && (
                    <span className="text-xs text-gray-500">+{item.tags.length - 3} more</span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Filter className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <div
            className="relative max-w-4xl max-h-full bg-white rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{selectedItem.title}</h2>
                <p className="text-sm text-gray-600">{selectedItem.category}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleLike(selectedItem, e)}
                  className={`
                    p-2 rounded-full transition-all duration-200
                    ${likedItems.has(selectedItem.id) 
                      ? 'bg-red-500 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-red-500 hover:text-white'
                    }
                  `}
                >
                  <Heart className={`w-5 h-5 ${likedItems.has(selectedItem.id) ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={(e) => handleShare(selectedItem, e)}
                  className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-green-500 hover:text-white transition-all duration-200"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => handleDownload(selectedItem, e)}
                  className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-500 hover:text-white transition-all duration-200"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  onClick={closeModal}
                  className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-4">
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                className="w-full max-h-96 object-contain rounded-lg"
              />
              
              {selectedItem.description && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600">{selectedItem.description}</p>
                </div>
              )}
              
              {selectedItem.tags.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            {filteredItems.length > 1 && (
              <>
                <button
                  onClick={() => navigateModal('prev')}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/90 text-gray-600 hover:bg-white transition-all duration-200"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => navigateModal('next')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/90 text-gray-600 hover:bg-white transition-all duration-200"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponsiveGallery;
