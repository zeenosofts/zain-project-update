import React, { useState,useEffect } from "react";
import car_detail_list from "../data/car_detail_list.json";
import key from "../assets/key.png";
import keyHold from "../assets/keyHold.png";
import type_list_car_cover from "../assets/type_list_car_cover.png";
import CarCard from "./CarCard";
import CarDetial from "./CarDetial";
import  {AiOutlineArrowDown}  from "react-icons/ai"
import {BsCalendarDateFill}from 'react-icons/bs'
import {useParams} from 'react-router-dom'
import {db}from '../firebase/config'
import {collection,getDocs,query,where,orderBy}from"firebase/firestore"

function CarDetialList({ selectedCarType, setSelectedCarType, setSelectedUI }) {
  const [carDetial, setCarDetial] = useState(null);
   const[details,setDetails]=useState([])
   console.log(details,"123")
  const [carDetialList] = useState(car_detail_list);

const {id}=useParams()
const q=query(collection(db,"carDetail"),where("carType","==",id))

useEffect(()=>{
  const getCarDetails=async()=>{
    const data= await getDocs(q);
    setDetails(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
   
   
  }
 
  getCarDetails()
},[id])

const handleSorting=async ()=>{
  const qu= await query(collection(db,"carDetail"),where("carType","==",id),orderBy("price","asc"))

  const data= await getDocs(qu);

  setDetails(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
}
const dateSorting=async()=>{
  const qu= await query(collection(db,"carDetail"),where("carType","==",id),orderBy("year","desc"))

  const data= await getDocs(qu);
  setDetails(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
}
  return (
    <>
      {!carDetial ? (
        <div
          className="pl-12px pr-12px"
          style={{
            background: `url(${type_list_car_cover})`,
            backgroundSize: "100% 300px",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="d-flex jc-space-between mb-10">
            <h2
              className="ta-right ff-rubik fw-700 m-2px fs-56px"
              style={{
                color: "#E2E5E9",
              }}
            >
              <div className="flex gap-8">
                <div
                  className="br-100 w-40px ta-center"
                  style={{
                    backgroundColor: "#EF8539",
                  }}
                >
                  <img src={keyHold}></img>
                  <img src={key}></img>
                 

                </div>
                <AiOutlineArrowDown size={35} color="white" onClick={handleSorting}style={{cursor:"pointer"}}/>
                <BsCalendarDateFill size={35} color="white" onClick={dateSorting}style={{cursor:"pointer"}}/>
                <span> {selectedCarType}</span>
              </div>
            </h2>
            <button
              className="bg-trans b-0 ta-center br-30px w-120px h-40px"
              style={{
                color: "#378AD7",
              }}
              onClick={() => {
                setSelectedCarType(null);
                setSelectedUI("HOME");
              }}
            >
              <span className="d-flex jc-space-around">
                <span className="material-icons">arrow_forward</span>
                <span className="ff-robik fw-600">חזרה</span>
              </span>
            </button>
          </div>
          <div className="grid-md grid-5">
            {details?.map((carDetial) => (
              <CarCard
                key={carDetial.man}
                carDetial={carDetial}
              />
            ))}
          </div>
        </div>
      ) : (
        <CarDetial carDetial={details}  />
      )}
    </>
  );
}

export default CarDetialList;
