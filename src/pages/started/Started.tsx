import { useState, useEffect, useRef, useCallback } from "react";
import Header from "../../widgets/header/Header";
import "./Started.css";
import axios from "axios";
//@ts-ignore
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import AddPrinter from "../addPrinter/AddPrinter";
import Model from "@/shared/img/Rectangle 26.png";

const Started = () => {
  const [printers, setPrinters] = useState<any>([]);
  const [selectedPrinter, setSelectedPrinter] = useState<any>("");
  const [selectedQuality, setSelectedQuality] = useState<any>("");
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showAddPrinter, setShowAddPrinter] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const fileInputRef = useRef<any>(null);
  const navigate = useNavigate();

  // Список первых 17 принтеров, хранящийся на фронте
  const defaultPrinters = [
    { id: 0, name: "Выберите свой принтер" },
    { id: 1, name: "Ender 3" },
    { id: 2, name: "Creality Ender 5" },
    { id: 3, name: "Anycubic i3 Mega" },
    { id: 4, name: "Ultimaker S3" },
    { id: 5, name: "Prusa SL1S" },
    { id: 6, name: "Raise3D E2" },
    { id: 7, name: "MakerBot Replicator Z18" },
    { id: 8, name: "Wanhao Duplicator 9" },
    { id: 9, name: "Prusa MINI+" },
    { id: 10, name: "UlTi Steel 2" },
    { id: 11, name: "FlyingBear Ghost 5" },
    { id: 12, name: "Creality CR-K1C" },
    { id: 13, name: "Anycubic Kobra 2 Neo" },
    { id: 14, name: "Creality K1" },
    { id: 15, name: "FlyingBear Ghost 6" },
    { id: 16, name: "ZAV-PRO V3" },
    { id: 17, name: "Biqu Hurakan" },
  ];

  const qualityOptions: any = {
    "Стандартный (Высота слоя 0,2 мм)": 1,
    "Высокий (Высота слоя 0,1 мм)": 2,
    "Ультра (Высота слоя 0,05 мм)": 3,
  };

  useEffect(() => {
    const consent = Cookies.get("userConsent");
    if (consent) {
      setIsAgreed(true);
    }
  }, []);

  const getIdsFromCookie = () => {
    let ids = Cookies.get("ids");
    return ids ? ids.split(",") : [];
  };

  const handleQualitySelect = (quality: any) => {
    const qualityValue = qualityOptions[quality]; // Получаем числовое значение из объекта
    setSelectedQuality(quality); // Сохраняем текстовое значение качества
    console.log("Выбранный элемент:", qualityValue);
  };
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg")
    ) {
      setSelectedFile(file);
      console.log("Выбранный файл:", file);
      if (!isAgreed) {
        setIsModalOpen(true);
      } else {
        handleSubmit(file);
      }
    } else {
      alert("Пожалуйста, загрузите файл в формате JPEG, PNG или JPG.");
    }
  };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setSelectedFile(null);
  };

  // Функция для получения данных о принтерах из куков и добавления к первым 17 принтерам
  const fetchPrinters = useCallback(async () => {
    let AllPrinterData = [...defaultPrinters]; // Используем статический список для первых 17 принтеров
    let ids_printers = getIdsFromCookie();

    // Получаем данные для принтеров из куки
    if (ids_printers.length !== 0) {
      for (let id of ids_printers) {
        try {
          let response = await axios.get(
            `https://nyuroprintapiv1.ru:5000/api/printers/${id}`
          );
          AllPrinterData.push(response.data.data);
        } catch (error) {
          console.error(
            `Ошибка при получении данных для принтера с ID ${id}:`,
            error
          );
        }
      }
    }

    setPrinters(AllPrinterData);
  }, []);

  useEffect(() => {
    fetchPrinters();
  }, [fetchPrinters]);

  const handlePrinterSelect = (e: any) => {
    const printerId = e.target.value;
    setSelectedPrinter(printerId);

    if (printerId === "add-new") {
      setShowAddPrinter(true);
      document.body.classList.add("modal-open");
    } else {
      console.log("Выбранный принтер ID:", printerId);
    }
  };

  const handleCloseModal = () => {
    setShowAddPrinter(false);
    document.body.classList.remove("modal-open");
  };

  const handleAddPrinter = (newPrinter: any) => {
    fetchPrinters();
    setSelectedPrinter(newPrinter);
    handleCloseModal();
  };

  const handleAgree = () => {
    setIsAgreed(true);
    Cookies.set("userConsent", "true", { expires: 365 });
    setIsModalOpen(false);
    if (selectedFile) {
      handleSubmit(selectedFile);
    }
  };

  const handleSubmit = async (file: any) => {
    setLoading(true);
    try {
      // Проверяем, выбраны ли принтер, файл и качество
      if (!selectedPrinter || selectedPrinter === "0") {
        alert("Пожалуйста, выберите принтер.");
        return; // Выход из функции, если принтер не выбран
      }

      if (!file) {
        alert("Пожалуйста, выберите изображение.");
        return; // Выход из функции, если файл не выбран
      }

      if (!qualityOptions[selectedQuality]) {
        alert("Пожалуйста, выберите качество.");
        return; // Выход из функции, если качество не выбрано
      }
      const formData = new FormData();
      formData.append("printer_id", selectedPrinter);
      formData.append("quality", qualityOptions[selectedQuality]);
      if (file) {
        formData.append("img", file);
      }

      const response: any = await axios
        .post("https://nyuroprintapiv1.ru:5000/api/prints/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .catch((error) => {
          if (error.response) {
            console.error("Ошибка ответа от сервера:", error.response.data);
          } else if (error.request) {
            console.error("Ошибка запроса:", error.request);
          } else {
            console.error("Общая ошибка:", error.message);
          }
        });

      console.log("Ответ от сервера:", response.data);

      if (response.data.defect.length === 0) {
        navigate("/not-defect");
      } else {
        console.log("Прыгаем в /defect:", response.data);
        navigate("/defect", { state: { defect: response.data.defect } });
      }
      
    } catch (error: any) {
      if (error.response) {
        console.error("Ошибка ответа от сервера:", error.response.data);
      } else if (error.request) {
        console.error("Ошибка запроса:", error.request);
      } else {
        console.error("Общая ошибка:", error.message);
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
            <p>
              Загрузите и распечатайте тестовую модель{" "}
              <a
                href="@/shared/img/Model-Test.stl"
                className="link"
                download="Model-Test.stl"
              >
                Model-Test.stl
              </a>{" "}
              с предложенным на сайте качеством печати, рекомендуется
              использовать слайсер UltiMaker Cura. Затем выберите на сайте
              3D-принтер из списка или добавьте свой и укажите параметры
              качества печати. Сфотографируйте отпечатанную деталь в
              соответствии с примером и загрузите фотографию на сайт.
            </p>
          </div>
          <div className="blockk">
            <div className="selection-block">
              <div className="printer-selection">
                <p></p>
                <select
                  onChange={handlePrinterSelect}
                  value={selectedPrinter}
                >
                  {printers.map((printer: any) => (
                    <option
                      key={printer.id}
                      value={printer.id}
                    >
                      {printer.name}
                    </option>
                  ))}
                  <option value="add-new">Добавить новый принтер</option>
                </select>
              </div>
              <div className="quality-selection">
                {[
                  "Стандартный (Высота слоя 0,2 мм)",
                  "Высокий (Высота слоя 0,1 мм)",
                  "Ультра (Высота слоя 0,05 мм)",
                ].map((quality) => (
                  <div
                    key={quality}
                    className={`quality-block ${
                      selectedQuality === quality ? "active" : ""
                    }`}
                    onClick={() => handleQualitySelect(quality)}
                  >
                    <h3>{quality}</h3>
                    <p>
                      {quality === "Стандартный (Высота слоя 0,2 мм)"
                        ? "Баланс между скоростью и качеством"
                        : quality === "Высокий (Высота слоя 0,1 мм)"
                        ? "Более мелкие детали и более длительное время печати"
                        : "Высочайшее качество и значительно более длительное время"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="upload-block">
              <div className="upload-photo">
                <img
                  src={Model}
                  alt="Загруженная модель"
                />
              </div>
              <div className="upload-info">
                <p>
                  Сфотографируйте вашу 3D модель как показано на фотографии с
                  четкой картинкой и хорошим светом для более точного выявления
                  дефекта модели
                </p>
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
                <button
                  className="close-button"
                  onClick={handleCloseModal}
                >
                  ×
                </button>
                <div className="modal-body">
                  <AddPrinter onSave={handleAddPrinter} />
                </div>
              </div>
            </div>
          )}
          {isModalOpen && (
            <div className="modal-overlay">
              <div className="modal-content">
                <button
                  className="close-button2"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetFileInput();
                  }}
                >
                  ×
                </button>
                <h2>Согласие на обработку персональных данных</h2>
                <p>
                  Нажимая на кнопку "Согласиться" Вы даёте свое согласие на{" "}
                  <a
                    href="/consent"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    обработку персональных данных
                  </a>
                  .
                </p>
                <button
                  className="apply-button"
                  onClick={handleAgree}
                >
                  Согласиться
                </button>
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
    </>
  );
};

export default Started;
