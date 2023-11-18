import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import img from '../../assets/logo2.png';

const Header = () => {
	return (
        <div className = 'homePageHeader'>
        <table className>
        <tbody>
        <tr>
          <td>

              <Link to="/">
                  <img src={img} alt = "Logo" style = {{ width:50, height:50, marginLeft: 2 + 'vw', marginTop:0  + 'vh', float:'left'}} />
              </Link>
              
          </td>
          <td>
          <div className = "logo-text">ARMADA AI</div>
          </td>
          

        </tr>
        </tbody>
      </table>

      </div>
	);
};

export default Header;