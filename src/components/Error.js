import React from 'react';
import './Error.css'
import Header from './Header';
import './AdaptiveStyles.css'

const Error = () => {
    return (
    <>
    <Header/>
        <div className="error">
                <main className="error-content">
                    <div className="container">
                        <h1>404</h1>
                        <p>Страница не найдена</p>
                    </div>
                </main>
        </div>
    </>
    );
};

export default Error;