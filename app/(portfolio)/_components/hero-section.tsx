"use client";

import { Github, Mail, Code2, Sparkles, Zap, TrendingUp } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import ParticlesComponent from "@/lib/particle";

const GITHUB_URL = "https://github.com/HoeunPichet";
const EMAIL_PLACEHOLDER = "mailto:hoeunpichet@gmail.com";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
    visible: {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
            delay: 0.5,
        },
    },
};

// Typewriter component for code animation
function TypewriterCode({ codeLines, delay = 0 }: { codeLines: string[], delay?: number }) {
    const [displayedText, setDisplayedText] = useState<string[]>([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTyping(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [delay]);

    useEffect(() => {
        if (!isTyping || currentLineIndex >= codeLines.length) {
            return;
        }

        const currentLine = codeLines[currentLineIndex];

        if (currentCharIndex < currentLine.length) {
            const timer = setTimeout(() => {
                const char = currentLine[currentCharIndex];
                setDisplayedText(prev => {
                    const newLines = [...prev];
                    if (!newLines[currentLineIndex]) {
                        newLines[currentLineIndex] = "";
                    }
                    newLines[currentLineIndex] += char;
                    return newLines;
                });
                setCurrentCharIndex(prev => prev + 1);
            }, 50 + Math.random() * 30); // Variable typing speed for realism

            return () => clearTimeout(timer);
        } else {
            // Move to next line
            const timer = setTimeout(() => {
                setCurrentLineIndex(prev => prev + 1);
                setCurrentCharIndex(0);
            }, 200); // Pause between lines

            return () => clearTimeout(timer);
        }
    }, [isTyping, currentLineIndex, currentCharIndex, codeLines]);

    // Reset animation after completion
    useEffect(() => {
        if (currentLineIndex >= codeLines.length) {
            const resetTimer = setTimeout(() => {
                setDisplayedText([]);
                setCurrentLineIndex(0);
                setCurrentCharIndex(0);
                setIsTyping(false);
                setTimeout(() => setIsTyping(true), 1000);
            }, 3000); // Wait 3 seconds before restarting

            return () => clearTimeout(resetTimer);
        }
    }, [currentLineIndex, codeLines.length]);

    const getSyntaxColor = (text: string, charIndex: number) => {
        const beforeChar = text.substring(0, charIndex);

        // Check if we're in a keyword
        if (beforeChar.match(/\bconst\b$/)) return "text-blue-400 dark:text-blue-300";
        if (beforeChar.match(/\b(developer|name|role|skills)\b$/)) return "text-purple-400 dark:text-purple-300";
        if (beforeChar.match(/"[^"]*$/)) return "text-emerald-400 dark:text-emerald-300";
        if (beforeChar.match(/[{}\[\]]$/)) return "text-emerald-400 dark:text-emerald-300";
        if (text[charIndex] === ":" || text[charIndex] === "=" || text[charIndex] === "," || text[charIndex] === ";") return "text-foreground/60";

        return "text-foreground";
    };

    const getIndent = (lineIdx: number, line: string) => {
        // Count leading spaces in the original line
        const leadingSpaces = line.match(/^(\s*)/)?.[1]?.length || 0;
        return leadingSpaces;
    };

    return (
        <div className="flex-1 space-y-0.5">
            {codeLines.map((line, lineIdx) => {
                const displayedLine = displayedText[lineIdx] || "";
                const isCurrentLine = lineIdx === currentLineIndex;
                const isComplete = displayedLine.length === line.length;
                const showCursor = isCurrentLine && isTyping && !isComplete;
                const indent = getIndent(lineIdx, line);

                return (
                    <div
                        key={lineIdx}
                        className="h-5 sm:h-6 flex items-center"
                        style={{ paddingLeft: `${indent * 0.25}rem` }}
                    >
                        {displayedLine.split("").map((char, charIdx) => {
                            const colorClass = getSyntaxColor(line, charIdx);
                            return (
                                <span key={charIdx} className={colorClass}>
                                    {char === " " ? "\u00A0" : char}
                                </span>
                            );
                        })}
                        {showCursor && (
                            <motion.span
                                className="inline-block w-0.5 h-4 sm:h-5 bg-primary-500 ml-0.5"
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default function HeroSection() {
    const developerCode = useMemo(() => [
        "const developer = {",
        "  name: \"Hoeun Pichet\",",
        "  role: \"Full Stack Developer\",",
        "  skills: [",
        "    \"React\",",
        "    \"Next.js\",",
        "    \"TypeScript\",",
        "    \"Java\",",
        "    \"Spring Boot\"",
        "  ]",
        "};"
    ], []);

    return (
        <section
            id="about"
            className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-background to-primary-50/20 dark:to-primary-950/20 overflow-hidden"
        >
            {/* Scroll Indicator - Gen Z Style */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
            >
                <motion.div
                    className="text-xs text-foreground/60 font-semibold uppercase tracking-wider"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    Scroll
                </motion.div>
                <motion.div
                    className="flex flex-col items-center gap-1"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="w-5 h-8 rounded-full border-2 border-primary-500/50 flex items-start justify-center p-1.5">
                        <motion.div
                            className="w-1.5 h-1.5 rounded-full bg-primary-500"
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                </motion.div>
            </motion.div>
            {/* Particles Background */}
            <div className="absolute inset-0 z-0">
                <ParticlesComponent
                    id="hero-particles"
                    number={80}
                    opacity={0.3}
                    linkDistance={150}
                    particleSize={{ min: 3, max: 7 }}
                    speed={2}
                />
            </div>

            <div className="container mx-auto max-w-5xl relative z-10">
                <motion.div
                    className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Left Column - Text Content */}
                    <motion.div
                        className="space-y-4 sm:space-y-5 md:space-y-6 text-center md:text-left"
                        variants={itemVariants}
                    >
                        <motion.div
                            className="inline-block"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 15 }}
                            whileHover={{ scale: 1.05, rotate: 5 }}
                        >
                            <span className="cursor-target px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-primary-500/20 via-primary-400/20 to-primary-600/20 border border-primary-500/30 text-primary-600 dark:text-primary-400 text-xs sm:text-sm font-semibold backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200 inline-flex items-center gap-2">
                                <motion.span
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="text-base"
                                >
                                    ⚡
                                </motion.span>
                                Full Stack Developer
                            </span>
                        </motion.div>

                        <motion.h1
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
                            variants={itemVariants}
                        >
                            <motion.span
                                className="text-foreground inline-block"
                                animate={{
                                    scale: [1, 1.05, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                Hey! I&apos;m{" "}
                            </motion.span>
                            <br />
                            <motion.span
                                className="cursor-target bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent inline-block"
                                whileHover={{ scale: 1.05 }}
                                animate={{
                                    backgroundPosition: ["0%", "100%", "0%"],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                style={{
                                    backgroundSize: "200% auto",
                                }}
                            >
                                Hoeun Pichet
                            </motion.span>
                            <motion.span
                                className="inline-block ml-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                                animate={{
                                    rotate: [0, 14, -8, 14, -4, 10, 0],
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.8,
                                    repeat: Infinity,
                                    repeatDelay: 3
                                }}
                            >
                                👋
                            </motion.span>
                        </motion.h1>

                        <motion.p
                            className="text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed max-w-xl mx-auto md:mx-0 px-2 sm:px-0 font-medium"
                            variants={itemVariants}
                        >
                            Building{" "}
                            <motion.span
                                className="text-primary-500 font-semibold inline-block"
                                whileHover={{ scale: 1.1 }}
                            >
                                dope web apps
                            </motion.span>
                            {" "}with React, Next.js & Java.{" "}
                            <motion.span
                                className="text-primary-500 font-semibold inline-block"
                                whileHover={{ scale: 1.1 }}
                            >
                                Full-stack dev
                            </motion.span>
                            {" "}who loves clean code & modern tech. 🚀
                        </motion.p>

                        <motion.div
                            className="flex flex-wrap gap-3 sm:gap-4 justify-center md:justify-start"
                            variants={itemVariants}
                        >
                            <motion.a
                                href={GITHUB_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.08, y: -4, rotate: 2 }}
                                whileTap={{ scale: 0.92 }}
                                className="cursor-target group relative inline-flex items-center space-x-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white text-sm sm:text-base font-bold transition-all shadow-xl hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 overflow-hidden"
                                aria-label="Visit GitHub profile (opens in new tab)"
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                                    animate={{
                                        x: ["-100%", "100%"],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                />
                                <Github className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 group-hover:rotate-12 transition-transform" aria-hidden="true" />
                                <span className="relative z-10">Check My GitHub</span>
                                <motion.span
                                    className="relative z-10"
                                    animate={{ x: [0, 4, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    →
                                </motion.span>
                            </motion.a>
                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.08, y: -4, rotate: -2 }}
                                whileTap={{ scale: 0.92 }}
                                className="cursor-target group relative inline-flex items-center space-x-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl border-2 border-primary-500 bg-white/50 dark:bg-card/50 backdrop-blur-sm text-primary-500 hover:bg-primary-500 hover:text-white hover:border-primary-600 text-sm sm:text-base font-bold transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                                aria-label="Navigate to contact section"
                            >
                                <Mail className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" aria-hidden="true" />
                                <span>Let&apos;s Connect</span>
                                <motion.span
                                    animate={{ rotate: [0, 20, -20, 0] }}
                                    transition={{ duration: 1, repeat: Infinity, delay: 1 }}
                                    className="text-lg"
                                >
                                    💬
                                </motion.span>
                            </motion.a>
                        </motion.div>

                        {/* Social Links with Stats */}
                        <motion.div
                            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center md:justify-start pt-4 sm:pt-6"
                            variants={itemVariants}
                            role="list"
                            aria-label="Social links"
                        >
                            <div className="flex items-center space-x-3 sm:space-x-4">
                                <motion.a
                                    href={GITHUB_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.15, rotate: [0, -10, 10, -10, 0], y: -3 }}
                                    whileTap={{ scale: 0.85 }}
                                    className="cursor-target group relative p-3 sm:p-3.5 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 hover:from-primary-500/30 hover:to-primary-600/30 border border-primary-500/30 text-primary-600 dark:text-primary-400 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-lg hover:shadow-xl backdrop-blur-sm"
                                    aria-label="Visit GitHub profile (opens in new tab)"
                                    role="listitem"
                                >
                                    <Github className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
                                    <motion.div
                                        className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                </motion.a>
                                <motion.a
                                    href={EMAIL_PLACEHOLDER}
                                    whileHover={{ scale: 1.15, rotate: [0, 10, -10, 10, 0], y: -3 }}
                                    whileTap={{ scale: 0.85 }}
                                    className="cursor-target group relative p-3 sm:p-3.5 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 hover:from-primary-500/30 hover:to-primary-600/30 border border-primary-500/30 text-primary-600 dark:text-primary-400 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-lg hover:shadow-xl backdrop-blur-sm"
                                    aria-label="Send email"
                                    role="listitem"
                                >
                                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
                                </motion.a>
                            </div>

                            {/* Quick Stats */}
                            <motion.div
                                className="cursor-target flex items-center gap-4 sm:gap-6 px-4 py-2 rounded-xl bg-gradient-to-r from-primary-500/10 to-primary-600/10 border border-primary-500/20 backdrop-blur-sm"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8 }}
                            >
                                <div className="text-center">
                                    <div className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
                                        100%
                                    </div>
                                    <div className="text-xs text-foreground/60 font-medium">Passionate</div>
                                </div>
                                <div className="w-px h-8 bg-primary-500/30" />
                                <div className="text-center">
                                    <div className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
                                        24/7
                                    </div>
                                    <div className="text-xs text-foreground/60 font-medium">Learning</div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Visual Element */}
                    <motion.div
                        className="relative mt-8 md:mt-0"
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="relative w-full max-w-sm sm:max-w-md mx-auto">
                            {/* Animated Background Circle */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-full blur-3xl"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.5, 0.3],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />

                            {/* Floating Tech Badges Around Card */}
                            {[
                                { icon: Code2, label: "Code", position: "top-left", delay: 0.2, color: "from-blue-500 to-cyan-500" },
                                { icon: Sparkles, label: "Creative", position: "top-right", delay: 0.4, color: "from-purple-500 to-pink-500" },
                                { icon: Zap, label: "Fast", position: "bottom-left", delay: 0.6, color: "from-yellow-500 to-orange-500" },
                                { icon: TrendingUp, label: "Growing", position: "bottom-right", delay: 0.8, color: "from-green-500 to-emerald-500" },
                            ].map((badge) => {
                                const Icon = badge.icon;
                                const positionClasses = {
                                    "top-left": "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
                                    "top-right": "top-0 right-0 translate-x-1/2 -translate-y-1/2",
                                    "bottom-left": "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
                                    "bottom-right": "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
                                };

                                return (
                                    <motion.div
                                        key={badge.label}
                                        className={`absolute ${positionClasses[badge.position as keyof typeof positionClasses]} z-20 hidden md:block`}
                                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                            rotate: 0,
                                            y: [0, -10, 0],
                                        }}
                                        transition={{
                                            opacity: { delay: badge.delay, duration: 0.5 },
                                            scale: { delay: badge.delay, duration: 0.5, type: "spring" },
                                            rotate: { delay: badge.delay, duration: 0.8, type: "spring" },
                                            y: {
                                                duration: 3,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                                delay: badge.delay,
                                            },
                                        }}
                                        whileHover={{ scale: 1.2, rotate: 360 }}
                                    >
                                        <div className={`relative px-3 py-2 rounded-lg bg-gradient-to-br ${badge.color} shadow-lg backdrop-blur-sm border border-white/20`}>
                                            <div className="flex items-center gap-2">
                                                <Icon className="w-4 h-4 text-white" />
                                                <span className="text-xs font-semibold text-white whitespace-nowrap">{badge.label}</span>
                                            </div>
                                            {/* Glow effect */}
                                            <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${badge.color} opacity-50 blur-md -z-10`} />
                                        </div>
                                    </motion.div>
                                );
                            })}

                            {/* Animated Gradient Orbs */}
                            {[
                                { size: 120, x: -60, y: -40, delay: 0, color: "from-blue-500/30 to-cyan-500/20" },
                                { size: 80, x: 80, y: 60, delay: 0.3, color: "from-purple-500/30 to-pink-500/20" },
                                { size: 100, x: -40, y: 100, delay: 0.6, color: "from-green-500/30 to-emerald-500/20" },
                            ].map((orb, index) => (
                                <motion.div
                                    key={index}
                                    className={`absolute rounded-full bg-gradient-to-br ${orb.color} blur-2xl -z-10`}
                                    style={{
                                        width: orb.size,
                                        height: orb.size,
                                        left: `calc(50% + ${orb.x}px)`,
                                        top: `calc(50% + ${orb.y}px)`,
                                    }}
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.3, 0.6, 0.3],
                                        x: [0, 20, 0],
                                        y: [0, -20, 0],
                                    }}
                                    transition={{
                                        duration: 4 + index,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: orb.delay,
                                    }}
                                />
                            ))}

                            {/* Floating Tech Stack Pills */}
                            {[
                                { text: "React", x: -100, y: 20, delay: 1 },
                                { text: "Next.js", x: 120, y: -30, delay: 1.2 },
                                { text: "TypeScript", x: -80, y: 180, delay: 1.4 },
                                { text: "Java", x: 100, y: 200, delay: 1.6 },
                            ].map((pill, index) => (
                                <motion.div
                                    key={index}
                                    className="absolute z-10 hidden lg:block"
                                    style={{
                                        left: `calc(50% + ${pill.x}px)`,
                                        top: `calc(50% + ${pill.y}px)`,
                                    }}
                                    initial={{ opacity: 0, y: 20, scale: 0 }}
                                    animate={{
                                        opacity: [0, 1, 1, 0],
                                        y: [20, 0, -10, -20],
                                        scale: [0, 1, 1.1, 0.9],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: pill.delay,
                                    }}
                                >
                                    <div className="px-3 py-1.5 rounded-full bg-white/80 dark:bg-card/80 backdrop-blur-md border border-primary-500/30 shadow-lg">
                                        <span className="text-xs font-medium text-foreground bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
                                            {pill.text}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Connecting Lines/Grid Pattern */}
                            <div className="absolute inset-0 -z-10 opacity-20">
                                <svg className="w-full h-full" viewBox="0 0 400 450" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.5" />
                                            <stop offset="50%" stopColor="rgb(168, 85, 247)" stopOpacity="0.3" />
                                            <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="0.5" />
                                        </linearGradient>
                                    </defs>
                                    <motion.line
                                        x1="50"
                                        y1="50"
                                        x2="350"
                                        y2="400"
                                        stroke="url(#lineGradient)"
                                        strokeWidth="2"
                                        strokeDasharray="5 5"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 0.3 }}
                                        transition={{ duration: 2, delay: 1, repeat: Infinity, repeatType: "reverse" }}
                                    />
                                    <motion.line
                                        x1="350"
                                        y1="50"
                                        x2="50"
                                        y2="400"
                                        stroke="url(#lineGradient)"
                                        strokeWidth="2"
                                        strokeDasharray="5 5"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 0.3 }}
                                        transition={{ duration: 2, delay: 1.5, repeat: Infinity, repeatType: "reverse" }}
                                    />
                                </svg>
                            </div>

                            {/* Corner Accent Dots */}
                            {[
                                { position: "top-left", x: -20, y: -20 },
                                { position: "top-right", x: 20, y: -20 },
                                { position: "bottom-left", x: -20, y: 20 },
                                { position: "bottom-right", x: 20, y: 20 },
                            ].map((corner, index) => (
                                <motion.div
                                    key={corner.position}
                                    className="absolute z-10"
                                    style={{
                                        [corner.position.includes("left") ? "left" : "right"]: corner.x,
                                        [corner.position.includes("top") ? "top" : "bottom"]: corner.y,
                                    }}
                                    animate={{
                                        scale: [1, 1.5, 1],
                                        opacity: [0.5, 1, 0.5],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: index * 0.2,
                                    }}
                                >
                                    <div className="w-2 h-2 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 shadow-lg" />
                                </motion.div>
                            ))}

                            {/* 3D Flip Card Container */}
                            <div className="relative w-full h-[400px] sm:h-[450px] perspective-1000">
                                <motion.div
                                    className="cursor-target relative w-full h-full preserve-3d transition-transform duration-500"
                                    whileHover={{ rotateY: 180, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    animate={{
                                        y: [0, -8, 0],
                                    }}
                                    transition={{
                                        y: {
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }
                                    }}
                                    style={{ transformStyle: "preserve-3d" }}
                                >
                                    {/* Face 1 - Front (Code Editor Style) */}
                                    <motion.div
                                        className="absolute inset-0 w-full h-full backface-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-card/95 via-card/90 to-card/95 dark:from-card dark:via-card/95 dark:to-card border border-border/50 shadow-2xl backdrop-blur-sm overflow-hidden"
                                        style={{ transform: "rotateY(0deg)" }}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.5, duration: 0.6 }}
                                    >
                                        <div className="w-full h-full flex flex-col">
                                            {/* Window Control Dots */}
                                            <div className="flex items-center space-x-2 p-4 border-b border-border/50 bg-gradient-to-r from-background/50 to-background/30">
                                                <motion.div
                                                    className="w-3 h-3 rounded-full bg-red-500 cursor-pointer"
                                                    animate={{ scale: [1, 1.3, 1] }}
                                                    transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                                                    whileHover={{ scale: 1.4 }}
                                                    whileTap={{ scale: 0.9 }}
                                                />
                                                <motion.div
                                                    className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer"
                                                    animate={{ scale: [1, 1.3, 1] }}
                                                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                                                    whileHover={{ scale: 1.4 }}
                                                    whileTap={{ scale: 0.9 }}
                                                />
                                                <motion.div
                                                    className="w-3 h-3 rounded-full bg-green-500 cursor-pointer"
                                                    animate={{ scale: [1, 1.3, 1] }}
                                                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                                                    whileHover={{ scale: 1.4 }}
                                                    whileTap={{ scale: 0.9 }}
                                                />
                                                <motion.span
                                                    className="ml-4 text-xs text-foreground/70 font-mono font-semibold"
                                                    animate={{ opacity: [0.6, 1, 0.6] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                >
                                                    developer.js
                                                </motion.span>
                                                <motion.div
                                                    className="ml-auto flex items-center gap-1"
                                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                                    transition={{ duration: 1.5, repeat: Infinity }}
                                                >
                                                    <span className="text-xs text-green-500 font-mono">●</span>
                                                    <span className="text-xs text-foreground/50 font-mono">Live</span>
                                                </motion.div>
                                            </div>

                                            {/* Code Editor Content */}
                                            <div className="flex-1 p-4 sm:p-6 md:p-8 font-mono text-xs sm:text-sm overflow-auto bg-gradient-to-br from-background/50 to-background/30">
                                                {/* Line Numbers */}
                                                <div className="flex gap-6 sm:gap-8">
                                                    <div className="text-foreground/30 select-none text-right min-w-[2rem]">
                                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => (
                                                            <div key={num} className="h-5 sm:h-6 flex items-center justify-end pr-2">
                                                                {num}
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Code Content with Typewriter Effect */}
                                                    <motion.div
                                                        className="flex-1"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: 0.8, duration: 0.4 }}
                                                    >
                                                        <TypewriterCode codeLines={developerCode} delay={1000} />
                                                    </motion.div>
                                                </div>
                                            </div>

                                            {/* Bottom Status Bar */}
                                            <div className="px-4 py-2 border-t border-border/50 bg-background/30 flex items-center justify-between text-xs text-foreground/60">
                                                <div className="flex items-center space-x-4">
                                                    <span className="font-mono">Ln 11, Col 1</span>
                                                    <span className="font-mono">Spaces: 2</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <motion.span
                                                        className="w-2 h-2 rounded-full bg-green-500"
                                                        animate={{ opacity: [1, 0.5, 1] }}
                                                        transition={{ duration: 2, repeat: Infinity }}
                                                    />
                                                    <span>Ready</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Face 2 - Back (Content Side) */}
                                    <motion.div
                                        className="absolute inset-0 w-full h-full backface-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-card via-card/95 to-card border border-border shadow-2xl backdrop-blur-sm overflow-hidden"
                                        style={{ transform: "rotateY(180deg)" }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.7, duration: 0.6 }}
                                    >
                                        <div className="w-full h-full flex flex-col">
                                            {/* Window Control Dots */}
                                            <div className="flex items-center space-x-2 p-4 border-b border-border/50">
                                                <motion.div
                                                    className="w-3 h-3 rounded-full bg-red-500"
                                                    animate={{ scale: [1, 1.2, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                                                />
                                                <motion.div
                                                    className="w-3 h-3 rounded-full bg-yellow-500"
                                                    animate={{ scale: [1, 1.2, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                                                />
                                                <motion.div
                                                    className="w-3 h-3 rounded-full bg-green-500"
                                                    animate={{ scale: [1, 1.2, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                                                />
                                                <span className="ml-4 text-xs text-foreground/60 font-mono">portfolio.js</span>
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-auto">
                                                <div className="space-y-4 sm:space-y-6">
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.9, duration: 0.5 }}
                                                    >
                                                        <motion.h3
                                                            className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3"
                                                        >
                                                            <a
                                                                href="#projects"
                                                                className="cursor-target text-foreground hover:text-primary-500 transition-colors bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent hover:from-primary-500 hover:to-primary-600"
                                                            >
                                                                Portfolio
                                                            </a>
                                                        </motion.h3>
                                                        <motion.p
                                                            className="text-foreground/70 text-sm sm:text-base leading-relaxed"
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: 1, duration: 0.5 }}
                                                        >
                                                            This is where I showcase my projects and build my professional portfolio.
                                                        </motion.p>
                                                    </motion.div>

                                                    {/* Code Display */}
                                                    <motion.div
                                                        className="bg-card/50 dark:bg-card/30 rounded-lg p-4 border border-border/50 font-mono text-xs sm:text-sm"
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 1.1, duration: 0.5 }}
                                                    >
                                                        <div className="space-y-2">
                                                            <div className="flex items-center space-x-2 mb-3">
                                                                <span className="text-foreground/60">1</span>
                                                                <span className="text-foreground/60">2</span>
                                                                <span className="text-foreground/60">3</span>
                                                                <span className="text-foreground/60">4</span>
                                                                <span className="text-foreground/60">5</span>
                                                            </div>
                                                            <pre className="text-foreground/90 leading-relaxed overflow-x-auto">
                                                                <code>
                                                                    <motion.span
                                                                        className="text-blue-400 dark:text-blue-300"
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        transition={{ delay: 1.2, duration: 0.3 }}
                                                                    >
                                                                        const
                                                                    </motion.span>
                                                                    <span className="text-foreground"> developer </span>
                                                                    <motion.span
                                                                        className="text-foreground/60"
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        transition={{ delay: 1.3, duration: 0.3 }}
                                                                    >
                                                                        =
                                                                    </motion.span>
                                                                    <motion.span
                                                                        className="text-foreground"
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        transition={{ delay: 1.4, duration: 0.3 }}
                                                                    >
                                                                        {" "}
                                                                        <motion.span
                                                                            className="text-emerald-400 dark:text-emerald-300"
                                                                            initial={{ opacity: 0 }}
                                                                            animate={{ opacity: 1 }}
                                                                            transition={{ delay: 1.5, duration: 0.3 }}
                                                                        >
                                                                            {"{"}
                                                                        </motion.span>
                                                                    </motion.span>
                                                                    <br />
                                                                    <motion.span
                                                                        className="text-foreground/60"
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        transition={{ delay: 1.6, duration: 0.3 }}
                                                                    >
                                                                        {"  "}
                                                                    </motion.span>
                                                                    <motion.span
                                                                        className="text-purple-400 dark:text-purple-300"
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        transition={{ delay: 1.7, duration: 0.3 }}
                                                                    >
                                                                        name
                                                                    </motion.span>
                                                                    <motion.span
                                                                        className="text-foreground/60"
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        transition={{ delay: 1.8, duration: 0.3 }}
                                                                    >
                                                                        :
                                                                    </motion.span>
                                                                    <motion.span
                                                                        className="text-emerald-400 dark:text-emerald-300"
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        transition={{ delay: 1.9, duration: 0.3 }}
                                                                    >
                                                                        {" "}
                                                                        &quot;Hoeun Pichet&quot;
                                                                    </motion.span>
                                                                    <motion.span
                                                                        className="text-foreground/60"
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        transition={{ delay: 2.0, duration: 0.3 }}
                                                                    >
                                                                        ,
                                                                    </motion.span>
                                                                    <br />
                                                                    <motion.span
                                                                        className="text-foreground/60"
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        transition={{ delay: 2.1, duration: 0.3 }}
                                                                    >
                                                                        {"  "}
                                                                    </motion.span>
                                                                    <motion.span
                                                                        className="text-purple-400 dark:text-purple-300"
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        transition={{ delay: 2.2, duration: 0.3 }}
                                                                    >
                                                                        role
                                                                    </motion.span>
                                                                    <motion.span
                                                                        className="text-foreground/60"
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        transition={{ delay: 2.3, duration: 0.3 }}
                                                                    >
                                                                        :
                                                                    </motion.span>
                                                                    <motion.span
                                                                        className="text-emerald-400 dark:text-emerald-300"
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        transition={{ delay: 2.4, duration: 0.3 }}
                                                                    >
                                                                        {" "}
                                                                        &quot;Full Stack Developer&quot;
                                                                    </motion.span>
                                                                    <motion.span
                                                                        className="text-foreground/60"
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        transition={{ delay: 2.5, duration: 0.3 }}
                                                                    >
                                                                        ,
                                                                    </motion.span>
                                                                    <br />
                                                                    <motion.span
                                                                        className="text-emerald-400 dark:text-emerald-300"
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        transition={{ delay: 2.6, duration: 0.3 }}
                                                                    >
                                                                        {"}"}
                                                                    </motion.span>
                                                                    <motion.span
                                                                        className="text-foreground/60"
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        transition={{ delay: 2.7, duration: 0.3 }}
                                                                    >
                                                                        ;
                                                                    </motion.span>
                                                                </code>
                                                            </pre>
                                                        </div>
                                                    </motion.div>
                                                </div>
                                            </div>

                                            {/* Bottom Status Bar */}
                                            <div className="px-4 py-2 border-t border-border/50 bg-background/30 flex items-center justify-between text-xs text-foreground/60">
                                                <div className="flex items-center space-x-4">
                                                    <span className="font-mono">Ln 5, Col 1</span>
                                                    <span className="font-mono">Spaces: 2</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <motion.span
                                                        className="w-2 h-2 rounded-full bg-green-500"
                                                        animate={{ opacity: [1, 0.5, 1] }}
                                                        transition={{ duration: 2, repeat: Infinity }}
                                                    />
                                                    <span>Ready</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
