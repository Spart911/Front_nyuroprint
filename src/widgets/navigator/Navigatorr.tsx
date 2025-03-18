
import './Navigatorr.css';

const Navigatorr = () => {
  return (
    <div className="navigatorr">
      <div className="navigatorr-column">
          <a href="/about" target="_self" className="navigatorr-link">О нас</a>
      </div>

      <div className="navigatorr-column">
          <a href="/feedback" target="_self" className="navigatorr-link">Обратная связь</a>
      </div>

      <div className="navigatorr-column">
          <a href="/help" target="_self" className="navigatorr-link">Помощь</a>
      </div>

      <div className="navigatorr-column">
          <a href="/privacy" target="_self" className="navigatorr-link">Политика конфиденциальности</a>
      </div>

      <div className="navigatorr-column">
          <a href="/agreement" target="_self" className="navigatorr-link">Пользовательское соглашение</a>
      </div>
    </div>
  );
};

export default Navigatorr;