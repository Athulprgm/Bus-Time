import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Clock, ArrowRight, BusFront, Calendar, Languages, Map, Filter, Share2, Info } from 'lucide-react';
import rawBusData from './data/buses.json';

// Parse the new structured JSON data
const busData = [];
if (rawBusData && rawBusData.routes) {
  rawBusData.routes.forEach(routeGroup => {
    routeGroup.buses.forEach(bus => {
      busData.push({
        id: `${bus.busName}-${bus.departureTime}-${routeGroup.destinationSide}`,
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

// Helper to parse time string "08:15 AM" to Date object for today
function parseTimeStr(timeStr) {
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':');
  if (hours === '12') {
    hours = '00';
  }
  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }
  const d = new Date();
  d.setHours(parseInt(hours, 10));
  d.setMinutes(parseInt(minutes, 10));
  d.setSeconds(0);
  return d;
}

// Sort data by departure time
busData.sort((a, b) => parseTimeStr(a.time) - parseTimeStr(b.time));

const translations = {
  en: {
    title: "Libgo",
    findNext: "Select your destination",
    quickly: "Travel Smart",
    subtitle: "Cheemeni Bus Timings. Accurate schedules.",
    meaning: "Derived from 'Liberty' & 'Go' — The ultimate freedom to go anywhere, anytime.",
    from: "Departure",
    to: "Arrival",
    placeholder: "Search destination...",
    todaySchedule: "Today's Departures",
    busesFound: "services",
    nextBus: "Next Departure",
    departure: "Time",
    noBuses: "No Services Found",
    tryDifferent: "We could not locate any services for this route.",
    starting: "Initializing Service",
    filterAll: "All",
    filterPrivate: "Private",
    filterKSRTC: "KSRTC",
    leavesIn: "Leaves in",
    departed: "Departed",
    share: "Share",
    routeMap: "Route Stops"
  },
  ml: {
    title: "Libgo",
    findNext: "യാത്ര ലക്ഷ്യസ്ഥാനം",
    quickly: "തിരഞ്ഞെടുക്കുക",
    subtitle: "ചീമേനി ബസ് സമയങ്ങൾ. കൃത്യമായ സമയക്രമങ്ങൾ.",
    meaning: "സ്വാതന്ത്ര്യത്തോടെ എവിടേക്കും എപ്പോഴും യാത്ര ചെയ്യാനുള്ള നിങ്ങളുടെ ലക്ഷ്യം.",
    from: "പുറപ്പെടുന്നത്",
    to: "എത്തിച്ചേരുന്നത്",
    placeholder: "സ്ഥലം തിരയുക...",
    todaySchedule: "ഇന്നത്തെ സമയക്രമം",
    busesFound: "ബസുകൾ",
    nextBus: "അടുത്ത ബസ്",
    departure: "സമയം",
    noBuses: "ബസുകളൊന്നും ലഭ്യമല്ല",
    tryDifferent: "ഈ റൂട്ടിൽ ബസുകൾ കണ്ടെത്താനായില്ല.",
    starting: "ആരംഭിക്കുന്നു...",
    filterAll: "എല്ലാം",
    filterPrivate: "പ്രൈവറ്റ്",
    filterKSRTC: "കെ.എസ്.ആർ.ടി.സി",
    leavesIn: "പുറപ്പെടാൻ",
    departed: "പുറപ്പെട്ടു",
    share: "പങ്കിടുക",
    routeMap: "റൂട്ട്"
  }
};

function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center space-x-2 text-xs uppercase tracking-[0.1em] font-medium text-[#B2DF28]">
      <Clock size={14} />
      <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
    </div>
  );
}

// Trawbit Technologies Footer Component
function TrawbitLogo() {
  return (
    <div className="flex flex-col items-center justify-center mt-16 mb-8 opacity-80 hover:opacity-100 transition-opacity">
      <div className="flex items-center gap-3">
        {/* SVG Recreation of Trawbit Logo */}
        <div className="relative w-8 h-8 flex-shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
             <circle cx="50" cy="50" r="45" fill="#B2DF28" />
             {/* Cutout T shape in navy blue */}
             <path d="M25 35 H75 V48 H58 V85 H42 V48 H25 V35 Z" fill="#0A1128" />
             {/* Pixel dispersion effect on top right */}
             <rect x="65" y="15" width="8" height="8" fill="#0A1128" />
             <rect x="78" y="25" width="6" height="6" fill="#0A1128" />
             <rect x="82" y="12" width="7" height="7" fill="#0A1128" />
             <rect x="55" y="10" width="5" height="5" fill="#0A1128" />
             {/* Green pixels floating away */}
             <rect x="85" y="5" width="6" height="6" fill="#B2DF28" />
             <rect x="95" y="18" width="4" height="4" fill="#B2DF28" />
          </svg>
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-xl font-black tracking-tight text-[#B2DF28] leading-none m-0 p-0" style={{ fontFamily: 'sans-serif' }}>Trawbit</h2>
          <p className="text-[7.5px] tracking-[0.35em] text-white uppercase mt-1 leading-none font-medium">Technologies</p>
        </div>
      </div>
      <p className="text-[10px] text-[#94A3B8] mt-4 font-light tracking-wide">Powered by Trawbit Technologies</p>
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
        stroke="#B2DF28"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      {/* Windows */}
      <motion.path
        d="M15,15 L105,15 L105,30 L15,30 Z"
        stroke="#B2DF28"
        strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      />
      {/* Wheels */}
      <motion.circle 
        cx="35" cy="50" r="8" 
        stroke="#B2DF28" strokeWidth="2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
      />
      <motion.circle 
        cx="85" cy="50" r="8" 
        stroke="#B2DF28" strokeWidth="2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2, ease: "easeOut" }}
      />
    </motion.svg>
  );
}

function FullScreenLoader({ t }) {
  return (
    <motion.div
      key="initial-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-[#0A1128] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#16203A] to-[#0A1128] opacity-80 pointer-events-none"></div>
      
      <div className="relative z-10 mb-8">
        <PremiumBusOutline />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="text-center relative z-10"
      >
        <h2 className="text-2xl font-light text-white tracking-[0.1em] mb-8">
          <span className="text-accent-gradient font-bold">{t.title}</span>
        </h2>
        
        <div className="w-48 h-[2px] bg-white/10 mx-auto relative overflow-hidden rounded-full">
          <motion.div 
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="absolute top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-[#B2DF28] to-transparent"
          />
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-[#94A3B8] mt-8 max-w-[250px] mx-auto text-[9px] leading-relaxed font-light tracking-widest uppercase"
        >
          <strong className="text-[#B2DF28] font-semibold text-[10px]">Libgo</strong> /lib·gō/<br/>
          <span className="mt-2 block italic text-[8px] opacity-70 normal-case tracking-wide">{t.meaning}</span>
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

function BusCard({ bus, isNext, t }) {
  const [expanded, setExpanded] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const [isDeparted, setIsDeparted] = useState(false);

  useEffect(() => {
    const updateTimeLeft = () => {
      const now = new Date();
      const depTime = parseTimeStr(bus.time);
      const diffMs = depTime - now;

      if (diffMs < 0) {
        setIsDeparted(true);
        setTimeLeft(t.departed);
      } else {
        setIsDeparted(false);
        const diffMins = Math.floor(diffMs / 60000);
        const hours = Math.floor(diffMins / 60);
        const mins = diffMins % 60;
        if (hours > 0) {
          setTimeLeft(`${t.leavesIn} ${hours}h ${mins}m`);
        } else {
          setTimeLeft(`${t.leavesIn} ${mins}m`);
        }
      }
    };
    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 60000);
    return () => clearInterval(interval);
  }, [bus.time, t.departed, t.leavesIn]);

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: `${bus.bus_name} to ${bus.to}`,
        text: `Catch the ${bus.bus_name} bus from ${bus.from} to ${bus.to} at ${bus.time}.`,
        url: window.location.href
      }).catch(console.error);
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      layout
      onClick={() => setExpanded(!expanded)}
      className="mb-4 group cursor-pointer"
    >
      <div className={`relative glassmorphism rounded-xl p-5 transition-all duration-300 border ${isNext && !isDeparted ? 'border-[#B2DF28]/40 premium-glow' : 'border-white/5 hover:border-white/10'}`}>
        
        {/* Active Line Indicator */}
        <div className={`absolute top-0 left-0 w-1 h-full rounded-l-xl opacity-80 ${isDeparted ? 'bg-[#94A3B8]' : 'bg-gradient-to-b from-[#B2DF28] to-[#6b8e10]'}`}></div>

        <div className="pl-3">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {isNext && !isDeparted && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[#0A1128] bg-[#B2DF28] text-[9px] font-bold uppercase tracking-wider">
                    {t.nextBus}
                  </span>
                )}
                <span className={`inline-flex items-center px-2 py-0.5 rounded border text-[9px] font-bold uppercase tracking-wider ${isDeparted ? 'border-[#94A3B8]/30 text-[#94A3B8]' : 'border-white/10 text-white/70'}`}>
                  {bus.type}
                </span>
              </div>
              <h3 className={`text-lg font-medium tracking-wide ${isDeparted ? 'text-white/50' : 'text-white'}`}>{bus.bus_name}</h3>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-light tracking-wide ${isDeparted ? 'text-white/40 line-through' : 'text-white'}`}>
                {bus.time}
              </div>
              <p className={`text-[10px] uppercase font-medium mt-1 ${isDeparted ? 'text-red-400/80' : 'text-[#B2DF28]'}`}>
                {timeLeft}
              </p>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div className={`text-xs uppercase tracking-widest font-medium ${isDeparted ? 'text-white/30' : 'text-white/70'}`}>
              {bus.from}
            </div>
            <div className="flex-1 flex items-center justify-center px-4 relative">
              <div className="w-full h-[1px] bg-white/10"></div>
              <div className="absolute bg-[#16203A] px-2 text-white/30">
                <ArrowRight size={14} />
              </div>
            </div>
            <div className={`text-xs uppercase tracking-widest font-medium ${isDeparted ? 'text-white/50' : 'text-white'}`}>
              {bus.to}
            </div>
          </div>
        </div>

        {/* Smooth Accordion for Extra Features */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-5 mt-5 border-t border-white/5 pl-3">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#B2DF28] font-semibold flex items-center gap-1.5">
                    <Map size={12} /> {t.routeMap}
                  </h4>
                  <button onClick={handleShare} className="text-white/40 hover:text-white transition-colors flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold bg-white/5 px-2 py-1 rounded">
                    <Share2 size={12} /> {t.share}
                  </button>
                </div>
                <div className="font-light text-xs text-white/70 leading-relaxed flex items-center flex-wrap gap-2">
                  {bus.route.split('→').map((stop, i, arr) => (
                    <React.Fragment key={i}>
                      <span className="bg-white/5 px-2 py-1 rounded">{stop.trim()}</span>
                      {i < arr.length - 1 && <span className="text-[#B2DF28]/50">→</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [destination, setDestination] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [lang, setLang] = useState('en');

  const t = translations[lang];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 3200); // Extended slightly to allow reading the Libgo meaning
    return () => clearTimeout(timer);
  }, []);

  const filteredBuses = useMemo(() => {
    let result = busData;
    if (destination) {
      const lowerDest = destination.toLowerCase();
      result = result.filter(b => b.to.toLowerCase().includes(lowerDest) || b.route.toLowerCase().includes(lowerDest));
    }
    if (filterType !== 'All') {
      result = result.filter(b => b.type.toLowerCase().includes(filterType.toLowerCase()));
    }
    return result;
  }, [destination, filterType]);

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'ml' : 'en');
  };

  // Find the next active bus (not departed)
  const nextBusId = useMemo(() => {
    const now = new Date();
    const activeBus = filteredBuses.find(b => parseTimeStr(b.time) > now);
    return activeBus ? activeBus.id : null;
  }, [filteredBuses]);

  return (
    <AnimatePresence mode="wait">
      {isInitialLoading ? (
        <FullScreenLoader key="loader" t={t} />
      ) : (
        <motion.div 
          key="main-app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="min-h-screen bg-[#0A1128] font-sans text-white selection:bg-[#B2DF28]/30 selection:text-white pb-12 overflow-x-hidden relative"
        >
          {/* Top Banner - Sleek */}
          <div className="top-gradient-banner px-4 sm:px-6 py-4 sticky top-0 z-50 flex justify-between items-center shadow-lg shadow-black/20">
            <div className="flex items-center gap-2">
              <div className="bg-[#B2DF28]/10 p-1.5 rounded-lg border border-[#B2DF28]/20">
                <BusFront size={18} className="text-[#B2DF28]" />
              </div>
              <h1 className="font-medium tracking-wide text-sm text-white/90">
                <span className="font-bold text-accent-gradient">{t.title}</span>
              </h1>
            </div>
            
            <div className="flex items-center gap-4 sm:gap-6">
              <LiveClock />
              <button
                onClick={toggleLang}
                className="text-white/50 hover:text-[#B2DF28] transition-colors flex items-center justify-center focus:outline-none bg-white/5 p-1.5 rounded-lg"
                title="Toggle Language"
              >
                <Languages size={16} strokeWidth={1.5} />
                <span className="ml-1 text-[9px] font-bold uppercase tracking-widest">{lang}</span>
              </button>
            </div>
          </div>

          <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-8 relative z-10">
            
            {/* Minimal Hero */}
            <div className="space-y-4 pt-2 pb-2">
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl sm:text-4xl font-light text-white tracking-wide"
              >
                {t.findNext} <br />
                <span className="text-accent-gradient font-medium italic">{t.quickly}</span>
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

            {/* Search & Filter Section */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glassmorphism rounded-2xl p-4 flex flex-col gap-4 relative z-40"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 flex items-center px-4 py-3 bg-[#0A1128] rounded-xl border border-white/5">
                  <MapPin size={16} className="text-[#B2DF28]/60 mr-3" />
                  <div className="flex-1">
                    <label className="text-[8px] uppercase font-bold text-white/40 tracking-wider block mb-1">{t.from}</label>
                    <input 
                      type="text" 
                      value="Cheemeni" 
                      disabled 
                      className="w-full bg-transparent border-none p-0 text-white/80 font-medium focus:ring-0 cursor-not-allowed outline-none text-sm"
                    />
                  </div>
                </div>
                
                <div className="flex-1 flex items-center px-4 py-3 bg-[#0A1128] rounded-xl border border-white/5 focus-within:border-[#B2DF28]/40 transition-colors">
                  <Search size={16} className="text-[#B2DF28] mr-3" />
                  <div className="flex-1">
                    <label className="text-[8px] uppercase font-bold text-[#B2DF28] tracking-wider block mb-1">{t.to}</label>
                    <input 
                      type="text" 
                      placeholder={t.placeholder}
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full bg-transparent border-none p-0 text-white font-medium placeholder:text-white/20 focus:ring-0 outline-none text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Advanced Filter Pills */}
              <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                <Filter size={14} className="text-white/40 mr-2" />
                {['All', 'Private', 'KSRTC'].map(type => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${filterType === type ? 'bg-[#B2DF28] text-[#0A1128]' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
                  >
                    {type === 'All' ? t.filterAll : type === 'Private' ? t.filterPrivate : t.filterKSRTC}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Results */}
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2">
                <h3 className="font-medium text-white/90 tracking-wide text-sm">
                  {t.todaySchedule}
                </h3>
                <span className="text-[10px] text-[#B2DF28] bg-[#B2DF28]/10 px-2 py-0.5 rounded font-medium">
                  {filteredBuses.length} {t.busesFound}
                </span>
              </div>

              <AnimatePresence mode="popLayout">
                {filteredBuses.length > 0 ? (
                  filteredBuses.map((bus) => (
                    <BusCard key={bus.id} bus={bus} isNext={bus.id === nextBusId} t={t} />
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20 px-4 glassmorphism rounded-2xl border-dashed border-white/10 border-2"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 mb-4">
                      <Search size={20} className="text-white/30" />
                    </div>
                    <h3 className="text-sm font-medium text-white/80 mb-2">{t.noBuses}</h3>
                    <p className="text-xs text-white/40 leading-relaxed">{t.tryDifferent}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Trawbit Technologies Branding */}
            <TrawbitLogo />
            
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
}