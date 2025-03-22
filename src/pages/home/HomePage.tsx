import "./HomePage.css";
import "@/shared/styles/AdaptiveStyles.css";
import Header from "@/widgets/header/Header";
import Footer from "@/widgets/footer/Footer";
import backgroundPhoto from "@/shared/img/start_image.webp";
import logo_FSI from "@/shared/img/logo_FSI.png";
import logo1 from "@/shared/img/Component 5.png";
import logo2 from "@/shared/img/5e356d6acc3937c43a6f01722f09743d 1.png";
import logo3 from "@/shared/img/kvantorim-2048x772-transformed 1.png";
import logo4 from "@/shared/img/logo_ff.png";
import img1 from "@/shared/img/3.jpg";
import img2 from"@/shared/img/1.jpeg";
import { useState } from "react";
//@ts-ignore
import { Analytics } from "@vercel/analytics/react";
import { Helmet } from "react-helmet";

function HomePage() {
  const [activeIndex, setActiveIndex] = useState(null);

  const onTitleClick = (index: any) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <>
      <Header />
      <div className="HomePage">
        <Helmet
          link={[
            {
              rel: "stylesheet",
              href: "https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap",
            },
            {
              href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css",
              rel: "stylesheet",
            },
          ]}
        />
        <main className="main-content">
          <div className="container">
            <section
              className="photo-section"
              style={{ backgroundImage: `url(${backgroundPhoto})` }}
            >
              <div
                className="overlay"
                style={{ opacity: 0.4 }}
              ></div>
              <div className="content">
                <h1>Устраним ваши дефекты</h1>
                <p>
                  Используя наш продукт, вы избавите себя от лишних трудозатрат
                  при 3D печати
                </p>
                <div className="frame">
                  <span className="frame-text">Приступим</span>
                  <a href="/started">
                    <button className="cta-button">Get started</button>
                  </a>
                </div>
              </div>
            </section>

            <section className="text-section">
              <h1>Почему NyuroPrint?</h1>
              <p>
                Наше программное обеспечение нацелено на обнаружение дефектов на
                аддитивном производстве и их устранение. Мы используем алгоритмы
                и нейросетевой подход для определения искажений на фотографиях
                отпечатанных изделий, а по выходу наша программа предоставляет
                инструкции по их оптимальному устранению. На данный момент
                ведется разработка приложения, которое будет самостоятельно
                трудиться над их устранением, путем корректировки параметров
                печати. Наше решение поможет вам сократить временные и
                финансовые издержки на производстве.
              </p>
            </section>

            <section className="cards-section">
              <div className="card">
                <img
                  src={img1}
                  alt="3D печать"
                />
                <div className="text-content">
                  <h2>Экономия времени и материала</h2>
                  <p>
                    Пользователи могут быстро находить решения для своих проблем
                    с 3D печатью, что сокращает временные и финансовые затраты
                    на производстве, которые появляются при поиске информации о
                    дефектах и экспериментальном исправлении.
                  </p>
                  <h2>Легкая интеграция</h2>
                  <p>
                    Наш продукт представляет собой интернет-сервис, в котором
                    все вычисления выполняются на нашем оборудовании. Это
                    позволяет максимально быстро и просто внедрить наше решение
                    на производство.
                  </p>
                </div>
              </div>
              <div className="card">
                <div
                  className="text-content"
                  style={{ textAlign: "right" }}
                >
                  <h2>Непрерывное совершенствование</h2>
                  <p>
                    Система постоянно обучается на новых данных и отзывах
                    пользователей, повышая точность распознавания дефектов и
                    эффективность решений. Это обеспечивает актуальность сервиса
                    и его адаптацию к новым технологиям 3D печати.
                  </p>
                  <h2>Инновационные технологии</h2>
                  <p>
                    Для решения проблем 3D печати сервис использует новейшие
                    технологии, такие как нейросетевой подход классификации на
                    изображениях, алгоритмы строящие зависимость дефектов от
                    параметров.
                  </p>
                </div>
                <img
                  src={img2}
                  alt="Инновационные технологии"
                />
              </div>
            </section>

            
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

              <div className="text-2block">Работа выполнена при поддержке гранта Фонда содействия инновациям, предоставленного в рамках программы «Студенческий стартап» федерального проекта «Платформа университетского технологического предпринимательства»</div>

              <div className="fsi-logo-container" style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                marginTop: '5px', 
                marginBottom: '60px' 
              }}>
                <img 
                  src={logo_FSI} 
                  alt="Логотип FSI" 
                  style={{ 
                    width: '30%', 
                    height: 'auto' 
                  }} 
                />
              </div>

          </div>
        </main>
      </div>
      <Footer />
      <Analytics />
    </>
  );
}

export default HomePage;
