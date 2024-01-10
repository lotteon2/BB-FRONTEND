import { Button } from "antd";
import NotFoundGif from "../../assets/images/notfound.gif";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { mallState } from "../../recoil/atom/common";

export default function NotFound() {
  const navigate = useNavigate();
  const isMall = useRecoilValue<boolean>(mallState);

  return (
    <div>
      <div className="relative z-10">
        <img src={NotFoundGif} alt="" className="mx-auto" />
        <div className="absolute right-0 bottom-0 w-[100vw] h-[4vw] bg-grayscale1"></div>
      </div>
      <p className="font-bold text-[2rem] text-center mt-[-40px] relative z-20">
        요청하신 페이지를 찾을 수 없습니다.
      </p>
      <div className="text-center mt-5">
        <Button
          size="large"
          type="primary"
          onClick={() => (isMall ? navigate("/") : navigate("/pickup"))}
        >
          메인으로 돌아가기
        </Button>
      </div>
    </div>
  );
}
