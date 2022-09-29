import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeAd from "./components/HomeAd";
import CarDetialList from "./components/CarDetialList";
import CarTypes from "./components/CarTypes";
import Login from "./Auth/Login";
import CarFilterResult from "./components/CarFilterResult";
import { Link, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { useState } from "react";
import ProtectedRoute from "./Auth/ProtectedRoute";
import CarData from "./components/CarData";
import CarDetial from "./components/CarDetial";
import Signup from "./Auth/Signup";
import CarFilter from "./components/CarFilter";

function App() {
  const [selectedCarType, setSelectedCarType] = useState(null);
  const [selectedUI, setSelectedUI] = useState("HOME");
  const [imageUpload, setImageUpload] = useState(null);

  return (
    <div className="App">
      {/* <Header setSelectedUI={setSelectedUI} selectedUI={selectedUI} />
      {<HomeAd/>} */}
      <div
      // style={{
      //   marginBottom: "50px",
      // }}
      >
        <AuthContextProvider>
          
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Header
                    setSelectedUI={setSelectedUI}
                    selectedUI={selectedUI}
                  
                  />
                 <HomeAd/>
                  <CarTypes
                    setSelectedCarType={setSelectedCarType}
                    setSelectedUI={setSelectedUI}
                  />
                  <div className="mt-2">
                    <Footer />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/addCarDetail"
              element={
                <ProtectedRoute>
                  <Header
                    setSelectedUI={setSelectedUI}
                    selectedUI={selectedUI}
                  />
                  <HomeAd />
                  <CarData />
                </ProtectedRoute>
              }
            />
            <Route
              path="/carDetailList/:id"
              element={
                <ProtectedRoute>
                  <Header
                    setSelectedUI={setSelectedUI}
                    selectedUI={selectedUI}
                    cmp="carList"
                  />
                  <HomeAd />
                  <CarDetialList
                    selectedCarType={selectedCarType}
                    setSelectedCarType={setSelectedCarType}
                    setSelectedUI={setSelectedUI}
                  />
                  <div className="mt-2">
                    <Footer />
                  </div>
                </ProtectedRoute>
              }
            />{" "}
            <Route
              path="/carDetail/:id"
              element={
                <ProtectedRoute>
                  <Header
                    setSelectedUI={setSelectedUI}
                    selectedUI={selectedUI}
                  />
                  <HomeAd />
                  <CarDetial />
                  <div className="mt-2">
                    <Footer />
                  </div>
                </ProtectedRoute>
              }
            />
               <Route
              path="/carFilters"
              element={
                <ProtectedRoute>
                  <Header
                    setSelectedUI={setSelectedUI}
                    selectedUI={selectedUI}
                  />
                 
                <CarFilterResult/>
                  <div className="mt-2">
                    <Footer />
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthContextProvider>
        {/* {(() => {
          switch (selectedUI) {
            case "HOME":
              return (
                <>
                  <HomeAd />
                  <CarTypes
                    setSelectedCarType={setSelectedCarType}
                    setSelectedUI={setSelectedUI}
                  />
                </>
              );
            case "CAR_DETIAL_LIST":
              return (
                <>
                  <CarDetialList
                    selectedCarType={selectedCarType}
                    setSelectedCarType={setSelectedCarType}
                    setSelectedUI={setSelectedUI}
                  />
                </>
              );
            case "CAR_FILTER_RESULT":
              return (
                <>
                  <CarFilterResult />
                </>
              );
            default:
              return null;
          }
        })()} */}
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
