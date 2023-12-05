import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Banner01 from "../../assets/images/banner/001.png";
import Banner02 from "../../assets/images/banner/002.png";
import Banner03 from "../../assets/images/banner/003.png";
import Banner04 from "../../assets/images/banner/004.png";
import Banner05 from "../../assets/images/banner/005.png";
export default function Banner() {
  const settings = {
    infinite: true,
    speed: 1000,
    autoplay: true,
    pauseOnHover: true,
    autoplaySpeed: 4000,
    arrows: false,
  };
  return (
    <div className="w-full">
      <Slider {...settings}>
        <div>
          <img src={Banner01} alt="Banner01" />
        </div>
        <div>
          <img src={Banner02} alt="Banner02" />
        </div>
        <div>
          <img src={Banner03} alt="Banner03" />
        </div>
        <div>
          <img src={Banner04} alt="Banner04" />
        </div>
        <div>
          <img src={Banner05} alt="Banner05" />
        </div>
      </Slider>
    </div>
  );
}
