import LoginBg from "../assets/images/loginbg.png";
import LoginBtn from "../assets/images/kakaobtn.png";
import { KAKAO_OAUTH_URL } from "../recoil/common/data";

export default function LoginPage() {
  return (
    <div className="relative h-[55vw] max-h-[450px] h-72">
      <div className="relative w-[70vw] max-w-[500px] mx-auto mt-20 bg-grayscale1 z-10 rounded-lg shadow-lg">
        <p className="w-full text-center logo text-6xl text-primary7 z-20 max-[400px]:text-5xl">
          Blooming Blooms
        </p>
        <p className="text-[0.8rem] text-center text-grayscale4 mt-7">
          간편하게 시작하기
        </p>
        <div className="z-20">
          <a className="cursor-pointer" href={KAKAO_OAUTH_URL}>
            <img
              className="relative mx-auto mt-5 pb-10 w-[50%] max-w-[400px] z-20"
              src={LoginBtn}
              alt="로그인 버튼"
            />
          </a>
        </div>
      </div>
      <div className="absolute bottom-0 w-full">
        <img
          className="w-[80%] max-w-[1220px] mx-auto z-0"
          src={LoginBg}
          alt="로그인 배경 이미지"
        />
      </div>
    </div>
  );
}
