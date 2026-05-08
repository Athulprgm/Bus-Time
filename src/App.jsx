import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Clock, ArrowRight, BusFront, Calendar, Languages, Ticket } from 'lucide-react';
import rawBusData from './data/buses.json';

// Parse the new structured JSON data
const busData = [];
if (rawBusData && rawBusData.routes) {
  rawBusData.routes.forEach(routeGroup => {
    routeGroup.buses.forEach(bus => {
      busData.push({
        bus_name: bus.busName,
        from: rawBusData.startLocation,
        to: routeGroup.destinationSide,
        time: bus.departureTime,
        route: routeGroup.route.join(' → '),
        type: bus.type
      });
    });
  });
}

// Sort buses by departure time if needed (assuming AM/PM format parsing is simple, or leave as is)
// For now, we will leave the order as parsed from the JSON or sort simple.

const translations = {
  en: {
    title: "Cheemeni Bus Timings",
    findNext: "Select your destination",
    quickly: "Travel in Style",
    subtitle: "Premium and reliable schedules for your journey.",
    from: "Departure",
    to: "Arrival",
    placeholder: "Search destination...",
    todaySchedule: "Today's Departures",
    busesFound: "services available",
    nextBus: "Next Departure",
    departure: "Time",
    noBuses: "No Services Found",
    tryDifferent: "We could not locate any premium services for this route.",
    starting: "Initializing Service"
  },
  ml: {
    title: "ചീമേനി ബസ് സമയങ്ങൾ",
    findNext: "യാത്ര ലക്ഷ്യസ്ഥാനം",
    quickly: "തിരഞ്ഞെടുക്കുക",
    subtitle: "നിങ്ങളുടെ യാത്രയ്ക്കുള്ള കൃത്യമായ സമയക്രമങ്ങൾ.",
    from: "പുറപ്പെടുന്നത്",
    to: "എത്തിച്ചേരുന്നത്",
    placeholder: "സ്ഥലം തിരയുക...",
    todaySchedule: "ഇന്നത്തെ സമയക്രമം",
    busesFound: "ബസുകൾ ലഭ്യമാണ്",
    nextBus: "അടുത്ത ബസ്",
    departure: "സമയം",
    noBuses: "ബസുകളൊന്നും ലഭ്യമല്ല",
    tryDifferent: "ഈ റൂട്ടിൽ ബസുകൾ കണ്ടെത്താനായില്ല.",
    starting: "ആരംഭിക്കുന്നു..."
  }
};

function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-medium text-[#d4af37]">
      <Clock size={14} className="opacity-80" />
      <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
    </div>
  );
}

// Sleek, Minimalist SVG Bus Outline Animation for Premium Look
function PremiumBusOutline() {
  return (
    <motion.svg 
      width="120" 
      height="60" 
      viewBox="0 0 120 60" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto"
    >
      <motion.path
        d="M10,50 L10,20 C10,10 15,5 25,5 L95,5 C105,5 110,10 110,20 L110,50 M10,50 L25,50 M45,50 L75,50 M95,50 L110,50 M110,50 C110,55 105,60 100,60 L100,50 M10,50 C10,55 15,60 20,60 L20,50"
        stroke="#d4af37"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      {/* Windows */}
      <motion.path
        d="M15,15 L105,15 L105,30 L15,30 Z"
        stroke="#d4af37"
        strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
      />
      {/* Wheels */}
      <motion.circle 
        cx="35" cy="50" r="8" 
        stroke="#d4af37" strokeWidth="2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5, type: "spring" }}
      />
      <motion.circle 
        cx="85" cy="50" r="8" 
        stroke="#d4af37" strokeWidth="2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.7, type: "spring" }}
      />
    </motion.svg>
  );
}

function FullScreenLoader({ t }) {
  return (
    <motion.div
      key="initial-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a1505] via-[#050505] to-[#000000] opacity-80 pointer-events-none"></div>
      
      <div className="relative z-10 mb-8">
        <PremiumBusOutline />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-center relative z-10"
      >
        <h2 className="text-2xl font-light text-white tracking-[0.2em] uppercase mb-8">
          <span className="text-gold-gradient font-bold">{t.title.split(' ')[0]}</span> {t.title.split(' ').slice(1).join(' ')}
        </h2>
        
        <div className="w-48 h-[1px] bg-white/10 mx-auto relative overflow-hidden">
          <motion.div 
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="absolute top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"
          />
        </div>
        <p className="text-[#a3a3a3] mt-6 font-light tracking-[0.3em] text-[10px] uppercase">
          {t.starting}
        </p>
      </motion.div>
    </motion.div>
  );
}

