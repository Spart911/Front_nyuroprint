import { useState } from "react";
import "./Defect.css";
import Header from "../../widgets/header/Header";
import "@/shared/styles/AdaptiveStyles.css";
//@ts-ignore
import Helmet from "react-helmet";
import axios from "axios";
import { useLocation } from "react-router-dom";
import SupportChat from "../supportChat/SupportChat";

const Defect = () => {
  const [rating, setRating] = useState(() => {
    const savedRating = localStorage.getItem("rating");
    return savedRating ? JSON.parse(savedRating) : 0;
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const location = useLocation();
  const defect = location.state?.defect;

  const handleRatingChange = async (selectedRating: any) => {
    try {
      const response = await axios.post(
        "https://nyuroprintapi.ru:5000/api/feedback/",
        { rating: selectedRating },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setRating(selectedRating);
      setIsSubmitted(true);

      localStorage.setItem("rating", JSON.stringify(selectedRating));

      console.log("Feedback submitted successfully", response.data);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Не удалось отправить оценку. Попробуйте еще раз.");
    }
  };

  const ratingEmojis = ["😫", "😕", "😐", "🙂", "😄"];
  const ratingColors = ["#FF4D4D", "#FF9F1C", "#FFD700", "#90EE90", "#2ECC71"];

  return (
    <>
      <Header />
      <Helmet
        link={[
          {
            rel: "stylesheet",
            href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css",
          },
        ]}
      />
      <main>
        <div className="container">
          <div className="defect-content">
            {defect === 1 ? (
              <>
                <h1 className="defect-title">
                  У вас обнаружен дефект{" "}
                  <span style={{ color: "#61875E" }}>недоэкструзии</span>
                </h1>
                <p className="extrusion-text">
                  <span style={{ color: "#61875E" }}>Недоэкструзия</span> — это
                  результат недостаточной или нестабильной подачи расплава. Она
                  выражается в ямках на поверхностях, дырах, а иногда и в
                  пропущенных слоях.
                </p>
                <div className="ic">
                  <div className="icon-text">
                    <i className="fas fa-thermometer-half fa-3x" />
                  </div>
                  <div className="icon-text">
                    <p className="icon-text-top">Повысьте температуру печати</p>
                    <p className="icon-text-bottom">
                      Попробуйте плавно повышать температуру хотэнда, шагами по
                      пять-десять градусов, но будьте осторожны: превышать
                      максимальную указанную производителем температуру не
                      стоит, так как это может привести к деградации материала.
                    </p>
                  </div>
                </div>
                <div className="ic">
                  <i className="fas fa-wind fa-3x" />
                  <div className="icon-text">
                    <p className="icon-text-top">
                      Повысьте значение потока расплава
                    </p>
                    <p className="icon-text-bottom">
                      Вероятно, что 3D-принтер чисто программно не успевает
                      подавать материал, что и проводит к образованию дыр.
                      Попробуйте повысить значение потока (Flow) небольшими
                      шагами — по два-три процента.
                    </p>
                  </div>
                </div>
                <div className="ic">
                  <i className="fas fa-cogs fa-3x" />
                  <div className="icon-text">
                    <p className="icon-text-top">
                      Проведите проверку подающего механизма
                    </p>
                    <p className="icon-text-bottom">
                      Грязные или изношенные шестерни подающего механизма тоже
                      могут быть причиной нестабильной подачи филамента, как и
                      недостаточный прижим шестерней. Чтобы шестерни не
                      пробуксовывали, почистите механизм щеткой.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="result-evaluation-container">
                  <div className="result-evaluation-menu">
                    <h2 className="result-evaluation-title">
                      Оцените результат
                    </h2>
                    <div className="rating-scale">
                      {ratingEmojis.map((emoji, index) => (
                        <div
                          key={index + 1}
                          className={`rating-circle ${
                            rating === index + 1 ? "selected" : ""
                          }`}
                          style={{
                            backgroundColor: ratingColors[index],
                            border:
                              rating === index + 1 ? "3px solid #000" : "none",
                            cursor: isSubmitted ? "default" : "pointer",
                          }}
                          onClick={() =>
                            !isSubmitted && handleRatingChange(index + 1)
                          }
                        >
                          {emoji}
                        </div>
                      ))}
                    </div>
                    <div className="rating-labels">
                      <span>Совсем не доволен</span>
                      <span>Очень доволен</span>
                    </div>
                    {isSubmitted && (
                      <div className="feedback-thanks">
                        Спасибо за вашу оценку!
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
            <a href="/started">
              <button className="defect-button">
                Вернуться к анализу дефектов
              </button>
            </a>
          </div>
        </div>
      </main>
      <SupportChat />
    </>
  );
};

export default Defect;
