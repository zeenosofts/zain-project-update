import React from 'react'

import logo from "../../src/assets/logo.png";
import logoText from "../../src/assets/logoText.png";
import filterIcon from "../../src/assets/filterIcon.png";
import themeIcon from "../../src/assets/themeIcon.png";
import searchIcon from "../../src/assets/searchIcon.png";
import { useNavigate } from 'react-router-dom';
import searchWhiteIcon from "../../src/assets/searchWhiteIcon.png";
import  {AiOutlineLogout,AiOutlineArrowDown}  from "react-icons/ai"
import {FaHome}from 'react-icons/fa'
import { UserAuth } from '../context/AuthContext';



import arow from "../../src/assets/arow.png";


function Header({ selectedUI, setSelectedUI }) {
const navigate=useNavigate()
  const {logout}=UserAuth()
  const logoutHanlder=async()=>{
await logout(navigate)
  }
 
  return (
    <div className="d-fixed w-100 zi-100 top-0">
      <nav className="d-flex flex-just-between nav-lg flex-align-center p-8 bg--prim1 c-white h-50px">
        <span className="d-flex flex-align-center gap-8">
          <img className="w-100px h-20px" src={logo} />
          <img className="w-100px h-20px" src={logoText} />
      
        </span>
        <div className="d-flex gap-8">
          <div className="as-center">
            <button
              className="bg-trans b-0   br-100"
              onClick={() => {
                navigate('/carFilters')
              }}
              style={{
                backgroundColor:
                  selectedUI === "CAR_FILTER_RESULT"
                    ? "rgba(200,200,200)"
                    : "transparent",
              }}
            >
              <img className="h-20px" src={filterIcon} />
              
            </button>
            
          </div>
          <button
            className="bg-trans b-0"
            style={{ backgroundColor: "#378AD7" }}
          >
            <img className="h-20px" src={themeIcon} />
          </button>
          <div
            className="d-flex jc-space-between none ai-center pr-8px pl-8px h-40px br-30px ta-right bc-white"
            style={{ color: "#0e69ac" }}
          >
            <label>חפש...</label>
            <input style={{ outline: "none", borderWidth: 0 }} type="search" />
            <button className="bg-trans b-0">
              <img src={searchIcon} />
            </button>
          </div>

          <span className="flex flex-align-center flex-just-between">
            <button className="bc-transparent b-0">
              <img src={arow} />
            </button>
            <button
              className="br-100 bc-transparent br-0  bs-solid bw-1px br-100"
              style={{ borderColor: "white" }}
            >
              <label className="c-white">ע</label>
            </button>
       
          </span>
        
        </div>
      </nav>

      <nav
        className="nav-sm d-flex flex-just-between flex-align-center p-8 bg--prim1 c-white h-30px px-8"
        style={{ height: "50px" }}
      >
        <span className="flex flex-align-center flex-just-between">
          <button
            className="br-100 bc-transparent br-0  bs-solid bw-1px br-100"
            style={{ borderColor: "white" }}
          >
            <label className="c-white">ע</label>
          </button>

          <button className="bg-trans b-0">
            <img src={arow} />
          </button>
        </span>
        <span className="flex flex-align-center gap-8">
          <img className="w-100px h-20px" src={logo} />
          <img className="w-100px h-20px" src={logoText} />
        
        </span>
        <span>
       
        <AiOutlineLogout size={25} color="white"data-tip="logout" onClick={logoutHanlder} style={{cursor:"pointer"}}/>
       
          <button
            className="bg-trans b-0"
            onClick={() => {
              if (selectedUI !== "CAR_FILTER_RESULT") {
                setSelectedUI("CAR_FILTER_RESULT");
              } else {
                setSelectedUI("HOME");
              }
            }}
            style={{
              backgroundColor:
                selectedUI === "CAR_FILTER_RESULT"
                  ? "rgba(200,200,200)"
                  : "transparent",
            }}
          >
            <img className="h-20px" src={filterIcon} />
          </button>
          
          <FaHome size={25} color="white" className='mr-2'onClick={()=>navigate('/')}style={{cursor:"pointer"}}/>
         
          <i className="car icon big" onClick={()=>navigate('/addCarDetail')}style={{cursor:"pointer"}}></i>
          <button className="bg-trans b-0">
            <img className="h-20px" src={searchWhiteIcon} />

          </button>
          
         
        </span>
      </nav>
    </div>
  );
}

export default Header;
