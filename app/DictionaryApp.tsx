"use client"
import { useState, useEffect } from 'react';
import { Search, Camera, Mic, Download, Moon, Sun, Smartphone, Zap, Eye, Star, ArrowRight, Play } from 'lucide-react';
import Logo from "./logo.png";
import { ReactNode, CSSProperties, ButtonHTMLAttributes, HTMLAttributes } from 'react';
import Image from 'next/image';

type MotionDivProps = {
  children?: ReactNode;
  initial?: any;
  animate?: any;
  whileHover?: any;
  whileTap?: any;
  transition?: any;
  style?: CSSProperties;
} & HTMLAttributes<HTMLDivElement>;

type MotionButtonProps = {
  children?: ReactNode;
  whileHover?: any;
  whileTap?: any;
  style?: CSSProperties;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type MotionHeaderProps = {
  children?: ReactNode;
  initial?: any;
  animate?: any;
  style?: CSSProperties;
} & HTMLAttributes<HTMLHeadingElement>;

type MotionParagraphProps = {
  children?: ReactNode;
  initial?: any;
  animate?: any;
  style?: CSSProperties;
} & HTMLAttributes<HTMLParagraphElement>;

type MotionNavProps = {
  children?: ReactNode;
  initial?: any;
  animate?: any;
  whileHover?: any;
  whileTap?: any;
  transition?: any;
  style?: CSSProperties;
} & HTMLAttributes<HTMLElement>;

type MotionFooterProps = {
  children?: ReactNode;
  initial?: any;
  animate?: any;
  whileHover?: any;
  whileTap?: any;
  transition?: any;
  style?: CSSProperties;
} & HTMLAttributes<HTMLElement>;

const motion = {
  div: ({ children, initial, animate, whileHover, whileTap, transition, ...props }: MotionDivProps) => {
    let animation = 'none';
    if (animate?.opacity === 1) animation = 'fadeInUp 0.8s ease-out';
    else if (animate?.y === 0) animation = 'slideUp 0.6s ease-out';
    else if (animate?.scale === 1) animation = 'scaleIn 0.5s ease-out';
    // Add support for floating
    else if (Array.isArray(animate?.y)) animation = `floatY ${transition?.duration || 3}s ease-in-out ${transition?.repeat ? 'infinite' : ''}`;
    else if (Array.isArray(animate?.x)) animation = `floatX ${transition?.duration || 4}s ease-in-out ${transition?.repeat ? 'infinite' : ''}`;
    return (
      <div {...props} style={{
        animation,
        animationDelay: transition?.delay ? `${transition.delay}s` : undefined,
        ...props.style
      }}>
        {children}
      </div>
    );
  },
  button: ({ children, whileHover, whileTap, ...props }: MotionButtonProps) => (
    <button {...props} className={`${props.className || ''} transform transition-all duration-300 hover:scale-105 active:scale-95`}>
      {children}
    </button>
  ),
  h1: ({ children, initial, animate, ...props }: MotionHeaderProps) => (
    <h1 {...props} style={{
      animation: 'fadeInUp 1s ease-out 0.2s both',
      ...props.style
    }}>
      {children}
    </h1>
  ),
  p: ({ children, initial, animate, ...props }: MotionParagraphProps) => (
    <p {...props} style={{
      animation: 'fadeInUp 0.8s ease-out 0.4s both',
      ...props.style
    }}>
      {children}
    </p>
  ),
  nav: ({ children, initial, animate, whileHover, whileTap, transition, ...props }: MotionNavProps) => (
    <nav {...props} style={{ ...props.style }}>{children}</nav>
  ),
  footer: ({ children, initial, animate, whileHover, whileTap, transition, ...props }: MotionFooterProps) => (
    <footer {...props} style={{ ...props.style }}>{children}</footer>
  ),
};

export default function DictionaryAppLanding() {
  const [isDark, setIsDark] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleTheme = () => setIsDark(!isDark);

  const features = [
    {
      icon: Search,
      title: "Smart Search",
      description: "Type or speak any word for instant definitions and synonyms",
      gradient: "from-blue-500 to-cyan-500",
      delay: "0.6s"
    },
    {
      icon: Camera,
      title: "Text Scanner",
      description: "Scan printed text and tap words to define with ML Kit OCR",
      gradient: "from-purple-500 to-pink-500",
      delay: "0.8s"
    },
    {
      icon: Mic,
      title: "Voice Input",
      description: "Speak words for hands-free lookup with speech recognition",
      gradient: "from-emerald-500 to-teal-500",
      delay: "1s"
    }
  ];

  return (
    <div className={`h-screen relative overflow-hidden transition-all duration-700 flex flex-col ${
      isDark 
         ? 'bg-slate-900 text-white' 
         : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900'
    }`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className={`absolute w-96 h-96 rounded-full opacity-10 ${
            isDark ? 'bg-purple-500' : 'bg-indigo-500'
          }`}
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            left: '10%',
            top: '20%',
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div 
          className={`absolute w-64 h-64 rounded-full opacity-10 ${
            isDark ? 'bg-pink-500' : 'bg-purple-500'
          }`}
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
            right: '10%',
            bottom: '20%',
            transition: 'transform 0.3s ease-out'
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full opacity-30 animate-pulse ${
              isDark ? 'bg-white' : 'bg-indigo-400'
            }`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '3s'
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.nav className="relative z-10 flex justify-between items-center p-6 max-w-6xl mx-auto w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div className="flex items-center space-x-2 group cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:rotate-12 ${
            isDark 
              // ? 'bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg shadow-purple-500/25' 
              // : 'bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/25'
              ? `bg-white`
              : "bg-white"
          }`}>
            {/* <Search className="w-5 h-5 text-white" /> */}
            <Image src={Logo} width={28} height={28} alt='Logo' />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          {/* <span className="text-xl font-bold bg-[#8316F0] bg-clip-text text-transparent"> */}
            WordWise
          </span>
        </motion.div>
        
        <motion.button 
          onClick={toggleTheme}
          className={`relative p-3 rounded-2xl transition-all duration-500 group ${
            isDark 
              ? 'bg-slate-800/80 hover:bg-slate-700/80 backdrop-blur-sm border border-slate-700' 
              : 'bg-white/80 hover:bg-white backdrop-blur-sm shadow-lg border border-gray-200'
          }`}
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative">
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-600" />
            )}
          </div>
        </motion.button>
      </motion.nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-2 flex-1 flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 items-center w-full">
          <motion.div className="space-y-6">
            <div className="space-y-4">
              <motion.h1 
                className={`text-4xl lg:text-5xl font-bold leading-tight ${
                  isDark 
                    ? 'bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent' 
                    : 'bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent'
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Smart Dictionary
                <br />
                <span className={`relative ${
                  isDark ? 'text-purple-400' : 'text-indigo-600'
                }`}>
                  & Text Scanner
                  <div className={`absolute -bottom-2 left-0 w-full h-1 rounded-full ${
                    isDark 
                      ? 'bg-gradient-to-r from-purple-400 to-pink-400' 
                      : 'bg-gradient-to-r from-indigo-400 to-purple-400'
                  }`} style={{ animation: 'widthExpand 1.5s ease-out 1s both' }} />
                </span>
              </motion.h1>
              
              <motion.p 
                className={`text-lg leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Look up definitions instantly by typing, speaking, or scanning text with your camera. 
                Perfect for students, readers, and language learners.
              </motion.p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-3 gap-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`group relative p-4 rounded-xl border cursor-pointer overflow-hidden ${
                    isDark 
                      ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-800/80' 
                      : 'bg-white/70 border-gray-200 shadow-sm hover:bg-white/90 hover:shadow-xl'
                  } transition-all duration-500`}
                  style={{ animation: `fadeInUp 0.8s ease-out ${feature.delay} both` }}
                  whileHover={{ y: -4, scale: 1.02 }}
                >
                  {/* Hover gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  <div className="relative z-10 text-center">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 mx-auto transition-all duration-300 group-hover:scale-110 bg-gradient-to-br ${feature.gradient}`}>
                      <feature.icon className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                    <p className={`text-xs leading-tight ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>{feature.description}</p>
                  </div>
                  
                  {/* Animated corner accent */}
                  <div className={`absolute top-0 right-0 w-0 h-0 border-l-[15px] border-l-transparent border-t-[15px] bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 transition-all duration-300`} 
                    style={{ borderTopColor: 'currentColor' }} />
                </motion.div>
              ))}
            </div>

            {/* Download Section */}
            <motion.div className="space-y-4" 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ animationDelay: '1.2s' }}
            >
              <motion.button 
                className={`group relative px-8 py-4 rounded-xl font-semibold transition-all duration-500 overflow-hidden ${
                  isDark
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-xl shadow-purple-500/20'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-xl shadow-indigo-500/20'
                }`}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -12px rgba(139, 92, 246, 0.4)" }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3 relative z-10">
                  <Download className="w-5 h-5 transition-transform duration-300 group-hover:animate-bounce" />
                  <span>Download APK</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
                
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </motion.button>
              
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center space-x-2 group">
                  <Smartphone className={`w-4 h-4 transition-colors duration-300 ${isDark ? 'text-green-400 group-hover:text-green-300' : 'text-green-600 group-hover:text-green-700'}`} />
                  <span className={`transition-colors duration-300 ${isDark ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-700'}`}>
                    Android Compatible
                  </span>
                </div>
                <div className="flex items-center space-x-2 group">
                  <Zap className={`w-4 h-4 transition-colors duration-300 ${isDark ? 'text-yellow-400 group-hover:text-yellow-300' : 'text-yellow-600 group-hover:text-yellow-700'}`} />
                  <span className={`transition-colors duration-300 ${isDark ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-700'}`}>
                    Fast & Offline OCR
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Phone Mockup */}
          <motion.div 
            className="flex justify-center lg:justify-end relative"
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.div 
              className={`relative w-64 h-[480px] rounded-[2.5rem] border-6 shadow-xl transition-all duration-500 ${
                isDark 
                  ? 'border-slate-700 bg-slate-900 shadow-purple-500/10' 
                  : 'border-gray-300 bg-white shadow-indigo-500/10'
              }`}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5, 
                rotateX: 5,
                boxShadow: isDark 
                  ? "0 35px 80px -15px rgba(139, 92, 246, 0.3)" 
                  : "0 35px 80px -15px rgba(99, 102, 241, 0.3)"
              }}
              style={{
                transformStyle: 'preserve-3d',
                perspective: 1000
              }}
            >
              {/* Phone notch */}
              <div className={`absolute top-6 left-1/2 transform -translate-x-1/2 w-20 h-1.5 rounded-full ${
                isDark ? 'bg-slate-600' : 'bg-gray-400'
              }`} />
              
              <div className="p-4 pt-12 h-full relative">
                {/* Mock App Interface with animations */}
                <motion.div 
                  className={`rounded-xl p-4 mb-4 border group cursor-pointer ${
                    isDark 
                      ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' 
                      : 'bg-gray-50 border-gray-200 hover:bg-white'
                  } transition-all duration-300`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-500`}>
                      <Search className="w-3 h-3 text-white" />
                    </div>
                    <span className="font-medium text-sm">Search Word</span>
                  </div>
                  <div className={`h-8 rounded-lg border-2 border-dashed transition-colors duration-300 ${
                    isDark ? 'border-slate-600 group-hover:border-purple-500' : 'border-gray-300 group-hover:border-indigo-400'
                  } flex items-center justify-center`}>
                    <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>
                      Type or speak...
                    </span>
                  </div>
                </motion.div>
                
                <motion.div 
                  className={`rounded-xl p-4 border group cursor-pointer ${
                    isDark 
                      ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' 
                      : 'bg-gray-50 border-gray-200 hover:bg-white'
                  } transition-all duration-300`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
                      <Camera className="w-3 h-3 text-white" />
                    </div>
                    <span className="font-medium text-sm">Text Scanner</span>
                  </div>
                  <div className={`h-24 rounded-lg border-2 border-dashed flex items-center justify-center transition-all duration-300 ${
                    isDark ? 'border-slate-600 group-hover:border-purple-500' : 'border-gray-300 group-hover:border-indigo-400'
                  }`}>
                    <div className="text-center">
                      <Play className={`w-6 h-6 mx-auto mb-1 ${isDark ? 'text-slate-500' : 'text-gray-500'}`} />
                      <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>
                        Tap to scan
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Floating elements around phone */}
              <motion.div 
                className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
                animate={{ y: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <Zap className="w-4 h-4 text-white" />
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center"
                animate={{ x: [-8, 8, -8] }}
                transition={{ repeat: Infinity, duration: 4, delay: 1 }}
              >
                <Mic className="w-4 h-4 text-white" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer 
        className={`relative z-10 border-t py-4 ${
          isDark ? 'border-slate-800' : 'border-gray-200'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Built with React Native • Powered by Merriam-Webster API & ML Kit OCR
          </p>
        </div>
      </motion.footer>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { transform: translateY(100px); }
          to { transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes widthExpand {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes floatY {
          0% { transform: translateY(-5px);}
          50% { transform: translateY(5px);}
          100% { transform: translateY(-5px);}
}
        @keyframes floatX {
          0% { transform: translateX(-5px);}
          50% { transform: translateX(5px);}
          100% { transform: translateX(-5px);}
}
      `}</style>
    </div>
  );
}