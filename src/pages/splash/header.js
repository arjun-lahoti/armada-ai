import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import img from '../../assets/logo2.png';
import armada from "../../assets/armada-ai.png";
import armada_txt from "../../assets/armada-txt.png";


const Header = () => {
	return (
        <div>
          <div className="logo-container">
          <img src={armada} alt = "Logo" className="armada-logo" />
          </div>

          <img className = "armada-text" src={armada_txt} alt = "Logo"/>
        </div>
	);
};

export default Header;