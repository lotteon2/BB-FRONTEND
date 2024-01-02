import { Button } from "antd";
import {
  cardRegisterDto,
  cardTemplateListDto,
  recommandDto,
} from "../../recoil/common/interfaces";
import { useMemo, useState } from "react";
import ReactQuill from "react-quill";
import "../../css/quill.snow.css";
import { useMutation } from "react-query";
import { registerGiftCard } from "../../apis/giftcard";
import { FailToast } from "../common/toast/FailToast";
import GiftCardContent from "./GiftCardContent";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useRecoilValue } from "recoil";
import { mallState } from "../../recoil/atom/common";

interface param {
  cardTemplate: cardTemplateListDto;
  orderProductId: number;
  productId: string;
  orderType: string;
}
export default function GiftCardRegister(param: param) {
  const navigate = useNavigate();
  const [value, setValue] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [recommandDto, setRecommandDto] = useState<recommandDto>();
  const [clickBtn, setClickBtn] = useState<boolean>(false);
  const isMall = useRecoilValue<boolean>(mallState);

  const data = {
    data: {
      languageOfFlower: "첫사랑",
    },
    message: null,
    errorCode: null,
    result: "SUCCESS",
  };
  //   const { data, isLoading } = useQuery({
  //     queryKey: ["getLanguageOfFlowers", param],
  //     queryFn: () => getLanguageOfFlowers(param.productId),
  //   });

  const handleContentRecommand = () => {
    if (param.cardTemplate.cardTemplateId === 0) {
      alert("카드 템플릿을 선택해주세요");
    } else if (type === "") {
      alert("메세지 보낼 대상을 선택해주세요.");
    } else {
      const recommandDto = {
        target: type,
        flower: data.data.languageOfFlower,
      };
      setRecommandDto(recommandDto);
      setClickBtn((cur) => !cur);
      //   recommandMutation.mutate(recommandDto);
    }
  };

  const handleRegister = () => {
    if (value === "") {
      alert("메세지를 작성해주세요");
    } else {
      const registerDto = {
        orderProductId: param.orderProductId,
        cardTemplateId: param.cardTemplate.cardTemplateId,
        content: value,
      };

      registerMutation.mutate(registerDto);
    }
  };

  const registerMutation = useMutation(
    ["registerCard"],
    (registerDto: cardRegisterDto) =>
      registerGiftCard(param.orderType.toUpperCase(), registerDto),
    {
      onSuccess: (data) => {
        Swal.fire({
          title: `<p style='text-align: center'>작성이 완료되었습니다.</p>`,
          text: "작성된 기프트 카드 페이지로 이동하시겠습니까? 카드 페이지에서 조회 및 공유가 가능합니다. 작성된 기프트 카드는 마이페이지에서 확인하실 수 있습니다.",
          iconHtml:
            '<a><img src="https://i.ibb.co/Y3dNf6N/success.png" alt="danger"></a>',
          showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
          confirmButtonColor: "#85C031", // confrim 버튼 색깔 지정
          cancelButtonColor: "#808080", // cancel 버튼 색깔 지정
          confirmButtonText: "확인", // confirm 버튼 텍스트 지정
          cancelButtonText: "닫기", // cancel 버튼 텍스트 지정
          reverseButtons: true, // 버튼 순서 거꾸로
          background: "#FFFFFF",
          color: "#212B36",
        }).then((result) => {
          // 만약 Promise리턴을 받으면,
          if (result.isConfirmed) {
            navigate("/giftcard/detail/" + data.cardId + "/" + data.password);
          } else {
            // 모달창에서 cancel 버튼을 눌렀다면
            isMall ? navigate("/") : navigate("/pickup");
          }
        });
      },
      onError: () => {
        navigate("/giftcard/detail/" + 1 + "/1234");
        FailToast(null);
      },
    }
  );
  const formats = ["header"];

  const modules = useMemo(() => {
    return {
      toolbar: false,
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      },
    };
  }, []);

  //   if (!data || isLoading) return <Loading />;

  return (
    <div className="mt-3">
      <div className="flex flex-row gap-2 px-2 flex-wrap">
        <Button
          className={
            type === "father"
              ? "border-[1px] border-[#85C031] text-[#85C031]"
              : ""
          }
          onClick={() => setType("father")}
        >
          아버지
        </Button>
        <Button
          className={
            type === "mother"
              ? "border-[1px] border-[#85C031] text-[#85C031]"
              : ""
          }
          onClick={() => setType("mother")}
        >
          어머니
        </Button>
        <Button
          className={
            type === "spouse"
              ? "border-[1px] border-[#85C031] text-[#85C031]"
              : ""
          }
          onClick={() => setType("spouse")}
        >
          배우자
        </Button>
        <Button
          className={
            type === "son" ? "border-[1px] border-[#85C031] text-[#85C031]" : ""
          }
          onClick={() => setType("son")}
        >
          아들
        </Button>
        <Button
          className={
            type === "daughter"
              ? "border-[1px] border-[#85C031] text-[#85C031]"
              : ""
          }
          onClick={() => setType("daughter")}
        >
          딸
        </Button>
        <Button
          className={
            type === "brother"
              ? "border-[1px] border-[#85C031] text-[#85C031]"
              : ""
          }
          onClick={() => setType("brother")}
        >
          형제
        </Button>
        <Button
          className={
            type === "sister"
              ? "border-[1px] border-[#85C031] text-[#85C031]"
              : ""
          }
          onClick={() => setType("sister")}
        >
          자매
        </Button>
        <Button
          className={
            type === "lover"
              ? "border-[1px] border-[#85C031] text-[#85C031]"
              : ""
          }
          onClick={() => setType("lover")}
        >
          애인
        </Button>
        <Button
          className={
            type === "friend"
              ? "border-[1px] border-[#85C031] text-[#85C031]"
              : ""
          }
          onClick={() => setType("friend")}
        >
          친구
        </Button>
        <Button
          className={
            type === "colleague"
              ? "border-[1px] border-[#85C031] text-[#85C031]"
              : ""
          }
          onClick={() => setType("colleague")}
        >
          동료
        </Button>
        <Button type="primary" onClick={handleContentRecommand}>
          글귀 추천받기
        </Button>
      </div>
      {param.cardTemplate.cardTemplateId === 0 ? (
        <div className="w-[30vw] h-[30vw] min-w-[370px] m-auto relative mt-5">
          <img
            src="https://i.pinimg.com/originals/c3/fe/1a/c3fe1addb7c1df50f7e5ba2d6b53426f.gif"
            alt="카드 템플릿"
            className="w-full rounded-lg opacity-60"
          />
          <div className="w-full h-full mt-[-250px] z-20 relative text-center text-[1.5rem] font-bold">
            템플릿을 선택해주세요
          </div>
        </div>
      ) : (
        <div className="w-[30vw] h-full min-w-[370px] m-auto relative mt-5">
          <img
            src={param.cardTemplate.imageUrl}
            alt="카드 템플릿"
            className="w-full rounded-lg"
          />
          <div className="absolute w-full h-full z-20 top-0">
            <div className="w-[23vw] h-[25vw] min-w-[300px] min-h-[400px] bg-grayscale1 z-20 m-auto mt-[6vw] rounded-lg drop-shadow-lg">
              {recommandDto ? (
                <GiftCardContent
                  recommandDto={recommandDto}
                  clickBtn={clickBtn}
                  value={value}
                  setValue={setValue}
                />
              ) : (
                <ReactQuill
                  theme="snow"
                  value={value}
                  onChange={setValue}
                  className="w-full h-full overflow-auto"
                  modules={modules}
                  formats={formats}
                  placeholder="내용을 입력해주세요"
                />
              )}
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-end mt-10">
        <Button size="large" type="primary" onClick={handleRegister}>
          작성 완료
        </Button>
      </div>
    </div>
  );
}
