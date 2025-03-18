
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
    <div className="footer-column">
        <a href="/help" target="_self" className="footer-link">Помощь</a>
    </div>

    <div className="footer-column">
        <a href="/feedback" target="_self" className="footer-link">Обратная связь</a>
    </div>

    <div className="footer-column">
        <a href="/privacy" target="_self" className="footer-link">Политика конфиденциальности</a>
    </div>

    <div className="footer-column">
        <a href="/agreement" target="_self" className="footer-link">Пользовательское соглашение</a>
    </div>
    </footer>
  );
};

export default Footer;