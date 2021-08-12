import { useMemo, useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";

import SERVICES_EN from "../../../../../util/services-en";
import SERVICES_AR from "../../../../../util/services-ar";
import { useTranslation } from "react-i18next";

const OurServices = () => {
  const { t, i18n } = useTranslation("translations");
  const [clickedIndex, setClickedIndex] = useState(null);

  const SERVICES = useMemo(
    () => (i18n.language == "ar" ? SERVICES_AR : SERVICES_EN),
    [i18n.language]
  );

  return (
    <div className="our-services-container">
      <div className="services">
        {SERVICES.map((service, i) => (
          <Link
            to={`/our-services/${service.slug}`}
            className={`service ${i == clickedIndex ? "clicked" : ""}`}
            onClick={() => setClickedIndex(i)}
          >
            <h1 className="letter">A</h1>
            <p className="title">
              {service.title}
              <span></span>
            </p>
            {service.subservices.map((sub, i) => (
              <p key={i} className="subtitle">
                {sub.title}
              </p>
            ))}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
