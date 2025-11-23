"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

const techImages = [
    { name: "Java", src: "/images/language/java.png", alt: "Java", color: "from-orange-500 to-red-500" },
    { name: "JavaScript", src: "/images/language/javascript.png", alt: "JavaScript", color: "from-yellow-400 to-yellow-600" },
    { name: "TypeScript", src: "/images/language/typescript.png", alt: "TypeScript", color: "from-blue-500 to-blue-700" },
    { name: "React", src: "/images/language/react.png", alt: "React", color: "from-cyan-400 to-blue-500" },
    { name: "Next.js", src: "/images/language/nextjs.png", alt: "Next.js", color: "from-gray-800 to-gray-900" },
    { name: "HTML", src: "/images/language/html-5.png", alt: "HTML5", color: "from-orange-500 to-orange-600" },
    { name: "CSS", src: "/images/language/css.png", alt: "CSS", color: "from-blue-500 to-blue-600" },
    { name: "Laravel", src: "/images/language/laravel.png", alt: "Laravel", color: "from-red-500 to-red-600" },
    { name: "PostgreSQL", src: "/images/language/postgre.png", alt: "PostgreSQL", color: "from-blue-600 to-blue-800" },
    { name: "Git", src: "/images/language/git.png", alt: "Git", color: "from-orange-600 to-red-600" },
    { name: "Kafka", src: "/images/language/kafka.png", alt: "Apache Kafka", color: "from-black to-gray-800" },
    { name: "RabbitMQ", src: "/images/language/rabbitmq.webp", alt: "RabbitMQ", color: "from-orange-500 to-orange-600" },
    { name: "JSON", src: "/images/language/json.webp", alt: "JSON", color: "from-yellow-500 to-yellow-600" },
];

