import '@elastic/eui/dist/eui_theme_light.css';
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  const [savedata,setsavedata]=useState([])
  const [searcheddata,setsearcheddata]=useState([])


  return (
    <div>
     {document.body.style.backgroundColor = "black"}

      <Router>
        <Navbar 
        setsavedata={setsavedata}
        savedata={savedata}
        />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <News
              search={false}
                setstoreddata={setsavedata}
                storeddata={savedata}
             
              />
            }
          />
            <Route
            exact
            path="/search"
            element={
              <News
                search={true}
                setstoreddata={setsearcheddata}
                storeddata={searcheddata}
             
              />
            }
          />
         
        </Routes>
      </Router>
    </div>
  );
}
