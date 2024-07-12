import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a className="footer-link" href="https://github.com/alexbarker234">
          <FaGithub />
        </a>
        <a
          className="footer-link"
          href="https://au.linkedin.com/in/alex-barker-a37389ba"
        >
          <FaLinkedin />
        </a>
      </div>
      <div className="footer-base">Alex Barker ©2024</div>
    </footer>
  );
}