function BusCard({ bus, isNext, t }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      layout
      onClick={() => setIsFlipped(!isFlipped)}
      className="perspective-1000 cursor-pointer mb-6 group"
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="relative transform-style-3d duration-700"
      >
        {/* Front of Card */}
        <div className={`relative glassmorphism rounded-xl p-6 soft-shadow overflow-hidden backface-hidden transition-all duration-500 border ${isNext ? 'border-[#d4af37]/50 premium-glow' : 'border-white/5 hover:border-white/10'}`}>
          
          {/* Subtle gold accent line */}
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#d4af37] to-[#8a6d20] opacity-80"></div>

          <div className="pl-4">
            <div className="flex justify-between items-start mb-6">
              <div>
                {isNext && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="inline-block mb-3 text-[#d4af37] text-[9px] font-bold uppercase tracking-[0.2em]"
                  >
                    • {t.nextBus}
                  </motion.span>
                )}
                <h3 className="text-xl font-light text-white tracking-wide">{bus.bus_name}</h3>
                <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">
                  {bus.type || 'Premium Class'}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-light text-white tracking-wider">
                  {bus.time}
                </div>
                <p className="text-[9px] text-[#d4af37] uppercase tracking-[0.2em] mt-1">{t.departure}</p>
              </div>
            </div>
            
            <div className="mt-4 relative pt-5 border-t border-white/5">
              <div className="flex justify-between items-center relative z-10">
                <div className="text-xs uppercase tracking-widest text-white/70 font-medium">
                  {bus.from}
                </div>
                
                {/* Minimalist Route Line */}
                <div className="flex-1 flex items-center justify-center px-4 relative">
                  <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
                    <motion.div 
                      className="absolute top-0 left-0 h-full bg-[#d4af37]"
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </div>
                  <motion.div 
                    initial={{ x: -10, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute bg-[#171717] px-2 text-[#d4af37]"
                  >
                    <ArrowRight size={14} strokeWidth={1.5} />
                  </motion.div>
                </div>

                <div className="text-xs uppercase tracking-widest text-white font-medium">
                  {bus.to}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back of Card (Route Details) */}
        <div className={`absolute top-0 left-0 w-full h-full glassmorphism rounded-xl p-6 soft-shadow backface-hidden rotate-y-180 border border-white/5 flex flex-col justify-center items-center`}>
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#333] to-[#111] opacity-80"></div>
          
          <Ticket className="text-white/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size={100} />
          
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] mb-6 relative z-10">Route Map</h4>
          <div className="w-full text-center relative z-10">
            <div className="font-light text-sm text-white/90 leading-loose flex items-center justify-center gap-3 flex-wrap">
              {bus.route.split('→').map((stop, i, arr) => (
                <React.Fragment key={i}>
                  <span className="tracking-wide">{stop.trim()}</span>
                  {i < arr.length - 1 && <span className="text-[#d4af37]/50 text-[10px]">/</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
          <p className="text-[9px] text-white/30 uppercase tracking-widest mt-8 relative z-10">Select to return</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [destination, setDestination] = useState('');
  const [filteredBuses, setFilteredBuses] = useState(busData);
  const [isLoading, setIsLoading] = useState(false);
  const [lang, setLang] = useState('en');

  const t = translations[lang];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!destination) {
      setFilteredBuses(busData);
    } else {
      const lowerDest = destination.toLowerCase();
      setFilteredBuses(busData.filter(b => b.to.toLowerCase().includes(lowerDest) || b.route.toLowerCase().includes(lowerDest)));
    }
  }, [destination]);

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'ml' : 'en');
  };

  const nextBusIndex = filteredBuses.length > 0 ? 0 : -1;

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .perspective-1000 { perspective: 1000px; }
      .transform-style-3d { transform-style: preserve-3d; }
      .backface-hidden { backface-visibility: hidden; }
      .rotate-y-180 { transform: rotateY(180deg); }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isInitialLoading ? (
        <FullScreenLoader key="loader" t={t} />
      ) : (
        <motion.div 
          key="main-app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="min-h-screen bg-[#0a0a0a] font-sans text-white selection:bg-[#d4af37]/30 selection:text-white pb-24 overflow-x-hidden relative"
        >
          {/* Extremely subtle ambient glow */}
          <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a1710] via-[#0a0a0a] to-[#0a0a0a] pointer-events-none"></div>

          {/* Top Banner - Minimalist */}
          <div className="top-gradient-banner px-6 py-5 sticky top-0 z-50 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <h1 className="font-light tracking-[0.1em] text-sm uppercase text-white/90">
                <span className="font-bold text-gold-gradient">{t.title.split(' ')[0]}</span> {t.title.split(' ').slice(1).join(' ')}
              </h1>
            </div>
            
            <div className="flex items-center gap-6">
              <LiveClock />
              <button
                onClick={toggleLang}
                className="text-white/50 hover:text-[#d4af37] transition-colors flex items-center justify-center focus:outline-none"
                title="Toggle Language"
              >
                <Languages size={16} strokeWidth={1.5} />
                <span className="ml-2 text-[10px] font-medium uppercase tracking-widest">{lang}</span>
              </button>
            </div>
          </div>

          <main className="max-w-2xl mx-auto px-6 py-12 space-y-12 relative z-10">
            
            {/* Minimal Hero */}
            <div className="space-y-4 pt-4">
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl sm:text-4xl font-light text-white tracking-wide"
              >
                {t.findNext} <br />
                <span className="text-gold-gradient font-medium italic">{t.quickly}</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-white/40 text-xs sm:text-sm tracking-widest uppercase font-light"
              >
                {t.subtitle}
              </motion.p>
            </div>

            {/* Premium Search */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="glassmorphism rounded-xl p-1 flex flex-col sm:flex-row gap-1 relative z-40 sticky top-[80px]"
            >
              <div className="flex-1 flex items-center px-5 py-4 bg-[#111] rounded-lg">
                <div className="flex-1">
                  <label className="text-[8px] uppercase font-bold text-white/30 tracking-[0.2em] block mb-2">{t.from}</label>
                  <input 
                    type="text" 
                    value="Cheemeni" 
                    disabled 
                    className="w-full bg-transparent border-none p-0 text-white/80 font-light focus:ring-0 cursor-not-allowed outline-none text-sm tracking-wide"
                  />
                </div>
              </div>
              
              <div className="flex-1 flex items-center px-5 py-4 bg-[#111] rounded-lg border border-transparent focus-within:border-[#d4af37]/30 transition-colors">
                <div className="flex-1">
                  <label className="text-[8px] uppercase font-bold text-[#d4af37] tracking-[0.2em] block mb-2">{t.to}</label>
                  <input 
                    type="text" 
                    placeholder={t.placeholder}
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-transparent border-none p-0 text-white font-light placeholder:text-white/20 focus:ring-0 outline-none text-sm tracking-wide"
                  />
                </div>
                <Search size={16} className="text-white/30 ml-3" strokeWidth={1.5} />
              </div>
            </motion.div>

            {/* Results */}
            <div className="space-y-6">
              <div className="flex justify-between items-end border-b border-white/5 pb-4">
                <h3 className="font-light text-white/80 uppercase tracking-widest text-xs">
                  {t.todaySchedule}
                </h3>
                <span className="text-[9px] text-[#d4af37] uppercase tracking-[0.2em]">
                  {filteredBuses.length} {t.busesFound}
                </span>
              </div>

              <AnimatePresence mode="popLayout">
                {filteredBuses.length > 0 ? (
                  filteredBuses.map((bus, index) => (
                    <BusCard key={`${bus.bus_name}-${bus.time}`} bus={bus} isNext={index === nextBusIndex} t={t} />
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-24 px-4"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-6 border border-white/10">
                      <Search size={24} className="text-white/20" strokeWidth={1} />
                    </div>
                    <h3 className="text-sm uppercase tracking-widest text-white/80 mb-3">{t.noBuses}</h3>
                    <p className="text-[10px] text-white/40 tracking-wider uppercase max-w-xs mx-auto leading-relaxed">{t.tryDifferent}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
}