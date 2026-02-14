import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowDown, MapPin, Clock, Calendar, Car } from 'lucide-react';

// --- ANIMATION CONSTANTS ---
const TRANSITION = { duration: 1.4, ease: [0.25, 1, 0.5, 1] };

const LINE_MASK = {
  hidden: { y: "120%", rotate: 3 },
  visible: (custom = 0) => ({
    y: "0%",
    rotate: 0,
    transition: { ...TRANSITION, delay: custom * 0.05, duration: 1.4 }
  })
};

// --- VISUAL COMPONENTS (NO IMAGES) ---

const BreathingWatermark = () => (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <div className="animate-breathe font-serif text-[120vh] text-spice/3 leading-none select-none mix-blend-overlay blur-sm">
            A
        </div>
    </div>
);

const VerticalLines = () => (
  <div className="fixed inset-0 pointer-events-none z-0 flex justify-between px-6 md:px-12 max-w-screen-xl mx-auto opacity-[0.03]">
    <div className="w-[1px] h-full bg-spice"></div>
    <div className="w-[1px] h-full bg-spice hidden md:block"></div>
    <div className="w-[1px] h-full bg-spice hidden md:block"></div>
    <div className="w-[1px] h-full bg-spice"></div>
  </div>
);

const LiquidShape = () => {
    // Abstract replacement for the photo
    return (
        <div className="w-full h-[400px] md:h-[500px] relative flex items-center justify-center overflow-hidden rounded-sm my-12 glass-card">
            <motion.div 
                className="absolute w-[150%] h-[150%] bg-gradient-to-tr from-rose/30 via-mist/20 to-cream/30 opacity-30 blur-3xl"
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
                className="relative z-10 w-48 h-48 md:w-64 md:h-64 rounded-full border border-white/40 flex items-center justify-center backdrop-blur-md"
                animate={{ borderRadius: ["60% 40% 30% 70% / 60% 30% 70% 40%", "30% 60% 70% 40% / 50% 60% 30% 60%", "60% 40% 30% 70% / 60% 30% 70% 40%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="text-center">
                    <span className="font-serif italic text-2xl text-ink/60 block">Figure 01</span>
                    <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-spice">Atmosphere</span>
                </div>
            </motion.div>
        </div>
    )
}

const Marquee = ({ text, direction = 1, speed = 15, className = "" }: { text: string, direction?: number, speed?: number, className?: string }) => {
  return (
    <div className={`w-full overflow-hidden pointer-events-none select-none mix-blend-multiply flex ${className}`}>
       <motion.div 
         className="flex flex-nowrap whitespace-nowrap font-serif italic text-[10vh] md:text-[8vw] leading-none opacity-[0.05] text-spice"
         animate={{ x: direction === 1 ? "-50%" : "0%" }}
         initial={{ x: direction === 1 ? "0%" : "-50%" }}
         transition={{ repeat: Infinity, ease: "linear", duration: speed * 2 }}
       >
         {[0, 1].map((set) => (
            <div key={set} className="flex flex-nowrap shrink-0">
               {Array(4).fill(text).map((t, i) => (
                 <span key={i} className="mx-4 md:mx-8">{t}</span>
               ))}
            </div>
         ))}
       </motion.div>
    </div>
  );
};

const SplitText = ({ children, className = "", delay = 0, type = "header" }: { children?: React.ReactNode, className?: string, delay?: number, type?: "header" | "body" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  
  const text = typeof children === 'string' ? children : String(children || "");
  const words = text.split(" ");

  return (
    <div ref={ref} className={`${className} inline-flex flex-wrap gap-x-[0.25em] gap-y-1`}>
      {words.map((word, i) => (
        <div key={i} className="overflow-hidden relative inline-block pb-3 -mb-3">
          <motion.span
            custom={delay + i}
            variants={LINE_MASK}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={`inline-block ${type === "header" ? "origin-bottom-left" : ""}`}
          >
            {word}
          </motion.span>
        </div>
      ))}
    </div>
  );
};

const Divider = () => (
  <motion.div 
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
    className="w-full h-[1px] bg-spice/20 origin-left"
  />
);

// --- SECTIONS ---

const Background = () => {
  return (
    <div className="fog-container">
      <div className="fog-blob bg-rose w-[50vw] h-[50vw] top-[-10%] left-[-10%] mix-blend-multiply opacity-30" />
      <div className="fog-blob bg-mist w-[60vw] h-[60vw] bottom-[-10%] right-[-20%] mix-blend-multiply delay-1000 opacity-25" />
      <div className="fog-blob bg-saffron w-[40vw] h-[40vw] top-[30%] left-[30%] opacity-20 mix-blend-overlay" />
    </div>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section className="h-screen md:min-h-screen relative flex flex-col pt-8 pb-0 md:py-12 overflow-hidden">
      
      {/* 1. TOP HEADER */}
      <div className="flex justify-between items-start w-full px-6 md:px-12 opacity-80 z-20 text-spice">
        <span className="font-sans text-[10px] tracking-[0.2em] uppercase font-medium">Special Invitation</span>
        <div className="flex gap-4">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase font-medium">Feb 15</span>
            <div className="w-2 h-2 rounded-full bg-saffron animate-pulse mt-1 shadow-[0_0_10px_rgba(212,165,116,0.4)]" />
        </div>
      </div>

      {/* 2. MAIN CONTENT */}
      <div className="flex-grow flex flex-col justify-center items-center md:items-start px-6 md:px-12 relative z-20">
        <motion.div style={{ y: y1 }} className="flex flex-col items-center md:items-start w-full">
           
           {/* Title Container */}
           <div className="relative z-10">
             {/* BUG FIX: Increased bottom padding to pb-16 to catch descenders like 'y' */}
             <div className="overflow-hidden px-6 pt-6 pb-16 -mx-6 -mt-6 -mb-16">
                <motion.h1 
                  initial={{ y: "110%", rotate: 3 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ ...TRANSITION, duration: 1.6 }}
                  className="font-serif italic text-[16vw] md:text-[14vw] leading-[1.0] md:leading-[0.85] tracking-tight text-ink text-center md:text-left drop-shadow-2xl"
                >
                  Azaliya
                </motion.h1>
             </div>
             
             {/* Desktop Decor Line */}
             <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 120 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute -right-16 top-16 h-[2px] bg-spice/30 hidden md:block" 
             />
           </div>
           
           {/* Subtext Container */}
           <div className="mt-8 md:mt-12 md:pl-4 max-w-[85vw] md:max-w-md relative text-center md:text-left">
             <div className="absolute -left-8 top-0 h-full w-[1px] bg-spice/20 hidden md:block" />
             
             <SplitText delay={4} className="font-sans text-sm md:text-base font-light tracking-wide text-ink/80 justify-center md:justify-start" type="body">
               Надеюсь, этот букет заставил тебя улыбнуться.
             </SplitText>
             
             <div className="mt-6 flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 md:gap-4">
               <div className="h-[1px] w-8 md:w-12 bg-spice/40" />
               <SplitText delay={6} className="font-serif italic text-lg md:text-xl text-spice">От Ислама</SplitText>
             </div>
           </div>
        </motion.div>
      </div>

      {/* 3. BOTTOM */}
      <div className="relative w-full z-10 mt-auto">
        <div className="absolute bottom-16 md:bottom-24 left-0 w-full z-0">
             <Marquee text="TRADITION • HOSPITALITY • WARMTH • " speed={25} />
        </div>

        <div className="w-full flex justify-center pb-8 md:pb-12 relative z-10 opacity-50 text-spice">
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                <ArrowDown size={16} />
            </motion.div>
        </div>
      </div>
    </section>
  );
};

const Invitation = () => {
  return (
    <section className="py-20 px-6 md:px-12 relative z-10">
      {/* BUG FIX: Removed Grid, removed LiquidShape, centered text */}
      <div className="max-w-3xl mx-auto flex flex-col items-center justify-center text-center">
        
        <div className="w-full">
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-spice/70 mb-6 block font-bold">Контекст</span>
          
          <div className="flex justify-center">
            <SplitText className="font-serif text-4xl md:text-5xl leading-[1.15] text-ink justify-center" type="header">
              Прошло достаточно времени.
            </SplitText>
          </div>
          
          <div className="mt-12 space-y-8">
            <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-ink/80 flex justify-center">
              <SplitText type="body" delay={2} className="justify-center">
                 Пауза затянулась. Есть предложение просто увидеться.
              </SplitText>
            </p>
            <p className="font-sans text-lg md:text-xl text-spice italic font-serif flex justify-center">
              <SplitText type="body" delay={6} className="justify-center">
                 Без сложных контекстов, просто за теплой беседой.
              </SplitText>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

const Atmosphere = () => {
  return (
    <section className="py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-screen-xl mx-auto relative z-10">
        <Divider />
        
        <div className="py-20 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
          <div className="relative">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-spice/40 mb-8 block">Атмосфера</span>
            <SplitText className="font-serif italic text-5xl md:text-7xl text-ink leading-tight">
              Вкус и Тепло.
            </SplitText>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-rose/15 rounded-full blur-3xl mix-blend-multiply" />
          </div>

          <div className="flex flex-col justify-center space-y-16">
            <div className="space-y-4 group">
              <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-spice flex items-center gap-2">
                 01 <span className="w-8 h-[1px] bg-spice/20 group-hover:w-16 transition-all duration-500"/> О месте
              </h4>
              <div className="relative pl-0">
                <p className="font-serif text-2xl md:text-3xl text-ink">Место про традиции и гостеприимство.</p>
                <p className="mt-4 font-sans text-sm text-ink/70 max-w-sm leading-relaxed">
                  Где вкусно кормят и никуда не спешат. Здесь не нужен алкоголь. Только лучшие чайные церемонии, пряные ароматы и спокойствие.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <Divider />
      </div>
    </section>
  );
};

const TicketStub = ({ label, value, icon: Icon }: { label: string, value: string, icon: React.ElementType }) => (
    <div className="flex flex-col space-y-2 border-l border-dashed border-spice/20 pl-6 py-2 hover:bg-white/40 transition-colors duration-300">
        <div className="flex items-center gap-2 text-spice/80">
            <Icon size={14} />
            <span className="font-sans text-[9px] uppercase tracking-[0.2em] font-semibold">{label}</span>
        </div>
        <span className="font-serif text-xl md:text-2xl text-ink">{value}</span>
    </div>
);

const Logistics = () => {
  return (
    <section className="py-32 px-6 md:px-12">
      <div className="max-w-screen-xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full glass-card p-8 md:p-12 rounded-sm relative overflow-hidden"
        >
             {/* Ticket Decor */}
            <div className="absolute top-0 left-12 w-[1px] h-full border-l border-dashed border-spice/20 hidden md:block" />
            <div className="absolute top-1/2 -left-3 w-6 h-6 bg-sand rounded-full z-10" />
            <div className="absolute top-1/2 -right-3 w-6 h-6 bg-sand rounded-full z-10" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 items-center pl-0 md:pl-16">
                <div className="md:col-span-1">
                     <span className="font-serif italic text-4xl text-ink">Детали вечера</span>
                     <p className="text-[10px] uppercase tracking-widest text-spice/60 mt-2">For Azaliya</p>
                </div>
                
                <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <TicketStub icon={Calendar} label="Date" value="15.02" />
                    <TicketStub icon={Clock} label="Time" value="19:00*" />
                    <TicketStub icon={MapPin} label="Location" value="Пашмир" />
                </div>
            </div>

            {/* Transfer Note */}
            <div className="mt-12 pt-8 border-t border-spice/10 pl-0 md:pl-16">
                 <div className="flex items-start gap-4 p-4 bg-rose/20 rounded-lg border border-spice/15">
                     <Car className="text-spice shrink-0 mt-1" size={20} />
                     <div>
                         <span className="font-sans text-xs font-bold uppercase tracking-wider text-spice block mb-1">Transfer Included</span>
                         <p className="font-sans text-sm text-ink/80 leading-relaxed">
                            Трансфер включен. Нужно будет только время и адрес.
                         </p>
                     </div>
                 </div>
                 <p className="text-[10px] text-spice/50 mt-2">*или когда ты освободишься</p>
            </div>

            <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 pl-0 md:pl-16">
                 <p className="font-sans text-xs text-spice/80 uppercase tracking-wide">
                    Dress Code: <span className="text-ink font-medium">Твой абсолютный комфорт. Это единственное правило.</span>
                 </p>
                 <div className="font-mono text-[10px] text-spice/30">
                    ID: 4159-AZ-15
                 </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center items-center px-6 text-center relative overflow-hidden bg-ink text-sand">
      {/* Warm Golden Glow in Footer */}
      <motion.div 
        className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-honey/15 via-rose/10 to-transparent top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="relative z-10 space-y-16">
        <h2 className="font-serif italic text-4xl md:text-6xl text-honey drop-shadow-md">Жду встречи.</h2>
        
        <div className="magnetic-target">
             <motion.a
                href="https://t.me/bizvoz"
                target="_blank"
                className="inline-block relative px-16 py-6 border border-honey/40 rounded-full hover:bg-honey hover:text-ink transition-colors duration-500 font-sans text-xs tracking-[0.3em] uppercase group text-honey"
             >
                Принять приглашение
             </motion.a>
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="font-serif italic text-white/50 text-lg"
        >
          P.S. Будет вкусно и легко. Обещаю.
        </motion.p>
      </div>

      <div className="absolute bottom-8 w-full flex justify-between px-8 md:px-12 opacity-30 text-xs font-sans tracking-[0.2em] text-honey">
        <span>© 2026</span>
        <span>MADE FOR AZALIYA</span>
      </div>
    </section>
  );
};

const App = () => {
  return (
    <main className="w-full relative selection:bg-rose/30 selection:text-ink">
      <BreathingWatermark />
      <VerticalLines />
      <Background />
      <Hero />
      <Invitation />
      <Atmosphere />
      <Logistics />
      <Footer />
    </main>
  );
};

export default App;