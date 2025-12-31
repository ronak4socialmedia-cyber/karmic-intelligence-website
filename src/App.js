import React, { useState, useEffect } from 'react';
import {
 Compass, BookOpen, Film, Calendar, Users, ArrowRight, Menu, X,
 Mic, Zap, Clock, Globe, Mail, Phone, MapPin, Award,
 ChevronRight, PlayCircle, ExternalLink, Instagram, Youtube, Linkedin,
 Book, GraduationCap, Building2, TrendingUp, Layout, Target,
 Briefcase, Video, Mic2, Star
} from 'lucide-react';
import AdminDashboard from './pages/AdminDashboard';


// --- SEO Component ---
const MetaHead = ({ title, description }) => {
 useEffect(() => {
   document.title = title;
   const metaDesc = document.querySelector('meta[name="description"]');
   if (metaDesc) {
     metaDesc.content = description;
   } else {
     const meta = document.createElement('meta');
     meta.name = 'description';
     meta.content = description;
     document.head.appendChild(meta);
   }
   window.scrollTo(0, 0);
 }, [title, description]);
 return null;
};


// --- Data Constants ---
const servicesList = [
 {
   id: 'astro-vastu',
   title: "Astro-Vastu Consultation",
   desc: "Optimize your residential and commercial spaces using astronomical and architectural alignment.",
   icon: <Layout className="w-8 h-8" />,
   detail: "We analyze the geometric alignment of your property alongside your personal astrological chart to create a space that resonates with your unique frequency."
 },
 {
   id: 'education',
   title: "Education (Astro Granth)",
   desc: "Advanced vedic knowledge with 8,800+ students and 9+ courses.",
   icon: <GraduationCap className="w-8 h-8" />,
   detail: "From foundational astrology to advanced stock market prediction, Astro Granth is the premier academy for modern Vedic sciences."
 },
 {
   id: 'publishing',
   title: "Books & Films Publishing",
   desc: "Vedic knowledge through books, films and digital media.",
   icon: <Film className="w-8 h-8" />,
   detail: "Producing high-quality literature and documentaries that demystify ancient wisdom for the contemporary mind."
 },
 {
   id: 'events',
   title: "Events & Retreats",
   desc: "Live workshops and retreats for vedic wisdom experiences.",
   icon: <Calendar className="w-8 h-8" />,
   detail: "Immersive sessions, seminars, and spiritual retreats designed to provide hands-on experience of the Vedic lifestyle."
 }
];


const podcastEpisodes = [
 { title: "The Science of Saturn", ep: "EP. 08", duration: "45 min" },
 { title: "Market: Bull or Bear?", ep: "EP. 24", duration: "32 min" },
 { title: "Medical Palmistry", ep: "EP. 12", duration: "50 min" },
 { title: "Astrology as GPS", ep: "EP. 02", duration: "28 min" }
];


const booksList = [
 { title: "Bruhad Jyotish Shastra", tag: "Bestseller" },
 { title: "The Architectural Mind", tag: "New Release" },
 { title: "Cosmic Economics", tag: "Coming Soon" }
];


const eventsList = [
 { title: "Vastu Masterclass", date: "Oct 12-14", loc: "Mumbai", type: "Seminar" },
 { title: "Himalayan Retreat", date: "Nov 05-10", loc: "Rishikesh", type: "Retreat" },
 { title: "Corporate Alignment", date: "Dec 01", loc: "Bangalore", type: "Workshop" }
];


