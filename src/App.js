import { BrowserRouter as Router, Route, Routes, BrowserRouter} from 'react-router-dom';
import React from 'react';
import HomePage from './HomePage';
import Privacy from './components/Privacy';
import Agreement from './components/Agreement'
import Help from './components/Help'
import Lab from './components/Lab'
import Feedback from './components/Feedback';
import About from './components/About';
import Started from './components/Started';
import AddPrinter from './components/AddPrinter';
import Defect from './components/Defect';
import NotDefect from './components/NotDefect';
import Consent from './components/Consent'
import Error from './components/Error';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element = {<HomePage/>} />
          <Route path="/lab" element = {<Lab/>} />
          <Route path="/privacy" element = {<Privacy/>}/>
          <Route path="/agreement" element = {<Agreement/>}/>
          <Route path="/help" element = {<Help/>}/>
          <Route path="/feedback" element = {<Feedback/>}/>
          <Route path="/about" element = {<About/>}/>
          <Route path="/started" element = {<Started/>}/>
          <Route path="/add" element = {<AddPrinter/>}/>
          <Route path="/defect" element = {<Defect/>}/>
          <Route path="/not-defect" element = {<NotDefect/>}/>
          <Route path="/consent" element = {<Consent/>}/>
          <Route path="/error" element = {<Error/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;