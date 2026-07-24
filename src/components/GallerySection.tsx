import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '../types';

interface GallerySectionProps {
  isDarkMode?: boolean;
  galleryItems?: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  isDarkMode = true,
  galleryItems = [],
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const [likesState, setLikesState] = useState<Record<string, number>>(() =>
    galleryItems.reduce((acc, item) => ({ ...acc, [item.id]: item.likes }), {})
  );
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});

  React.useEffect(() => {
    setLikesState(galleryItems.reduce((acc, item) => ({ ...acc, [item.id]: item.likes }), {}));
  }, [galleryItems]);

  const categories = [
    { id: 'all', label: 'All Moments' },
    { id: 'matches', label: 'Matchday Action' },
    { id: 'celebrations', label: 'Celebrations' },
    { id: 'fanclub', label: 'Fan Club' },
    { id: 'trophies', label: 'Trophies' },
    { id: 'training', label: 'Training' },
  ];

  const filteredItems = galleryItems.filter(
    (item) => selectedCategory === 'all' || item.category === selectedCategory
  );

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedIds[id]) {
      setLikesState((prev) => ({ ...prev, [id]: prev[id] - 1 }));
      setLikedIds((prev) => ({ ...prev, [id]: false }));
    } else {
      setLikesState((prev) => ({ ...prev, [id]: prev[id] + 1 }));
      setLikedIds((prev) => ({ ...prev, [id]: true }));
    }
  };

  const handlePrev = () => {
    if (activeItemIndex !== null) {
      setActiveItemIndex((activeItemIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const handleNext = () => {
    if (activeItemIndex !== null) {
      setActiveItemIndex((activeItemIndex + 1) % filteredItems.length);
    }
  };

  return (
    <section
      id="gallery"
      className={`py-20 relative overflow-hidden transition-colors duration-300 border-t ${
        isDarkMode
          ? 'bg-[#0a0a0a] text-white border-white/5'
          : 'bg-slate-50 text-slate-900 border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h3 className="text-[#FF6321] font-bold uppercase text-xs tracking-widest mb-2 flex items-center gap-2 font-montserrat">
            <span className="w-4 h-[1px] bg-[#FF6321]"></span> Media & Moments
          </h3>
          <h2 className="text-4xl sm:text-6xl font-black italic uppercase tracking-tighter font-cinzel">
            PICTURE <span className="text-[#FF6321]">GALLERY</span>
          </h2>
          <p className={`mt-2 text-xs sm:text-sm max-w-2xl ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
            Matchday action, celebration moments, trophy lifts, and passion on the pitch in Sagam.
          </p>
        </motion.div>

        {/* Rounded Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`gallery-filter-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-xs font-black uppercase italic tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#FF6321] text-black shadow-lg scale-105'
                  : isDarkMode
                  ? 'bg-[#111111]/80 backdrop-blur-md text-gray-400 border border-white/10 hover:text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:text-slate-900 shadow-sm'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dynamic Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              id={`gallery-item-${item.id}`}
              onClick={() => setActiveItemIndex(index)}
              className={`group border rounded-3xl p-3 transition-all duration-300 cursor-pointer flex flex-col justify-between backdrop-blur-xl ${
                isDarkMode
                  ? 'bg-[#111111]/70 border-white/10 hover:border-[#FF6321]/60'
                  : 'bg-white/80 border-slate-200/80 hover:border-[#FF6321] shadow-md'
              }`}
            >
              {/* Photo Image */}
              <div className="relative aspect-4/3 sm:aspect-square rounded-2xl overflow-hidden bg-black mb-3">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Category Tag */}
                <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[9px] font-black uppercase tracking-wider text-[#FF6321]">
                  {item.category}
                </div>

                {/* Like Button */}
                <button
                  onClick={(e) => toggleLike(item.id, e)}
                  className={`absolute top-2.5 right-2.5 p-2 rounded-full border backdrop-blur-md transition-all cursor-pointer ${
                    likedIds[item.id]
                      ? 'bg-red-500/20 border-red-500/40 text-red-400'
                      : 'bg-black/60 border-white/20 text-gray-200 hover:text-white hover:bg-[#FF6321] hover:text-black'
                  }`}
                  aria-label="Like photo"
                >
                  <Heart className={`w-3.5 h-3.5 ${likedIds[item.id] ? 'fill-red-500' : ''}`} />
                </button>
              </div>

              {/* Caption Card */}
              <div className="px-1 pb-1">
                <h3 className="font-black italic uppercase text-sm line-clamp-1 group-hover:text-[#FF6321] transition-colors">
                  {item.title}
                </h3>
                <div className={`flex items-center justify-between text-[10px] uppercase mt-1 font-bold ${
                  isDarkMode ? 'text-gray-400' : 'text-slate-500'
                }`}>
                  <span>{item.date}</span>
                  <span className="flex items-center gap-1 font-mono text-[#FF6321]">
                    <Heart className="w-3 h-3 fill-[#FF6321]" />
                    {likesState[item.id]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeItemIndex !== null && filteredItems[activeItemIndex] && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl">
            <div className={`relative max-w-4xl w-full border rounded-3xl overflow-hidden shadow-2xl transition-colors duration-300 ${
              isDarkMode ? 'bg-[#111111] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}>
              <button
                onClick={() => setActiveItemIndex(null)}
                className={`absolute top-4 right-4 z-20 p-2.5 rounded-full border transition-all cursor-pointer ${
                  isDarkMode ? 'bg-black/80 text-gray-400 hover:text-white hover:bg-[#FF6321] hover:text-black border-white/10' : 'bg-white/90 text-slate-700 hover:bg-[#FF6321] hover:text-black border-slate-200 shadow-md'
                }`}
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative max-h-[75vh] bg-slate-950 flex items-center justify-center overflow-hidden">
                <img
                  src={filteredItems[activeItemIndex].imageUrl}
                  alt={filteredItems[activeItemIndex].title}
                  className="max-h-[75vh] w-auto max-w-full object-contain"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />

                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/80 text-white hover:bg-[#FF6321] hover:text-black border border-white/10 rounded-full transition-all cursor-pointer"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/80 text-white hover:bg-[#FF6321] hover:text-black border border-white/10 rounded-full transition-all cursor-pointer"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              <div className={`p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t ${
                isDarkMode ? 'bg-[#0a0a0a] text-white border-white/10' : 'bg-slate-50 text-slate-900 border-slate-200'
              }`}>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6321]">
                    {filteredItems[activeItemIndex].category} • {filteredItems[activeItemIndex].date}
                  </span>
                  <h3 className="text-xl font-black italic uppercase mt-1">
                    {filteredItems[activeItemIndex].title}
                  </h3>
                  <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                    {filteredItems[activeItemIndex].caption}
                  </p>
                </div>

                <button
                  onClick={(e) => toggleLike(filteredItems[activeItemIndex].id, e)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full border font-black italic text-xs uppercase cursor-pointer hover:border-[#FF6321] ${
                    isDarkMode ? 'bg-[#111111] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-800 shadow-sm'
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${likedIds[filteredItems[activeItemIndex].id] ? 'fill-red-500 text-red-500' : ''}`}
                  />
                  <span>{likesState[filteredItems[activeItemIndex].id]} Likes</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
