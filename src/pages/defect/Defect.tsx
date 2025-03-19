import "./Defect.css";
import Header from "../../widgets/header/Header";
import axios from "axios";
import { useState } from "react";
import "@/shared/styles/AdaptiveStyles.css";
//@ts-ignore
import Helmet from "react-helmet";
import { useLocation } from "react-router";
import { useEffect } from "react";

// Определение интерфейсов для типизации
interface Solution {
  icon: string;
  title: string;
  description: string;
}

interface DefectData {
  title: string;
  description: string;
  solutions: Solution[];
}

interface DefectRecommendations {
  [key: number]: DefectData;
}

const defectRecommendations: DefectRecommendations = {
  0: {
    title: "Недоэкструзия",
    description:
      "Недостаточная или нестабильная подача расплава, приводящая к ямкам, пропущенным слоям и пустотам.",
    solutions: [
      {
        icon: "fas fa-thermometer-half fa-3x",
        title: "Повысьте температуру печати",
        description:
          "Попробуйте плавно повышать температуру хотэнда, шагами по 5-10 градусов.",
      },
      {
        icon: "fas fa-wind fa-3x",
        title: "Повысьте значение потока расплава",
        description: "Попробуйте повысить значение потока (Flow) на 2-3%.",
      },
      {
        icon: "fas fa-tachometer-alt fa-3x",
        title: "Снизьте скорость печати",
        description: "Уменьшите скорость печати на 10-20%, особенно для мелких деталей.",
      },
      {
        icon: "fas fa-ruler-vertical fa-3x",
        title: "Уменьшите высоту слоя",
        description: "Снизьте высоту слоя для лучшего сцепления между слоями.",
      },
    ],
  },
  1: {
    title: "Переэкструзия",
    description:
      "Избыточное количество материала, приводящее к наростам, затекам и неровностям.",
    solutions: [
      {
        icon: "fas fa-sliders-h fa-3x",
        title: "Уменьшите поток (Flow)",
        description: "Понизьте параметр потока на 2-5%.",
      },
      {
        icon: "fas fa-thermometer-empty fa-3x",
        title: "Снизьте температуру печати",
        description: "Попробуйте снизить температуру на 5-10 градусов.",
      },
      {
        icon: "fas fa-tachometer-alt fa-3x",
        title: "Увеличьте скорость печати",
        description: "Немного повысьте скорость печати для уменьшения количества выдавливаемого пластика.",
      },
      {
        icon: "fas fa-ruler-vertical fa-3x",
        title: "Проверьте калибровку экструдера",
        description: "Выполните калибровку шагов экструдера (E-steps) для точной подачи материала.",
      },
    ],
  },
  2: {
    title: "Сопли",
    description: "Тонкие нити материала между деталями.",
    solutions: [
      {
        icon: "fas fa-wind fa-3x",
        title: "Настройте ретракт",
        description: "Увеличьте скорость и длину ретракта на 0.5-1мм.",
      },
      {
        icon: "fas fa-thermometer-empty fa-3x",
        title: "Снизьте температуру",
        description: "Снизьте температуру печати на 5-10 градусов.",
      },
      {
        icon: "fas fa-tachometer-alt fa-3x",
        title: "Настройте скорость перемещения",
        description: "Увеличьте скорость перемещения (Travel Speed) на 10-20 мм/с.",
      },
      {
        icon: "fas fa-sliders-h fa-3x", 
        title: "Включите настройку Z-hop",
        description: "Активируйте подъем по оси Z при переходах на 0.2-0.4мм.",
      },
    ],
  },
  3: {
    title: "Отлипание",
    description: "Проблемы с адгезией первого слоя.",
    solutions: [
      {
        icon: "fas fa-ruler fa-3x",
        title: "Калибровка стола",
        description: "Убедитесь, что стол выровнен правильно и первый слой имеет оптимальную высоту.",
      },
      {
        icon: "fas fa-temperature-high fa-3x",
        title: "Повышение температуры стола",
        description: "Поднимите температуру стола на 5-10 градусов.",
      },
      {
        icon: "fas fa-tachometer-alt fa-3x",
        title: "Снизьте скорость первого слоя",
        description: "Уменьшите скорость печати первого слоя на 30-50%.",
      },
      {
        icon: "fas fa-expand-arrows-alt fa-3x",
        title: "Увеличьте ширину первого слоя",
        description: "Установите первый слой шире на 10-20% для лучшей адгезии.",
      },
    ],
  },
  4: {
    title: "Пузыри",
    description: "Воздушные полости и пузырьки в материале печати.",
    solutions: [
      {
        icon: "fas fa-thermometer-half fa-3x",
        title: "Скорректируйте температуру",
        description: "Подберите оптимальную температуру печати, избегая перегрева материала.",
      },
      {
        icon: "fas fa-tachometer-alt fa-3x",
        title: "Снизьте скорость печати",
        description: "Уменьшите скорость печати на 10-15% для лучшего выхода газов из пластика.",
      },
      {
        icon: "fas fa-fill-drip fa-3x",
        title: "Проверьте заполнение", 
        description: "Увеличьте заполнение (Infill) до 15-25% для лучшей структуры.",
      },
      {
        icon: "fas fa-fan fa-3x",
        title: "Настройте охлаждение",
        description: "Увеличьте скорость вентилятора охлаждения до 70-100%.",
      },
    ],
  },
  5: {
    title: "Расслоение",
    description: "Разделение и отсоединение слоев друг от друга.",
    solutions: [
      {
        icon: "fas fa-thermometer-three-quarters fa-3x",
        title: "Повысьте температуру печати",
        description: "Увеличьте температуру хотэнда на 5-15 градусов для лучшего сцепления слоев.",
      },
      {
        icon: "fas fa-ruler-vertical fa-3x",
        title: "Уменьшите высоту слоя",
        description: "Снизьте высоту слоя для увеличения площади контакта между слоями.",
      },
      {
        icon: "fas fa-fan fa-3x",
        title: "Уменьшите охлаждение",
        description: "Снизьте скорость вентилятора до 30-50% для лучшего сплавления слоев.",
      },
      {
        icon: "fas fa-sliders-h fa-3x",
        title: "Увеличьте ширину экструзии",
        description: "Повысьте параметр ширины экструзии (Extrusion Width) на 5-10%.",
      },
    ],
  },
  6: {
    title: "Волнистость",
    description: "Регулярные волны или рябь на поверхности печати.",
    solutions: [
      {
        icon: "fas fa-tachometer-alt fa-3x",
        title: "Снизьте скорость печати",
        description: "Уменьшите скорость печати на 20-30%, особенно для внешних стенок.",
      },
      {
        icon: "fas fa-ruler-combined fa-3x",
        title: "Настройте ускорение",
        description: "Снизьте значения ускорения в слайсере на 30-50%.",
      },
      {
        icon: "fas fa-wrench fa-3x",
        title: "Проверьте жесткость рамы",
        description: "Убедитесь, что рама принтера жестко закреплена и не имеет люфтов.",
      },
      {
        icon: "fas fa-sliders-h fa-3x",
        title: "Минимизируйте рывки (jerk)",
        description: "Уменьшите значения рывков (jerk) или настройки резонанса в прошивке.",
      },
    ],
  },
};

