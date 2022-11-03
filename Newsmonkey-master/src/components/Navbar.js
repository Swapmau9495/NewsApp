import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {


  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand text-primary" to="/">
            NewsMonkey
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
              {/* <li className="nav-item"> */}
                <Link className="nav-link active " aria-current="page" to="/">
                 <h2 style={{color:"#0aed84"}} > New Stories</h2>
                </Link>
              {/* </li> */}
              {/* <li className="nav-item"> */}
                <Link className="nav-link active " aria-current="page" to="/search">
                <h2 style={{color:"#0aed84"}} >Search</h2>
                  
                </Link>
              {/* </li> */}
             
         
          </div>
        </div>
      </nav>
    </div>
  );
}
