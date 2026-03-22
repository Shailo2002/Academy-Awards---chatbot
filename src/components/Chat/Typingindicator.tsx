"use client";

import React, { useEffect, useState } from "react";
import styles from "./TypingIndicator.module.css";

const loadingLines = [
    { main: "Checking the archives...", sub: "Consultando la Cineteca Nazionale" },
    { main: "Reviewing the ballots...", sub: "Revisando las papeletas de votación" },
    { main: "Consulting the Academy...", sub: "Consultando a la Academia" },
    { main: "Rewinding the reels...", sub: "Rebobinando las películas" },
    { main: "Reading the nominations...", sub: "Leyendo las nominaciones" },
];

export default function TypingIndicator() {
    const [lineIndex, setLineIndex] = useState(0);
    const [dotPhase, setDotPhase] = useState(0);
    const [fadeIn, setFadeIn] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFadeIn(false);
            setTimeout(() => {
                setLineIndex((i) => (i + 1) % loadingLines.length);
                setFadeIn(true);
            }, 350);
        }, 2800);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setDotPhase((p) => (p + 1) % 3);
        }, 520);
        return () => clearInterval(interval);
    }, []);

    const { main, sub } = loadingLines[lineIndex];

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                {/* Dots */}
                <div className={styles.dots}>
                    {[0, 1, 2].map((i) => (
                        <span
                            key={i}
                            className={`${styles.dot} ${dotPhase === i ? styles.activeDot : ""
                                }`}
                        />
                    ))}
                </div>

                {/* Text */}
                <div
                    className={`${styles.textBlock} ${fadeIn ? styles.fadeIn : styles.fadeOut
                        }`}
                >
                    <p className={styles.mainText}>{main}</p>
                    <p className={styles.subText}>{sub}</p>
                </div>
            </div>
        </div>
    );
}