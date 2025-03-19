import "./Defect.css";
import Header from "../../widgets/header/Header";
import "@/shared/styles/AdaptiveStyles.css";
//@ts-ignore
import Helmet from "react-helmet";
import { useLocation } from "react-router-dom";
import SupportChat from "../supportChat/SupportChat";
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
  // ... Остальные дефекты
};

// Добавляем типизацию для location.state
interface LocationState {
  defects: number[];
}

const Defect: React.FC = () => {
  const location = useLocation();
  const defects = (location.state as LocationState)?.defects || [];

  // Логируем сразу при монтировании компонента
  useEffect(() => {
    console.log("Компонент смонтирован, location.state:", location.state);
    console.log("Обнаруженные дефекты:", defects);
  }, [location.state]);

  // Логируем перед рендером
  console.log("Рендеринг компонента с дефектами:", defects);

  // Функция для рендеринга решений для каждого дефекта
  const handleDefectRendering = (defectId: number, index: number) => {
    const defect = defectRecommendations[defectId];
    if (!defect) {
      return <div key={index}>Дефект не найден</div>;
    }
    return (
      <div key={index}>
        <h3>{defect.title}</h3>
        <p>{defect.description}</p>
        <ul>
          {defect.solutions.map((solution, i) => (
            <li key={i}>
              <i className={solution.icon}></i>
              <strong>{solution.title}</strong>: {solution.description}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      <Header />
      <Helmet />
      <main>
        <div className="container">
          <div className="defect-content">
            {defects.length > 0 ? (
              defects.map((defectId, index) => {
                console.log(`Обработка дефекта ${defectId} (${index + 1}/${defects.length})`);
                return handleDefectRendering(defectId, index);
              })
            ) : (
              <p>Нет обнаруженных дефектов для отображения.</p>
            )}
          </div>
        </div>
        <SupportChat />
      </main>
    </>
  );
};

export default Defect;
