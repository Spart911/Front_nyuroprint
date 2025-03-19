import About from "@/pages/about/About";
import AddPrinter from "@/pages/addPrinter/AddPrinter";
import Agreement from "@/pages/agreement/Agreement";
import Consent from "@/pages/consent/Consent";
import Feedback from "@/pages/feedback/Feedback";
import Help from "@/pages/help/Help";
import Lab from "@/pages/lab/Lab";
import NotDefect from "@/pages/notDefect/NotDefect";
import Privacy from "@/pages/privacy/Privacy";
import Started from "@/pages/started/Started";
import HomePage from "@/pages/home/HomePage";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Error from "@/pages/error/Error";
import Defect from "@/pages/defect/Defect";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/lab"
          element={<Lab />}
        />
        <Route
          path="/privacy"
          element={<Privacy />}
        />
        <Route
          path="/agreement"
          element={<Agreement />}
        />
        <Route
          path="/help"
          element={<Help />}
        />
        <Route
          path="/feedback"
          element={<Feedback />}
        />
        <Route
          path="/about"
          element={<About />}
        />
        <Route
          path="/started"
          element={<Started />}
        />
        <Route
          path="/add"
          element={<AddPrinter />}
        />
        <Route
          path="/defect"
          element={<Defect />}
        />
        <Route
          path="/not-defect"
          element={<NotDefect />}
        />
        <Route
          path="/consent"
          element={<Consent />}
        />
        <Route
          path="/error"
          element={<Error />}
        />
      </Routes>
    </BrowserRouter>
  );
};