// Добавляем типизацию для location.state
interface LocationState {
  defect: number[];
}


const Defect: React.FC = () => {
  const [rating, setRating] = useState(() => {
    const savedRating = localStorage.getItem("rating");
    return savedRating ? JSON.parse(savedRating) : 0;
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const location = useLocation();
  // Используем приведение типов для location.state
  const defects = (location.state as LocationState)?.defect || [];

  const handleRatingChange = async (selectedRating: any) => {
    try {
      const response = await axios.post(
        "https://nyuroprintapiv1.ru:5000/api/feedback/",
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

  // Добавляем логирование при монтировании компонента
  useEffect(() => {
    console.log("Компонент Defect смонтирован");
    console.log("Состояние location:", location);
    console.log("Обнаруженные дефекты:", defects);
    
    // Логирование доступных рекомендаций
    console.log("Доступные рекомендации:", defectRecommendations);
    
    // Возвращаем функцию очистки, которая будет вызвана при размонтировании
    return () => {
      console.log("Компонент Defect размонтирован");
    };
  }, [location, defects]);

  // Логирование перед рендерингом
  console.log("Рендеринг компонента Defect с", defects.length, "дефектами");

  const handleDefectRendering = (defect: number, index: number) => {
    try {
      const defectData = defectRecommendations[defect];
      if (!defectData) {
        console.warn(`Для дефекта ${defect} нет рекомендаций`);
        return null; // Если данных по дефекту нет, ничего не рендерим
      }

      console.log(`Дефект ${defect}: ${defectData.title}`)
      console.log(`Количество решений: ${defectData.solutions.length}`);

      return (
        <div key={index}>
          <h1 className="defect-title1">
            <span style={{ color: "#61875E" }}>{defectData.title}</span>
          </h1>
          <p className="extrusion-text">{defectData.description}</p>
          {defectData.solutions.map((solution: Solution, solIndex: number) => {
            console.log(`Решение ${solIndex + 1} для дефекта ${defect}: ${solution.title}`);
            return (
              <div className="ic" key={solIndex}>
                <i className={solution.icon} />
                <div className="icon-text">
                  <p className="icon-text-top">{solution.title}</p>
                  <p className="icon-text-bottom">{solution.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      );
    } catch (error) {
      console.error("Ошибка при обработке дефекта:", error);
      return <p>Ошибка при загрузке данных дефекта.</p>;
    }
  };

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
          <h1 className="defect-title"><span>Обнаруженные дефекты:</span></h1>
            {defects.length > 0 ? (
              defects.map((defect: number, index: number) => {
                console.log(`Обработка дефекта ${defect} (${index + 1}/${defects.length})`);
                return handleDefectRendering(defect, index);
              })
            ) : (
              <p>Нет обнаруженных дефектов для отображения.</p>
            )}
          </div>

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
        </div>
      </main>
    </>
  );
};

export default Defect;