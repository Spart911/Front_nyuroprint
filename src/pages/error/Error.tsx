import "./Error.css";
import '@/shared/styles/AdaptiveStyles.css'
import Header from "../../widgets/header/Header";

const Error = () => {
  return (
    <>
      <Header />
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
