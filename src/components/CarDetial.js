import {useState,useEffect} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {useParams} from 'react-router-dom'
import {db}from '../firebase/config'
import{collection,getDoc,onSnapshot,query,where,doc}from 'firebase/firestore'
import Carousel from 'react-bootstrap/Carousel'
import Image from 'react-bootstrap/Image'
import {
  faShekelSign,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";


<FontAwesomeIcon icon="fa-solid fa-envelope" />;

const CarDetial = () => {
  const {id}=useParams()

 const [detail,setDetail]=useState({})
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
 console.log(detail,"Obj>>>>>>>>>>>>>>...")
  console.log(id,"Id>>>>>>>>>>>>>>>>>>>")

  const docRef=doc(db,"carDetail",id)
// const q=query(collection(db,"carDetail"),where("id","==",id))
 


 
  useEffect(()=>{
    
    const getDetail=async()=>{
      debugger
     const doc=await getDoc(docRef)
   setDetail(doc.data())
   
    }
    getDetail()
  },[id])
  return (
    <>
       <div className="cmp-mobile flex w-100 h-100 dir-col p-8 ff-rubik d-md">
        <div className="flex flex-just-between ">
          <div className="flex dir-col align-self-center">
            <span className="fw-700 fs-26 c--prim1">{detail?.man}</span>
            <span className="fw-400 fs-18 flex g-8f">
              <span>
                <FontAwesomeIcon icon={faLocationDot} />
              </span>
              {/* <span>{carDetial.address}</span> */}
            </span>
          </div>
          <button
            className="bg-trans b-0 as-center m-2px as-center br-30px w-120px h-40px bc-white"
            style={{
              color: "#378AD7",
            }}
            // onClick={() => {
            //   setCarDetial(null);
            // }}
          >
            <span className="flex jc-space-around">
              <span className="material-icons">arrow_forward</span>
              <span className="fw-700" style={{ color: "#378AD7" }}>
                חזרה לרכבים
              </span>
            </span>
          </button>
        </div>
        <div className="d-flex h-100 jc-center fb-300px ">
          <div
            className="w-100 h-100 p-relative"
            // style={{
            //   backgroundImage: `url(${carDetial.img})`,
            //   backgroundRepeat: "no-repeat",
            //   backgroundPosition: "center",
            //   backgroundSize: "100% 100%",
            // }}
          >
            <div className="p-abs w-100 h-100 flex flex-just-between p-8">
              <div className="align-self-center p-8">
                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
                  <path
                    d="M15.2 43.9 12.4 41.05 29.55 23.9 12.4 6.75 15.2 3.9 35.2 23.9Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="align-self-end flex g-8f">
                <span className="b-100  bg-white p-8 br-100 w-8f h-8f"></span>
                <span className="b-100  bg-white p-8 br-100 w-8f h-8f"></span>
                <span
                  className="b-100 bg-white p-8 br-100 w-8f h-8f"
                  style={{ backgroundColor: "#6EBDF7" }}
                ></span>
              </div>
              <div className="align-self-center p-8">
                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
                  <path
                    d="M20 44 0 24 20 4 22.8 6.85 5.65 24 22.8 41.15Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex flex-just-between flex-align-center bg--prim3"
          style={{
            flexBasis: "120px",
            boxShadow: "0px 3px 9px rgba(0, 0, 0, 0.13)",
            marginBottom: "36px",
          }}
        >
          <div
            className="flex dir-col flex-align-center g-8f"
            style={{ flex: "1" }}
          >
            <span className="ff-rubik fw-400 fs-20">מחיר</span>
            <span>
              <span className="ff-rubik fw-bold fs--1">{detail?.price}</span>
              <FontAwesomeIcon icon={faShekelSign} />
            </span>
          </div>
          <hr
            style={{
              flexBasis: "80px",
              transform: "rotate(90deg)",
            }}
          />
          <div
            className="flex dir-col flex-align-center g-8f"
            style={{ flex: "1" }}
          >
            <span className="ff-rubik fw-400 fs-20">הצעת מימון</span>
            <span>
              {/* <span className="ff-rubik fw-bold fs--1">
                {carDetial.proposal}
              </span> */}
              <FontAwesomeIcon icon={faShekelSign} />
            </span>
          </div>
        </div>
        <div
          className="flex flex-just-around fs-18"
          style={{
            borderTop: "1px solid black",
            borderBottom: "1px solid black",
            padding: "8px",
          }}
        >
          <div>
            <span>שנה:</span>
            <span className="fw-700"> {detail?.year}</span>
          </div>
          <div>
            <span>יד:</span>
            {/* <span className="fw-700"> {carDetial.yad}</span> */}
          </div>
          <div>
            <span>נפח מנוע :</span>
            <span className="fw-700"> {detail?.engCap} סמ"ק</span>
          </div>
        </div>
        <div className="flex dir-col p-8 gap-8 m-32f  ">
          <div className="flex">
            <span className="fs--4 fw-bold pb--3">פרטי הרכב</span>
          </div>
          <div className="flex flex-just-between">
            <span className="fs-16 fw-400">קילומטר נוכחי:</span>
            <span className="fs--4 fw-bold">{detail?.km}</span>
          </div>
          <div className="flex flex-just-between">
            <span className="fs-16 fw-400">סוג מנוע:</span>
            <span className="fs--4 fw-bold">
             ליטר {detail?.engCap}
            </span>
          </div>
          <div className="flex flex-just-between">
            <span className="fs-16 fw-400">בעלות מקורית:</span>
            {/* <span className="fs--4 fw-bold">{carDetial.balut}</span> */}
          </div>
          <div className="flex flex-just-between">
            <span className="fs-16 fw-400">תיבת הילוכים:</span>
            <span className="fs--4 fw-bold">{detail?.gearBox}</span>
          </div>
          <div className="flex flex-just-between">
            <span className="fs-16 fw-400">צבע:</span>
            {/* <span className="fs--4 fw-bold">{carDetial.color}</span> */}
          </div>
          <div className="flex flex-just-between">
            <span className="fs-16 fw-400">דגם:</span>
            <span className="fs-16 fw-500">{detail?.mod}</span>
          </div>
          <div className="flex flex-just-between">
            <span className="fs-16 fw-400">שנה:</span>
            <span className="fs--4 fw-bold">{detail?.man}</span>
          </div>
          <div className="flex flex-just-between">
            <span className="fs-16 fw-400">יד:</span>
            {/* <span className="fs--4 fw-bold">{carDetial.yad}</span> */}
          </div>
        </div>
        <div className="flex dir-col  flex-align-center p-8">
          <FontAwesomeIcon
            icon={faWhatsapp}
            style={{ color: "green", fontSize: "48px" }}
          />
          <span>פנה בוואצ׳אפ</span>
        </div>
        <div
          className="flex flex-just-center dir-col flex-align-center m-8 p-32f gap-8"
          style={{ background: "rgba(215, 232, 247, 0.4)" }}
        >
          <div>
            <span className="material-icons">phone_in_talk</span>
            <span className="fw-bold">צור קשר:</span>
            {/* <span className="c--prim2"> {carDetial.tel}</span> */}
          </div>
          <div>
            <span className="material-icons">person</span>
            <span className="fw-bold">שם:</span>
            <span>{detail?.ownerShip}</span>
          </div>
        </div>
      </div>
      <div className="cmp-desktop w-100 h-100 flex dir-col d-lg p-32f">
        <div className="cmp-header f-g-1f">
          <div className="flex flex-just-between ">
            <div className="flex dir-col align-self-center">
              <span
                className="fw-700 "
                style={{
                  color: "#378AD7",
                  fontSize: "48px",
                }}
              >
                {detail?.man}
              </span>

              <span className="fw-400 fs-18 flex g-8f">
                <span>
                  <FontAwesomeIcon icon={faLocationDot} />
                </span>
                {/* <span>{carDetial.address}</span> */}
              </span>
            </div>
            {/* <button
              className="bg-trans b-0 as-center m-2px w-120px h-40px bc-white"
              style={{ color: "#378AD7" }}
              onClick={() => {
                setCarDetial(null);
              }}
            >
              <span className="d-flex jc-space-around">
                <span className="material-icons">arrow_forward</span>
                <span className="fw-700" style={{ color: "#378AD7" }}>
                  חזרה לרכבים
                </span>
              </span>
            </button> */}
          </div>
        </div>
        <div className="cmp-body flex g-32f  f-g-1f ">
          <div className="cmp-right f-g-1f flex dir-col fb-50">
            <div className="cmp-proposal f-g-1f ">
              <div
                className="flex flex-just-between mb-32f p--1"
                style={{
                  backgroundColor: "rgba(215, 232, 247, 0.4)",
                  boxShadow: "0px 3px 9px rgba(0, 0, 0, 0.13)",
                }}
              >
                <div
                  className="flex dir-col flex-align-center as-center br-small "
                  style={{ flex: "1" }}
                >
                  <span className="ff-rubik fw-400 fs--4 p--4">
                    הצעה הסוכנות
                  </span>
                  <span className="ff-rubik fw-bold fs--2">מחיר</span>
                  <span>
                    <span className="ff-rubik fw-bold fs--1">
                      {detail?.price}
                    </span>
                    <FontAwesomeIcon icon={faShekelSign} />
                  </span>
                </div>
                <hr style={{ color: "grey" }} />
                <div
                  className="flex dir-col flex-align-center as-center br-small"
                  style={{ flex: "1" }}
                >
                  <span className="ff-rubik fw-400 fs--4 p--4">הצעת מימון</span>
                  <span className="fw-bold fs--2">החזר חודשי</span>
                  <span>
                    <span className="ff-rubik fw-bold fs--1">
                      {/* {carDetial.proposal} */}
                    </span>
                    <FontAwesomeIcon icon={faShekelSign} />
                  </span>
                </div>
              </div>
            </div>
            <div className="cmp-contact f-g-1f ">
              <div
                className="flex flex-just-center dir-col flex-align-center p-32f gap-8"
                style={{ background: "rgba(215, 232, 247, 0.4)" }}
              >
                <div>
                  <span className="material-icons">phone_in_talk</span>
                  <span>צור קשר:</span>
                  {/* <span className="c--prim2"> {carDetial.tel}</span> */}
                </div>
                <div>
                  <span className="material-icons">person</span>
                  <span>שם:</span>
                  <span>{detail?.ownerShip}</span>
                </div>
              </div>
            </div>
            <div className="cmp-car-detial flex f-g-1f  g-32f">
              <div className="flex dir-col p-8 gap-8  f-g-1f  fb-50">
                <div className="flex">
                  <h3 className="fs--3 fw-bold">פרטי הרכב</h3>
                </div>
                <div className="flex flex-just-between">
                  <span className="fs-16 fw-400">קילומטר נוכחי:</span>
                  <span className="fs--4 fw-bold">{detail?.km}</span>
                </div>
                <div className="flex flex-just-between">
                  <span className="fs-16 fw-400">סוג מנוע:</span>
                  <span className="fs--4 fw-bold">
                   ליטר {detail?.engCap}
                  </span>
                </div>
                <div className="flex flex-just-between">
                  <span className="fs-16 fw-400">בעלות מקורית:</span>
                  {/* <span className="fs--4 fw-bold">{detail.balut}</span> */}
                </div>
                <div className="flex flex-just-between">
                  <span className="fs-16 fw-400">תיבת הילוכים:</span>
                  <span className="fs--4 fw-bold">{detail?.gearBox}</span>
                </div>
                <div className="flex flex-just-between">
                  <span className="fs-16 fw-400">צבע:</span>
                  {/* <span className="fs--4 fw-bold">{detail.color}</span> */}
                </div>
                <div className="flex flex-just-between">
                  <span className="fs-16 fw-400">דגם:</span>
                  <span className="fs--4 fw-bold">{detail?.mod}</span>
                </div>
                <div className="flex flex-just-between">
                  <span className="fs-16 fw-400">שנה:</span>
                  <span className="fs--4 fw-bold">{detail?.year}</span>
                </div>
                <div className="flex flex-just-between">
                  <span className="fs-16 fw-400">יד:</span>
                  {/* <span className="fs--4 fw-bold">{detail.yad}</span> */}
                </div>
              </div>
              <hr />
              <div className="f-g-1f fb-50">
                <div>
                  <h3 className="fs--4"> תוספות לעיסקה:</h3>
                  {/* <ul className="c--prim2">
                    {detail.adds.map((add) => (
                      <li>{add}</li>
                    ))}
                  </ul> */}
                </div>
                <div>
                  <h3 style={{ color: "#F0863A" }}>הצעות למימון:</h3>
                  <ul>
                    <li>
                      <span></span>
                      <span>
                        <span>
                          <span>החל מהחזר חודשי של :</span>
                          {/* <span className="fw-bold">{detail.proposal}</span> */}
                        </span>
                        <span className="fw-bold">
                          ש"ח
                              <FontAwesomeIcon
                            icon={faShekelSign}
                            className="fs--4"
                          />
                        </span>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="cmp-left flex dir-col f-g-1f  fb-50">
            <div className="cmp-img  f-g-1f">
              <div
                className="flex h-100 flex-just-center"
                style={{ flexBasis: "300px" }}
              >
                <Carousel activeIndex={index} onSelect={handleSelect}>
                  {detail?.images?.map((img)=>{
                    return <Carousel.Item>
                    <img src={img} className="img-fluid"/>
                       
                     </Carousel.Item>
                  })}
                   
                  </Carousel>
                
              
                
              </div>
            </div>
            <div className="cmp-contact-icons flex  jc-center  flex-align-center  f-g-1f ">
              <div className="flex  dir-col flex-align-center p-8 ">
                <FontAwesomeIcon
                  icon={faWhatsapp}
                  style={{ color: "green", fontSize: "48px" }}
                />
                <span>פנה בוואצ׳אפ</span>
              </div>
              <div className="flex dir-col  flex-align-center p-16f">
                <div
                  className="br-100 p-8"
                  style={{ backgroundColor: "orange" }}
                >
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    style={{ color: "white", fontSize: "32px" }}
                  />
                </div>
                <span>פנה במייל</span>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </>
  );
};

export default CarDetial;
