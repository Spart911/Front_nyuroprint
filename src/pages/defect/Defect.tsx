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

interface LocationState {
  defects: number[];
}

const Defect: React.FC = () => {
  console.log("________");
  const location = useLocation();
  console.log((location.state as LocationState)?.defects || []);
  const defects = (location.state as LocationState)?.defects || [];

  // Логируем сразу при монтировании компонента
  useEffect(() => {
    console.log("Компонент смонтирован, location.state:", location.state);
    console.log("Обнаруженные дефекты:", defects);
  }, [location.state]);

  // Логируем перед рендером
  console.log("Рендеринг компонента с дефектами:", defects);

  const handleDefectRendering = (defect: number, index: number) => {
    const defectData = defectRecommendations[defect];

    return (
      <div key={index} className="defect-item">
        <h2>{defectData.title}</h2>
        <p>{defectData.description}</p>
        <div className="solutions">
          {defectData.solutions.map((solution, idx) => (
            <div key={idx} className="solution">
              <i className={solution.icon}></i>
              <h3>{solution.title}</h3>
              <p>{solution.description}</p>
            </div>
          ))}
        </div>
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
              defects.map((defect: number, index: number) => {
                console.log(`Обработка дефекта ${defect} (${index + 1}/${defects.length})`);
                return handleDefectRendering(defect, index);
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