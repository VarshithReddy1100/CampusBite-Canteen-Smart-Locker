import React, { useState } from 'react';
import { FoodItem, CartItem } from '../../types';
import { APP_ASSETS } from '../../data/mockData';

interface ItemCustomizerScreenProps {
  item?: FoodItem;
  onAddToCart: (customizedItem: CartItem) => void;
  onViewTray: () => void;
  onBack: () => void;
}

export const ItemCustomizerScreen: React.FC<ItemCustomizerScreenProps> = ({
  item,
  onAddToCart,
  onViewTray,
  onBack,
}) => {
  const basePrice = item ? item.price : 6.80;

  // Form selections
  const [selectedGrain, setSelectedGrain] = useState<{ name: string; price: number; desc: string }>({
    name: 'Warm Steamed Brown Rice',
    price: 0.0,
    desc: 'Toasted nutty aroma • Low GI',
  });

  const [selectedProtein, setSelectedProtein] = useState<{ name: string; price: number; desc: string }>({
    name: 'Standard (150g Cutlet)',
    price: 0.0,
    desc: 'Included',
  });

  const [selectedAddins, setSelectedAddins] = useState<string[]>(['Onsen Jammy Egg']);
  const [selectedSauce, setSelectedSauce] = useState('Signature Garlic Teriyaki');
  const [specialNotes, setSpecialNotes] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Grain options
  const grainOptions = [
    {
      name: 'Warm Steamed Brown Rice',
      price: 0.0,
      label: 'Free',
      desc: 'Toasted nutty aroma • Low GI',
    },
    {
      name: 'Organic Quinoa & Tuscan Kale',
      price: 0.8,
      label: '+$0.80',
      desc: 'Extra fiber • Superfood blend',
    },
    {
      name: 'Chilled Buckwheat Soba Noodles',
      price: 0.5,
      label: '+$0.50',
      desc: 'Tossed in sesame & sesame shoyu',
    },
  ];

  // Add-in options
  const addinOptions = [
    { id: 'egg', name: 'Onsen Jammy Egg', desc: '+6g Protein' },
    { id: 'daikon', name: 'Pickled Daikon', desc: 'Tangy crunch' },
    { id: 'edamame', name: 'Steamed Edamame', desc: 'Sea salt dusted' },
    { id: 'shallots', name: 'Crispy Shallots', desc: 'Aromatic crunch' },
  ];

  const handleAddinToggle = (name: string) => {
    if (selectedAddins.includes(name)) {
      setSelectedAddins(selectedAddins.filter((a) => a !== name));
    } else {
      if (selectedAddins.length < 3) {
        setSelectedAddins([...selectedAddins, name]);
      }
    }
  };

  const calculateUnitTotal = () => {
    return basePrice + selectedGrain.price + selectedProtein.price;
  };

  const finalTotal = calculateUnitTotal() * quantity;

  const handleAddToTray = () => {
    const customized: CartItem = {
      id: 'cart-' + Date.now(),
      itemId: item ? item.id : 'teriyaki-bowl',
      name: item ? item.name : 'Teriyaki Chicken Grain Bowl',
      summary: `${selectedGrain.name.split(' ')[0]}, ${selectedAddins.join(', ')}`,
      price: calculateUnitTotal(),
      quantity: quantity,
      image: item?.image || APP_ASSETS.cartTeriyakiBowl,
      customization: {
        grainBase: selectedGrain,
        proteinLevel: selectedProtein,
        freeAddins: selectedAddins,
        sauceChoice: selectedSauce,
        specialNotes,
        quantity,
      },
    };

    onAddToCart(customized);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2800);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'CampusBite: Teriyaki Glazed Chicken Grain Bowl',
          text: 'Order the best campus teriyaki bowl with heated locker pickup!',
          url: window.location.href,
        });
      } catch {
        // Ignored
      }
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setShowToast(true);
    }
  };

  return (
    <div className="flex flex-col w-full pb-36">
      {/* Hero Media Canvas */}
      <div className="relative w-full h-72 overflow-hidden bg-[#e2e7ff]">
        <img
          className="w-full h-full object-cover"
          alt="Teriyaki Glazed Chicken Grain Bowl"
          src={APP_ASSETS.teriyakiBowlHero}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#faf8ff] via-transparent to-black/30 pointer-events-none"></div>

        {/* Floating Top Utility Badges */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          <button
            aria-label="Save to favorites"
            onClick={() => setIsFavorite(!isFavorite)}
            className={`w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center transition-all active:scale-90 ${
              isFavorite ? 'text-[#ab3500]' : 'text-[#131b2e] hover:text-[#ab3500]'
            }`}
          >
            <span
              className="material-symbols-outlined text-[20px] transition-transform"
              style={isFavorite ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              favorite
            </span>
          </button>
          <button
            aria-label="Share item"
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-[#131b2e] hover:text-[#ab3500] active:scale-90 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">share</span>
          </button>
        </div>

        {/* Meal Plan Qualifier Floating Chip */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6cf8bb] text-[#00714d] shadow-md z-10">
          <span
            className="material-symbols-outlined text-[16px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified
          </span>
          <span className="text-[0.6875rem] font-bold uppercase tracking-wide">
            Student Meal Plan Tier 1
          </span>
        </div>
      </div>

      {/* Item Title & Key Overview */}
      <div className="px-4 pt-4 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <span className="text-xs text-[#ab3500] font-bold tracking-wide uppercase">
              Station 3 • Golden Wok Bar
            </span>
            <h2 className="text-xl font-extrabold text-[#131b2e] mt-0.5 leading-snug">
              {item ? item.name : 'Teriyaki Glazed Chicken Grain Bowl'}
            </h2>
          </div>
          <div className="flex flex-col items-end flex-shrink-0">
            <span className="text-2xl font-black text-[#ab3500]">
              ${basePrice.toFixed(2)}
            </span>
            <span className="text-xs text-[#8d7168] line-through">
              ${(basePrice * 1.25).toFixed(2)} Reg
            </span>
          </div>
        </div>

        <p className="text-sm text-[#594139] leading-relaxed">
          {item
            ? item.description
            : 'Tender grilled chicken thigh glazed in authentic mirin-teriyaki, resting over your choice of hearty whole grains with fresh, quick-prepped crisp seasonal toppings.'}
        </p>

        {/* Quick Attributes Strip */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#eaedff] text-[#131b2e]">
            <span
              className="material-symbols-outlined text-[16px] text-[#855300]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              fitness_center
            </span>
            <span className="text-xs font-semibold">{item?.protein || '38g Protein'}</span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#eaedff] text-[#131b2e]">
            <span className="material-symbols-outlined text-[16px] text-[#006c49]">eco</span>
            <span className="text-xs font-semibold">Halal Certified</span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#eaedff] text-[#131b2e]">
            <span className="material-symbols-outlined text-[16px] text-[#8d7168]">
              local_fire_department
            </span>
            <span className="text-xs font-semibold">{item?.calories || '610'} kcal</span>
          </div>
        </div>

        {/* Live Prep Banner */}
        <div className="mt-2 flex items-center justify-between p-3 rounded-2xl bg-[#f2f3ff] shadow-xs border border-[#eaedff]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#ff6b35]/15 flex items-center justify-center text-[#ab3500]">
              <span className="material-symbols-outlined text-[20px]">bolt</span>
            </div>
            <div>
              <p className="text-xs font-bold text-[#131b2e]">⚡ Quick Prep Campus Priority</p>
              <p className="text-[11px] text-[#594139]">
                Ready at North Quad Locker in ~9 mins
              </p>
            </div>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-[#006c49] animate-pulse" title="Live status ready"></span>
        </div>
      </div>

      {/* Customization Form Sections */}
      <form className="flex flex-col gap-6 mt-6 px-4" onSubmit={(e) => e.preventDefault()}>
        {/* 1. Base Grain Selection (Radio - Single Choice) */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#131b2e]">1. Select Grain Base</h3>
              <p className="text-xs text-[#594139]">Choose your warm foundational carbs</p>
            </div>
            <span className="text-[10px] bg-[#ff6b35]/10 text-[#ab3500] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
              Required
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {grainOptions.map((grain) => {
              const isSelected = selectedGrain.name === grain.name;
              return (
                <label
                  key={grain.name}
                  onClick={() => setSelectedGrain(grain)}
                  className={`relative flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer active:scale-[0.99] ${
                    isSelected
                      ? 'bg-white border-[#ff6b35] shadow-sm'
                      : 'bg-white border-[#eaedff] hover:border-[#dae2fd]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      checked={isSelected}
                      onChange={() => setSelectedGrain(grain)}
                      className="w-5 h-5 accent-[#ab3500] cursor-pointer"
                      name="base_selection"
                      type="radio"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-[#131b2e]">{grain.name}</span>
                      <span className="text-xs text-[#594139]">{grain.desc}</span>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-bold ${
                      grain.price > 0 ? 'text-[#ab3500]' : 'text-[#594139]'
                    }`}
                  >
                    {grain.label}
                  </span>
                </label>
              );
            })}
          </div>
        </section>

        {/* 2. Protein Portion (Radio) */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#131b2e]">2. Protein Portion</h3>
              <p className="text-xs text-[#594139]">Fuel up for afternoon lectures</p>
            </div>
            <span className="text-[10px] bg-[#ff6b35]/10 text-[#ab3500] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
              Required
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {/* Standard */}
            <label
              onClick={() =>
                setSelectedProtein({
                  name: 'Standard (150g Cutlet)',
                  price: 0.0,
                  desc: 'Included',
                })
              }
              className={`flex flex-col justify-between p-3.5 rounded-2xl border transition-all cursor-pointer active:scale-[0.98] ${
                selectedProtein.price === 0
                  ? 'bg-white border-[#ff6b35] shadow-sm'
                  : 'bg-white border-[#eaedff]'
              }`}
            >
              <div className="flex items-start justify-between w-full">
                <span className="text-sm font-bold text-[#131b2e]">Standard</span>
                <input
                  checked={selectedProtein.price === 0}
                  onChange={() => {}}
                  className="w-4 h-4 accent-[#ab3500]"
                  name="protein_level"
                  type="radio"
                />
              </div>
              <div className="mt-4">
                <span className="text-xs text-[#594139] block">150g Cutlet</span>
                <span className="text-xs text-[#131b2e] font-semibold mt-0.5 block">
                  Included
                </span>
              </div>
            </label>

            {/* Double Fuel */}
            <label
              onClick={() =>
                setSelectedProtein({
                  name: 'Double Fuel (+100g Extra)',
                  price: 2.2,
                  desc: '+100g Extra Cutlet',
                })
              }
              className={`flex flex-col justify-between p-3.5 rounded-2xl border transition-all cursor-pointer active:scale-[0.98] ${
                selectedProtein.price > 0
                  ? 'bg-white border-[#ff6b35] shadow-sm'
                  : 'bg-white border-[#eaedff]'
              }`}
            >
              <div className="flex items-start justify-between w-full">
                <span className="text-sm font-bold text-[#131b2e]">Double Fuel</span>
                <input
                  checked={selectedProtein.price > 0}
                  onChange={() => {}}
                  className="w-4 h-4 accent-[#ab3500]"
                  name="protein_level"
                  type="radio"
                />
              </div>
              <div className="mt-4">
                <span className="text-xs text-[#594139] block">+100g Extra</span>
                <span className="text-xs text-[#ab3500] font-bold mt-0.5 block">+$2.20</span>
              </div>
            </label>
          </div>
        </section>

        {/* 3. Free Add-ins (Checkbox - Up to 3) */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#131b2e]">3. Free Add-ins</h3>
              <p className="text-xs text-[#594139]">Pick up to 3 fresh garnishes</p>
            </div>
            <span
              className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold transition-colors ${
                selectedAddins.length === 3
                  ? 'bg-[#6cf8bb] text-[#00714d]'
                  : 'bg-[#eaedff] text-[#131b2e]'
              }`}
            >
              {selectedAddins.length} / 3 Selected
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {addinOptions.map((opt) => {
              const isChecked = selectedAddins.includes(opt.name);
              return (
                <label
                  key={opt.id}
                  onClick={() => handleAddinToggle(opt.name)}
                  className={`flex items-center gap-2.5 p-3 rounded-2xl border transition-all cursor-pointer ${
                    isChecked
                      ? 'bg-white border-[#ff6b35] shadow-xs'
                      : 'bg-white border-[#eaedff]'
                  }`}
                >
                  <input
                    checked={isChecked}
                    onChange={() => {}}
                    className="w-4 h-4 accent-[#ab3500] rounded"
                    type="checkbox"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-[#131b2e] truncate">{opt.name}</span>
                    <span className="text-[10px] text-[#594139]">{opt.desc}</span>
                  </div>
                </label>
              );
            })}
          </div>
        </section>

        {/* 4. Sauce Style Preference */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#131b2e]">4. Sauce Style</h3>
              <p className="text-xs text-[#594139]">How would you like your drizzle?</p>
            </div>
            <span className="text-[10px] bg-[#eaedff] text-[#131b2e] px-2.5 py-0.5 rounded-full font-bold">
              Pick 1
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {/* Sauce 1 */}
            <label
              onClick={() => setSelectedSauce('Signature Garlic Teriyaki')}
              className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer ${
                selectedSauce === 'Signature Garlic Teriyaki'
                  ? 'bg-white border-[#ff6b35]'
                  : 'bg-white border-[#eaedff]'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  checked={selectedSauce === 'Signature Garlic Teriyaki'}
                  onChange={() => {}}
                  className="w-4 h-4 accent-[#ab3500]"
                  name="sauce_choice"
                  type="radio"
                />
                <div>
                  <span className="text-sm font-bold text-[#131b2e]">
                    Signature Garlic Teriyaki
                  </span>
                  <span className="text-xs text-[#594139] block">
                    Simmered over 6 hours (Drizzled on top)
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#ab3500] text-[20px]">star</span>
            </label>

            {/* Sauce 2 */}
            <label
              onClick={() => setSelectedSauce('Spicy Sriracha Japanese Mayo')}
              className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer ${
                selectedSauce === 'Spicy Sriracha Japanese Mayo'
                  ? 'bg-white border-[#ff6b35]'
                  : 'bg-white border-[#eaedff]'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  checked={selectedSauce === 'Spicy Sriracha Japanese Mayo'}
                  onChange={() => {}}
                  className="w-4 h-4 accent-[#ab3500]"
                  name="sauce_choice"
                  type="radio"
                />
                <div>
                  <span className="text-sm font-bold text-[#131b2e]">
                    Spicy Sriracha Japanese Mayo
                  </span>
                  <span className="text-xs text-[#594139] block">
                    Served in side dipping tub
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#d68900] text-[20px]">
                local_fire_department
              </span>
            </label>

            {/* Sauce 3 */}
            <label
              onClick={() => setSelectedSauce('Yuzu Citrus Ponzu')}
              className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer ${
                selectedSauce === 'Yuzu Citrus Ponzu'
                  ? 'bg-white border-[#ff6b35]'
                  : 'bg-white border-[#eaedff]'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  checked={selectedSauce === 'Yuzu Citrus Ponzu'}
                  onChange={() => {}}
                  className="w-4 h-4 accent-[#ab3500]"
                  name="sauce_choice"
                  type="radio"
                />
                <div>
                  <span className="text-sm font-bold text-[#131b2e]">Yuzu Citrus Ponzu</span>
                  <span className="text-xs text-[#594139] block">
                    Light, bright, soy-free alternative
                  </span>
                </div>
              </div>
            </label>
          </div>
        </section>

        {/* 5. Kitchen Special Note */}
        <section className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-base font-bold text-[#131b2e]" htmlFor="special-instructions">
              5. Kitchen Notes
            </label>
            <span className="text-xs text-[#594139]">Optional</span>
          </div>
          <div className="relative w-full">
            <textarea
              id="special-instructions"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              className="w-full p-3.5 rounded-2xl bg-white border border-[#eaedff] text-[#131b2e] placeholder:text-[#594139]/60 text-sm shadow-xs outline-none focus:ring-2 focus:ring-[#ff6b35]/20 focus:border-[#ff6b35] resize-none transition-all"
              maxLength={100}
              placeholder="e.g., Light sauce, dressing strictly on the side, no sesame seeds..."
              rows={2}
            ></textarea>
          </div>
        </section>
      </form>

      {/* Sticky Bottom Tray Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl shadow-[0_-8px_20px_rgba(15,23,42,0.06)] px-4 py-3 pb-safe border-t border-[#eaedff]">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          {/* Quantity Stepper */}
          <div className="flex items-center bg-[#eaedff] rounded-full p-1 shadow-inner flex-shrink-0">
            <button
              aria-label="Decrease quantity"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#131b2e] hover:text-[#ab3500] active:scale-90 transition-all shadow-xs"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">remove</span>
            </button>
            <span className="text-sm font-bold text-[#131b2e] w-8 text-center select-none">
              {quantity}
            </span>
            <button
              aria-label="Increase quantity"
              onClick={() => setQuantity(Math.min(9, quantity + 1))}
              className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#131b2e] hover:text-[#ab3500] active:scale-90 transition-all shadow-xs"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
            </button>
          </div>

          {/* Add to Tray Primary CTA */}
          <button
            onClick={handleAddToTray}
            className="flex-1 h-12 rounded-full bg-[#ff6b35] hover:bg-[#ab3500] text-white flex items-center justify-between px-5 text-sm font-bold shadow-lg hover:brightness-105 active:scale-[0.98] transition-all"
            type="button"
          >
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              <span>Add to Tray</span>
            </span>
            <span className="text-base font-extrabold tracking-tight">
              ${finalTotal.toFixed(2)}
            </span>
          </button>
        </div>
      </div>

      {/* Interactive Campus Delight Toast */}
      {showToast && (
        <div className="fixed bottom-20 left-4 right-4 z-50 transition-all duration-300 ease-out flex items-center justify-between p-4 rounded-2xl bg-[#283044] text-[#eef0ff] shadow-2xl max-w-md mx-auto border border-white/10 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#6ffbbe] flex items-center justify-center text-[#002113]">
              <span className="material-symbols-outlined text-[18px]">check</span>
            </div>
            <div>
              <p className="text-xs font-bold">Added to Campus Tray!</p>
              <p className="text-[11px] opacity-80">Lockers assigned upon checkout</p>
            </div>
          </div>
          <button
            onClick={onViewTray}
            className="text-xs font-bold text-[#6ffbbe] underline cursor-pointer hover:opacity-90 pl-2"
          >
            View Tray
          </button>
        </div>
      )}
    </div>
  );
};
