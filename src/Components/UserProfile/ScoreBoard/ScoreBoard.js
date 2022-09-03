import React from "react";

import "./styles.css";

import StarIcon from '@mui/icons-material/Star';

const ScoreBoard = () => {
  return (
    <>
      {/* <span className="heading">User Rating</span>
      <span className="fa fa-star checked"></span>
      <span className="fa fa-star checked"></span>
      <span className="fa fa-star checked"></span>
      <span className="fa fa-star checked"></span>
      <span className="fa fa-star"></span> */}
      {/* <p>4.1 average based on 254 reviews.</p> */}
      <h4>Average User Rating </h4>
      <h2 className="bold padding-bottom-7">
        4.3 <small className="h5 text-muted">/ 5</small>
      </h2>
      <hr style={{ border: "3px solid #f1f1f1" }} />

      <div className="row">
        <div className="container">
        <div className="side">
          <div>5<StarIcon  sx={{ fontSize: "20px" }} style={{color:"orange"}} /></div>
        </div>
        <div className="middle ">
          <div className="bar-container">
            <div className="bar-5"></div>
          </div>
        </div>
        <div className="side right">
          <div>150</div>
        </div> </div> 
        <div className="container"> 
        <div className="side">
          <div>4<StarIcon  sx={{ fontSize: "20px" }} style={{color:"orange"}}/></div>
        </div>
        <div className="middle">
          <div className="bar-container">
            <div className="bar-4"></div>
          </div>
        </div>
        <div className="side right">
          <div>63</div>
        </div> </div>
        <div className="container">
        <div className="side">
          <div>3<StarIcon  sx={{ fontSize: "20px" }} style={{color:"orange"}}/></div>
        </div>
        <div className="middle">
          <div className="bar-container">
            <div className="bar-3"></div>
          </div>
        </div>
        <div className="side right">
          <div>15</div>
        </div> </div>

        <div className = "container"> 
        <div className="side">
          <div>2<StarIcon  sx={{ fontSize: "20px" }} style={{color:"orange"}}/></div>
        </div>
        <div className="middle">
          <div className="bar-container">
            <div className="bar-2"></div>
          </div>
        </div>
        <div className="side right">
          <div>6</div>
        </div> </div>
        <div className="container">
        <div className="side">
          <div>1<StarIcon  sx={{ fontSize: "20px" }} style={{color:"orange"}}/></div>
        </div>
        <div className="middle">
          <div className="bar-container">
            <div className="bar-1"></div>
          </div>
        </div>
        <div className="side right">
          <div>20</div>
        </div> </div>
      </div>
    </>
  );
};

export default ScoreBoard;