export default function TechScroll() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [touchedIndex, setTouchedIndex] = useState<number | null>(null);
    const [api, setApi] = useState<CarouselApi>();
    const [isPlaying, setIsPlaying] = useState(true);

    // Auto-play plugin with pause on hover
    const autoplayPlugin = Autoplay({
        delay: 2000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
    });

    // Pause/resume on hover - autoplay plugin handles this automatically with stopOnMouseEnter
    useEffect(() => {
        if (!api) return;

        const handleMouseEnter = () => {
            setIsPlaying(false);
        };

        const handleMouseLeave = () => {
            setIsPlaying(true);
        };

        const carouselElement = api.containerNode();
        if (carouselElement) {
            carouselElement.addEventListener("mouseenter", handleMouseEnter);
            carouselElement.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            if (carouselElement) {
                carouselElement.removeEventListener("mouseenter", handleMouseEnter);
                carouselElement.removeEventListener("mouseleave", handleMouseLeave);
            }
        };
    }, [api]);

    return (
        <div className="relative w-full">
            {/* Carousel Container */}
            <Carousel
                setApi={setApi}
                opts={{
                    align: "start",
                    loop: true,
                    slidesToScroll: "auto",
                }}
                plugins={[autoplayPlugin]}
                className="w-full"
            >
                <CarouselContent className="-ml-2 sm:-ml-4 md:-ml-6">
                    {techImages.map((tech, index) => (
                        <CarouselItem
                            key={index}
                            className="pl-2 sm:pl-4 md:pl-6 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-1/7"
                        >
                            <TechCard
                                tech={tech}
                                index={index}
                                hoveredIndex={hoveredIndex}
                                setHoveredIndex={setHoveredIndex}
                                touchedIndex={touchedIndex}
                                setTouchedIndex={setTouchedIndex}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Custom Navigation Buttons - Gen Z Style */}
                <CarouselPrevious className="hidden sm:flex lg:hidden -left-4 h-10 w-10 md:h-12 md:w-12 rounded-full border-0 shadow-lg hover:shadow-xl text-primary-500 dark:text-white hover:scale-110 transition-all duration-200">
                    <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
                </CarouselPrevious>
                <CarouselNext className="hidden sm:flex lg:hidden -right-4 h-10 w-10 md:h-12 md:w-12 rounded-full border-0 shadow-lg hover:shadow-xl text-primary-500 dark:text-white hover:scale-110 transition-all duration-200">
                    <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
                </CarouselNext>

                {/* Play/Pause Indicator */}
                <motion.div
                    className="absolute top-2 right-2 sm:top-4 sm:right-4 z-30"
                    animate={{ opacity: isPlaying ? [0.5, 1, 0.5] : 0.7 }}
                    transition={{ duration: 2, repeat: isPlaying ? Infinity : 0 }}
                >
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-primary-500/20 shadow-md">
                        <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500' : 'bg-yellow-500'}`} />
                        <span className="text-[10px] font-semibold text-foreground/70">
                            {isPlaying ? 'Auto' : 'Paused'}
                        </span>
                    </div>
                </motion.div>
            </Carousel>
        </div>
    );
}

interface TechCardProps {
    tech: typeof techImages[0];
    index: number;
    hoveredIndex: number | null;
    setHoveredIndex: (index: number | null) => void;
    touchedIndex: number | null;
    setTouchedIndex: (index: number | null) => void;
}

function TechCard({ tech, index, hoveredIndex, setHoveredIndex, touchedIndex, setTouchedIndex }: TechCardProps) {
    const isHovered = hoveredIndex === index;
    const isTouched = touchedIndex === index;
    const isActive = isHovered || isTouched;

    return (
        <motion.div
            className="group relative w-full cursor-pointer touch-manipulation py-4 sm:py-6 md:py-8 lg:py-10"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onTouchStart={() => setTouchedIndex(index)}
            onTouchEnd={() => setTimeout(() => setTouchedIndex(null), 200)}
            whileHover={{ scale: 1.1, y: -8 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.3,
                delay: (index % techImages.length) * 0.03,
                type: "spring",
                stiffness: 200
            }}
        >
            {/* Card Container - Responsive aspect ratio */}
            <div className="relative w-full aspect-square max-w-[80px] sm:max-w-[96px] md:max-w-[112px] lg:max-w-[128px] xl:max-w-[144px] mx-auto">
                {/* Glow effect on hover/touch */}
                <motion.div
                    className={`absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br ${tech.color} opacity-0 blur-xl -z-10`}
                    animate={{
                        opacity: isActive ? 0.4 : 0,
                        scale: isActive ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                />

                {/* Glassmorphism Card */}
                <div className="relative w-full h-full rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/90 via-white/80 to-white/70 dark:from-card/90 dark:via-card/80 dark:to-card/70 border border-white/50 dark:border-white/20 sm:border-2 shadow-md hover:shadow-2xl active:shadow-lg transition-all duration-300 p-1.5 sm:p-2 md:p-3 lg:p-4">
                    {/* Gradient border on hover/touch */}
                    <motion.div
                        className={`absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br ${tech.color} opacity-0 -z-10`}
                        animate={{
                            opacity: isActive ? 0.2 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Image */}
                    <div className="relative w-full h-full flex items-center justify-center">
                        <Image
                            src={tech.src}
                            alt={tech.alt}
                            width={70}
                            height={70}
                            className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-110 group-active:scale-105"
                            priority={index < 6}
                            sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 96px, (max-width: 1280px) 112px, 128px"
                        />
                    </div>

                    {/* Shine effect on hover/touch */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                        animate={{
                            x: isActive ? "200%" : "-100%",
                        }}
                        transition={{
                            duration: 0.6,
                            ease: "easeInOut",
                        }}
                    />
                </div>

                {/* Tooltip - Better mobile positioning */}
                <motion.div
                    className="absolute -bottom-8 sm:-bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-none hidden sm:block"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{
                        opacity: isActive ? 1 : 0,
                        y: isActive ? 0 : 5,
                    }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg bg-foreground text-background text-[10px] sm:text-xs font-bold whitespace-nowrap shadow-xl border border-primary-500/20">
                        {tech.name}
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-foreground rotate-45 border-l border-t border-primary-500/20" />
                    </div>
                </motion.div>

                {/* Mobile tooltip - shows on touch */}
                {isTouched && (
                    <motion.div
                        className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none sm:hidden"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                    >
                        <div className="px-2 py-1 rounded-md bg-foreground text-background text-[10px] font-bold whitespace-nowrap shadow-xl">
                            {tech.name}
                        </div>
                    </motion.div>
                )}

                {/* Pulse ring on hover/touch - desktop only */}
                {isHovered && (
                    <motion.div
                        className={`hidden sm:block absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-transparent bg-gradient-to-br ${tech.color} opacity-30`}
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 1.3, opacity: 0 }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeOut",
                        }}
                    />
                )}
            </div>
        </motion.div>
    );
}

