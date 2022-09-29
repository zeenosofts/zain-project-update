import React, { Fragment, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { db } from "../firebase/config";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import { storage } from "../firebase/config";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { ClipLoader } from "react-spinners";
import YearPicker from "react-year-picker";

import { toast, ToastContainer } from "react-toastify";
import DATA from '../data.json'

import { v4 } from "uuid";
const CarData = () => {
  const { user } = UserAuth();
  const [imageUpload, setImageUpload] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [carTypes, setCarTypes] = useState(["Automatic Transmission", "Manual Transmission"]);
  const [types, setTypes] = useState([]);
  const [mans, setMans] = useState([]);
  const [mods, setMods] = useState([]);
  const [smods, setSMods] = useState([]);
  const [data, setData] = useState(DATA.car);
  const [values, setValues] = useState({
    carType: "",
    man: "",
    mod: "",
    smod: "",
    year: "",
    price: "",
    engCap: "",
    gearBox: "",
    km: "",
    ownerShip: "",
  });
  const [customErrors, setErrors] = useState({
    carType: undefined,
    man: undefined,
    mod: undefined,
    smod: undefined,
  });
  const [years, setYears] = useState([])
  const [gearBoxes, setGearBoxes] = useState([]);
  const [engCaps, setEngCaps] = useState([]);

  const imageListRef = ref(storage, "images/");

  const changeHandler = (e) => {
    for (let i = 0; i < e.target.files.length < 5; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = v4();
      setImageUpload((prevState) => [...prevState, newImage]);
    }
  };

  const uploadImage = async () => {
    if (imageUpload == []) return <h1>Please Upload Image</h1>;
    // const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    const imageRef = imageUpload.map((img) =>
      ref(storage, `images/${img.name + v4()}`)
    );

    for (let i = 0; i < imageUpload.length; i++) {
      setImgLoading(true);
      const byte = await uploadBytes(imageRef[i], imageUpload[i]);
      setImgLoading(false);
      toast.success("Image succesfully uploaded");
      const url = await getDownloadURL(byte.ref);
      setImageUrls((prev) => [...prev, url]);
    }
  };

  const formik = useFormik({
    initialValues: {
      carType: "",
      man: "",
      mod: "",
      smod: "",
      year: "",
      price: "",
      engCap: "",
      gearBox: "",
      km: "",
      ownerShip: "",
    },

    enableReinitialize: true,
    validationSchema: Yup.object({
      carType: Yup.string(),
      man: Yup.string(),
      mod: Yup.string(),
      smod: Yup.string(),
      year: Yup.string().required("Required!"),
      price: Yup.number().required("Required!"),
      engCap: Yup.string().required("Required!"),
      gearBox: Yup.string().required("Required!"),
      km: Yup.number().required("Required!"),
      ownerShip: Yup.string().required("Required!"),
    }),


    onSubmit: async (value, { resetForm }) => {
      if(values.carType){
        value.carType = values.carType
      }else{
        formik.errors.carType = 'Required!';
        formik.touched.carType = true;
        return 
      }
      if(values.man){
        value.man = values.man
      }else{
        formik.errors.man = 'Required!';
        formik.touched.man = true;
        return 
      }
      if(values.mod){
        value.mod = values.mod
      }else{
        formik.errors.mod = 'Required!';
        formik.touched.mod = true;
        return 
      }
      if(values.smod){
        value.smod = values.smod
      }else{
        formik.errors.smod = 'Required!';
        formik.touched.smod = true;
        return 
      }
      console.log(value);
      try {
        
        const docRef = await addDoc(collection(db, "carDetail"), {
          userId: user.uid,
          carType: value.carType,
          man: value.man,
          mod: value.mod,
          smod: value.smod,
          year: value.year,
          price: value.price,
          engCap: value.engCap,
          gearBox: value.gearBox,
          km: value.km,
          ownerShip: value.ownerShip,
          images: imageUrls,
        });
        setLoading(false);
        resetForm();
        toast.success("Deatil Saved");
      } catch (e) {
        setLoading(false);
        toast.error("Detail not Saved");
      }
    },
  });


  useEffect(() =>{
    let array = [];
    for(let i in data) {
      array.push(data[i]);
    }
    setData(array);
  }, []);

  function handleChange(event) {
    setValues({  
    carType: event.target.value,
    man: "",
    mod: "",
    smod: "",
    year: "",
    price: "",
    engCap: "",
    gearBox: "",
    km: "",
    ownerShip: "",
  });
    setMods([]);
    setSMods([]);
    setTypes([]);
    setYears([]);
    setGearBoxes([]);
    setEngCaps([]);
    const res = data.filter((el) => el.bodyType == event.target.value);
    setTypes(res);
    setMans([...new Set(res.map(el => el.man))]);
  }

  function handleChangesMan(event) {
    setMods([]);
    setSMods([]);
    setYears([]);
    setGearBoxes([]);
    setEngCaps([]);
    setValues(prevValues => ({
      carType: prevValues.carType,
      mod: "",
      smod: "",
      year: "",
      price: "",
      engCap: "",
      gearBox: "",
      km: "",
      ownerShip: "",
      [event.target.name]: event.target.value}));
    const res = types.filter((el) => el.man == event.target.value);
    setMods([...new Set(res.map(el => el.mod))])
  }

  function handleChangesSMan(event) {
    setSMods([]);
    setYears([]);
    setGearBoxes([]);
    setEngCaps([]);
    setValues(prevValues => ({
      carType: prevValues.carType,
      man: prevValues.man,
      smod: "",
      year: "",
      price: "",
      engCap: "",
      gearBox: "",
      km: "",
      ownerShip: "",
      [event.target.name]: event.target.value}));
    const res = types.filter((el) => el.mod == event.target.value && el.man == values.man);
    setSMods([...new Set(res.map(el => el.smod))]);
  }

  function handleChangesYears(event) {
    setYears([]);
    setGearBoxes([]);
    setEngCaps([]);
    setValues(prevValues => ({
      carType: prevValues.carType,
      man: prevValues.man,
      mod: prevValues.mod,
      year: "",
      price: "",
      engCap: "",
      gearBox: "",
      km: "",
      ownerShip: "",
      [event.target.name]: event.target.value}));
    const res = types.filter((el) => el.smod == event.target.value);
    setYears([...new Set(res.map(el => el.year))]);
    setGearBoxes([...new Set(res.map(el => el.gearBox))]);
    setEngCaps([...new Set(res.map(el => el.engCap))]);
  }

  return (
    <Fragment>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={12} lg={9}>
            <h2 className="text-center mb-4">Car Detail Data</h2>
            <form onSubmit={formik.handleSubmit}>
              <Row>
                <Col md={6}>
                  <label className="ui horizontal label">Car Type</label>
                  <div className="ui input large p-0">
                    <select
                      onChange={handleChange}
                      value={values.carType}
                      name="carType"
                      className="ui fluid dropdown"
                    >
                       <option value="" label="Select an option " />
                      {carTypes.map((car) => {
                        return (
                          <option value={car} label={car}>
                            {car}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {formik.errors.carType && formik.touched.carType && (
                    <p>{formik.errors.carType}</p>
                  )}
                </Col>
                <Col md={6}>
                  <div className="ui horizontal label">Man</div>
                  <select
                    onChange={handleChangesMan}
                    value={values.man}
                    name="man"
                    className="ui fluid dropdown"
                  >
                     <option value="" label="Select an option " />
                    {mans.map((man) => {
                      return (
                        <option value={man} label={man}>
                          {man}
                        </option>
                      );
                    })}
                  </select>
                 
                  {formik.errors.man && formik.touched.man && (
                    <p>{formik.errors.man}</p>
                  )}
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <label className="ui horizontal label">Mod</label>
                  <select
                    onChange={handleChangesSMan}
                    value={values.mod}
                    name="mod"
                    className="ui fluid dropdown"
                  >
                     <option value="" label="Select an option " />
                    {mods.map((mod) => {
                      return (
                        <option value={mod} label={mod}>
                          {mod}
                        </option>
                      );
                    })}
                  </select>
                  {formik.errors.mod && formik.touched.mod && (
                    <p>{formik.errors.mod}</p>
                  )}
                </Col>
                <Col md={6}>
                  <label className="ui horizontal label">S Mod</label>
                  <select
                    onChange={handleChangesYears}
                    value={values.smod}
                    name="smod"
                    className="ui fluid dropdown"
                  >
                     <option value="" label="Select an option " />
                    {smods.map((smod) => {
                      return (
                        <option value={smod} label={smod}>
                          {smod}
                        </option>
                      );
                    })}
                  </select>
                  {formik.errors.smod && formik.touched.smod && (
                    <p>{formik.errors.smod}</p>
                  )}
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <label className="ui horizontal label">Year</label>
                  <select
                    onChange={formik.handleChange}
                    value={formik.values.year}
                    name="year"
                    className="ui fluid dropdown"
                  >
                     <option value="" label="Select an option " />
                    {years.map((year) => {
                      return (
                        <option value={year} label={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                  {formik.errors.year && formik.touched.year && (
                    <p>{formik.errors.year}</p>
                  )}
                </Col>
                <Col md={6}>
                  <label className="ui horizontal label ">engCap</label>
                  <select
                    onChange={formik.handleChange}
                    value={formik.values.engCap}
                    name="engCap"
                    className="ui fluid dropdown"
                  >
                     <option value="" label="Select an option " />
                    {engCaps.map((eng) => {
                      return (
                        
                        <option value={eng} label={eng}>
                          {eng}
                        </option>
                      );
                    })}
                  </select>
                  {formik.errors.engCap && formik.touched.engCap && (
                    <p>{formik.errors.engCap}</p>
                  )}
                </Col>
              </Row>
              <Row>
              <Col md={6}>
                  <label className="ui horizontal label">gearBox</label>
                  <select
                    onChange={formik.handleChange}
                    value={formik.values.gearBox}
                    name="gearBox"
                    className="ui fluid dropdown p-0"
                  >
                     <option value="" label="Select an option " />
                    {gearBoxes.map((gear) => {
                      return (
                        <option value={gear} label={gear}>
                          {gear}
                        </option>
                      );
                    })}
                  </select>
                  {formik.errors.gearBox && formik.touched.gearBox && (
                    <p>{formik.errors.gearBox}</p>
                  )}
                </Col>
                
                <Col md={6}>
                  <label className="ui horizontal label ">OwnerShip</label>
                  <div className="ui input large p-0">
                    <input
                      type="text"
                      id="ownerShip"
                      name="ownerShip"
                      onChange={formik.handleChange}
                      value={formik.values.ownerShip}
                    />
                  </div>
                  {formik.errors.ownerShip && formik.touched.ownerShip && (
                    <p>{formik.errors.ownerShip}</p>
                  )}
                </Col>
                
              </Row>
              <Row>
              <Col md={6}>
                  <label className="ui horizontal label">Price</label>
                  <div className="ui input large p-0">
                    <input
                      type="number"
                      id="price"
                      name="price"
                      onChange={formik.handleChange}
                      value={formik.values.price}
                    />
                  </div>
                  {formik.errors.price && formik.touched.price && (
                    <p>{formik.errors.price}</p>
                  )}
                </Col>
                <Col md={6}>
                  <label className="ui horizontal label">Km</label>
                  <div className="ui input large p-0">
                    <input
                      type="number"
                      id="km"
                      name="km"
                      onChange={formik.handleChange}
                      value={formik.values.km}
                    />
                  </div>
                  {formik.errors.km && formik.touched.km && (
                    <p>{formik.errors.km}</p>
                  )}
                </Col>
              </Row>
              <Row>
              <Col md={6}></Col>
                <Col md={6}>
                  <label className="ui horizontal label ">Upload Image</label>
                  <div className="ui input large p-0">
                    <input
                      type="file"
                      multiple
                      max="6"
                      className="formInputFile"
                      accept=".jpg,.png,.jpeg"
                      onChange={changeHandler}
                      required
                    />
                  </div>
                  <Button onClick={uploadImage} className="mt-3">
                    {imgLoading ? (
                      <ClipLoader size={25} color="white" loading />
                    ) : (
                      "Upload"
                    )}
                  </Button>
                  <ToastContainer />
                </Col>
              </Row>
              <Form.Group>
                <Button
                  type="submit"
                  variant="primary"
                  onSubmit={formik.handleSubmit}
                  //   disabled={!formik.isValid}
                  size="lg"
                  block
                >
                  {loading ? (
                    <ClipLoader size={25} color="white" loading />
                  ) : (
                    "Save"
                  )}
                </Button>
                <ToastContainer />
              </Form.Group>
            </form>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default CarData;
