import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowDown } from "@fortawesome/free-solid-svg-icons";
import { db } from "../firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
const FilterBox = ({ filterType, setDetails,label }) => {
  console.log(label,'sadasasd')
  console.log(filterType,"FilterType>>>")
  const [showOptions, setShowOpthions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  console.log(selectedOption,"pweq")
  
 const handleFilter=async(opthion)=>{
  debugger
  setSelectedOption(opthion)
  console.log(opthion,"1 handler")
  const q = query(
    collection(db, "carDetail"),
     where(label, "==", opthion),
    //  where("man", "==", opthion),
    //  where("mod", "==", opthion),
    // where("engCap", "==", opthion),
    // where("gearBox", "==", opthion)
  );
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot,"ppppppppppp")
  console.log("2 hanlder")
  // querySnapshot.forEach((doc) => {
  
  //   setDetails([{...doc.data(),id:doc.id}])
  // });

 setDetails(querySnapshot?.docs.map((doc)=>({...doc.data(),id:doc.id})))
 }

 const handleRemoveFilters=async()=>{
  setSelectedOption('')
  const q=query(collection(db,"carDetail"))
  const data= await getDocs(q);
  setDetails(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
 }
  return (
    <div className="br-10 mw-250px">
      <div className="d-flex p-relative ">
        <span className="fb-0px fs-0 fg-1 bc-white c-black bbrr-100 btrr-100 p-8">
          {/* {filterType.req && <label></label>} */}
          <label className="ws-nowarp">{label}</label>
        </span>
        <span className="d-flex jc-space-between fb-0px  fs-0  fg-1 bc-white c-black  p-8">
          <span className="bc-white   c-black">{selectedOption}</span>
          {selectedOption && (
            <button
              className="bc-transparent b-0 c-red"
           onClick={handleRemoveFilters}
            >
              x
            </button>
          )}
          {showOptions && (
            <div className=" p-absolute d-flex fd-column bc-grey c-white g-8px zi-100 fb-60">
              {filterType.map((opt) => (
                <div
                  className="cm-filter-option m-0px p-8px"
                  onClick={() => {
                    console.log(opt,'sdasd')
                    setShowOpthions(false);
                    handleFilter(opt)
                  }}
                  key={opt}
                >
                  {opt}
                </div>
              ))}
            </div>
          )}
        </span>
        <span className="fb-0px fg-1  btlr-100 bblr-100 bc-white d-flex ai-center jc-center">
          <FontAwesomeIcon
            style={{ fill: "black" }}
            icon={faCircleArrowDown}
            onClick={() => {
              showOptions ? setShowOpthions(false) : setShowOpthions(true);
            }}
          />
        </span>
      </div>
    </div>
  );
};

const CarFilter = ({ setDetails }) => {
  const [clearFilter, setClerFilter] = useState(false);

  const filterTypes = [
    {
      label: 'carType',
      opthion: ["Private", "Mishari"],
      req: true,
      sm: false,
    },
    {
      label: 'man',
      opthion: ["BMW", "Peugeot", "DS", "Chevrolet", "Dodge", "land Rover", "Boik", "Rover", "De tomaso", "Nissan", "SERES", "opal", "Iwano", "jeep", "DPS", "Lexus", "Skylwell", "Smart", "Chin", "ALT.", "M.G", "karma", "Ds", "Volvo", "Lincoln", "Sangyang", "Vaz", "jaguar", "Pontiac", "Maxus", "Subaru", "J.m", "Honda", "Hongqi", "Reno", "Talco", "Great Wall", "Alpha romeo", "Gop", "Diytesu", "AMS", "Fiat", "Audi", "Manan", "Lipmore", "Porsche", "Mitsubishi", "Hummer", "Lyken and CO", "Geely", "Dongpang", "Cadillac", "Ford", "Mercedes", "Polystar", "Chrysler", "Tesla", "Isuzu", "Dacia", "T.i.c.", "Citroen", "Diho", "Volkswagen", "Mann", "Lancia", "Hyundai", "Suzuki", "Skoda", "GiSS", "Tic", "Piageo", "Burg", "Aston Martin", "Ivyisi", "Iwis", "Kia", "Ferrari", "MAZDA", "Saab", "Seat", "Mazarti", "Toyota", "Bentley", "LEVC"],

      req: true,
      sm: true,
    },
    // {
    //   label: "דגם",
    //   opthion: ["סטנדרט", "מפואר"],

    //   req: false,
    //   sm: true,
    // },
    {
      label: 'year',
      opthion: [ "2002",
      "2000",
      "2008",
      "2012",
      "2001",
      "2020",
      "2022",
      "2006",
      "2016",
      "2009",
      "2004",
      "2007",
      "2019",
      "1996",
      "2005",
      "2010",
      "2018",
      "1998",
      "2003",
      "2013",
      "2021",
      "2015",
      "2011",
      "2017",
      "1999",
      "1997",
      "2014"],

      req: false,
      sm: true,
    },
    // {
    //   label: "מחיר",
    //   opthion: [30000, 60000, 100000],

    //   req: false,
    //   sm: true,
    // },
    // {
    //   label: "אזור",
    //   opthion: ["דרום", "מרכז", "צפון"],

    //   req: false,
    //   sm: true,
    // },
    {
      label: "engCap",
      opthion: [
        "2.9 L",
        "4.2 L",
        "0.7 L",
        "4.8 L",
        "2.2 L",
        "4.6 L",
        "6.6 L",
        "4.1 L",
        "3.5 L",
        "2.8 L",
        "0.8 L",
        "0.3 L",
        "5.6 L",
        "1 L",
        "4.9 L",
        "5.5 L",
        "6.2 L",
        "1.6 L",
        "3.6 L",
        "2 L",
        "4.7 L",
        "1.8 L",
        "3.9 L",
        "5.3 L",
        "3.7 L",
        "1.9 L",
        "3.2 L",
        "3 L",
        "1.1 L",
        "2.4 L",
        "4.4 L",
        "3.3 L",
        "6.5 L",
        "5.4 L",
        "1.7 L",
        "6.3 L",
        "0.2 L",
        "2.6 L",
        "5 L",
        "5.2 L",
        "5.8 L",
        "6 L",
        "3.8 L",
        "2.7 L",
        "3.4 L",
        "5.9 L",
        "2.5 L",
        "2.1 L",
        "4.5 L",
        "3.1 L",
        "4.3 L",
        "6.4 L",
        "5.7 L",
        "0.6 L",
        "4 L",
        "0.9 L",
        "1.5 L",
        "0.1 L",
        "0 L",
        "1.2 L",
        "2.3 L",
        "1.3 L",
        "1.4 L",
      ],

      req: false,
      sm: false,
    },
    {
      label: "gearBox",
      opthion: ["4X2", "6X2", "4X6", "6X6", "4X1", "6X4", "4X4", "4X5"],

      req: false,
      sm: false,
    },
    {
      label: 'mod',
      opthion: [
        "Mishari315 CDI",
        "MishariCommercial Unified 2+60 Chalk",
        "MishariMPSERNAA",
        "MishariPalisade",
        "MishariCombi 2 windows 4 + 2",
        "MishariJEEP Gladiator",
        "MishariUnicorn telekolin",
        "MishariGENESIS GV80",
        "MishariRav-4",
        "MishariGLC 250 4MATIC",
        "MishariGLC350E",
        "MishariSprinter IDC 112",
        "MishariB9 Tribeca",
        "MishariXC90 3.2",
        "MishariCruiser",
        "MishariCombi 4 windows 3 + 3",
        "MishariTacoma s5",
        "MishariGL450",
        "MishariDustr",
        "MishariDOBLO 1.6 COMBY",
        "MishariPickup",
        "MishariMpv",
        "MishariGamma",
        "Mishari004-L minibus gasoline",
        "MishariGrand Cherokee",
        "Mishari35c15 Chc",
        "MishariCombi 4 windows 4 + 4",
        "MishariForester",
        "MishariRendezvous",
        "MishariPickup Winner",
        "MishariPatrol",
        "Mishari001-H commercially commercial benz",
        "MishariHalf Combble Diesel 1+6",
        "MishariDOBLO 1.4 COMBY",
        "MishariNormal chalk freight",
        "MishariCommercial Opel-",
        "MishariML350",
        "MishariDaily 35s18",
        "MishariTelekoline Double Bourine",
        "MishariViano 30cdi",
        "MishariTiny Bus C-P 2+8",
        "MishariVivaro",
        "MishariCombie diesel 2+6",
        "Mishari120 cdi vito",
        "MishariSafari-JS. gasoline",
        "Mishari319CDI",
        "Mishari308 CDI",
        "MishariAutomatically united freight",
        "MishariCombie diesel 2+6 car",
        "MishariCombo",
        "MishariLexus rx450h",
        "MishariCombi 2 hp without",
        "MishariCommercial Unified Chalk",
        "MishariDoblo1.3",
        "MishariLexus rx400h",
        "MishariLand-Cruiser",
        "MishariInfiniti Q30",
        "MishariCommercial Unified 2+6",
        "MishariAutomatic diesel unified",
        "MishariTata Sierra",
        "MishariSPRINTER 316CDI",
        "MishariTROPER 7 PLACE",
        "Mishari602LA korando",
        "MishariAutomato Unified",
        "MishariT5-shuttle",
        "MishariMagnum Double Cell",
        "MishariUnified +Regular Windows",
        "MishariStaria",
        "MishariCommercial Unified 2+30 Chalk",
        "MishariTucson",
        "Mishari313cdi sprinier",
        "Mishari7JD111",
        "MishariA8",
        "MishariHighlander HV",
        "MishariTata Table Double Bourine",
        "MishariJ.M.-Safari-Malapir",
        "MishariCommercial Short Otto Gasoline",
        "MishariCADDY",
        "MishariTrak 001h",
        "MishariSPRINER",
        "MishariB4",
        "MishariML320 CDI",
        "MishariCombi 4 windows 4 + 3",
        "MishariBT 50",
        "MishariTROPER 7 Luxurious Places",
        "MishariAxiom",
        "MishariQ5",
        "MishariML280 CDI",
        "MishariHilux",
        "MishariCommercial Unified 2+3",
        "Mishari35 C15D",
        "MishariKo1",
        "Mishariminibus taxi",
        "MishariAutomatic Unified Powder",
        "Mishari111cdi vito",
        "MishariPUKCIP pickup",
        "MishariLand CRISER",
        "MishariUnified Planets from a line",
        "MishariETRON 55 ADVANC",
        "Mishari4matic",
        "MishariHayes",
        "MishariLargo",
        "MishariCombi 004L",
        "MishariTerrano",
        "MishariCAREVALLLE",
        "MishariT5 pick up",
        "MishariC.M-Hokon",
        "MishariMinibus 004L",
        "MishariA manual short diesel lag",
        "MishariCADDY MAXI",
        "MishariTata Top Single Cabine",
        "MishariTge",
        "MishariL200",
        "MishariXC90 T8",
        "MishariNormal diesel uniform",
        "MishariGL 420 CDI",
        "MishariDOBLO 1.3 COMBI",
        "MishariWrangler",
        "MishariRajero",
        "MishariQ8",
        "MishariML400 CDI",
        "MishariSienna xle",
        "MishariPick-up",
        "MishariSportage",
        "MishariH100",
        "MishariTropep",
        "MishariHilux vigo",
        "MishariFiorino",
        "MishariOutlander PHEV",
        "MishariNew Transporter",
        "MishariCombie diesel 2+8 car",
        "MishariLexus rx300",
        "MishariCaddy Maxi D.V",
        "MishariAmarok",
        "MishariNv200",
        "MishariUnified _teroper",
        "MishariXV",
        "MishariRodeo",
        "MishariFlago short petrol",
        "MishariTacoma",
        "MishariGladiator",
        "MishariIpppon",
        "Mishari316 CDI",
        "MishariCombo-C",
        "Mishari318 CDI",
        "Mishari30cdi viano",
        "MishariLexus nx300h",
        "MishariUnified +Ot Windows",
        "MishariWinner Pickup",
        "MishariSprinter IDC 802",
        "Mishari316 Blutec",
        "MishariImpreza B3",
        "Mishari004-L Kumby Diesel",
        "Mishari115cdi vito",
        "MishariCombi 4 windows 7 from line",
        "MishariE-CRAFTER",
        "MishariXC60 D5",
        "MishariCombi 2 windows 3 + 2",
        "Mishari115 cdi vito",
        "MishariT6 Transporter",
        "MishariA frivie",
        "MishariVitara",
        "MishariOutback",
        "Mishari123 vito",
        "MishariRAV 4",
        "MishariMl 63 amg",
        "MishariCombi 2 windows without",
        "MishariS350D 4MATIC L",
        "MishariA.",
        "MishariCRAFTER",
        "Mishari316CDI",
        "MishariGLA250 4MATIC",
        "Mishari",
        "MishariMi -boat car is luxurious 1",
        "MishariSienna l",
        "MishariTata Safari",
        "MishariCommercial Unified A regular chalk",
        "MishariXC90 D5",
        "MishariH1",
        "MishariDoblo 1.6",
        "MishariPrado",
        "MishariTerk uniform freight",
        "MishariGL 500",
        "MishariNormal Unified Pacific",
        "MishariSonoma single cabin",
        "MishariDiesel Commercial Unified",
        "MishariLexus rx450h l",
        "Mishari319 Blutec",
        "MishariVinek 002-L SLG Model C",
        "MishariA. Public-Private 2",
        "MishariHyilx",
        "MishariMaverick Hybrid",
        "Private",
        "MishariSonoma bourgeon dual",
        "MishariHalf Combble Diesel 1+3",
        "MishariHayes is closed without the seats",
        "MishariTocoma",
        "MishariCommercial Unified 2+5",
        "MishariCombi 4 windows 4 + 2",
        "MishariTransporter",
        "MishariClose gasoline 001-h",
        "MishariA single cabin pickup",
        "MishariSienna le",
        "MishariTerracan",
        "MishariDoblo",
        "MishariPajero",
        "MishariMaverick",
        "Mishari602 LA MUSSO",
        "MishariHighlex C - D 4X4",
        "MishariOuilander",
        "Mishari313cdi",
        "MishariInfiniti QX60",
        "MishariTrajet",
        "MishariQashqai 2",
        "MishariHighlex C-D 4X4",
        "Mishari115 CDI",
        "MishariStorm JEEP",
        "MishariTROPER 5 places",
        "MishariXC90",
        "MishariLight Truck",
        "MishariGalloper",
        "MishariSPRINTER 312d",
        "MishariUnified commercial freight",
        "MishariForester Torbo",
        "MishariBERL MSP",
        "MishariSienna",
        "MishariGL320 CDI",
        "MishariCADDY GT",
        "MishariTelcoline",
        "MishariA long carpentine petrol",
        "MishariCADDY GP",
        "MishariFiat doblo",
        "MishariTerios",
        "MishariL-200",
        "MishariArrange",
        "MishariSafari",
        "MishariE300 Blue Te",
        "MishariTelekoline Pick Up",
        "MishariMPD Serena",
        "MishariEvoltis",
        "Mishari111 cdi vito",
        "MishariDouble cab and dizon",
        "MishariH1 VAN",
        "MishariScudo",
        "MishariC.M-Hokon-Monkar",
        "MishariTata Sumo XE",
        "MishariCADDY KOMBI",
        "MishariHummer H3 SUV",
        "Misharistorm",
        "MishariHighlander",
        "MishariCombi 4 windows without",
        "MishariBT-50",
        "MishariLexus rx350",
        "MishariMl 350",
        "MishariKona",
        "MishariGrande Cherokee",
        "MishariSerena DPM",
        "MishariA manual long -to -die diesel",
        "Mishari319BLUETEC",
        "MishariPathfinder",
        "MishariLong Diesel Mask",
        "MishariTGE3.xxx 4x2F s",
        "MishariXC60 T6",
        "MishariJ.MS-Safari",
        "Mishari313 CDI",
        "MishariS350 d 4matic",
        "MishariKo5",
        "MishariQ3",
        "MishariML270 CDI",
        "MishariGip Supreme",
        "MishariShuttle",
        "MishariHummer H3",
        "MishariHilux vigo s",
        "MishariNormal Unified Penny",
        "MishariHighlex C - D 2X4",
        "MishariCR-V",
        "MishariRAV 4 Hybrid",
        "MishariMl500",
        "MishariKo2",
        "MishariViano 30 CDI",
        "MishariLand Cruiser",
        "MishariMaxus v80",
        "MishariXC90 V8",
        "MishariUnified Pool Luxury",
        "MishariCombot diesel 2+3",
        "MishariTrak 1h",
        "MishariTGE3.xx4x2F SB",
        "MishariOutlander",
        "MishariBerlingo",
        "MishariUlySe",
        "Mishari3500 somo",
        "MishariCx5",
        "MishariMl.350",
        "MishariCombie diesel 1+3",
        "MishariQ5 Sportback",
        "MishariCRAFTER 35",
        "MishariSahara",
        "MishariX-TRAIL",
        "MishariTruffer 7 places",
        "MishariHIACE",
        "MishariG500",
        "MishariSanta Fe",
        "MishariVivaro van",
        "MishariCADDY7 GP",
        "MishariVan 1h",
        "MishariQ7",
        "MishariETGE31404x2F SB",
        "MishariT5",
        "MishariL300",
        "MishariVan 001h",
        "MishariRAV 4 PLUG IN",
        "MishariS 350 Bluetc",
        "MishariDoblo Panorama",
        "MishariDoblo 1.6Comby",
        "MishariA pickup 002-l SLG model a",
        "MishariIx35",
        "MishariCommercial Unified 2+00 Chalk",
        "MishariJ.M.-Ajami",
        "MishariSteed",
        "MishariDOBLO 1.6 VAN",
        "MishariTouareg",
        "MishariHighlex c - d 2X4",
        "MishariNavara",
        "MishariF-Pace",
        "Mishari313cdi sprinter",
        "Mishari22cdi viano",
        "MishariPartner",
        "MishariL 200",
        "MishariML320",
        "MishariCombi 4 windows 3 + 2",
        "MishariCombi 7 continuous places",
        "MishariA minibus 1h",
        "MishariSPRINTER",
        "MishariB-2500",
        "MishariTroper",
        "MishariS560 4MATIC",
        "MishariA cabin dab And",
      ],

      req: false,
      sm: false,
    },
  ];

  return (
    <div className="d-flex fd-column g-40px mr-8px ml-8px">
      <div className="d-flex fd-column">
        <div>
          <div className="d-flex jc-space-between ai-center">
            <span className="fw-600 fs-28px">סינון</span>
            <span className="d-flex g-8px">
              <span>x</span>
              <span>נקה הכל</span>
            </span>
          </div>
          <hr />
        </div>
        <div className="d-flex fd-column g-8px">
          {console.log(filterTypes[0].label,'Atta')}
          <FilterBox
          filterType={filterTypes[0].opthion}
          setDetails={setDetails}
          label={filterTypes[0].label}
          key={filterTypes[0].label}
          />
          
          <FilterBox
          filterType={filterTypes[1].opthion}
          setDetails={setDetails}
          label={filterTypes[1].label}
          key={filterTypes[1].label}
          />
            
            <FilterBox
          filterType={filterTypes[2].opthion}
          setDetails={setDetails}
          label={filterTypes[2].label}
          key={filterTypes[2].label}
          />
            <FilterBox
          filterType={filterTypes[3].opthion}
          setDetails={setDetails}
          label={filterTypes[3].label}
          key={filterTypes[3].label}
          />
           <FilterBox
          filterType={filterTypes[4].opthion}
          setDetails={setDetails}
          label={filterTypes[4].label}
          key={filterTypes[4].label}
          />
           <FilterBox
          filterType={filterTypes[5].opthion}
          setDetails={setDetails}
          label={filterTypes[5].label}
          key={filterTypes[5].label}
          />
          {/* {filterTypes.map((filterType) => (
            <FilterBox
              filterType={filterType}
              clearFilter={clearFilter}
              setClerFilter={setClerFilter}
              key={filterType.label}
              setDetails={setDetails}
              label={filterType.label}
            

            />
          ))} */}
          
        </div>
      </div>
      <div className="as-center">
        <div>
          <span className="fs-22 fw-600">חיפוש מתקדם</span>
        </div>
        <div>
          <span className="fs-22">חיפושים אחרונים</span>
        </div>
      </div>
      <div className="as-center w-100 d-flex jc-center">
        <button className="b-0 c-white b-lg--1 bs--1 fs-30px br-40px w-80">
          חפש
        </button>
      </div>
    </div>
  );
};

export default CarFilter;
