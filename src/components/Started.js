import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from './Header';
import './Started.css';
import './Feedback.css';
import SupportChat from './SupportChat';
import AddPrinter from './AddPrinter';
import axios from 'axios';
import Mod from "../img/Model-Test.stl";
import Cookies from 'js-cookie';

const Started = () => {
  const [printers, setPrinters] = useState([]);
  const [selectedPrinter, setSelectedPrinter] = useState('');
  const [selectedQuality, setSelectedQuality] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAddPrinter, setShowAddPrinter] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const consent = Cookies.get('userConsent');
    if (consent) {
      setIsAgreed(true);
    }
  }, []);

  const getIdsFromCookie = () => {
    let ids = Cookies.get('ids');
    return ids ? ids.split(',') : [];
  }

  const handleQualitySelect = (quality) => {
    let qualityValue;
    switch (quality) {
      case 'Стандартный (Высота слоя 0,2 мм)':
        qualityValue = 1;
        break;
      case 'Высокий (Высота слоя 0,1 мм)':
        qualityValue = 2;
        break;
      case 'Ультра (Высота слоя 0,05 мм)':
        qualityValue = 3;
        break;
      default:
        qualityValue = '';
    }
    setSelectedQuality(qualityValue);
    console.log('Выбранный элемент:', qualityValue);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg")) {
      setSelectedFile(file);
      console.log('Выбранный файл:', file);
      if (!isAgreed) {
        setIsModalOpen(true);
      } else {
        handleSubmit(file);
      }
    } else {
      alert('Пожалуйста, загрузите файл в формате JPEG, PNG или JPG.');
    }
  };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setSelectedFile(null);
  };

  const fetchPrinters = useCallback(async () => {
    try {
      let ids_printers = getIdsFromCookie();
      let AllPrinterData = [];
      
      // Получаем данные для принтеров с ID от 1 до 17
      for (let i = 1; i < 18; i++) {
        try {
          let response = await axios.get(`https://nyuroprint.online:5000/api/printers/${i}`);
          AllPrinterData.push(response.data.data);
        } catch (error) {
          console.error(`Ошибка при получении данных для принтера с ID ${i}:`, error);
        }
      }
  
      // Получаем данные для принтеров из куки
      if (ids_printers.length !== 0) {
        for (let id of ids_printers) {
          try {
            let response = await axios.get(`https://nyuroprint.online:5000/api/printers/${id}`);
            AllPrinterData.push(response.data.data);
          } catch (error) {
            console.error(`Ошибка при получении данных для принтера с ID ${id}:`, error);
          }
        }
      }
  
      // Устанавливаем данные принтеров
      setPrinters(AllPrinterData);
    } catch (error) {
      console.error('Ошибка при получении списка принтеров:', error);
    }
  }, []);
      

  useEffect(() => {
    fetchPrinters();
  }, [fetchPrinters]);

  const handlePrinterSelect = (e) => {
    const printerId = e.target.value;
    setSelectedPrinter(printerId);

    if (printerId === 'add-new') {
      setShowAddPrinter(true);
      document.body.classList.add('modal-open');
    } else {
      console.log('Выбранный принтер ID:', printerId);
    }
  };

  const handleCloseModal = () => {
    setShowAddPrinter(false);
    document.body.classList.remove('modal-open');
  };

  const handleAddPrinter = (newPrinter) => {
    fetchPrinters();
    setSelectedPrinter(newPrinter);
    handleCloseModal();
  };

  const handleAgree = () => {
    setIsAgreed(true);
    Cookies.set('userConsent', 'true', { expires: 365 });
    setIsModalOpen(false);
    if (selectedFile) {
      handleSubmit(selectedFile);
    }
  };

  const handleSubmit = async (file) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('printer_id', selectedPrinter);
      formData.append('quality', selectedQuality);
      if (file) {
        formData.append('img', file);
      }

      const response = await axios.post('https://nyuroprint.online:5000/api/prints/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Ответ от сервера:', response.data);

      if (response.data.defect === 1) {
        window.location.href = '/defect';
      } else if (response.data.defect === 0) {
        window.location.href = '/not-defect';
      }
    } catch (error) {
      if (error.response) {
        console.error('Ошибка ответа от сервера:', error.response.data);
      } else if (error.request) {
        console.error('Ошибка запроса:', error.request);
      } else {
        console.error('Общая ошибка:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="get-started-content">
        <div className="container">
          <div className="instruction-block">
            <h1>Инструкция</h1>
            <p>Загрузите и распечатайте тестовую модель <a href={Mod} className="link" download="Model-Test.stl">Model-Test.stl</a> с предложенным на сайте качеством печати, рекомендуется использовать слайсер UltiMaker Cura. Затем выберите на сайте 3D-принтер из списка или добавьте свой и укажите параметры качества печати. Сфотографируйте отпечатанную деталь в соответствии с примером и загрузите фотографию на сайт.</p>
          </div>
          <div className="blockk">
            <div className="selection-block">
              <div className="printer-selection">
                <p>Выберите свой принтер</p>
                <select onChange={handlePrinterSelect} value={selectedPrinter}>
                  {printers.map((printer) => (
                    <option key={printer.id} value={printer.id}>{printer.name}</option>
                  ))}
                  <option value="add-new">Добавить новый принтер</option>
                </select>
              </div>
              <div className="quality-selection">
                {['Стандартный (Высота слоя 0,2 мм)', 'Высокий (Высота слоя 0,1 мм)', 'Ультра (Высота слоя 0,05 мм)'].map((quality) => (
                  <div
                    key={quality}
                    className={`quality-block ${selectedQuality === quality ? 'active' : ''}`}
                    onClick={() => handleQualitySelect(quality)}>
                    <h3>{quality}</h3>
                    <p>{quality === 'Стандартный (Высота слоя 0,2 мм)' ? 'Баланс между скоростью и качеством' : quality === 'Высокий (Высота слоя 0,1 мм)' ? 'Более мелкие детали и более длительное время печати' : 'Высочайшее качество и значительно более длительное время'}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="upload-block">
              <div className="upload-photo">
                <img src={require('../img/Rectangle 26.png')} alt="Загруженная модель" />
              </div>
              <div className="upload-info">
                <p>Сфотографируйте вашу 3D модель как показано на фотографии с четкой картинкой и хорошим светом для более точного выявления дефекта модели</p>
                <input
                  ref={fileInputRef}
                  className="upload-file"
                  onChange={handleFileChange}
                  type="file"
                  accept=".jpg, .jpeg, .png"
                />
              </div>
            </div>
          </div>
          {showAddPrinter && (
            <div className="modal-overlay">
              <div className="modal-content">
                <button className="close-button" onClick={handleCloseModal}>×</button>
                <div className="modal-body">
                  <AddPrinter onSave={handleAddPrinter} />
                </div>
              </div>
            </div>
          )}
          {isModalOpen && (
            <div className="modal-overlay">
              <div className="modal-content">
                <button className="close-button2" onClick={() => {
                  setIsModalOpen(false);
                  resetFileInput();
                }}>×</button>
                <h2>Согласие на обработку персональных данных</h2>
                <p>Нажимая на кнопку "Согласиться" Вы даёте свое согласие на <a href="/consent" target="_blank" rel="noopener noreferrer">обработку персональных данных</a>.</p>
                <button className="apply-button" onClick={handleAgree}>Согласиться</button>
              </div>
            </div>
          )}
          {loading && (
            <div className="popup">
              <div className="cont">
                <div className="📦"></div>
                <div className="📦"></div>
                <div className="📦"></div>
                <div className="📦"></div>
                <div className="📦"></div>
              </div>
            </div>
          )}
        </div>
      </main>
      <SupportChat />
    </>
  );
};

export default Started;
