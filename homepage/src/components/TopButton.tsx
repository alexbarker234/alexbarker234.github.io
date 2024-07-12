import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function TopButton() {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const enabled =
        document.body.scrollTop > 20 || document.documentElement.scrollTop > 20;
      setIsButtonEnabled(enabled);
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
      className={isButtonEnabled ? "enabled" : ""}
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }}
    >
      <FaArrowUp />
    </button>
  );
}
