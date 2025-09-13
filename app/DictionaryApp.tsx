"use client";
import { useState, useEffect } from "react";
import {
  Search,
  Camera,
  Mic,
  Download,
  Moon,
  Sun,
  Smartphone,
  Zap,
  Eye,
  Star,
  ArrowRight,
  Play,
} from "lucide-react";
// Mock framer-motion with CSS animations for this environment
import {
  ReactNode,
  CSSProperties,
  ButtonHTMLAttributes,
  HTMLAttributes,
} from "react";
import Logo from "./logo.png";
import Image from "next/image";

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
  div: ({
    children,
    initial,
    animate,
    whileHover,
    whileTap,
    transition,
    ...props
  }: MotionDivProps) => {
    let animation = "none";
    if (animate?.opacity === 1) animation = "fadeInUp 0.8s ease-out";
    else if (animate?.y === 0) animation = "slideUp 0.6s ease-out";
    else if (animate?.scale === 1) animation = "scaleIn 0.5s ease-out";
    // Add support for floating
    else if (Array.isArray(animate?.y))
      animation = `floatY ${transition?.duration || 3}s ease-in-out ${
        transition?.repeat ? "infinite" : ""
      }`;
    else if (Array.isArray(animate?.x))
      animation = `floatX ${transition?.duration || 4}s ease-in-out ${
        transition?.repeat ? "infinite" : ""
      }`;
    return (
      <div
        {...props}
        style={{
          animation,
          animationDelay: transition?.delay
            ? `${transition.delay}s`
            : undefined,
          ...props.style,
        }}
      >
        {children}
      </div>
    );
  },
  button: ({ children, whileHover, whileTap, ...props }: MotionButtonProps) => (
    <button
      {...props}
      className={`${
        props.className || ""
      } transform transition-all duration-300 hover:scale-105 active:scale-95`}
    >
      {children}
    </button>
  ),
  h1: ({ children, initial, animate, ...props }: MotionHeaderProps) => (
    <h1
      {...props}
      style={{
        animation: "fadeInUp 1s ease-out 0.2s both",
        ...props.style,
      }}
    >
      {children}
    </h1>
  ),
  p: ({ children, initial, animate, ...props }: MotionParagraphProps) => (
    <p
      {...props}
      style={{
        animation: "fadeInUp 0.8s ease-out 0.4s both",
        ...props.style,
      }}
    >
      {children}
    </p>
  ),
  nav: ({
    children,
    initial,
    animate,
    whileHover,
    whileTap,
    transition,
    ...props
  }: MotionNavProps) => (
    <nav {...props} style={{ ...props.style }}>
      {children}
    </nav>
  ),
  footer: ({
    children,
    initial,
    animate,
    whileHover,
    whileTap,
    transition,
    ...props
  }: MotionFooterProps) => (
    <footer {...props} style={{ ...props.style }}>
      {children}
    </footer>
  ),
};

