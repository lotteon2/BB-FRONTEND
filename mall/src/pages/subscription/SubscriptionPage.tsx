import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import EmojiGif from "../../assets/images/subscription/emoji.gif";
import ClickImage from "../../assets/images/subscription/click.png";
import CalendarImage from "../../assets/images/subscription/calendar.png";
import BouquetImage from "../../assets/images/subscription/bouquet.png";
import BestShop from "../../components/main/BestShop";

export default function SubscriptionPage() {
  useEffect(() => {
    AOS.init();
  });

  return (
    <div className="w-full h-full">
      <div className="relative cursor-default">
        <video muted autoPlay loop src="/videos/intro.mp4" className="w-full" />
        <div
          className="absolute top-0 z-20 w-full text-center"
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          <p className="mt-[5vw] w-full text-grayscale1 text-[7vw] logo">
            Flower Subscription
          </p>
          <div className="w-0 h-[4vh] border-[1px] border-grayscale1 mx-auto"></div>
          <p className="font-bold text-[3vw] text-grayscale1 mt-10">
            꽃 정기구독
          </p>
        </div>
      </div>
      <div
        className="w-full text-center my-10"
        data-aos="fade-up"
        data-aos-duration="2000"
      >
        <p className="text-[1.8rem] font-bold">당신의 오늘 하루는 어땠나요?</p>
      </div>
      <div
        className="w-full text-center my-20"
        data-aos="fade-up"
        data-aos-duration="2000"
        data-aos-delay="200"
      >
        <p className="font-thin text-[2rem] text-[#666666]">
          내 <b className="font-regular text-grayscale7">마음</b>의
        </p>
        <div className="flex">
          <div className="mx-auto flex flex-row gap-3 pr-2">
            <img src={EmojiGif} alt="" className="w-[330px]" />
            <p className="font-regular text-[2rem] text-[#666666] mt-5 text-grayscale7">
              꽃
            </p>
          </div>
        </div>
      </div>
      <div data-aos="fade-up" data-aos-duration="2000">
        <p className="mt-20 my-10 text-center text-[3rem] font-thin">
          Easy Way to Bloom Your Day
        </p>
        <p className="text-center text-[2rem] font-bold mb-20">
          주기적으로 받아보는 그달의 가장 예쁜 꽃
        </p>
      </div>
      <div className="flex flex-row gap-20 justify-center flex-wrap">
        <div className="w-[200px]" data-aos="fade-up" data-aos-duration="2000">
          <img src={ClickImage} alt="클릭이미지" />
          <div className="text-center mt-10">
            <p className="my-5">01</p>
            마음에 드는 꽃다발 <b className="font-bold">디자인</b>을 확인하고
            <b className="font-bold"> 원하는 가게</b>를 선택해주세요.
          </div>
        </div>
        <div
          className="w-[200px]"
          data-aos="fade-up"
          data-aos-duration="2000"
          data-aos-delay="300"
        >
          <img src={CalendarImage} alt="캘린더 이미지" />
          <div className="text-center mt-10">
            <p className="my-5">02</p>
            <b className="font-bold">받아보고 싶은 요일, 구독 주기</b>를
            선택해주세요. 중간에 배송일을 변경하고 싶을 때는 문의해주세요.
          </div>
        </div>
        <div
          className="w-[200px]"
          data-aos="fade-up"
          data-aos-duration="2000"
          data-aos-delay="600"
        >
          <img src={BouquetImage} alt="꽃다발 이미지" />
          <div className="text-center mt-10">
            <p className="my-5">03</p>
            선택한 기간동안 <b className="font-bold">그 계절 가장 예쁜 꽃</b>
            으로 찾아갈게요.
          </div>
        </div>
      </div>
      <div className="my-20">{/* <BestShop /> */}</div>
    </div>
  );
}
