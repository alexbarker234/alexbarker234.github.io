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
    >
      <FaArrowUp className="icon" />
    </button>
  );
}