export default function DictionaryAppLanding() {
  const [isDark, setIsDark] = useState(true);
  const [copied, setCopied] = useState("");
  type ChecksumsState = { rawText: string } | { error: string } | null;
  const [checksums, setChecksums] = useState<ChecksumsState>(null);
  const [loading, setLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const toggleTheme = () => setIsDark(!isDark);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href =
      "https://github.com/Sanesomehow/wordwise-landing-page/releases/download/v1.0.0/WordWise-v1.0.apk";
    link.download = "WordWise-Dictionary.apk";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchChecksums = async () => {
    setLoading(true);
    try {
      const response = await fetch("/clipboard-checksum.txt");
      const text = await response.text();
      setChecksums({ rawText: text.trim() });
    } catch (error) {
      console.error("Error fetching checksums:", error);
      setChecksums({ error: "Failed to load checksums" });
    }
    setLoading(false);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type);
      setTimeout(() => setCopied(""), 2000);
    });
  };

  const features = [
    {
      icon: Search,
      title: "Smart Search",
      description: "Type any word for instant definitions.",
      gradient: "from-blue-500 to-cyan-500",
      delay: "0.6s",
    },
    {
      icon: Camera,
      title: "Text Scanner",
      description: "Scan text and tap words to find their meaning",
      gradient: "from-purple-500 to-pink-500",
      delay: "0.8s",
    },
    {
      icon: Mic,
      title: "Voice Input",
      description: "Speak words for hands-free lookup",
      gradient: "from-emerald-500 to-teal-500",
      delay: "1s",
    },
  ];

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-all duration-700 flex flex-col ${
        isDark
          ? "bg-slate-900 text-white"
          : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900"
      }`}
    >
      {/* Animated background elements - Responsive positioning */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute w-48 h-48 md:w-96 md:h-96 rounded-full opacity-10 ${
            isDark ? "bg-purple-500" : "bg-indigo-500"
          }`}
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${
              mousePosition.y * 0.02
            }px)`,
            left: "5%",
            top: "10%",
            transition: "transform 0.3s ease-out",
          }}
        />
        <div
          className={`absolute w-32 h-32 md:w-64 md:h-64 rounded-full opacity-10 ${
            isDark ? "bg-pink-500" : "bg-purple-500"
          }`}
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${
              mousePosition.y * -0.01
            }px)`,
            right: "5%",
            bottom: "10%",
            transition: "transform 0.3s ease-out",
          }}
        />
      </div>

      {/* Floating particles - Hidden on small screens for performance */}
      <div className="absolute inset-0 hidden md:block">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full opacity-30 animate-pulse ${
              isDark ? "bg-white" : "bg-indigo-400"
            }`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>

      {/* Header - Mobile optimized */}
      <motion.nav
        className="relative z-10 flex justify-between items-center p-4 md:p-6 max-w-6xl mx-auto w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="flex items-center space-x-2 group cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          <div
            className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:rotate-12 bg-white`}
          >
            {/* <Search className="w-4 h-4 md:w-5 md:h-5 text-purple-600" /> */}
            <Image width={28} height={28} alt="Logo" src={Logo} />
          </div>
          <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            WordWise
          </span>
        </motion.div>

        <motion.button
          onClick={toggleTheme}
          className={`relative p-2 md:p-3 rounded-2xl transition-all duration-500 group ${
            isDark
              ? "bg-slate-800/80 hover:bg-slate-700/80 backdrop-blur-sm border border-slate-700"
              : "bg-white/80 hover:bg-white backdrop-blur-sm shadow-lg border border-gray-200"
          }`}
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative">
            {isDark ? (
              <Sun className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
            ) : (
              <Moon className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" />
            )}
          </div>
        </motion.button>
      </motion.nav>

      {/* Hero Section - Mobile-first responsive design */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-4 md:py-6 flex-1 flex items-center">
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6 lg:gap-12 items-start lg:items-center w-full">
          <motion.div className="space-y-6 text-center lg:text-left">
            <div className="space-y-2">
              <motion.h1
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-none ${
                  isDark
                    ? "bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent"
                    : "bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent"
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Smart Dictionary
                <br />
                <span
                  className={`relative ${
                    isDark ? "text-purple-400" : "text-indigo-600"
                  } text-lg md:text-xl lg:text-2xl font-semibold`}
                >
                  & Text Scanner
                  <div
                    className={`absolute -bottom-1 md:-bottom-2 left-0 w-full h-0.5 md:h-1 rounded-full ${
                      isDark
                        ? "bg-gradient-to-r from-purple-400 to-pink-400"
                        : "bg-gradient-to-r from-indigo-400 to-purple-400"
                    }`}
                    style={{ animation: "widthExpand 1.5s ease-out 1s both" }}
                  />
                </span>
              </motion.h1>

              <motion.p
                className={`text-xs md:text-lg leading-relaxed pt-2 md:pt-5 ${
                  isDark ? "text-gray-300" : "text-gray-600"
                } px-2 lg:px-0`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Look up definitions instantly by typing, speaking, or scanning
                text with your camera. Perfect for students, readers, and
                language learners.
              </motion.p>
            </div>

            {/* Features Grid - Mobile responsive */}
            <div className="flex flex-row gap-2 sm:grid sm:grid-cols-3 sm:gap-3 md:gap-4 max-w-lg mx-auto lg:max-w-none">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`group relative min-w-[120px] sm:min-w-0 p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg ${
                    isDark
                      ? "bg-slate-800/50 border-slate-700 hover:bg-slate-800/80 hover:border-slate-600"
                      : "bg-white/70 border-gray-200 shadow-sm hover:bg-white hover:shadow-xl hover:border-gray-300"
                  }`}
                  style={{
                    animation: `fadeInUp 0.8s ease-out ${feature.delay} both`,
                  }}
                  // Remove whileHover prop
                >
                  {/* Hover gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  <div className="relative z-10 text-center">
                    <div
                      className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-md sm:rounded-lg flex items-center justify-center mb-1 sm:mb-2 mx-auto transition-all duration-300 group-hover:scale-110 bg-gradient-to-br ${feature.gradient}`}
                    >
                      <feature.icon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-xs sm:text-sm md:text-base mb-1">
                      {feature.title}
                    </h3>
                    {/* Hide description on mobile, show on sm+ */}
                    <p
                      className={`hidden sm:block text-xs md:text-sm leading-tight ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {feature.description}
                    </p>
                  </div>

                  {/* Animated corner accent */}
                  <div
                    className={`absolute top-0 right-0 w-0 h-0 border-l-[10px] sm:border-l-[15px] border-l-transparent border-t-[10px] sm:border-t-[15px] bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 transition-all duration-300`}
                    style={{ borderTopColor: "currentColor" }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Download Section - Mobile optimized */}
            <motion.div
              className="space-y-4 flex flex-col items-center lg:items-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ animationDelay: "1.2s" }}
            >
              {/* Download and Checksum buttons - Side by side on mobile, stacked on desktop */}
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto items-center sm:items-start">
                <motion.button
                  onClick={handleDownload}
                  className={`group relative px-6 md:px-8 py-2 md:py-3 rounded-xl font-semibold transition-all duration-500 overflow-hidden flex-1 sm:flex-initial ${
                    isDark
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-xl shadow-purple-500/20"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-xl shadow-indigo-500/20"
                  }`}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px -12px rgba(139, 92, 246, 0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-center space-x-3 relative z-10">
                    <Download className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:animate-bounce" />
                    <span className="text-sm md:text-base">Download APK</span>
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </motion.button>

                {/* Checksum buttons - View and Download */}
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <motion.button
                      onClick={fetchChecksums}
                      disabled={loading}
                      className={`group relative px-3 md:px-4 py-2 md:py-3 rounded-md font-mono text-xs md:text-sm transition-all duration-300 border ${
                        isDark
                          ? "border-green-500/30 bg-black/40 text-green-400 hover:bg-black/60 hover:border-green-400"
                          : "border-gray-600/30 bg-gray-900/90 text-green-500 hover:bg-gray-900 hover:border-gray-500"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500">$</span>
                        <span>{loading ? "loading..." : "verify --hash"}</span>
                      </div>
                    </motion.button>

                    <a
                      href="/checksum.txt"
                      download="wordwise-checksum.txt"
                      className={`group relative px-3 md:px-4 py-2 md:py-3 rounded-md font-mono text-xs md:text-sm transition-all duration-300 border inline-block no-underline ${
                        isDark
                          ? "border-blue-500/30 bg-black/40 text-blue-400 hover:bg-black/60 hover:border-blue-400"
                          : "border-blue-600/30 bg-gray-900/90 text-blue-500 hover:bg-gray-900 hover:border-blue-500"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500">$</span>
                        <span>curl -O checksum.txt</span>
                      </div>
                    </a>
                  </div>

                  {/* Small dev note */}
                  <div
                    className={`text-xs font-mono ${
                      isDark ? "text-gray-500" : "text-gray-600"
                    }`}
                  >
                    <span className="text-gray-400"># </span>for developers &
                    security-conscious users
                  </div>
                </div>
              </div>

              {/* Checksum display when loaded */}
              {checksums && (
                <motion.div
                  className={`w-full p-4 rounded-md border font-mono ${
                    isDark
                      ? "bg-black/60 border-green-500/30 text-green-400"
                      : "bg-gray-900/95 border-gray-600/30 text-green-500"
                  }`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  {"error" in checksums ? (
                    <div className="text-red-400">
                      <span className="text-gray-500">$ </span>
                      <span>error: {checksums.error}</span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-500">$ </span>
                          <span className="text-xs md:text-sm">
                            sha256sum wordwise.apk
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            copyToClipboard(checksums.rawText, "checksum")
                          }
                          className={`px-2 py-1 rounded text-xs transition-colors ${
                            isDark
                              ? "hover:bg-gray-800 text-gray-400 hover:text-green-400"
                              : "hover:bg-gray-800 text-gray-400 hover:text-green-500"
                          }`}
                          title="Copy to clipboard"
                        >
                          {copied === "checksum" ? "[copied]" : "[copy]"}
                        </button>
                      </div>

                      <div
                        className={`text-xs break-all p-2 rounded border-l-2 ${
                          isDark
                            ? "bg-black/40 border-green-500/50"
                            : "bg-gray-800 border-green-500/50"
                        }`}
                      >
                        {checksums.rawText}
                      </div>

                      {/* Terminal-style info */}
                      <div
                        className={`text-xs border-t pt-2 space-y-1 ${
                          isDark
                            ? "border-gray-700 text-gray-500"
                            : "border-gray-600 text-gray-400"
                        }`}
                      >
                        <div>
                          <span className="text-gray-600"># </span>algorithm:
                          SHA256
                        </div>
                        <div>
                          <span className="text-gray-600"># </span>usage:
                          compare with post-download hash
                        </div>
                        <div>
                          <span className="text-gray-600"># </span>command:
                          certutil -hashfile wordwise.apk SHA256
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* App compatibility info */}
              <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 text-xs md:text-sm">
                <div className="flex items-center space-x-2 group">
                  <Smartphone
                    className={`w-3 h-3 md:w-4 md:h-4 transition-colors duration-300 ${
                      isDark
                        ? "text-green-400 group-hover:text-green-300"
                        : "text-green-600 group-hover:text-green-700"
                    }`}
                  />
                  <span
                    className={`transition-colors duration-300 ${
                      isDark
                        ? "text-gray-400 group-hover:text-gray-300"
                        : "text-gray-600 group-hover:text-gray-700"
                    }`}
                  >
                    Android Compatible
                  </span>
                </div>
                <div className="flex items-center space-x-2 group">
                  <Zap
                    className={`w-3 h-3 md:w-4 md:h-4 transition-colors duration-300 ${
                      isDark
                        ? "text-yellow-400 group-hover:text-yellow-300"
                        : "text-yellow-600 group-hover:text-yellow-700"
                    }`}
                  />
                  <span
                    className={`transition-colors duration-300 ${
                      isDark
                        ? "text-gray-400 group-hover:text-gray-300"
                        : "text-gray-600 group-hover:text-gray-700"
                    }`}
                  >
                    Fast & Offline OCR
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Phone Mockup - Mobile responsive */}
          <motion.div
            className="flex justify-center mt-8 lg:mt-0 lg:justify-end relative order-first lg:order-last"
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.div
              className={`relative w-48 h-80 sm:w-56 sm:h-96 md:w-64 md:h-[480px] rounded-[2rem] md:rounded-[2.5rem] border-4 md:border-6 shadow-xl transition-all duration-500 ${
                isDark
                  ? "border-slate-700 bg-slate-900 shadow-purple-500/10"
                  : "border-gray-300 bg-white shadow-indigo-500/10"
              }`}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                rotateX: 5,
                boxShadow: isDark
                  ? "0 35px 80px -15px rgba(139, 92, 246, 0.3)"
                  : "0 35px 80px -15px rgba(99, 102, 241, 0.3)",
              }}
              style={{
                transformStyle: "preserve-3d",
                perspective: 1000,
              }}
            >
              {/* Phone notch */}
              <div
                className={`absolute top-4 md:top-6 left-1/2 transform -translate-x-1/2 w-16 md:w-20 h-1 md:h-1.5 rounded-full z-10 ${
                  isDark ? "bg-slate-600" : "bg-gray-400"
                }`}
              />

              {/* Screen area - video fills entire phone with border consideration */}
              <div className="absolute inset-0 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden p-1 md:p-1.5">
                <div className="w-full h-full rounded-[1.7rem] md:rounded-[2.2rem] overflow-hidden mt-7 md:mt-10">
                  <video
                    src="/Usecase.mp4"
                    controls
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover"
                    style={{
                      background: isDark ? "#18181b" : "#fff",
                    }}
                  />
                </div>
              </div>

              {/* Floating elements around phone */}
              <motion.div
                className="absolute -top-2 md:-top-4 -right-2 md:-right-4 w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full items-center justify-center hidden sm:flex"
                animate={{ y: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <Zap className="w-3 h-3 md:w-4 md:h-4 text-white" />
              </motion.div>

              <motion.div
                className="absolute -bottom-2 md:-bottom-4 -left-2 md:-left-4 w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full items-center justify-center hidden sm:flex"
                animate={{ x: [-8, 8, -8] }}
                transition={{ repeat: Infinity, duration: 4, delay: 1 }}
              >
                <Mic className="w-3 h-3 md:w-4 md:h-4 text-white" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer - Mobile optimized */}
      <motion.footer
        className={`relative z-10 border-t py-3 md:py-4 ${
          isDark ? "border-slate-800" : "border-gray-200"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <p
            className={`text-xs md:text-sm ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Built with React Native • Powered by Merriam-Webster API & ML Kit
            OCR
          </p>
        </div>
      </motion.footer>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from {
            transform: translateY(100px);
          }
          to {
            transform: translateY(0);
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes widthExpand {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        @keyframes floatY {
          0% {
            transform: translateY(-5px);
          }
          50% {
            transform: translateY(5px);
          }
          100% {
            transform: translateY(-5px);
          }
        }
        @keyframes floatX {
          0% {
            transform: translateX(-5px);
          }
          50% {
            transform: translateX(5px);
          }
          100% {
            transform: translateX(-5px);
          }
        }
      `}</style>
    </div>
  );
}
