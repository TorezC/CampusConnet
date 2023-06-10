import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Home from './pages/home/Home';

import VenomConnect from 'venom-connect';
import { useEffect, useState } from "react";
import { initVenomConnect } from "./components/wallet/configure";

function App() {
  const [venomConnect, setVenomConnect] = useState<VenomConnect | undefined>();
  const init = async () => {
    const _venomConnect = await initVenomConnect();
    setVenomConnect(_venomConnect);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home venomConnect={venomConnect}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
