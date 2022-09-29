import React, { useState,useEffect } from "react";
import CarFilter from "./CarFilter";
import car_detail_list from "../data/car_detail_list.json";
import CarCard from "./CarCard";
import {db}from '../firebase/config'
import {collection,getDocs,query,where}from"firebase/firestore"

const CarFilterResult = () => {
  // const [newCars] = useState(car_detail_list);
  // const [upPriceCars] = useState(car_detail_list);
  const[details,setDetails]=useState([])
  console.log(details,"DetailsAfterFiltering>>>>>>>>>>>")
  const q=query(collection(db,"carDetail"))

  useEffect(()=>{
    const getCarDetails=async()=>{
      const data= await getDocs(q);
      setDetails(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
     
     
    }
   
    getCarDetails()
  },[])
  return (
    <div className="d-flex">
      <div className="bg--prim1 c-white">
        <CarFilter setDetails={setDetails} />
      </div>
      <div>
        <div>
          <div className="d-flex">
            {details.map((carDetial) => (
              <div className="fb-25 mw-300px">
                <CarCard carDetial={carDetial} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarFilterResult;