// --- Main App Component ---
const App = () => {
 const [currentPage, setCurrentPage] = useState('home');
 const [isMenuOpen, setIsMenuOpen] = useState(false);
 const [scrolled, setScrolled] = useState(false);


 useEffect(() => {
   const handleScroll = () => setScrolled(window.scrollY > 50);
   window.addEventListener('scroll', handleScroll);
   return () => window.removeEventListener('scroll', handleScroll);
 }, []);


 const navigateTo = (page) => {
   setCurrentPage(page);
   setIsMenuOpen(false);
 };


 // --- Sub-Components (Views) ---


 const HeroSection = () => (
   <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
     <div className="absolute inset-0 z-0">
       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#08090d]/60 to-[#08090d]" />
       <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-amber-600/10 blur-[150px] rounded-full animate-pulse" />
     </div>
     <div className="relative z-10 text-center px-6 max-w-6xl">
       <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-10 backdrop-blur-sm">
         <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
         <span className="text-[9px] font-black uppercase tracking-[0.4em] text-amber-500">The Conscious Architect</span>
       </div>
       <h1 className="text-5xl md:text-[100px] font-black mb-8 tracking-tighter leading-[0.9] italic uppercase">
         Karmic <br />
         <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-orange-600">
           Intelligence
         </span>
       </h1>
       <p className="text-lg md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
         Blending ancient <span className="text-white font-medium">Vedic wisdom</span> with modern insights, Karmic Intelligence empowers personal and professional growth.
       </p>
       <div className="flex flex-col sm:flex-row gap-6 justify-center">
         <button onClick={() => navigateTo('services')} className="px-10 py-5 bg-amber-600 rounded-full font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-amber-500 transition-all group shadow-2xl shadow-amber-900/30">
           Explore Services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
         </button>
         <button onClick={() => navigateTo('philosophy')} className="px-10 py-5 bg-white/5 border border-white/10 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all backdrop-blur-md">
           Our Philosophy
         </button>
       </div>
     </div>
   </section>
 );


 const HomeServices = () => (
   <section className="py-24 px-6 bg-[#0c0e14]">
     <div className="max-w-7xl mx-auto">
       <div className="flex justify-between items-end mb-16">
         <div>
           <h2 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.5em] mb-4 italic">What We Offer</h2>
           <h3 className="text-3xl md:text-5xl font-black italic uppercase">Core Services</h3>
         </div>
         <button onClick={() => navigateTo('services')} className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-amber-500 transition-colors">
           View All <ChevronRight size={14} />
         </button>
       </div>
       <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
         {servicesList.map((service, idx) => (
           <div key={idx} className="p-8 rounded-[30px] bg-[#08090d] border border-white/5 hover:border-amber-600/50 transition-all group hover:-translate-y-2 duration-300">
             <div className="w-12 h-12 bg-amber-900/20 rounded-xl flex items-center justify-center text-amber-500 mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors">
               {service.icon}
             </div>
             <h4 className="text-lg font-bold mb-4 italic uppercase tracking-tight leading-none min-h-[40px] flex items-center">{service.title}</h4>
             <p className="text-sm text-gray-500 leading-relaxed font-light mb-6 min-h-[80px]">{service.desc}</p>
             <button onClick={() => navigateTo('services')} className="text-[10px] font-black uppercase tracking-widest text-amber-600 group-hover:text-amber-400 flex items-center gap-2">
               Learn More <ArrowRight size={12} />
             </button>
           </div>
         ))}
       </div>
     </div>
   </section>
 );


 const HomeUnifiedField = () => (
   <section className="py-32 px-6 relative">
     <div className="max-w-7xl mx-auto text-center mb-16">
       <h2 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.5em] mb-4 italic">Core Methodology</h2>
       <h3 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">The Unified Field</h3>
     </div>
     <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
       {[
         { icon: <Clock />, title: "Time (Kaal)", desc: "Identifying the 'Muhurta' where effort yields maximum results." },
         { icon: <Globe />, title: "Space (Desh)", desc: "Using Vastu Shastra to turn your habitat into an energy generator." },
         { icon: <Zap />, title: "Energy (Shakti)", desc: "Calibration through Mantra, Sound, and Color therapy." }
       ].map((item, idx) => (
         <div key={idx} className="p-10 rounded-[50px] bg-[#0c0e14] border border-white/5 hover:border-amber-600/30 transition-all group">
           <div className="w-14 h-14 bg-amber-600/20 rounded-2xl flex items-center justify-center text-amber-500 mb-8 group-hover:scale-110 transition-transform">
             {React.cloneElement(item.icon, { size: 28 })}
           </div>
           <h3 className="text-2xl font-black mb-4 italic uppercase">{item.title}</h3>
           <p className="text-gray-500 text-lg font-light">{item.desc}</p>
         </div>
       ))}
     </div>
   </section>
 );


 const HomeFounder = () => (
   <section className="py-32 px-6 bg-[#0d0f14]">
     <div className="max-w-7xl mx-auto">
       <div className="flex flex-col lg:flex-row gap-24 items-center">
         <div className="lg:w-1/2 relative">
           <div className="absolute -inset-10 bg-amber-600/10 blur-[100px] rounded-full" />
           <div className="relative z-10 rounded-[60px] overflow-hidden border border-white/10">
             <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" alt="Ashish Mehta" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
           </div>
         </div>
         <div className="lg:w-1/2">
           <h2 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.5em] mb-4 italic">The Founder</h2>
           <h3 className="text-5xl md:text-7xl font-black italic mb-10 leading-[0.9] uppercase">Ashish Mehta</h3>
           <div className="space-y-6 text-gray-400 text-lg leading-relaxed font-light">
             <p>A Bachelor in Civil Engineering and a Master in Technology, Ashish Mehta bridges the gap between structural logic and celestial science.</p>
             <div className="grid grid-cols-2 gap-4 mt-8">
               <div className="flex items-start gap-3"><Award className="text-amber-500 w-5 h-5 mt-1" /><span className="text-sm font-bold text-gray-200 uppercase">Vastu Shiromani</span></div>
               <div className="flex items-start gap-3"><Award className="text-amber-500 w-5 h-5 mt-1" /><span className="text-sm font-bold text-gray-200 uppercase">Jyotish Maharshi</span></div>
             </div>
           </div>
           <button onClick={() => navigateTo('founder')} className="mt-12 group flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] text-amber-500 hover:text-white transition-colors">Read Full Story <ArrowRight className="w-4 h-4 group-hover:translate-x-2" /></button>
         </div>
       </div>
     </div>
   </section>
 );


 const HomeAstroGranth = () => (
   <section className="py-24 px-6 bg-[#08090d]">
     <div className="max-w-7xl mx-auto bg-gradient-to-br from-[#12151c] to-[#0c0e14] rounded-[60px] p-8 md:p-20 border border-white/5 relative overflow-hidden">
       <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-center">
         <div className="lg:w-1/2">
           <h2 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.5em] mb-4 italic">Education</h2>
           <h3 className="text-4xl md:text-6xl font-black italic uppercase mb-6">Astro Granth</h3>
           <p className="text-xl text-gray-400 mb-10 font-light">Advanced Vedic knowledge platform empowering the next generation.</p>
           <div className="grid grid-cols-2 gap-8 mb-10">
             <div><span className="block text-4xl font-black italic text-white">8,800+</span><span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Students</span></div>
             <div><span className="block text-4xl font-black italic text-white">9+</span><span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Courses</span></div>
             <div><span className="block text-4xl font-black italic text-white">68k+</span><span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Readers</span></div>
           </div>
           <button onClick={() => navigateTo('education')} className="px-8 py-4 bg-amber-600 rounded-full font-black uppercase tracking-widest text-[10px] text-white hover:bg-amber-500 transition-all">Visit Academy</button>
         </div>
         <div className="lg:w-1/2 grid gap-6">
           <div className="bg-black/30 p-6 rounded-3xl border border-white/5 flex items-center gap-6">
              <GraduationCap className="text-amber-500 w-10 h-10" />
              <div><h4 className="font-bold text-lg italic uppercase">Master Course</h4><p className="text-xs text-gray-500 uppercase tracking-wider">Scientific Astrology</p></div>
           </div>
           <div className="bg-black/30 p-6 rounded-3xl border border-white/5 flex items-center gap-6">
              <TrendingUp className="text-amber-500 w-10 h-10" />
              <div><h4 className="font-bold text-lg italic uppercase">Stock Market</h4><p className="text-xs text-gray-500 uppercase tracking-wider">Financial Astrology</p></div>
           </div>
         </div>
       </div>
     </div>
   </section>
 );


 const HomePodcasts = () => (
   <section className="py-24 px-6 bg-[#0c0e14]">
     <div className="max-w-7xl mx-auto">
       <div className="flex justify-between items-end mb-12">
          <div>
           <h2 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.5em] mb-4 italic">Media</h2>
           <h3 className="text-4xl md:text-5xl font-black italic uppercase">Karmic Conversations</h3>
          </div>
          <button onClick={() => navigateTo('podcasts')} className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-amber-500 transition-colors">Listen All</button>
       </div>
       <div className="grid md:grid-cols-2 gap-8">
          <div className="relative group overflow-hidden rounded-[40px] aspect-video bg-[#1a1d26] border border-white/5 cursor-pointer">
             <div className="absolute inset-0 flex items-center justify-center">
                <PlayCircle className="w-20 h-20 text-amber-600 opacity-80 group-hover:scale-110 transition-transform" />
             </div>
             <div className="absolute bottom-8 left-8">
                <span className="bg-amber-600 text-white px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest mb-2 inline-block">Latest Episode</span>
                <h4 className="text-2xl font-black italic uppercase">The Science of Saturn</h4>
             </div>
          </div>
          <div className="space-y-4">
             {podcastEpisodes.slice(0, 3).map((ep, idx) => (
                <div key={idx} className="flex items-center justify-between p-6 bg-[#08090d] rounded-2xl border border-white/5 hover:border-amber-600/30 transition-all cursor-pointer group">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-amber-500 group-hover:bg-amber-600 group-hover:text-white transition-all"><Mic size={18} /></div>
                      <div>
                         <h4 className="font-bold italic uppercase text-sm">{ep.title}</h4>
                         <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{ep.ep} • {ep.duration}</span>
                      </div>
                   </div>
                   <PlayCircle size={20} className="text-gray-600 group-hover:text-amber-500" />
                </div>
             ))}
          </div>
       </div>
     </div>
   </section>
 );


 const HomeBooksEvents = () => (
   <section className="py-24 px-6 bg-[#08090d]">
     <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
       <div>
          <h2 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.5em] mb-6 italic">Publishing</h2>
          <h3 className="text-4xl font-black italic uppercase mb-10">Books & Films</h3>
          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
             {booksList.map((book, i) => (
                <div key={i} className="min-w-[180px] bg-[#12151c] p-6 rounded-2xl border border-white/5">
                   <div className="aspect-[2/3] bg-gradient-to-br from-gray-800 to-black rounded-lg mb-4 flex items-center justify-center border border-white/10">
                      <Book className="text-gray-600" />
                   </div>
                   <h4 className="font-bold text-sm italic uppercase mb-2 line-clamp-2">{book.title}</h4>
                   <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest">{book.tag}</span>
                </div>
             ))}
          </div>
          <button onClick={() => navigateTo('education')} className="mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-amber-500">View Catalog <ArrowRight size={12} /></button>
       </div>
       <div>
          <h2 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.5em] mb-6 italic">Live</h2>
          <h3 className="text-4xl font-black italic uppercase mb-10">Events & Retreats</h3>
          <div className="space-y-4">
             {eventsList.map((evt, i) => (
                <div key={i} className="flex gap-6 items-center p-4 rounded-2xl bg-[#12151c] border border-white/5">
                   <div className="bg-amber-900/20 px-4 py-2 rounded-lg text-center min-w-[70px]">
                      <span className="block text-xs font-black text-amber-500 uppercase">{evt.date.split(" ")[0]}</span>
                      <span className="block text-lg font-black text-white">{evt.date.split(" ")[1]}</span>
                   </div>
                   <div>
                      <h4 className="font-bold italic uppercase text-sm">{evt.title}</h4>
                      <div className="flex gap-3 text-[10px] text-gray-500 uppercase tracking-wider font-bold mt-1">
                         <span className="flex items-center gap-1"><MapPin size={10} /> {evt.loc}</span>
                         <span className="flex items-center gap-1"><Calendar size={10} /> {evt.type}</span>
                      </div>
                   </div>
                </div>
             ))}
          </div>
          <button onClick={() => navigateTo('services')} className="mt-8 px-8 py-3 bg-white/5 border border-white/10 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-white/10">Check Schedule</button>
       </div>
     </div>
   </section>
 );


 const HomeContact = () => (
   <section className="py-24 px-6 bg-[#0c0e14]">
     <div className="max-w-4xl mx-auto text-center">
       <h2 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.5em] mb-6 italic">Inquiry</h2>
       <h3 className="text-4xl md:text-6xl font-black italic uppercase mb-8">Start Your Alignment</h3>
       <p className="text-gray-400 mb-12">Every individual has a unique karmic fingerprint. Contact us for a bespoke consultation.</p>
       <button onClick={() => navigateTo('contact')} className="px-12 py-5 bg-amber-600 rounded-full font-black uppercase tracking-widest text-xs hover:bg-amber-500 transition-all shadow-xl shadow-amber-900/40">Get in Touch</button>
     </div>
   </section>
 );


 const HomePage = () => (
   <>
     <MetaHead title="Home | Karmic Intelligence - Ashish Mehta" description="Blending ancient Vedic wisdom with modern insights. Services in Astro-Vastu, Education, and Publishing." />
     <HeroSection />
     <HomeServices />
     <HomeUnifiedField />
     <HomeFounder />
     <HomeAstroGranth />
     <HomeBooksEvents />
     <HomePodcasts />
     <HomeContact />
   </>
 );


 // --- Pages ---


 const ServicesPage = () => (
   <div className="pt-32 px-6 min-h-screen pb-20">
     <MetaHead title="Services | Karmic Intelligence" description="Astro-Vastu, Education, Publishing and Events." />
     <div className="max-w-7xl mx-auto">
       <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter mb-16">Our Services</h1>
       <div className="grid gap-12">
         {servicesList.map((service, idx) => (
           <div key={idx} className="group bg-[#0c0e14] rounded-[50px] p-8 md:p-16 border border-white/5 hover:border-amber-600/30 transition-all flex flex-col md:flex-row gap-10">
             <div className="w-24 h-24 bg-amber-600/10 rounded-3xl flex items-center justify-center text-amber-500 shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300">
               {React.cloneElement(service.icon, { size: 40 })}
             </div>
             <div>
               <h3 className="text-3xl font-black italic uppercase mb-4 text-white">{service.title}</h3>
               <p className="text-xl text-gray-300 font-light mb-6">{service.desc}</p>
               <p className="text-gray-500 leading-relaxed mb-8">{service.detail}</p>
               <button onClick={() => navigateTo('contact')} className="px-8 py-3 bg-white/5 border border-white/10 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-amber-600 hover:text-white transition-all">Book Now</button>
             </div>
           </div>
         ))}
       </div>
     </div>
   </div>
 );


 const PhilosophyPage = () => (
   <div className="pt-32 px-6 min-h-screen pb-20">
     <MetaHead title="Philosophy | The Unified Field" description="Time, Space, and Energy - The three pillars of Karmic Intelligence." />
     <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter mb-12">Philosophy</h1>
        <div className="prose prose-invert prose-lg">
           <p className="text-2xl text-amber-500 italic font-light mb-10">"The universe is not random. It is a structure."</p>
           <p className="text-gray-400">Ancient Rishis were the original data scientists. They observed thousands of years of planetary correlations and codified them.</p>
           <p className="text-gray-400 mt-6">Our approach eliminates fear. We view a horoscope as a blueprint. If you know the load-bearing columns of your life, you can build a skyscraper.</p>
        </div>
        <div className="mt-20 grid md:grid-cols-3 gap-6">
           <div className="p-8 bg-[#0c0e14] rounded-3xl border border-white/5"><h4 className="font-bold text-amber-500 uppercase mb-2">Time</h4><p className="text-sm text-gray-400">Whatever is born in time, must die in time. Mastering cycles is the key.</p></div>
           <div className="p-8 bg-[#0c0e14] rounded-3xl border border-white/5"><h4 className="font-bold text-amber-500 uppercase mb-2">Space</h4><p className="text-sm text-gray-400">Your environment is an extension of your mind. Align it.</p></div>
           <div className="p-8 bg-[#0c0e14] rounded-3xl border border-white/5"><h4 className="font-bold text-amber-500 uppercase mb-2">Energy</h4><p className="text-sm text-gray-400">The subtle frequency that connects the observer to the observed.</p></div>
        </div>
     </div>
   </div>
 );


 const FounderPage = () => (
   <div className="pt-32 px-6 min-h-screen pb-20">
     <MetaHead title="Ashish Mehta | Founder" description="Civil Engineer turned Vedic Scholar." />
     <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        <div className="lg:w-1/3"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" className="w-full rounded-[40px] grayscale" alt="Ashish Mehta" /></div>
        <div className="lg:w-2/3">
           <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter mb-8">Ashish Mehta</h1>
           <p className="text-xl text-amber-500 font-bold uppercase tracking-widest mb-8">Civil Engineer & Vedic Scholar</p>
           <div className="space-y-6 text-gray-300 font-light text-lg">
              <p>Ashish Mehta represents a rare convergence of disciplines. With a formal background in Civil Engineering (M.Tech) from CEPT University, his mind is trained in logic and structure.</p>
              <p>Simultaneously, he has dedicated over two decades to Vedic Sciences, earning the titles of Vastu Shiromani and Jyotish Maharshi.</p>
              <p>He is the founder of 'Astro Granth', an initiative to scientifically teach astrology to the modern generation.</p>
           </div>
        </div>
     </div>
   </div>
 );


 const EducationPage = () => (
   <div className="pt-32 px-6 min-h-screen pb-20">
     <MetaHead title="Education | Astro Granth Academy" description="Learn Vedic Sciences scientifically." />
     <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
           <div>
              <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter mb-4">Astro Granth</h1>
              <p className="text-xl text-amber-500">The Academy of Vedic Sciences</p>
           </div>
           <div className="text-right hidden md:block">
              <span className="block text-4xl font-black">8,800+</span>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Students Enrolled</span>
           </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           <div className="bg-[#0c0e14] p-8 rounded-[40px] border border-white/5">
              <Book className="w-12 h-12 text-amber-500 mb-6" />
              <h3 className="text-2xl font-black italic uppercase mb-2">Foundation Course</h3>
              <p className="text-gray-400 text-sm mb-6">Learn the alphabets of the cosmic language. Planets, Signs, and Houses.</p>
              <span className="inline-block px-4 py-2 bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-widest">Level 1</span>
           </div>
           <div className="bg-[#0c0e14] p-8 rounded-[40px] border border-white/5 border-l-4 border-l-amber-600">
              <TrendingUp className="w-12 h-12 text-amber-500 mb-6" />
              <h3 className="text-2xl font-black italic uppercase mb-2">Financial Astrology</h3>
              <p className="text-gray-400 text-sm mb-6">Predicting market trends using planetary transits and sarvatobhadra chakra.</p>
              <span className="inline-block px-4 py-2 bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-widest">Advanced</span>
           </div>
           <div className="bg-[#0c0e14] p-8 rounded-[40px] border border-white/5">
              <Layout className="w-12 h-12 text-amber-500 mb-6" />
              <h3 className="text-2xl font-black italic uppercase mb-2">Industrial Vastu</h3>
              <p className="text-gray-400 text-sm mb-6">Optimizing factories and production units for maximum output.</p>
              <span className="inline-block px-4 py-2 bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-widest">Professional</span>
           </div>
        </div>
        <div className="mt-20 bg-[#12151c] rounded-[40px] p-10 flex flex-col md:flex-row items-center justify-between gap-8">
           <div>
              <h3 className="text-3xl font-black italic uppercase mb-2">Publishing Division</h3>
              <p className="text-gray-400">Explore our library of books and documentaries.</p>
           </div>
           <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10">Browse Store</button>
        </div>
     </div>
   </div>
 );


 const PodcastsPage = () => (
   <div className="pt-32 px-6 min-h-screen pb-20">
     <MetaHead title="Podcasts | Karmic Conversations" description="Listen to the latest episodes." />
     <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter mb-16">Podcasts</h1>
        <div className="grid gap-6">
           {podcastEpisodes.map((ep, i) => (
              <div key={i} className="flex items-center justify-between p-8 bg-[#0c0e14] rounded-[30px] border border-white/5 hover:border-amber-600/50 transition-all group">
                 <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-amber-600/10 rounded-full flex items-center justify-center text-amber-500 group-hover:bg-amber-600 group-hover:text-white transition-all"><Mic2 /></div>
                    <div>
                       <h3 className="text-xl font-black italic uppercase">{ep.title}</h3>
                       <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">{ep.ep} • {ep.duration}</p>
                    </div>
                 </div>
                 <button className="p-4 rounded-full bg-white/5 hover:bg-white/10"><PlayCircle /></button>
              </div>
           ))}
        </div>
     </div>
   </div>
 );


 const KarmicEngineeringPage = () => (
    <div className="pt-32 px-6 min-h-screen pb-20">
     <MetaHead title="Karmic Engineering | The Methodology" description="Engineering your destiny." />
     <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter mb-10">Karmic <br/><span className="text-amber-500">Engineering</span></h1>
        <p className="text-2xl text-gray-200 font-light leading-relaxed mb-12">Just as we engineer physical structures for stability using loads and forces, we can engineer our lives for success by aligning with the natural laws of the universe.</p>
       
        <div className="grid md:grid-cols-2 gap-10">
           <div className="bg-[#0c0e14] p-10 rounded-[40px] border border-white/5">
              <Briefcase className="w-10 h-10 text-amber-500 mb-6" />
              <h3 className="text-2xl font-black italic uppercase mb-4">Corporate Alignment</h3>
              <p className="text-gray-400">We analyze the 'Horoscope' of a business entity. We optimize the headquarters layout (Space) and timing of product launches (Time).</p>
           </div>
           <div className="bg-[#0c0e14] p-10 rounded-[40px] border border-white/5">
              <Target className="w-10 h-10 text-amber-500 mb-6" />
              <h3 className="text-2xl font-black italic uppercase mb-4">Destiny Mapping</h3>
              <p className="text-gray-400">Identifying periods of 'high-yield karma'. Knowing when to act aggressively and when to conserve energy.</p>
           </div>
        </div>
     </div>
   </div>
 );


 const ContactPage = () => (
   <div className="pt-32 px-6 min-h-screen pb-20">
     <MetaHead title="Contact | Karmic Intelligence" description="Book a consultation." />
     <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        <div>
           <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-10">Get In Touch</h1>
           <p className="text-gray-400 text-lg mb-12">Ready to align your space and time? Fill out the form to schedule a consultation regarding Astro-Vastu, Business, or Personal analysis.</p>
           <div className="space-y-8">
              <div className="flex items-center gap-6"><div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-amber-500"><Mail /></div><div><span className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Email</span><span className="text-lg font-bold">info@astrogranth.com</span></div></div>
              <div className="flex items-center gap-6"><div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-amber-500"><Phone /></div><div><span className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Phone</span><span className="text-lg font-bold">+91 98250 12345</span></div></div>
              <div className="flex items-center gap-6"><div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-amber-500"><MapPin /></div><div><span className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Location</span><span className="text-lg font-bold">Ahmedabad, Gujarat</span></div></div>
           </div>
        </div>
        <div className="bg-[#0c0e14] p-10 rounded-[50px] border border-white/5">
           <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div><label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Name</label><input type="text" className="w-full bg-[#08090d] border border-white/10 rounded-2xl px-6 py-4 mt-2 focus:border-amber-500 outline-none text-white" /></div>
              <div><label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Service</label><select className="w-full bg-[#08090d] border border-white/10 rounded-2xl px-6 py-4 mt-2 focus:border-amber-500 outline-none text-gray-300"><option>Astro-Vastu Consultation</option><option>Karmic Analysis</option><option>Education Inquiry</option></select></div>
              <div><label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Message</label><textarea rows="4" className="w-full bg-[#08090d] border border-white/10 rounded-2xl px-6 py-4 mt-2 focus:border-amber-500 outline-none text-white"></textarea></div>
              <button className="w-full py-5 bg-amber-600 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-amber-500 transition-colors">Send Inquiry</button>
           </form>
        </div>
     </div>
   </div>
 );


 556
  = [
   { label: 'Home', id: 'home' },
   { label: 'Services', id: 'services' },
   { label: 'Philosophy', id: 'philosophy' },
   { label: 'Karmic Engineering', id: 'karmic-engineering' },
   { label: 'Founder', id: 'founder' },
   { label: 'Education', id: 'education' },
   { label: 'Podcasts', id: 'podcasts' },
   { label: 'Contact', id: 'contact' },
     { label: 'Admin', id: 'admin' },
 ];


 return 
   <div className="min-h-screen bg-[#08090d] text-gray-100 font-sans selection:bg-amber-500/30 selection:text-amber-200">
    
     {/* Navigation */}
     <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#08090d]/95 backdrop-blur-md py-4 border-b border-white/5 shadow-2xl' : 'bg-transparent py-6'}`}>
       <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
         <button onClick={() => navigateTo('home')} className="flex items-center gap-3 group">
           <div className="w-10 h-10 bg-gradient-to-tr from-amber-600 to-orange-400 rounded-full flex items-center justify-center group-hover:rotate-180 transition-transform duration-700">
             <Compass className="text-white w-6 h-6" />
           </div>
           <div className="flex flex-col items-start">
             <span className="text-lg font-bold tracking-tighter uppercase leading-none">Ashish Mehta</span>
             <span className="text-[8px] font-bold tracking-[0.3em] text-amber-500 uppercase">Karmic Intelligence</span>
           </div>
         </button>


         <div className="hidden lg:flex gap-6 items-center">
           {navItems.slice(0, 5).map((item) => (
             <button
               key={item.id}
               onClick={() => navigateTo(item.id)}
               className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${currentPage === item.id ? 'text-amber-500' : 'text-gray-400 hover:text-amber-400'}`}
             >
               {item.label}
             </button>
           ))}
           <button onClick={() => setIsMenuOpen(true)} className="ml-4 p-2 hover:text-amber-500"><Menu size={20} /></button>
         </div>
         <button className="lg:hidden" onClick={() => setIsMenuOpen(true)}><Menu /></button>
       </div>
     </nav>


     {/* Full Screen Menu */}
     {isMenuOpen && (
       <div className="fixed inset-0 z-[60] bg-[#08090d] flex flex-col items-center justify-center p-10">
         <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 p-4 bg-white/5 rounded-full hover:bg-white/10"><X /></button>
         <div className="flex flex-col gap-6 text-center">
           {navItems.map((item) => (
             <button
               key={item.id}
               className={`text-3xl md:text-5xl font-black italic uppercase tracking-tighter hover:text-amber-500 transition-colors ${currentPage === item.id ? 'text-amber-500' : 'text-white'}`}
               onClick={() => navigateTo(item.id)}
             >
               {item.label}
             </button>
           ))}
         </div>
       </div>
     )}


     {/* Main Content */}
     <main>
       {currentPage === 'home' && <HomePage />}
       {currentPage === 'services' && <ServicesPage />}
       {currentPage === 'philosophy' && <PhilosophyPage />}
       {currentPage === 'founder' && <FounderPage />}
       {currentPage === 'education' && <EducationPage />}
       {currentPage === 'podcasts' && <PodcastsPage />}
       {currentPage === 'karmic-engineering' && <KarmicEngineeringPage />}
       {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'admin' && <AdminDashboard />}
     </main>


     {/* Footer */}
     <footer className="bg-[#050608] pt-24 pb-12 px-6 border-t border-white/5">
       <div className="max-w-7xl mx-auto">
         <div className="flex flex-col md:flex-row justify-between gap-12 mb-20">
           <div>
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center"><Compass className="text-white w-5 h-5" /></div>
                 <span className="text-2xl font-black italic uppercase">Ashish Mehta</span>
              </div>
              <p className="text-gray-600 max-w-xs text-sm">Pioneering the science of Karmic Engineering. Merging M.Tech precision with Vedic wisdom.</p>
           </div>
           <div className="flex gap-12">
              <div>
                 <h4 className="font-bold text-amber-500 uppercase tracking-widest text-xs mb-6">Explore</h4>
                 <ul className="space-y-4 text-sm text-gray-500 font-bold uppercase tracking-wider">
                    <li><button onClick={() => navigateTo('services')} className="hover:text-white">Services</button></li>
                    <li><button onClick={() => navigateTo('education')} className="hover:text-white">Education</button></li>
                    <li><button onClick={() => navigateTo('podcasts')} className="hover:text-white">Media</button></li>
                 </ul>
              </div>
              <div>
                 <h4 className="font-bold text-amber-500 uppercase tracking-widest text-xs mb-6">Social</h4>
                 <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-amber-600 hover:text-white transition-all"><Instagram size={18} /></a>
                    <a href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-amber-600 hover:text-white transition-all"><Youtube size={18} /></a>
                    <a href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-amber-600 hover:text-white transition-all"><Linkedin size={18} /></a>
                 </div>
              </div>
           </div>
         </div>
         <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4 text-[10px] text-gray-600 font-black uppercase tracking-[0.3em]">
            <p>© 2025 Ashish Mehta. All rights reserved.</p>
            <div className="flex gap-6"><a href="#" className="hover:text-amber-500">Privacy Policy</a><a href="#" className="hover:text-amber-500">Terms of Service</a></div>
         </div>
       </div>
     </footer>
   </div>
 );
};


export default App;

