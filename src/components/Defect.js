import React from 'react';
import './Defect.css';
import Header from './Header';
import './AdaptiveStyles.css'
import Helmet from 'react-helmet'
import SupportChat from './SupportChat';

const Defect = () => {
    return (
        <>
        <Header/>
        <Helmet>
      <link rel = "stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"/>
      </Helmet>
        <main>
        <div className="container">
            <div className="defect-content">
                <h1 className="defect-title">
                    У вас обнаружен дефект <span style={{ color: '#61875E' }}>недоэкструзии</span>
                </h1>
                <p className="extrusion-text">
                    <span style={{ color: '#61875E' }}>Недоэкструзия</span> — это результат недостаточной или нестабильной подачи расплава. Она выражается в ямках на поверхностях, дырах, а иногда и в пропущенных слоях.
                </p>
                <div className="ic">
                    <div className="icon-text">
                    <i className="fas fa-thermometer-half fa-3x"/>
                    </div>
                    <div className="icon-text">
                    <p className="icon-text-top">Повысьте температуру печати</p>
                    <p className="icon-text-bottom">Попробуйте плавно повышать температуру хотэнда, шагами по пять-десять градусов, но будьте осторожны: превышать максимальную указанную производителем температуру не стоит, так как это может привести к деградации материала.</p>
                    </div>
                </div>
                <div className="ic">
                <i className="fas fa-wind fa-3x"/>
                <div className="icon-text">
                    <p className="icon-text-top">Повысьте значение потока расплава</p>
                    <p className="icon-text-bottom">Вероятно, что 3D-принтер чисто программно не успевает подавать материал, что и проводит к образованию дыр. Попробуйте повысить значение потока (Flow) небольшими шагами — по два-три процента.</p>
                    </div>
                </div>
                <div className="ic">
                <i className="fas fa-cogs fa-3x"/>
                <div className="icon-text">
                    <p className="icon-text-top">Проведите проверку подающего механизма</p>
                    <p className="icon-text-bottom">
                    Грязные или изношенные шестерни подающего механизма тоже могут быть причиной нестабильной подачи филамента, как и недостаточный прижим шестерней. Чтобы шестерни не пробуксовывали, почистите механизм щеткой.
                    </p>
                    </div>
                </div>
                <a href="/started">
                <button className="defect-button">Вернуться к анализу дефектов</button>
                </a>
            </div>
            </div>
        </main>
        <SupportChat />
        </>
    );
};

export default Defect;
