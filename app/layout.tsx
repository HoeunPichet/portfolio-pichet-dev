import type { Metadata, Viewport } from "next";
import "./../style/globals.css";
import { inter } from "@/lib/fonts";
import { ThemeProvider } from "@/components/theme-provider";

const siteUrl = new URL(process.env.SITE_URL ?? "http://localhost:3000");
const siteName = "Hoeun Pichet - Full Stack Developer";
const developerName = "Hoeun Pichet";
const description = "Full Stack Developer specializing in React, Next.js, TypeScript, Java, and Spring Boot. Building modern, scalable web applications with cutting-edge technologies. Explore my portfolio, projects, and technical expertise.";
const keywords = [
    "Hoeun Pichet",
    "Full Stack Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Java Developer",
    "Spring Boot Developer",
    "Frontend Developer",
    "Backend Developer",
    "Software Engineer",
    "Portfolio",
    "Web Development",
    "React",
    "Next.js",
    "TypeScript",
    "Java",
    "Spring Boot",
    "Microservices",
    "PostgreSQL",
    "Laravel",
    "Phnom Penh",
    "Cambodia",
];

export const metadata: Metadata = {
    // Basic Metadata
    title: {
        template: `%s | ${developerName}`,
        default: siteName,
    },
    description: description,
    keywords: keywords,
    metadataBase: siteUrl,
    alternates: {
        canonical: siteUrl,
    },
    icons: {
        icon: "/images/logo/pichet.png",
        apple: "/images/logo/pichet.png",
    },
    manifest: "/manifest.json",

    // Open Graph metadata for social sharing
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteUrl,
        siteName: developerName,
        title: siteName,
        description: description,
        images: [
            {
                url: `${siteUrl}/images/logo/pichet.png`,
                width: 1200,
                height: 630,
                alt: `${developerName} - Full Stack Developer Portfolio`,
            },
        ],
    },

    // Twitter Card metadata
    twitter: {
        card: "summary_large_image",
        title: siteName,
        description: description,
        creator: "@HoeunPichet", // Update with your Twitter handle if available
        images: [`${siteUrl}/images/logo/pichet.png`],
    },

    // Robots metadata
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },

    // App information
    category: "technology",
    classification: "Portfolio",
    applicationName: developerName,
    authors: [
        {
            name: developerName,
            url: "https://github.com/HoeunPichet"
        },
    ],
    creator: developerName,
    publisher: developerName,
    generator: "Next.js",
    referrer: "origin-when-cross-origin",

    // Additional SEO
    other: {
        "contact": "mailto:hoeunpichet@gmail.com",
        "github": "https://github.com/HoeunPichet",
    },
};

// Enhanced viewport settings
export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#0ea5e9" }, // primary-500
        { media: "(prefers-color-scheme: dark)", color: "#0ea5e9" }, // primary-500
    ],
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: "cover",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // Structured Data (JSON-LD) for SEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: developerName,
        jobTitle: "Full Stack Developer",
        description: description,
        url: siteUrl.toString(),
        image: `${siteUrl}/images/logo/pichet.png`,
        sameAs: [
            "https://github.com/HoeunPichet",
        ],
        knowsAbout: [
            "React",
            "Next.js",
            "TypeScript",
            "Java",
            "Spring Boot",
            "JavaScript",
            "Web Development",
            "Full Stack Development",
            "Microservices",
            "PostgreSQL",
            "Laravel",
        ],
        alumniOf: {
            "@type": "Organization",
            name: "Software Development",
        },
        address: {
            "@type": "PostalAddress",
            addressLocality: "Phnom Penh",
            addressCountry: "KH",
        },
    };

    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${inter.className} antialiased`}
            >
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <main className="grid w-full">
                        {children}
                    </main>
                </ThemeProvider>
            </body>
        </html>
    );
}
