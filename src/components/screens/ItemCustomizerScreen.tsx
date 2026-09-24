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
  const basePrice = item ? item.price : 6.8;

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
          title: `CampusBite: ${item?.name || 'Teriyaki Glazed Chicken Grain Bowl'}`,
          text: 'Order the best campus food with heated locker pickup!',
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
    <div className="flex flex-col w-full pb-36 md:pb-16 max-w-6xl mx-auto px-4 md:px-6 pt-2">
      {/* Tablet & Desktop Back Button */}
      <div className="hidden md:flex items-center gap-2 mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-[#594139] hover:text-[#ab3500] px-3 py-1.5 rounded-xl bg-white border border-[#eaedff] shadow-xs transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Back to Canteen Stalls</span>
        </button>
        <span className="text-xs text-[#8d7168]">/</span>
        <span className="text-xs font-semibold text-[#131b2e]">{item?.station || 'Station 3'}</span>
        <span className="text-xs text-[#8d7168]">/</span>
        <span className="text-xs font-bold text-[#ab3500]">{item?.name || 'Customizer'}</span>
      </div>

      {/* Responsive Grid: 1 col on mobile, 2 cols on tablet & desktop */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-start">
        {/* Left Column (Hero Image & Nutrition Attributes) */}
        <div className="md:col-span-5 md:sticky md:top-28 flex flex-col gap-4">
          {/* Hero Media Canvas */}
          <div className="relative w-full h-72 md:h-80 lg:h-96 rounded-3xl overflow-hidden bg-[#e2e7ff] shadow-md border border-[#eaedff]">
            <img
              className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
              alt={item?.name || 'Teriyaki Glazed Chicken Grain Bowl'}
              src={item?.image || APP_ASSETS.teriyakiBowlHero}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none"></div>

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
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#6cf8bb] text-[#00714d] shadow-md z-10">
              <span
                className="material-symbols-outlined text-[16px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              <span className="text-[0.6875rem] md:text-xs font-extrabold uppercase tracking-wide">
                Campus Meal Plan Tier 1 Eligible
              </span>
            </div>
          </div>

          {/* Nutrition & Macro Card (Rich on Tablet & Desktop) */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#eaedff] flex flex-col gap-3">
            <h4 className="text-xs font-extrabold text-[#131b2e] uppercase tracking-wider">
              Nutritional Profile &amp; Dietary
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-[#eaedff]/60 rounded-2xl p-2.5 text-center flex flex-col items-center">
                <span className="text-xs text-[#8d7168] font-bold">Calories</span>
                <span className="text-base font-black text-[#131b2e] mt-0.5">
                  {item?.calories || '610'}
                </span>
                <span className="text-[10px] text-[#594139]">kcal</span>
              </div>
              <div className="bg-[#eaedff]/60 rounded-2xl p-2.5 text-center flex flex-col items-center">
                <span className="text-xs text-[#8d7168] font-bold">Protein</span>
                <span className="text-base font-black text-[#006c49] mt-0.5">
                  {item?.protein || '38g'}
                </span>
                <span className="text-[10px] text-[#006c49] font-semibold">High Fuel</span>
              </div>
              <div className="bg-[#eaedff]/60 rounded-2xl p-2.5 text-center flex flex-col items-center">
                <span className="text-xs text-[#8d7168] font-bold">Prep Time</span>
                <span className="text-base font-black text-[#ab3500] mt-0.5">
                  {item?.prepTime || '8 min'}
                </span>
                <span className="text-[10px] text-[#594139]">Fast Line</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[11px] font-bold text-[#005236] bg-[#6cf8bb]/30 px-2.5 py-1 rounded-full flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">eco</span>
                Halal Certified
              </span>
              <span className="text-[11px] font-bold text-[#131b2e] bg-[#eaedff] px-2.5 py-1 rounded-full flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">psychology</span>
                Brain Fuel (Low GI)
              </span>
            </div>

            {/* Locker Pickup Note */}
            <div className="flex items-center gap-2.5 pt-2 border-t border-[#eaedff] text-xs text-[#594139]">
              <span className="material-symbols-outlined text-[#ab3500] text-[18px]">
                lock_clock
              </span>
              <span>Heated to 60°C inside Student Union Locker Pod B.</span>
            </div>
          </div>
        </div>

        {/* Right Column: Customization Wizard & Add to Tray Action */}
        <div className="md:col-span-7 flex flex-col gap-5">
          {/* Item Title & Overview Banner */}
          <div className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-[#eaedff] flex flex-col gap-3">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <span className="text-xs text-[#ab3500] font-extrabold tracking-wider uppercase">
                  {item?.station || 'Station 3'} • {item?.stationTag || 'Golden Wok Bar'}
                </span>
                <h1 className="text-xl md:text-2xl font-black text-[#131b2e] mt-1 leading-snug">
                  {item ? item.name : 'Teriyaki Glazed Chicken Grain Bowl'}
                </h1>
              </div>
              <div className="flex flex-col items-end flex-shrink-0">
                <span className="text-2xl md:text-3xl font-black text-[#ab3500]">
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
          </div>

          {/* Customization Form */}
          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            {/* 1. Grain Selection */}
            <section className="bg-white rounded-3xl p-5 shadow-sm border border-[#eaedff] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#131b2e]">1. Select Grain Base</h3>
                  <p className="text-xs text-[#594139]">Choose your foundational carbs</p>
                </div>
                <span className="text-[10px] bg-[#ff6b35]/15 text-[#ab3500] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
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
                          ? 'bg-[#faf8ff] border-[#ff6b35] shadow-xs ring-1 ring-[#ff6b35]/30'
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
                          grain.price > 0 ? 'text-[#ab3500]' : 'text-[#006c49]'
                        }`}
                      >
                        {grain.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </section>

            {/* 2. Protein Portion */}
            <section className="bg-white rounded-3xl p-5 shadow-sm border border-[#eaedff] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#131b2e]">2. Protein Portion</h3>
                  <p className="text-xs text-[#594139]">Fuel up for afternoon classes</p>
                </div>
                <span className="text-[10px] bg-[#ff6b35]/15 text-[#ab3500] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Required
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  onClick={() =>
                    setSelectedProtein({
                      name: 'Standard (150g Cutlet)',
                      price: 0.0,
                      desc: 'Included',
                    })
                  }
                  className={`flex flex-col justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
                    selectedProtein.price === 0
                      ? 'bg-[#faf8ff] border-[#ff6b35] shadow-xs ring-1 ring-[#ff6b35]/30'
                      : 'bg-white border-[#eaedff] hover:border-[#dae2fd]'
                  }`}
                >
                  <div className="flex items-start justify-between w-full">
                    <span className="text-sm font-bold text-[#131b2e]">Standard Cutlet</span>
                    <input
                      checked={selectedProtein.price === 0}
                      onChange={() => {}}
                      className="w-4 h-4 accent-[#ab3500]"
                      name="protein_level"
                      type="radio"
                    />
                  </div>
                  <div className="mt-3">
                    <span className="text-xs text-[#594139] block">150g Fresh Grilled Cutlet</span>
                    <span className="text-xs text-[#006c49] font-bold mt-0.5 block">
                      Included in Meal Plan
                    </span>
                  </div>
                </label>

                <label
                  onClick={() =>
                    setSelectedProtein({
                      name: 'Double Fuel (+100g Extra)',
                      price: 2.2,
                      desc: '+100g Extra Cutlet',
                    })
                  }
                  className={`flex flex-col justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
                    selectedProtein.price > 0
                      ? 'bg-[#faf8ff] border-[#ff6b35] shadow-xs ring-1 ring-[#ff6b35]/30'
                      : 'bg-white border-[#eaedff] hover:border-[#dae2fd]'
                  }`}
                >
                  <div className="flex items-start justify-between w-full">
                    <span className="text-sm font-bold text-[#131b2e]">Double Fuel (+100g)</span>
                    <input
                      checked={selectedProtein.price > 0}
                      onChange={() => {}}
                      className="w-4 h-4 accent-[#ab3500]"
                      name="protein_level"
                      type="radio"
                    />
                  </div>
                  <div className="mt-3">
                    <span className="text-xs text-[#594139] block">+100g Extra Protein (250g)</span>
                    <span className="text-xs text-[#ab3500] font-bold mt-0.5 block">+$2.20</span>
                  </div>
                </label>
              </div>
            </section>

            {/* 3. Free Add-ins */}
            <section className="bg-white rounded-3xl p-5 shadow-sm border border-[#eaedff] flex flex-col gap-3">
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

              <div className="grid grid-cols-2 gap-2.5">
                {addinOptions.map((opt) => {
                  const isChecked = selectedAddins.includes(opt.name);
                  return (
                    <label
                      key={opt.id}
                      onClick={() => handleAddinToggle(opt.name)}
                      className={`flex items-center gap-3 p-3 rounded-2xl border transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#faf8ff] border-[#ff6b35] shadow-xs'
                          : 'bg-white border-[#eaedff] hover:border-[#dae2fd]'
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

            {/* 4. Sauce Preference */}
            <section className="bg-white rounded-3xl p-5 shadow-sm border border-[#eaedff] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#131b2e]">4. Sauce Choice</h3>
                  <p className="text-xs text-[#594139]">How would you like your drizzle?</p>
                </div>
                <span className="text-[10px] bg-[#eaedff] text-[#131b2e] px-2.5 py-0.5 rounded-full font-bold">
                  Included
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {[
                  { name: 'Signature Garlic Teriyaki', desc: 'Simmered over 6 hours (Drizzled on top)' },
                  { name: 'Spicy Sriracha Japanese Mayo', desc: 'Served in side dipping tub' },
                  { name: 'Yuzu Citrus Ponzu', desc: 'Light, bright, soy-free alternative' },
                ].map((s) => (
                  <label
                    key={s.name}
                    onClick={() => setSelectedSauce(s.name)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      selectedSauce === s.name
                        ? 'bg-[#faf8ff] border-[#ff6b35]'
                        : 'bg-white border-[#eaedff] hover:border-[#dae2fd]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        checked={selectedSauce === s.name}
                        onChange={() => {}}
                        className="w-4 h-4 accent-[#ab3500]"
                        name="sauce_choice"
                        type="radio"
                      />
                      <div>
                        <span className="text-sm font-bold text-[#131b2e]">{s.name}</span>
                        <span className="text-xs text-[#594139] block">{s.desc}</span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </section>

            {/* 5. Special Notes */}
            <section className="bg-white rounded-3xl p-5 shadow-sm border border-[#eaedff] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-[#131b2e]" htmlFor="special-instructions">
                  5. Kitchen Notes
                </label>
                <span className="text-xs text-[#594139]">Optional</span>
              </div>
              <textarea
                id="special-instructions"
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-[#faf8ff] border border-[#eaedff] text-[#131b2e] placeholder:text-[#594139]/60 text-sm outline-none focus:ring-2 focus:ring-[#ff6b35]/20 focus:border-[#ff6b35] resize-none transition-all"
                maxLength={100}
                placeholder="e.g., Light sauce, dressing on the side, extra napkins..."
                rows={2}
              ></textarea>
            </section>

            {/* Desktop & Tablet In-Page Checkout Bar */}
            <div className="hidden md:flex items-center justify-between gap-4 p-5 rounded-3xl bg-white shadow-md border border-[#eaedff]">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-[#594139]">Quantity:</span>
                <div className="flex items-center bg-[#eaedff] rounded-2xl p-1 shadow-inner">
                  <button
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-[#131b2e] hover:text-[#ab3500] transition-all shadow-xs"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">remove</span>
                  </button>
                  <span className="text-sm font-bold text-[#131b2e] w-8 text-center select-none">
                    {quantity}
                  </span>
                  <button
                    aria-label="Increase quantity"
                    onClick={() => setQuantity(Math.min(9, quantity + 1))}
                    className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-[#131b2e] hover:text-[#ab3500] transition-all shadow-xs"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-[10px] text-[#594139] uppercase font-bold tracking-wider block">
                    Calculated Total
                  </span>
                  <span className="text-2xl font-black text-[#ab3500]">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={handleAddToTray}
                  className="h-12 px-6 rounded-2xl bg-[#ff6b35] hover:bg-[#ab3500] text-white flex items-center gap-2 text-sm font-bold shadow-md hover:brightness-105 active:scale-95 transition-all"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                  <span>Add to Campus Tray</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Sticky Bottom Tray Bar (Only on Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl shadow-[0_-8px_20px_rgba(15,23,42,0.06)] px-4 py-3 pb-safe border-t border-[#eaedff] md:hidden">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
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

          <button
            onClick={handleAddToTray}
            className="flex-1 h-12 rounded-full bg-[#ff6b35] hover:bg-[#ab3500] text-white flex items-center justify-between px-5 text-sm font-bold shadow-lg active:scale-[0.98] transition-all"
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

      {/* Confirmation Toast */}
      {showToast && (
        <div className="fixed bottom-20 md:bottom-8 left-4 right-4 z-50 transition-all duration-300 ease-out flex items-center justify-between p-4 rounded-2xl bg-[#283044] text-[#eef0ff] shadow-2xl max-w-md mx-auto border border-white/10 animate-fade-in">
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
