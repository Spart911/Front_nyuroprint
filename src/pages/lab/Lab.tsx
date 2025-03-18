import Header from "../../widgets/header/Header";
import '@/shared/styles/AdaptiveStyles.css'
import "./Lab.css";
import { X, Upload } from "lucide-react";
import { useEffect } from "react";
import logo1 from "@/shared/img/Component 5.png";
import logo2 from "@/shared/img/5e356d6acc3937c43a6f01722f09743d 1.png";
import logo3 from "@/shared/img/kvantorim-2048x772-transformed 1.png";
import logo4 from "@/shared/img/logo_ff.png";
import { Box, Clock, Layout, Database, Palette, Settings } from "lucide-react";
import { useState } from "react";
import Helmet from "react-helmet";
import Navigatorr from "../../widgets/navigator/Navigatorr";

const Lab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    description: "",
    files: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    setIsModalOpen(false);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    //@ts-ignore
    setFormData((prev) => ({
      ...prev,
      files: files,
    }));
  };

  const projects = [
    {
      image: "@/shared/img/portfolio/project.png", // Замените на реальный путь к изображению
      title: "Инженерный прототип",
      description:
        'Напечатанный прототип разработки, выигравшей конкурс "Шустрик", использует технологию FDM. Это система поворота солнечных панелей, которая автоматически настраивает панели по направлению к солнцу. Внутри устройства — планетарный механизм поворота. Для печати был использован композитный пластик с добавлением карбона, что обеспечивало выдержку постоянных нагрузок и долговечность конструкции.',
    },
    {
      image: "@/shared/img/portfolio/shark.png", // Замените на реальный путь к изображению
      title: "Аниме фигурка",
      description:
        "Фигурка Кисаме из аниме, напечатанная с использованием технологии SLA. Использованы два типа смолы: обычная для фигурки и прозрачная для подставки с имитацией воды. Высокая детализация и возможность покраски.",
    },
    {
      image: "@/shared/img/portfolio/project1.png", // Замените на реальный путь к изображению
      title: "Шестерни для кофемашины",
      description:
        "Шестерни для кофемашины изготовлены методом SLA 3D-печати. Модель создана с использованием реверс-инжиниринга для точного восстановления оригинальных деталей. SLA-технология обеспечивает высокую точность и гладкую поверхность, что гарантирует надежную работу механизма в условиях ежедневной эксплуатации.",
    },
    {
      image: "@/shared/img/portfolio/project3.png", // Замените на реальный путь к изображению
      title: "Макет для создания мастер-формы лепнины",
      description:
        "Макет декоративной лепнины напечатан методом FDM 3D-печати из пластика. Изделие использовано для дальнейшего создания мастер-формы, обеспечивая точную детализацию орнамента и идеальную основу для производства гипсовых и полимерных элементов.",
    },
    {
      image: "@/shared/img/portfolio/project2.png", // Замените на реальный путь к изображению
      title: "Наконечники для ребер жесткости паруса",
      description:
        "Серия из 500 наконечников, напечатанных методом FDM 3D-печати из прочного пластика. Изделия разработаны для установки на ребра жесткости парусов, обеспечивая надежную фиксацию и устойчивость к постоянным нагрузкам. Идеальное решение для долгосрочного использования в морских условиях.",
    },
    {
      image: "@/shared/img/portfolio/project4.png", // Замените на реальный путь к изображению
      title: " Модульная стойка для хранения аксессуаров",
      description:
        "Серия стойких и легких модулей, изготовленных методом FDM 3D-печати из PLA. Предназначены для организации и хранения инструментов или аксессуаров на производстве. Проект выполнен на заказ для предприятия, обеспечивая точную подгонку и высокую прочность.",
    },
    // Добавьте больше проектов по аналогии
  ];

  const [activeProject, setActiveProject] = useState(projects[0]);
  const pricingFactors = [
    {
      icon: <Box />,
      title: "Размер модели",
      description: "Габариты изделия влияют на расход материала",
    },
    {
      icon: <Database />,
      title: "Объём заполнения",
      description: "Процент заполнения определяет прочность",
    },
    {
      icon: <Palette />,
      title: "Материал печати",
      description: "PLA, ABS, PETG и другие материалы",
    },
    {
      icon: <Clock />,
      title: "Время печати",
      description: "Длительность производства детали",
    },
    {
      icon: <Layout />,
      title: "Сложность модели",
      description: "Поддержки и сложные элементы",
    },
    {
      icon: <Settings />,
      title: "Постобработка",
      description: "Шлифовка, окраска, полировка",
    },
  ];

  useEffect(() => {
    const sliderTrack = document.querySelector(".slider-track");
    const sliderItems = document.querySelectorAll(".slider-item");
    const prevButton = document.querySelector(".prev-button");
    const nextButton = document.querySelector(".next-button");

    let currentIndex = 0;
    const itemsToShow = 3;
    //@ts-ignore
    const itemWidth = sliderItems[0]?.offsetWidth + 20 || 0;

    const handlePrev = () => {
      currentIndex = Math.max(currentIndex - itemsToShow, 0);
      //@ts-ignore
      sliderTrack.style.transform = `translateX(-${
        currentIndex * itemWidth
      }px)`;
    };

    const handleNext = () => {
      const maxIndex = sliderItems.length - itemsToShow;
      currentIndex = Math.min(currentIndex + itemsToShow, maxIndex);
      //@ts-ignore
      sliderTrack.style.transform = `translateX(-${
        currentIndex * itemWidth
      }px)`;
    };

    prevButton?.addEventListener("click", handlePrev);
    nextButton?.addEventListener("click", handleNext);

    return () => {
      prevButton?.removeEventListener("click", handlePrev);
      nextButton?.removeEventListener("click", handleNext);
    };
  }, []);

  const [activeIndex, setActiveIndex] = useState(null);

  const onTitleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
  useEffect(() => {
    // Добавляем уникальный класс к body
    document.body.classList.add("lab-page");

    // Убираем класс при размонтировании компонента
    return () => {
      document.body.classList.remove("lab-page");
    };
  }, []);

  return (
    <>
      <Header />
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
        />
      </Helmet>
      <div className="head-block">
        <div className="text-head">Добро пожаловать в студию 3D печати</div>
        <div className="text-2head">
          Промышленное качество по доступной цене
        </div>
        <div className=" block-text-head">Срочное изготовление прототипов</div>
        <div className=" block-text-head">
          Реверс-инжиниринг готовых деталей
        </div>
        <div className=" block-text-head">Запуск серийного производства</div>
        <div className=" block-text-head">
          Проектирование и 3D-моделирование
        </div>
        <div
          className="head-button"
          onClick={() => setIsModalOpen(true)}
        >
          ОСТАВИТЬ ЗАЯВКУ
        </div>
      </div>

      {/* Модальное окно */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content1">
            <button
              onClick={() => setIsModalOpen(false)}
              className="modal-close-button"
            >
              <X size={24} />
            </button>
            <h2 className="modal-header">Оформление заявки</h2>
            <form
              onSubmit={handleSubmit}
              className="modal-form"
            >
              <div className="ss">
                <label>Имя</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="ss">
                <label>Контакт</label>
                <input
                  type="text"
                  value={formData.contact}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      contact: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className="ss">
                <label>Описание</label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className="ss">
                <label>Прикрепить файлы</label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                />
                {formData.files.length > 0 && (
                  <div>Выбрано файлов: {formData.files.length}</div>
                )}
              </div>
              <button type="submit">Отправить</button>
            </form>
          </div>
        </div>
      )}

      <div className="custom-rectangle">
        <div className="text-block">Почему NYUROPRINT-LAB ?</div>

        <div className="checpoint-block">
          <div className="checpoint"></div>
          <div className="checpoint-text">
            Никаких компромиссов: только точность, только качество
          </div>
        </div>
        <div className="checpoint-block">
          <div className="checpoint"></div>
          <div className="checpoint-text">
            От прототипа до серийного производства – с нами просто
          </div>
        </div>
        <div className="checpoint-block">
          <div className="checpoint"></div>
          <div className="checpoint-text">
            Сократим издержки, расширим горизонты
          </div>
        </div>
        <div className="checpoint-block">
          <div className="checpoint"></div>
          <div className="checpoint-text">Мы печатаем, вы экономите</div>
        </div>
        <div className="checpoint-block">
          <div className="checpoint"></div>
          <div className="checpoint-text">Закроем ваши боли</div>
        </div>

        <div className="text-2block">Процесс</div>
        <div className="example-block">
          <div className="example"></div>
          <div className="example-text">
            В нашей студии 3D-печати каждая деталь проходит полный цикл
            обработки, чтобы соответствовать вашим требованиям к качеству.
            <br />
            <br />
            <strong>Разработка модели:</strong>
            <br />
            Мы начинаем с создания или доработки вашей 3D-модели. На этом этапе
            учитываются все детали и особенности будущего изделия.
            <br />
            <br />
            <strong>3D-печать:</strong>
            <br />
            Модель воплощается в реальность с использованием современных
            3D-принтеров. В процессе печати деталь обретает форму, но остаются
            характерные слои печати.
            <br />
            <br />
            <strong>Постобработка:</strong>
            <br />
            Завершающий этап — это придание изделию идеального внешнего вида и
            функциональных характеристик. Мы устраняем слои, шлифуем, полируем и
            выполняем покраску (при необходимости), чтобы добиться гладкой,
            профессиональной поверхности.
            <br />
            <br />
          </div>
        </div>

        <div className="text-2block">Технологии</div>
        <div className="example-block">
          <div className="block-tech">
            <div className="block-tech-text-right">
              <div className="example-text-right-top">FDM</div>
              <div className="example-text-right">
                Метод 3D-печати, при котором пластиковый пруток нагревается и
                послойно наносится на платформу, формируя изделие. Технология
                сочетает доступность, универсальность материалов и возможность
                создания сложных форм. Идеально подходит для прототипов,
                функциональных деталей и креативных проектов.
              </div>
            </div>
            <div className="example-print"></div>
            <div className="block-tech-text-left">
              <div className="example-text-left-top">SLA</div>
              <div className="example-text-left">
                Метод 3D-печати, основанный на послойном отверждении жидкой
                фотополимерной смолы с помощью лазера. Благодаря высокой
                точности и гладкой поверхности, изделия отличаются
                детализированностью и качественным внешним видом. Технология
                отлично подходит для создания ювелирных моделей, медицинских
                протезов и сложных прототипов.
              </div>
            </div>
          </div>
        </div>

        <div className="text-2block">Наши проекты</div>
        <div className="example-block">
          <div className="block-tech">
            <div className="print">
              {activeProject && (
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="slider-image"
                />
              )}
            </div>

            {/* Сохраняем блок с текстом */}
            <div className="block-tech-text-left1">
              {activeProject && (
                <>
                  <div className="example-text-left-top1">
                    {activeProject.title}
                  </div>
                  <div className="example-text-left1">
                    {activeProject.description}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="slider-container">
          <button className="slider-button prev-button">◀</button>
          <div className="slider-track">
            {projects.map((project, index) => (
              <div
                key={index}
                className="slider-item"
                onClick={() => setActiveProject(project)} // Устанавливаем активный проект при клике
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="slider-image"
                />
              </div>
            ))}
          </div>
          <button className="slider-button next-button">▶</button>
        </div>

        <div className="text-2block">Из чего формируется цена</div>
        <div className="price-card">
          <div className="price-card-content">
            <div className="price-grid">
              {pricingFactors.map((factor, index) => (
                <div
                  key={index}
                  className="price-item"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="price-item-icon">{factor.icon}</div>
                    <h3 className="price-item-title">{factor.title}</h3>
                  </div>
                  <p className="price-item-description">{factor.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-2block">Проект разработан при участии</div>
        <div className="carousel-section1">
          <div className="logo-container2">
            <div>
              <img
                src={logo1}
                alt="Логотип партнера 1"
              />
            </div>
            <div>
              <img
                src={logo2}
                alt="Логотип партнера 2"
              />
            </div>
            <div>
              <img
                src={logo3}
                alt="Логотип партнера 3"
              />
            </div>
            <div>
              <img
                src={logo4}
                alt="Логотип партнера 4"
              />
            </div>
          </div>
        </div>

        <div className="accordion">
          <h2 className="accordion-t">Часто задаваемые вопросы</h2>
          {[
            {
              title: "Как наш продукт сокращает трудозатраты и время?",
              content:
                "Каждый раз, когда вы меняете оборудование или материал, вы тратите время на доводку и настройку. Наша нейросеть помогает отпечатать всего лишь одну тестовую модель и сделать одно фото, чтобы по фото определить дефект, и подобрать правильные настройки к вашему оборудованию.",
            },
            {
              title: "Как мы остаемся конкурентоспособными?",
              content:
                "Наш продукт остаётся конкурентоспособным благодаря тому, что мы выставляем честную цену на работу нейронной сети, благодаря собственным вычислительным мощностям.",
            },
            {
              title: "Можно ли с нами сотрудничать?",
              content:
                'Мы всегда готовы к сотрудничеству, в любом направлении, можете связаться с нами на вкладке "Обратная связь", расположенной внизу страницы. Наша команда всегда рада новым предложениям и сотрудничеству.',
            },
            {
              title: "От чего зависит стоимость конечного сервиса?",
              content:
                "Стоимость конечного сервиса зависит от времени работы нейронной сети на наших мощностях, как и от электроэнергии. ",
            },
            {
              title: "Кто и как основал NeuroPrint?",
              content:
                "Мы команда из студентов Южного федерального университета и Донского государственного технического университета, которые заинтересованы в развитии аддитивных технологий и машинного обучения.",
            },
          ].map((item, index) => (
            <div
              className="accordion-item"
              key={index}
            >
              <div
                className="accordion-title"
                onClick={() => onTitleClick(index)}
              >
                <h2>{item.title}</h2>
                <i
                  className={`accordion-icon fas fa-chevron-down ${
                    index === activeIndex ? "open" : ""
                  }`}
                ></i>
              </div>
              <div
                className={`accordion-content ${
                  index === activeIndex ? "active" : ""
                }`}
              >
                <p>{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Navigatorr />
    </>
  );
};

export default Lab;
