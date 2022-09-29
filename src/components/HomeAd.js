import { useEffect, useState } from "react";
import maincover from "../../src/assets/maincover.png";

function HomeAd() {
  const [index, setIndex] = useState(0);
  const [adIterval, setAdInterval] = useState(0);
  const [homeAd, setHomeAd] = useState([
    {
      imgSrc:
        "https://images.unsplash.com/photo-1610399214658-52b9fdea4627?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y2Fyc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600",
      words: " שירות על - מקבלים רק אצלנו",
      deteilSrc: "",
    },
    {
      imgSrc:
        "https://images.unsplash.com/photo-1555353540-64580b51c258?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhcnN8ZW58MHx8MHx8&auto=format&fit=crop&w=600",
      words: " שירות על - מקבלים רק אצלנו",
      deteilSrc: "",
    },
  ]);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const imgStyle = {
    height: "100%",
  };
  useEffect(() => {
    if (adIterval) {
      clearInterval(adIterval);
    } else {
      setAdInterval(
        setInterval(() => {
          setIndex((preIndex) => {
            if (preIndex < homeAd.length - 1) return preIndex + 1;
            else return 0;
          });
        }, 3000)
      );
    }
  }, []);
  return (
    <div className="rel" style={{ backgroundImage: `url(${maincover})` }}>
      <div>
        <div className="flex flex-just-center">
          {homeAd.map(
            (item, itemIndex) =>
              itemIndex === index && (
                <div
                  className="rel"
                  key={item.imgSrc}
                  style={{ height: "200px", width: "80%" }}
                >
                  <img
                    className="w-100"
                    style={{ height: "100%" }}
                    src={item.imgSrc}
                  />
                  <h3 className="flex abs top flex-just-center">
                    <span>
                      <span style={{ color: "#469AE8" }}>
                        {" "}
                        {item.words.split("-")[0]}
                      </span>
                      <span style={{ color: "white" }}>
                        -{item.words.split("-")[1]}
                      </span>
                      <button
                        className="br-40px b-0"
                        style={{
                          width: "256px",
                          height: "58px",
                          background:
                            "linear-gradient(93.23deg, #ef8539 8.5%, #f7a66c 100%)",
                          boxShadow: "0px 9px 15px rgba(184, 95, 31, 0.6)",
                        }}
                        src={item.deteilSrc}
                      >
                        לפרטים
                      </button>
                    </span>
                  </h3>
                </div>
              )
          )}
        </div>
        <div className="flex button flex-just-center gap-8 w-100">
          {homeAd.map((item, itemIndex) => (
            <div
              className="w-20px h-20px br-100 "
              key={item.imgSrc}
              type="radio"
              name="selectedAd"
              style={
                itemIndex === index
                  ? { backgroundColor: " #6EBDF7" }
                  : { backgroundColor: "#F0E4E4" }
              }
              onClick={() => {
                clearInterval(adIterval);
                setIndex(itemIndex);
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeAd;
