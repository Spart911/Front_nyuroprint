import React from 'react';
import './NotDefect.css';
import Header from './Header';
import './AdaptiveStyles.css'
import SupportChat from './SupportChat';

const NotDefect = () => {
    return (
        <>
        <Header/>
        <main>
        <div className="not-defect-content">
        <div className="container">
            <div className="content2">
                <h1 className="hh1">ДЕФЕКТ НЕ ОБНАРУЖЕН</h1>
                <a href="/started">
                    <button className="not-defect-button">Вернуться к анализу дефектов</button>
                </a>
            </div>
            </div>
        </div>
        </main>
        <SupportChat />
        </>
    );
};

export default NotDefect;
