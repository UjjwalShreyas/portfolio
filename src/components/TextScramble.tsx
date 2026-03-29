"use client";
import React, { useEffect, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

export default function TextScramble({ phrases, className }: { phrases: string[]; className?: string }) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let animationId: number;
    let timeoutId: NodeJS.Timeout;
    let active = true;
    let currentPhraseIndex = 0;
    
    // Scramble function
    const scramble = (text: string) => {
      if (!active) return;
      let frame = 0;
      const queue = text.split("").map((char) => ({
        from: CHARS[Math.floor(Math.random() * CHARS.length)],
        to: char,
        start: Math.floor(Math.random() * 40),
        end: Math.floor(Math.random() * 40) + 40,
        char: "",
      }));

      const update = () => {
        if (!active) return;
        let output = "";
        let complete = 0;
        for (let i = 0, n = queue.length; i < n; i++) {
          let { from, to, start, end, char } = queue[i];
          if (frame >= end) {
            complete++;
            output += to;
          } else if (frame >= start) {
            if (!char || Math.random() < 0.28) {
              char = CHARS[Math.floor(Math.random() * CHARS.length)];
              queue[i].char = char;
            }
            output += '<span class="text-[var(--color-scarlet-red)] opacity-80">' + char + '</span>';
          } else {
            output += from;
          }
        }
        setDisplayText(output);
        if (complete === queue.length) {
          // Wait 3 seconds, then cycle to next
          timeoutId = setTimeout(() => {
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            scramble(phrases[currentPhraseIndex]);
          }, 3000);
        } else {
          frame++;
          animationId = requestAnimationFrame(update);
        }
      };
      animationId = requestAnimationFrame(update);
    };

    scramble(phrases[0]);

    return () => {
      active = false;
      cancelAnimationFrame(animationId);
      clearTimeout(timeoutId);
    };
  }, [phrases]);

  return <span className={className} dangerouslySetInnerHTML={{ __html: displayText }} />;
}
