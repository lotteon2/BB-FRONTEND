import { useParams } from "react-router-dom";
import ShareIcon from "@mui/icons-material/Share";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useQuery } from "react-query";
import { getGiftCardDetail } from "../apis/giftcard";
import Loading from "../components/common/Loading";

declare const window: typeof globalThis & {
  Kakao: any;
};

export default function GiftCardDetailPage() {
  const param = useParams();
  const cardId = param.cardId;
  const password = param.password;

  const { data, isLoading } = useQuery({
    queryKey: ["getCardDetail"],
    queryFn: () => getGiftCardDetail(cardId, password),
  });

  const shareKakao = () => {
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "마음을 담은 기프트 카드가 도착했어요!",
        imageUrl:
          "https://i.pinimg.com/originals/c3/fe/1a/c3fe1addb7c1df50f7e5ba2d6b53426f.gif",
        link: {
          webUrl: `https://blooming.blooms.mall.stockey.kr/giftcard/detail/${cardId}/${password}`,
          mobileWebUrl: `https://blooming.blooms.mall.stockey.kr/giftcard/detail/${cardId}/${password}`,
        },
      },
      buttons: [
        {
          title: "확인하러 가기",
          link: {
            webUrl: `https://blooming.blooms.mall.stockey.kr/giftcard/detail/${cardId}/${password}`,
            mobileWebUrl: `https://blooming.blooms.mall.stockey.kr/giftcard/detail/${cardId}/${password}`,
          },
        },
      ],
    });
  };

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_JS_API_KEY);
    }
    AOS.init();
  }, []);

  if (!data || isLoading) return <Loading />;

  return (
    <div className="w-full h-full">
      <div className="w-[30vw] h-full min-w-[370px] m-auto relative mt-2">
        <div
          className="flex justify-end cursor-pointer text-grayscale5 font-light pb-5 relative z-30"
          onClick={shareKakao}
        >
          <ShareIcon /> <span>공유</span>
        </div>
        <img
          src={data.imageUrl}
          alt="카드 템플릿"
          className="w-full rounded-lg"
        />
        <div className="absolute w-full h-full z-20 top-0">
          <div
            data-aos="fade-up"
            data-aos-duration="2000"
            className="w-[23vw] h-[25vw] min-w-[300px] min-h-[400px] bg-grayscale1 z-20 m-auto mt-[6vw] rounded-lg drop-shadow-lg p-2 overflow-auto"
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></div>
        </div>
        <p className="text-right text-[0.9rem] font-thin my-2">
          작성일시: {data.createdAt}
        </p>
      </div>
    </div>
  );
}
