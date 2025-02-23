import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__name">Developed by Jonathan Sanfilippo</p>
      <p className="footer__date">&copy; {new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;
