
import './Help.css'
import Header from '../../widgets/header/Header';
import '@/shared/styles/AdaptiveStyles.css'
import Navigatorr from '../../widgets/navigator/Navigatorr';

const Help = () => {
    return (
        <>
            <div className="help">
                <Header/>
                    <main className="help-content">
                        <div className="container">
                            <h1>Помощь</h1>
                            <p><span>Какие форматы документов могут быть загружены?</span> <br/>Документы с расширением *.png, *.jpeg, *.jpg</p>
                            <p><span>Как сервис производит распознает дефекты?</span> <br/>В нашем проекте мы используем современные технологии, которые определяют, какой дефект на картинке. После определения сервис автоматически подбирает нужные рекомендации параметров под ваш принтер</p>
                            <p><span>Сколько файлов можно загрузить?</span> <br/>Одновременно можно загрузить и обрабатывать один документ, общее количество загружаемых файлов неограниченно</p> 
                            <p><span>Сохраняются ли документы в сервисе по истечению сессии?</span> <br/>После обработки загруженные файлы проходят процесс обезличивания и сохраняются в целях усовершенствования имеющегося продукта</p>
                        </div>
                    </main>
                <Navigatorr/>
            </div>
        </>
    );
};

export default Help;