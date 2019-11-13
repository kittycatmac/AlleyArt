import React from "react";
import "./card.css";

const Card = () => (
  <div className="card small">
    <div className="card-image waves-effect waves-block waves-light">
      <img className="activator" src="http://cdn.ebaumsworld.com/thumbs/2016/07/14/045928/84940917/artsmall.jpg" alt="art"></img>
    </div>
    <div className="card-content">
      <span className="card-title activator grey-text text-darken-4">Mirco Art<i className="material-icons right">Save</i></span>
      <p><a href="/">Map</a></p>
    </div>
    <div className="card-reveal">
      <span className="card-title grey-text text-darken-4">Micro Art<i className="material-icons right">close</i></span>
      <p>Here is some more information about this product that is only revealed once clicked on.</p>
    </div>
  </div>
);

export default Card;