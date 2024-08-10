import React, { useState, useEffect, useRef, useCallback } from 'react';
import io from 'socket.io-client';
import Header from './Header';
import './Started.css';
import './Feedback.css';
import SupportChat from './SupportChat';
import AddPrinter from './AddPrinter';
import Mod from "../img/Model-Test.stl";
import Cookies from 'js-cookie';

const Started = () => {
  const [socket, setSocket] = useState(null);
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
    const newSocket = io('http://83.221.210.29:5000');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to server');
      newSocket.emit('get_printers');
    });

    newSocket.on('printers', (receivedPrinters) => {
      setPrinters(receivedPrinters);
    });

    newSocket.on('printer_added', (result) => {
      console.log('Printer added:', result);
      newSocket.emit('get_printers');
    });

    newSocket.on('print_added', (result) => {
      console.log('Print added:', result);
      if (result.defect === 1) {
        window.location.href = '/defect';
      } else if (result.defect === 0) {
        window.location.href = '/not-defect';
      }
    });

    return () => newSocket.close();
  }, []);

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
    socket.emit('add_printer', newPrinter);
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
    const formData = new FormData();
    formData.append('printer_id', selectedPrinter);
    formData.append('quality', selectedQuality);
    if (file) {
      formData.append('img', file);
    }

    socket.emit('add_print', formData);
    setLoading(false);
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
