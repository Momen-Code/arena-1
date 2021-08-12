import { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "./style.scss";

import Cover1 from "../../../../../assets/img/arena-cover-1.jpg";
import Cover2 from "../../../../../assets/img/arena-cover-2.jpg";
import Cover3 from "../../../../../assets/img/arena-cover-3.jpg";

const AboutUs = () => {
  const { t, i18n } = useTranslation("translations");
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = useMemo(
    () => [
      {
        title: "Who We Are",
        content: t("WHO_WE_ARE_TXT"),
        cover: Cover2,
      },
      {
        title: "Our Mission",
        content: t("OUR_MISSION_TXT"),
        cover: Cover3,
      },
      {
        title: "We Aim For",
        content: t("WE_AIM_FOR_TXT"),
        cover: Cover1,
      },
    ],
    []
  );

  useEffect(() => {
    const changeCover = () =>
      setTimeout(() => {
        setActiveSlide(Math.random() * 2);
        changeCover();
      }, Math.floor(Math.random() * (3000 - 1000) + 1000));
  }, []);

  return (
    <div className="about-us-container">
      <div className="content">
        <h1 className="about-us-title">
          About
          <br />
          Us.
        </h1>
        <div
          className="slides-container"
          onClick={() =>
            setActiveSlide(
              activeSlide == slides.length - 1 ? 0 : activeSlide + 1
            )
          }
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`slide-content ${activeSlide == i ? "active" : ""}`}
            >
              <h2>{slide.title}</h2>
              <p>{slide.content}</p>
            </div>
          ))}
        </div>
        <div className="tabs-container">
          {slides.map((_, i) => (
            <span className={`tab ${activeSlide == i ? "active" : ""}`}></span>
          ))}
        </div>
      </div>
      <div
        className="cover-container"
        onClick={() =>
          setActiveSlide(activeSlide == slides.length - 1 ? 0 : activeSlide + 1)
        }
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`cover-slide ${activeSlide == i ? "active" : ""}`}
          >
            <img src={slide.cover} alt={slide.title}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
