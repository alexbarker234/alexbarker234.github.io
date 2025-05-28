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
        <SpeechBubble
          text={SPEECH_LINES[speechLineIndex].slice(0, displayedIndex)}
          isFading={isFading}
        />
      )}
    </div>
  );
}

const SpeechBubble = ({
  text,
  isFading
}: {
  text: string;
  isFading: boolean;
}) => {
  return (
    // Holy moly these tailwind classes are ridiculously long I will not be combining these
    <>
      {/* Mobile - Off to the bottom */}
      <div
        className={`absolute top-[110%] left-1/2 -translate-x-1/2 bg-bg-light p-3 rounded-lg w-full
          max-w-[90vw] before:content-[''] before:absolute before:bottom-full
          before:left-1/2 before:-translate-x-1/2 before:border-l-[10px]
          before:border-l-transparent before:border-r-[10px] before:border-r-transparent
          before:border-b-[10px] before:border-b-bg-light transition-opacity duration-500
          z-10 ${isFading ? "opacity-0" : "opacity-100"} md:hidden`}
      >
        {text}
      </div>
      {/* Desktop - Off to the right */}
      <div
        className={`hidden md:block absolute top-1/2 -translate-y-1/2 left-full ml-4 bg-bg-light p-3
          rounded-lg before:content-[''] before:absolute before:top-1/2 before:right-full
          before:-translate-y-1/2 before:border-t-[10px] before:border-t-transparent
          before:border-b-[10px] before:border-b-transparent before:border-r-[10px]
          before:border-r-bg-light whitespace-nowrap transition-opacity duration-500
          ${isFading ? "opacity-0" : "opacity-100"}`}
      >
        {text}
      </div>
    </>
  );
};
