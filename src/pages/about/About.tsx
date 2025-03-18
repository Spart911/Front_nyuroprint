import Header from "@/widgets/header/Header";
import Navigatorr from "@/widgets/navigator/Navigatorr";
import "@/shared/styles/index.css";
import "./About.css";
import Helmet from "react-helmet";

import EgorPhoto from "@/shared/img/Egor.jpg";
import MichaelPhoto from "@/shared/img/Michael.jpg";

const About = () => {
  const teamMembers = [
    {
      name: "Столбовой Егор Васильевич",
      role: "Руководитель проекта",
      degree: "Эксперт по аддаптивным технологиям и нейронным сетям",
      photo: EgorPhoto,
    },
    {
      name: "Кравцов Михаил Михайлович",
      role: "Сооснователь проекта",
      degree:
        "Магистр по специальности “Нанотехнологии и микросистемная техника”, программист.",
      photo: MichaelPhoto,
    },
  ];
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
      <main className="about-content">
        <div className="container">
          <section className="about-section">
            <h1>О нас</h1>
            <p>
              NyuroPrint - это инновационный сервис, основанный на передовых
              алгоритмах искусственного интеллекта, специально разработанных для
              обнаружения дефектов 3D печати. Мы понимаем, что качество 3D
              печати играет решающую роль в производственных процессах, поэтому
              наша цель - предоставить вам инструменты для минимизации временных
              и финансовых затрат на отладку оборудования. С NyuroPrint вы
              сможете оперативно обнаруживать и исправлять дефекты, что позволит
              вам экономить как время, так и ресурсы.
            </p>
          </section>
          <section className="team-section">
            {teamMembers.map((member) => (
              <div
                className="team-card"
                key={member.name}
              >
                <div className="team-photo-block">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="team-photo"
                  />
                </div>
                <div className="team-info-block">
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                  <p>{member.degree}</p>
                </div>
              </div>
            ))}
          </section>
          <section className="contact-section">
            <h1>Контакты</h1>
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contact-text">nyuroprint@yandex.ru</div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="contact-text">+7 (999) 691 1885</div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="contact-text">
                  г.Ростов-на-Дону, Ростовская обл. Почтовый индекс: 344000
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Navigatorr />
    </>
  );
};

export default About;
