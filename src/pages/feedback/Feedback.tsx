import  { useState, useEffect } from 'react';
import './Feedback.css';
import Header from '../../widgets/header/Header';
import '@/shared/styles/AdaptiveStyles.css';
import Navigatorr from '../../widgets/navigator/Navigatorr';
import axios from 'axios';
import Cookies from 'js-cookie';

const Feedback = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  useEffect(() => {
    const consent = Cookies.get('userConsent');
    if (consent) {
      setIsAgreed(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!isAgreed) {
      setIsModalOpen(true);
      return;
    }

    const botToken = '7021411122:AAHGB7fHy8PUYsXkSRH-FOIhuY-H_jSikZc'; // токен бота
    const chatId = '5132596178'; // chat_id
    const text = `ФИО: ${name}\nПочта: ${email}\nСообщение: ${message}`;

    try {
      const response = await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        chat_id: chatId,
        text: text
      });
      if (response.status === 200) {
        alert('Сообщение отправлено!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        alert('Ошибка при отправке сообщения');
      }
    } catch (error) {
      console.error('Ошибка при отправке сообщения в Telegram:', error);
      alert('Ошибка при отправке сообщения');
    }
  };

  const handleAgree = () => {
    setIsAgreed(true);
    Cookies.set('userConsent', 'true', { expires: 365 });
    setIsModalOpen(false);
    handleSubmit(); // Отправляем форму после согласия
  };

  return (
    <>
      <Header />
      <main className="feedback">
        <div className="container">
          <div className="feedback-container">
            <div className="feedback-text-block">
              <h1>Связь</h1>
              <p>Если у вас есть вопросы или предложения, пожалуйста, заполните форму ниже, и мы свяжемся с вами.</p>
            </div>
            <div className="feedback-form-block">
              <form onSubmit={handleSubmit}>
                <input type="text" placeholder="ФИО" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <textarea placeholder="Обращение" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
                <button type="submit">Отправить</button>
              </form>
            </div>
          </div>
          {isModalOpen && (
            <div className="modal-overlay">
              <div className="modal-content">
                <button className="close-button2" onClick={() => setIsModalOpen(false)}>×</button>
                <h2>Согласие на обработку персональных данных</h2>
                <p>Нажимая на кнопку "Согласиться" Вы даёте свое согласие на <a href="/consent" target="_blank" rel="noopener noreferrer">обработку персональных данных</a>.</p>
                <button className="apply-button" onClick={handleAgree}>Согласиться</button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Navigatorr />
    </>
  );
}

export default Feedback;
