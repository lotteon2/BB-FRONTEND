import { useQuery } from "react-query";
import { getMyInfo } from "../../apis/member";
import MyInfoFallback from "../fallbacks/MyInfoFallback";
import { Button } from "antd";

interface param {
  setSelected: (selected: string) => void;
}

export default function MyInfo(param: param) {
  const { data, isLoading } = useQuery({
    queryKey: ["getMyInfo"],
    queryFn: () => getMyInfo(),
  });

  if (!data || isLoading) return <MyInfoFallback />;

  return (
    <div className="w-full mx-auto flex flex-row gap-5 flex-wrap justify-between max-[660px]:justify-center">
      <div className="flex flex-row gap-3">
        <img
          src={data.data.data.profileImage}
          alt="프로필 이미지"
          className="w-28 h-28 rounded-full"
        />
        <div className="flex flex-col gap-1">
          <p>꽃 선물하기 좋은 날이네요 {data.data.data.nickname}님!</p>
          <p className="text-grayscale5 text-[0.8rem]">
            {data.data.data.email}
          </p>
          <p className="text-grayscale5 text-[0.8rem]">
            {data.data.data.phoneNumber}
          </p>
          <Button onClick={() => param.setSelected("회원정보")}>
            회원정보 수정
          </Button>
        </div>
      </div>
      <div className="flex flex-row gap-3 text-[1rem] my-auto">
        <div className="text-center pt-2">
          <div>나의 쿠폰</div>
          <div className="font-bold">{data.data.couponCnt}개</div>
        </div>
        <div className="border-r-[1px] border-grayscale7"></div>
        <div className="text-center pt-2">
          <div>위시리스트</div>
          <div className="font-bold">{data.data.likesCnt}개</div>
        </div>
      </div>
    </div>
  );
}
