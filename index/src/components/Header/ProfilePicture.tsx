import { useCallback, useEffect, useState } from "react";
import FadeInImage from "../FadeInImage";

const SPEECH_LINES: readonly string[] = [
  "Hello there!",
  "Welcome to my portfolio!",
  "I'm Alex, nice to meet you!",
  "Take a look around!",
  "Hope you like what you see!"
] as const;

export default function ProfilePicture() {
  const [showSpeech, setShowSpeech] = useState<boolean>(false);
  const [displayedIndex, setDisplayedIndex] = useState<number>(0);
  const [speechLineIndex, setSpeechLineIndex] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const typeText = useCallback((lineIndex: number) => {
    setDisplayedIndex(0);
    setSpeechLineIndex(lineIndex);

    return new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        setDisplayedIndex((prev) => {
          if (prev > SPEECH_LINES[lineIndex].length) {
            clearInterval(interval);
            resolve();
            return prev;
          }

          return prev + 1;
        });
      }, 50);
    });
  }, []);

  const handleMouseEnter = useCallback(async () => {
    if (isTyping) return;

    setIsTyping(true);
    const randomIndex = Math.floor(Math.random() * SPEECH_LINES.length);
    setShowSpeech(true);
    setIsFading(false);
    await typeText(randomIndex);

    // Set a timeout to start fading the speech bubble after 3 seconds
    setTimeout(() => {
      setIsFading(true);
      // Hide the speech bubble after fade animation completes
      setTimeout(() => {
        setShowSpeech(false);
        setDisplayedIndex(0);
        setIsFading(false);
        setIsTyping(false);
      }, 500); // Adjust this value to match your fade-out animation duration
    }, 3000);
  }, [typeText, isTyping]);

  useEffect(() => {
    if (showSpeech && !isTyping) {
      handleMouseEnter();
    }
  }, [showSpeech, handleMouseEnter, isTyping]);

  return (
    <div className="relative" onMouseEnter={handleMouseEnter}>
      <FadeInImage
        src="./me.png"
        className="w-40 mx-auto aspect-square rounded-full"
      />
      {showSpeech && (
        <div
          className={`absolute top-1/2 -translate-y-1/2 left-full ml-4 bg-bg-light p-3 rounded-lg
          before:content-[''] before:absolute before:top-1/2 before:right-full
          before:-translate-y-1/2 before:border-t-[10px] before:border-t-transparent
          before:border-b-[10px] before:border-b-transparent before:border-r-[10px]
          before:border-r-bg-light whitespace-nowrap transition-opacity duration-500
          ${isFading ? "opacity-0" : "opacity-100"}`}
        >
          {SPEECH_LINES[speechLineIndex].slice(0, displayedIndex)}
        </div>
      )}
    </div>
  );
}
