import React from "react";

import "./styles.css";

const ScoreCard = ({stars, starsPercentage}) => {
 
  return (
    <div>
      <div className="row">
        <div className="side">
          <div>5 star</div>
        </div>
        <div classNameName="middle">
          <div className="bar-container">
            <div className="bar-5"  style={{width:`${starsPercentage[5]}%`}}></div>
          </div>
        </div>
        <div className="side right">
          <div>{stars[5]}</div>
        </div>
        <div className="side">
          <div>4 star</div>
        </div>
        <div className="middle">
          <div className="bar-container">
            <div className="bar-4"  style={{width:`${starsPercentage[4]}%`}}></div>
          </div>
        </div>
        <div className="side right">
          <div>{stars[4]}</div>
        </div>
        <div className="side">
          <div>3 star</div>
        </div>
        <div className="middle">
          <div className="bar-container">
            <div className="bar-3"  style={{width:`${starsPercentage[3]}%`}}></div>
          </div>
        </div>
        <div className="side right">
          <div>{stars[3]}</div>
        </div>
        <div className="side">
          <div>2 star</div>
        </div>
        <div className="middle">
          <div className="bar-container">
            <div className="bar-2"  style={{width:`${starsPercentage[2]}%`}}></div>
          </div>
        </div>
        <div className="side right">
          <div>{stars[2]}</div>
        </div>
        <div className="side">
          <div>1 star</div>
        </div>
        <div className="middle">
          <div className="bar-container">
            <div className="bar-1"  style={{width:`${starsPercentage[1]}%`}}></div>
          </div>
        </div>
        <div className="side right">
          <div>{stars[1]}</div>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
