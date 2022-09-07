import "./css/app.css";
import React from 'react';
import ReactDOM from 'react-dom';
import Calldetail from './Calldetail.jsx';
import Header from './Header.jsx';
import Tabsview from './Tabsview.jsx';
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className="container">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Tabsview />} />
          <Route path="/calldetail" element={<Calldetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
