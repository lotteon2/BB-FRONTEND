import { Button, Modal, Rate } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "../../../css/slick-theme.css";
import { reviewDto } from "../../../recoil/common/interfaces";

interface param {
  isModalOpen: boolean;
  handleCancel: () => void;
  data: reviewDto | undefined;
}

export default function ReviewDetailModal(param: param) {
  const settings = {
    infinite: false,
    pauseOnHover: true,
    autoplaySpeed: 5000,
    arrows: true,
    slidesToShow: 2,
  };
  return (
    <div>
      <Modal
        title="리뷰 상세"
        open={param.isModalOpen}
        onCancel={param.handleCancel}
        footer={<Button onClick={param.handleCancel}>닫기</Button>}
      >
        <div className="flex flex-row gap-3 relative py-3">
          <img
            className="w-[80px] h-[80px] rounded-full"
            src={param.data?.profileImage}
            alt="프로필 이미지"
          />
          <div className="flex flex-col w-[520px]">
            <Rate allowHalf disabled defaultValue={param.data?.rating} />
            <div className="flex flex-row gap-3 text-[0.8rem]">
              <p>{param.data?.nickname}</p>
              <p className="font-light text-grayscale4">
                {param.data?.createdAt.split("T")[0]}
              </p>
            </div>
            <p className="font-bold">{param.data?.productName}</p>
          </div>
        </div>
        <div className="text-[1.2rem] max-h-[200px] overflow-auto">
          {param.data?.content}
        </div>
        <div className="w-[95%] mx-auto mt-5">
          <Slider {...settings}>
            {param.data?.reviewImages.map((item: string, index: number) => (
              <div className="px-3 cursor-default" key={index}>
                <img src={item} alt="리뷰 상세 이미지" />
              </div>
            ))}
          </Slider>
        </div>
      </Modal>
    </div>
  );
}
