"use client";

import React, { useEffect, useState } from "react";

const suggestions = [
    "Who won Best Picture in 2024?",
    "Which film has the most Oscar wins ever?",
    "Who has the most acting nominations?",
    "Best Director winners of the last decade?",
];

interface HeroSectionProps {
    onSuggestionClick: (text: string) => void;
}

export default function HeroSection({ onSuggestionClick }: HeroSectionProps) {
    const [visible, setVisible] = useState(false);
    const [filmStripOffset, setFilmStripOffset] = useState(0);

    useEffect(() => {
        setTimeout(() => setVisible(true), 80);

        let frame: number;
        let start: number | null = null;
        const animate = (ts: number) => {
            if (!start) start = ts;
            setFilmStripOffset(((ts - start) * 0.015) % 100);
            frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, []);

    return (
        <div style={styles.wrapper}>
            {/* Animated film-strip background */}
            <div style={styles.filmBg} aria-hidden="true">
                {Array.from({ length: 18 }).map((_, i) => (
                    <div
                        key={i}
                        style={{
                            ...styles.filmFrame,
                            transform: `translateY(${-filmStripOffset + i * 5.6}%)`,
                            opacity: 0.04 + (i % 3) * 0.015,
                        }}
                    />
                ))}
            </div>

            {/* Radial gold glow */}
            <div style={styles.glow} aria-hidden="true" />

            {/* Content */}
            <div
                style={{
                    ...styles.content,
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(28px)",
                    transition: "opacity 0.9s cubic-bezier(.16,1,.3,1), transform 0.9s cubic-bezier(.16,1,.3,1)",
                }}
            >
                {/* Statuette icon */}
                <div style={styles.iconWrap}>
                    <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                        <circle cx="19" cy="19" r="18" stroke="#D4AF37" strokeWidth="1.2" opacity="0.5" />
                        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="20" fill="#D4AF37">★</text>
                    </svg>
                    <div style={styles.iconRing} />
                </div>

                {/* Headline */}
                <h1 style={styles.headline}>
                    <span style={styles.headlineThe}>THE</span>
                    <span style={styles.headlineEnvelope}>ENVELOPE</span>
                </h1>

                <p style={styles.sub}>
                    Your guide to every Oscar, speech, and cinematic triumph — past and present.
                </p>

                {/* Decorative divider */}
                <div style={styles.divider}>
                    <span style={styles.dividerLine} />
                    <span style={styles.dividerDot} />
                    <span style={styles.dividerLine} />
                </div>

                {/* Suggestion chips */}
                <div style={styles.chipsLabel}>Ask me anything</div>
                <div style={styles.chips}>
                    {suggestions.map((s, i) => (
                        <button
                            key={i}
                            onClick={() => onSuggestionClick(s)}
                            style={{
                                ...styles.chip,
                                transitionDelay: `${0.55 + i * 0.08}s`,
                                opacity: visible ? 1 : 0,
                                transform: visible ? "translateY(0)" : "translateY(14px)",
                            }}
                            onMouseEnter={e => {
                                const el = e.currentTarget;
                                el.style.background = "rgba(212,175,55,0.12)";
                                el.style.borderColor = "#D4AF37";
                                el.style.color = "#F0D060";
                            }}
                            onMouseLeave={e => {
                                const el = e.currentTarget;
                                el.style.background = "rgba(212,175,55,0.05)";
                                el.style.borderColor = "rgba(212,175,55,0.3)";
                                el.style.color = "#C8A84B";
                            }}
                        >
                            <span style={styles.chipStar}>★</span>
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Bottom fade */}
            <div style={styles.bottomFade} aria-hidden="true" />
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    wrapper: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100%",
        padding: "60px 24px 40px",
        overflow: "hidden",
        background: "transparent",
    },
    filmBg: {
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        pointerEvents: "none",
        overflow: "hidden",
    },
    filmFrame: {
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        width: "340px",
        height: "5%",
        border: "1px solid rgba(212,175,55,0.15)",
        borderRadius: "2px",
        transition: "none",
    },
    glow: {
        position: "absolute",
        top: "10%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "600px",
        height: "360px",
        background: "radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
    },
    content: {
        position: "relative",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        maxWidth: "600px",
        width: "100%",
        transition: "opacity 0.9s, transform 0.9s",
    },
    iconWrap: {
        position: "relative",
        marginBottom: "28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    iconRing: {
        position: "absolute",
        inset: "-8px",
        borderRadius: "50%",
        border: "1px solid rgba(212,175,55,0.15)",
        animation: "pulse 3s ease-in-out infinite",
    },
    headline: {
        margin: "0 0 6px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0px",
        lineHeight: 1,
    },
    headlineThe: {
        fontFamily: "'Playfair Display', 'Georgia', serif",
        fontWeight: 400,
        fontSize: "clamp(13px, 2vw, 15px)",
        color: "#D4AF37",
        letterSpacing: "0.45em",
        opacity: 0.8,
    },
    headlineEnvelope: {
        fontFamily: "'Playfair Display', 'Georgia', serif",
        fontWeight: 700,
        fontStyle: "italic",
        fontSize: "clamp(48px, 8vw, 72px)",
        background: "linear-gradient(135deg, #F5E6A3 0%, #D4AF37 45%, #A07820 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        letterSpacing: "-0.01em",
    },
    sub: {
        margin: "18px 0 0",
        fontFamily: "'Georgia', serif",
        fontSize: "clamp(14px, 2vw, 16px)",
        color: "rgba(220,210,190,0.65)",
        lineHeight: 1.7,
        maxWidth: "420px",
        fontStyle: "italic",
        letterSpacing: "0.01em",
    },
    divider: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        margin: "32px 0 28px",
    },
    dividerLine: {
        display: "block",
        width: "64px",
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)",
    },
    dividerDot: {
        display: "block",
        width: "5px",
        height: "5px",
        borderRadius: "50%",
        background: "#D4AF37",
        opacity: 0.7,
    },
    chipsLabel: {
        fontFamily: "'Georgia', serif",
        fontSize: "11px",
        letterSpacing: "0.18em",
        color: "rgba(212,175,55,0.5)",
        textTransform: "uppercase",
        marginBottom: "14px",
    },
    chips: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "100%",
        maxWidth: "480px",
    },
    chip: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "13px 20px",
        background: "rgba(212,175,55,0.05)",
        border: "1px solid rgba(212,175,55,0.3)",
        borderRadius: "10px",
        color: "#C8A84B",
        fontSize: "14px",
        fontFamily: "'Georgia', serif",
        fontStyle: "italic",
        cursor: "pointer",
        textAlign: "left",
        transition: "background 0.2s, border-color 0.2s, color 0.2s, opacity 0.6s, transform 0.6s",
        letterSpacing: "0.01em",
    },
    chipStar: {
        fontSize: "10px",
        opacity: 0.7,
        flexShrink: 0,
        fontStyle: "normal",
    },
    bottomFade: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "80px",
        background: "linear-gradient(to top, rgba(10,10,8,0.6), transparent)",
        pointerEvents: "none",
    },
};