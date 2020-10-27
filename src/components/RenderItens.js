import React from "react";
import noimage from "../assets/images/noimage.png";


export default function RenderItens({ key, index, content }) {
  return (
      <div className="card" key={key}>
          <div className="card-img"> <img src={ content.imageUrl ? content.imageUrl : noimage } alt={content.name} /> </div>
          <div className="card-name"> <p><span>{content.name}</span></p> </div>
          <div className="card-value"> <p><span>$ {content.value}</span></p> </div>
      </div>
  );
};
