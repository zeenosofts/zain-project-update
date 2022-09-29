import React, { useState } from "react";
import lising from "../assets/carTypes/lising.png";
import geep from "../assets/carTypes/geep.png";
import masait from "../assets/carTypes/masait.png";
import mshari from "../assets/carTypes/mshari.png";
import myuhadim from "../assets/carTypes/myuhadim.png";
import ofona from "../assets/carTypes/ofona.png";
import prati from "../assets/carTypes/prati.png";
import shait from "../assets/carTypes/shait.png";
import {useNavigate} from 'react-router-dom'

export default function CarTypes({ setSelectedCarType, setSelectedUI }) {
  const navigate=useNavigate()
  const [carTypes, setCarTypes] = useState([
    // {
    //   name: "ליסינג",
    //   imgSrc: lising,
    // },
    {
      name: "Private",
      imgSrc: prati,
    },
    // {
    //   name: "משאית",
    //   imgSrc: masait,
    // },
    {
      name: "Mishari",
      imgSrc: mshari,
    },
    // {
    //   name: "גיפים",
    //   imgSrc: geep,
    // },
    // {
    //   name: "אופנועים",
    //   imgSrc: ofona,
    // },
    // {
    //   name: "כלי שייט",
    //   imgSrc: shait,
    // },
    // {
    //   name: "מיוחדים",
    //   imgSrc: myuhadim,
    // },
  ]);

  return (
    <div className="grid-md grid-lg gap-8 pl-20px pr-20px">
      {carTypes.map((item) => (
        <div
          className="bc-transparent"
          style={{cursor:"pointer"}}
          key={item.name}
          onClick={() => {
            setSelectedCarType(item.name);
           navigate(`/carDetailList/${item.name}`)  
          }}
        >
          <h3 className="mr-12px ff-rubik fw-500 fs-36px">{item.name}</h3>
          <div
            className="br-24px"
            style={{ boxShadow: "5px 10px 18px #888888" }}
          >
            <img className="car-type-img" src={item.imgSrc} />
          </div>
        </div>
      ))}
    </div>
  );
}
