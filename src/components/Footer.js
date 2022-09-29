import React from "react";
import logoBlue from "../../src/assets/logoBlue.png";
import logoTextBlue from "../../src/assets/logoTextBlue.png";

export default function Footer() {
  return (
    <nav className="d-flex d-fixed buttom-0 footer jc-space-between w-100 px-8 bc-white">
      <span className="flex flex-just-between gap-8 footer-md">
        <a className="ff-rubik fs-14px td-none" href="#">
          כל הזכיות שמורות
        </a>
      </span>
      <span className="flex flex-just-between gap-8 footer-lg">
        <a className="ff-rubik fs-14px td-none" href="#">
          כל הזכיות שמורות
        </a>
        <span className="c-grey">|</span>
        <a className="ff-rubik fs-14px td-none" href="#">
          חיפוש רכב
        </a>
        <a className="ff-rubik fs-14px td-none" href="#">
          בדיקת ממון
        </a>
        <a className="ff-rubik fs-14px td-none" href="#">
          פרסם מודעה
        </a>
        <a className="ff-rubik fs-14px td-none" href="#">
          רישום לנזיוזלטר
        </a>
      </span>
      <span className="d-flex g-8px ai-center">
        <img className="w-60px h-16px" src={logoBlue} />

        <img className="w-80px h-16px c-blue" src={logoTextBlue} />
      </span>
    </nav>
  );
}
