import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function TopButton() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const enabled =
        document.body.scrollTop > 20 || document.documentElement.scrollTop > 20;
      setIsButtonDisabled(!enabled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      id="back-to-top"
      title="Back to top"
      disabled={isButtonDisabled}
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }}
      className="bg-blue text-text-color hover:bg-blue-dark fixed bottom-5 right-7 z-50 flex h-12
        w-12 items-center justify-center rounded-full text-2xl transition-opacity
        duration-200 focus:outline-none active:scale-110 disabled:pointer-events-none
        disabled:opacity-0 drop-shadow-lg"
    >
      <FaArrowUp className="m-auto" />
    </button>
  );
}
