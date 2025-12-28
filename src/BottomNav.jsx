import React, { useState } from "react";
import { Link } from "react-router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./assets/BottomNav.css";
import "./components/FontAwesome";

const BottomNav = () => {
  // 현재 선택된 아이콘을 관리하는 state
  const [activeNav, setActiveNav] = useState(1);

  return (
    <nav className="wrapper">
      <div>
        <div>
          <Link to="/home" className="nav-link" onClick={() => setActiveNav(1)}>
            <div>
              <FontAwesomeIcon
                icon="torii-gate"
                className={activeNav === 1 ? "nav-item active" : "nav-item"}
              />
            </div>
          </Link>
        </div>
        <div>
          <Link to="/kintai" className="nav-link" onClick={() => setActiveNav(2)}>
            <div>
              <FontAwesomeIcon
                icon="calendar-days"
                className={activeNav === 2 ? "nav-item active" : "nav-item"}
              />
            </div>
          </Link>
        </div>
        <div>
          <Link to="/third" className="nav-link" onClick={() => setActiveNav(3)}>
            <div>
              <FontAwesomeIcon
                icon="upload"
                className={activeNav === 3 ? "nav-item active" : "nav-item"}
              />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;