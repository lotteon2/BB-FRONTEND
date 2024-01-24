import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useState } from "react";
import Rose from "../components/models/Rose";
import Tulip from "../components/models/Tulip";
import Hydrangea from "../components/models/Hydrangea";
import Lavender from "../components/models/Lavender";
import Sunflower from "../components/models/Sunflower";
import Carnation from "../components/models/Carnation";
import Daisy from "../components/models/Daisy";
import Delphinium from "../components/models/Delphinium";
import Lily from "../components/models/Lily";
import Hibiscous from "../components/models/Hibiscous";
import Peony from "../components/models/Peony";

import { Button } from "antd";

export default function FlowersPage() {
  const [flower, setFlower] = useState<string>("장미");

  return (
    <div>
      <div className="flex flex-row gap-2 flex-wrap px-2">
        <Button
          type={flower === "데이지" ? "primary" : "default"}
          onClick={() => setFlower("데이지")}
        >
          데이지
        </Button>
        <Button
          type={flower === "델피늄" ? "primary" : "default"}
          onClick={() => setFlower("델피늄")}
        >
          델피늄
        </Button>
        <Button
          type={flower === "라벤더" ? "primary" : "default"}
          onClick={() => setFlower("라벤더")}
        >
          라벤더
        </Button>
        <Button
          type={flower === "백합" ? "primary" : "default"}
          onClick={() => setFlower("백합")}
        >
          백합
        </Button>
        <Button
          type={flower === "수국" ? "primary" : "default"}
          onClick={() => setFlower("수국")}
        >
          수국
        </Button>
        <Button
          type={flower === "작약꽃" ? "primary" : "default"}
          onClick={() => setFlower("작약꽃")}
        >
          작약꽃
        </Button>
        <Button
          type={flower === "장미" ? "primary" : "default"}
          onClick={() => setFlower("장미")}
        >
          장미
        </Button>
        <Button
          type={flower === "카네이션" ? "primary" : "default"}
          onClick={() => setFlower("카네이션")}
        >
          카네이션
        </Button>
        <Button
          type={flower === "튤립" ? "primary" : "default"}
          onClick={() => setFlower("튤립")}
        >
          튤립
        </Button>
        <Button
          type={flower === "해바라기" ? "primary" : "default"}
          onClick={() => setFlower("해바라기")}
        >
          해바라기
        </Button>
        <Button
          type={flower === "히비스커스" ? "primary" : "default"}
          onClick={() => setFlower("히비스커스")}
        >
          히비스커스
        </Button>
      </div>
      {flower === "장미" ? (
        <div className="m-auto max-w-[900px] h-[600px] mt-10 flex flex-row gap-5 flex-wrap justify-between">
          <div className="w-[370px]">
            <Canvas className="canvas">
              <OrbitControls enableZoom={false} />
              <ambientLight intensity={10} />
              <directionalLight position={[-2, 5, 2]} intensity={1} />
              <Suspense fallback={null}>
                <Rose />
              </Suspense>
            </Canvas>
          </div>
          <div className="w-[370px] h-full">
            <p className="font-bold text-[2rem]">장미(Rose)</p>
            <p>개화시기: 5월 ~ 6월</p>
            <p className="font-light text-[0.9rem] mt-2">
              서양장미 중에서 꽃이 큰 수종은 사계절 내내 꽃이 피는 중국산
              야생장미와 향기가 뛰어난 유럽산 야생장미 사이에 잡종을 만들어내고
              이를 더욱 개량하여 육성하였다. 일반적으로 흰색, 붉은색, 노란색,
              분홍색 등의 색을 띠나 품종에 따라 그 형태·모양·색이 매우 다양하다.
              꽃의 피는 시기와 기간 역시 품종에 따라 차이가 크다. 국내에서는
              일반적으로 품종에 따라 5월 중순경부터 9월경까지 꽃을 볼 수 있다.
              마주나는 겹잎은 깃털모양이며 줄기에는 가시가 있다.
            </p>
            <div className="flex flex-row gap-2 mt-5 flex-wrap">
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "열렬한 사랑"
              </div>
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "새로운 시작"
              </div>
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "완벽한 성취"
              </div>
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "기적"
              </div>
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "우정"
              </div>
            </div>
          </div>
        </div>
      ) : flower === "튤립" ? (
        <div className="m-auto w-[900px] h-[600px] mt-10 flex flex-row gap-5 flex-wrap justify-between">
          <div className="w-[370px]">
            <Canvas className="canvas">
              <OrbitControls enableZoom={false} />
              <ambientLight intensity={5} />
              <directionalLight position={[-2, 5, 2]} intensity={1} />
              <Suspense fallback={null}>
                <Tulip />
              </Suspense>
            </Canvas>
          </div>
          <div className="w-[370px] h-full">
            <p className="font-bold text-[2rem]">튤립(Tulip)</p>
            <p>개화시기: 4월 ~ 5월</p>
            <p className="font-light text-[0.9rem] mt-2">
              꽃은 4∼5월에 1개씩 위를 향하여 빨간색·노란색 등 여러 빛깔로 피고
              길이 7cm 정도이며 넓은 종 모양이다. 화피는 위로 약간 퍼지지만
              옆으로는 퍼지지 않으며 수술은 6개이고 암술은 2cm 정도로서 원기둥
              모양이며 녹색이다. 열매는 삭과로서 7월에 익는다. 관상용
              귀화식물로서 원예농가에서 재배한다.
            </p>
            <div className="flex flex-row gap-2 mt-5 flex-wrap">
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "사랑의 고백"
              </div>
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "영원한 애정"
              </div>
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "고백"
              </div>
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "매혹"
              </div>
            </div>
          </div>
        </div>
      ) : flower === "수국" ? (
        <div className="m-auto w-[900px] h-[600px] mt-10 flex flex-row gap-5 flex-wrap justify-between">
          <div className="w-[370px]">
            <Canvas className="canvas">
              <OrbitControls enableZoom={false} />
              <ambientLight intensity={1} />
              <directionalLight position={[-2, 5, 2]} intensity={1} />
              <Suspense fallback={null}>
                <Hydrangea />
              </Suspense>
            </Canvas>
          </div>
          <div className="w-[370px] h-full">
            <p className="font-bold text-[2rem]">수국(Hydrangea)</p>
            <p>개화시기: 6월 ~ 7월</p>
            <p className="font-light text-[0.9rem] mt-2">
              잎은 마주나고 달걀 모양인데, 두껍고 가장자리에는 톱니가 있다. 꽃은
              중성화로 6∼7월에 피며 10∼15cm 크기이고 산방꽃차례로 달린다.
              꽃받침조각은 꽃잎처럼 생겼고 4∼5개이며, 처음에는 연한 자주색이던
              것이 하늘색으로 되었다가 다시 연한 홍색이 된다. 꽃잎은 작으며
              4∼5개이고, 수술은 10개 정도이며 암술은 퇴화하고 암술대는
              3∼4개이다.
            </p>
            <div className="flex flex-row gap-2 mt-5 flex-wrap">
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "진실된 꿈"
              </div>
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "짝사랑"
              </div>
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "변심"
              </div>
            </div>
          </div>
        </div>
      ) : flower === "라벤더" ? (
        <div className="m-auto w-[900px] h-[600px] mt-10 flex flex-row gap-5 flex-wrap justify-between">
          <div className="w-[370px]">
            <Canvas className="canvas">
              <OrbitControls enableZoom={false} />
              <ambientLight intensity={4} />
              <directionalLight position={[-2, 5, 2]} intensity={1} />
              <Suspense fallback={null}>
                <Lavender />
              </Suspense>
            </Canvas>
          </div>
          <div className="w-[370px] h-full">
            <p className="font-bold text-[2rem]">라벤더(Lavender)</p>
            <p>개화시기: 6월 ~ 9월</p>
            <p className="font-light text-[0.9rem] mt-2">
              꽃은 6∼9월에 연한 보라색이나 흰색으로 피고 잎이 달리지 않은 긴
              꽃대 끝에 수상꽃차례를 이루며 드문드문 달린다. 꽃·잎·줄기를 덮고
              있는 털들 사이에 향기가 나오는 기름샘이 있다. 물이 잘 빠지는
              모래땅에 약간의 자갈이 섞인 곳에서 잘 자라고 너무 비옥하지 않은
              땅이 좋다. 햇빛을 잘 받는 남향과 습하지 않은 곳에서 잘 자란다.
            </p>
            <div className="flex flex-row gap-2 mt-5 flex-wrap">
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "미래의 행복"
              </div>
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "평화"
              </div>
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "정열"
              </div>
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "신비"
              </div>
            </div>
          </div>
        </div>
      ) : flower === "해바라기" ? (
        <div className="m-auto w-[900px] h-[600px] mt-10 flex flex-row gap-5 flex-wrap justify-between">
          <div className="w-[370px]">
            <Canvas className="canvas">
              <OrbitControls enableZoom={false} />
              <ambientLight intensity={1} />
              <directionalLight position={[-2, 5, 2]} intensity={1} />
              <Suspense fallback={null}>
                <Sunflower />
              </Suspense>
            </Canvas>
          </div>
          <div className="w-[370px] h-full">
            <p className="font-bold text-[2rem]">해바라기(Sunflower)</p>
            <p>개화시기: 8월 ~ 9월</p>
            <p className="font-light text-[0.9rem] mt-2">
              꽃은 8∼9월에 피고 원줄기가 가지 끝에 1개씩 달려서 옆으로 처진다.
              꽃은 지름 8∼60cm이다. 설상화는 노란색이고 중성이며, 관상화는 갈색
              또는 노란색이고 양성이다. 열매는 10월에 익는데, 2개의 능선이 있고
              달걀을 거꾸로 세운 듯한 모양으로 길이 1cm 내외이며 회색 바탕에
              검은 줄이 있다. 종자는 20∼30％의 기름을 포함하며 식용한다.
              콜럼버스가 아메리카대륙을 발견한 다음 유럽에 알려졌으며 '태양의
              꽃' 또는 '황금꽃'이라고 부르게 되었다.
            </p>
            <div className="flex flex-row gap-2 mt-5 flex-wrap">
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "영원한 사랑"
              </div>
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "인내"
              </div>
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "헌신"
              </div>
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "숭배"
              </div>
            </div>
          </div>
        </div>
      ) : flower === "카네이션" ? (
        <div className="m-auto w-[900px] h-[600px] mt-10 flex flex-row gap-5 flex-wrap justify-between">
          <div className="w-[370px]">
            <Canvas className="canvas">
              <OrbitControls enableZoom={false} />
              <ambientLight intensity={2} />
              <directionalLight position={[-2, 5, 2]} intensity={2} />
              <Suspense fallback={null}>
                <Carnation />
              </Suspense>
            </Canvas>
          </div>
          <div className="w-[370px] h-full">
            <p className="font-bold text-[2rem]">카네이션(Carnation)</p>
            <p>개화시기: 7월 ~ 8월</p>
            <p className="font-light text-[0.9rem] mt-2">
              줄기는 곧게 서고 높이가 40∼50cm이며 전체가 분처럼 흰색을 띤다.
              잎은 마주나고 줄 모양이며 밑 부분이 줄기를 감싸고 끝이 뾰족하다.
              꽃은 7∼8월에 피지만 온실에서는 언제나 필 수 있도록 조절할 수
              있으며, 줄기 윗부분의 잎겨드랑이와 줄기 끝에 1∼3개씩 달리고 향기가
              있다. 꽃받침은 원통 모양이고 끝이 짧게 5개로 갈라진다. 꽃잎은
              달걀을 거꾸로 세운 모양이고 끝 부분이 얕게 갈라진다. 수술은
              10개이고 암술대는 2개이다. 열매는 삭과이고 달걀 모양이며 꽃받침에
              싸여 있다.
            </p>
            <div className="flex flex-row gap-2 mt-5 flex-wrap">
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "어머니의 사랑"
              </div>
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "사랑의 순수함"
              </div>
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "모정"
              </div>
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "감사"
              </div>
            </div>
          </div>
        </div>
      ) : flower === "데이지" ? (
        <div className="m-auto w-[900px] h-[600px] mt-10 flex flex-row gap-5 flex-wrap justify-between">
          <div className="w-[370px]">
            <Canvas className="canvas">
              <OrbitControls enableZoom={false} />
              <ambientLight intensity={1} />
              <directionalLight position={[-2, 5, 2]} intensity={1} />
              <Suspense fallback={null}>
                <Daisy />
              </Suspense>
            </Canvas>
          </div>
          <div className="w-[370px] h-full">
            <p className="font-bold text-[2rem]">데이지(Daisy)</p>
            <p>개화시기: 3월 ~ 4월</p>
            <p className="font-light text-[0.9rem] mt-2">
              유럽 원산으로 수염뿌리가 사방으로 퍼진다. 잎은 뿌리에서 나오고
              달걀을 거꾸로 세운 듯한 주걱 모양이며 밑쪽이 밑으로 흘러 잎자루
              윗부분의 날개로 된다. 잎의 가장자리가 밋밋하거나 약간 톱니가 있다.
              꽃은 봄부터 가을까지 피며 흰색, 연한 홍색, 홍자색이다. 뿌리에서
              꽃자루가 나오는데 길이 6∼9cm이고 그 끝에 1개의 두화(頭花)가 달리며
              밤에는 오므라든다. 두화는 설상화가 1줄인 것부터 전체가 설상화로 된
              것 등 변종에 따라 다양하다.
            </p>
            <div className="flex flex-row gap-2 mt-5 flex-wrap">
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "있는 그대로"
              </div>
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "순수"
              </div>
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "행복"
              </div>
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "명랑"
              </div>
            </div>
          </div>
        </div>
      ) : flower === "델피늄" ? (
        <div className="m-auto w-[900px] h-[600px] mt-10 flex flex-row gap-5 flex-wrap justify-between">
          <div className="w-[370px]">
            <Canvas className="canvas">
              <OrbitControls enableZoom={false} />
              <ambientLight intensity={1} />
              <directionalLight position={[-2, 5, 2]} intensity={1} />
              <Suspense fallback={null}>
                <Delphinium />
              </Suspense>
            </Canvas>
          </div>
          <div className="w-[370px] h-full">
            <p className="font-bold text-[2rem]">델피늄(Delphinium)</p>
            <p>개화시기: 7월 ~ 9월</p>
            <p className="font-light text-[0.9rem] mt-2">
              그리스어의 'delphin(돌고래)'이라는 뜻으로 꽃봉오리가 돌고래와
              비슷한 데서 붙여졌으며, 200여 종이 알려져 있다. 여러해살이풀 또는
              한해살이풀로서 산지에서 곧게 자란다. 잎은 마주나고 세 갈래로
              갈라진 손바닥 모양이다. 꽃은 7∼9월에 피는데
              총상꽃차례·수상꽃차례·원추꽃차례로 달린다. 꽃잎은 2∼4개, 꽃받침은
              5개이며 아랫부분에 꿀주머니가 있다. 아시아·유럽·북아메리카 등지에
              분포한다. 한국에 자생하는 것으로는 큰제비고깔과 제비고깔이 있다.
            </p>
            <div className="flex flex-row gap-2 mt-5 flex-wrap">
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "당신을 행복하게 해줄게요"
              </div>
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "로맨스"
              </div>
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "젊음"
              </div>
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "성공"
              </div>
            </div>
          </div>
        </div>
      ) : flower === "백합" ? (
        <div className="m-auto w-[900px] h-[600px] mt-10 flex flex-row gap-5 flex-wrap justify-between">
          <div className="w-[370px]">
            <Canvas className="canvas">
              <OrbitControls enableZoom={false} />
              <ambientLight intensity={1} />
              <directionalLight position={[-2, 5, 2]} intensity={1} />
              <Suspense fallback={null}>
                <Lily />
              </Suspense>
            </Canvas>
          </div>
          <div className="w-[370px] h-full">
            <p className="font-bold text-[2rem]">백합(Lily)</p>
            <p>개화시기: 5월 ~ 7월</p>
            <p className="font-light text-[0.9rem] mt-2">
              주로 햇볕이 직접 쬐지 않는 숲이나 수목의 그늘 또는 북향의 서늘한
              곳에서 자란다. 잎은 어긋나고 줄 모양이거나 바소꼴인데 때로
              돌려난다. 꽃은 크고 화피갈래조각은 6개로 떨어져 나며 내면에 밀구가
              있다. 수술은 6개이고 꽃밥은 T자형으로 달린다. 삭과는 납작한
              종자이며, 종자의 수명은 보통 3년이다. 특히 동아시아에는 종류가
              풍부하며 아름다운 꽃이 피는 것이 많다. 옛날부터 세계 각지에서
              진귀하게 여겨왔으며 개량하여 좋은 품종을 많이 길러냈다. 땅속의
              비늘줄기는 채소로 쓴다.
            </p>
            <div className="flex flex-row gap-2 mt-5 flex-wrap">
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "변함없는 사랑"
              </div>
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "순결"
              </div>
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "위엄"
              </div>
            </div>
          </div>
        </div>
      ) : flower === "히비스커스" ? (
        <div className="m-auto w-[900px] h-[600px] mt-10 flex flex-row gap-5 flex-wrap justify-between">
          <div className="w-[370px]">
            <Canvas className="canvas">
              <OrbitControls enableZoom={false} />
              <ambientLight intensity={2} />
              <directionalLight position={[-2, 5, 2]} intensity={1} />
              <Suspense fallback={null}>
                <Hibiscous />
              </Suspense>
            </Canvas>
          </div>
          <div className="w-[370px] h-full">
            <p className="font-bold text-[2rem]">히비스커스(Hibiscus)</p>
            <p>개화시기: 7월 ~ 9월</p>
            <p className="font-light text-[0.9rem] mt-2">
              꽃은 넓은 깔때기형이고 새가지 윗부분의 겨드랑이에 1개씩 달리며
              작은꽃가지가 있다. 꽃받침은 통같이 생기고 끝이 5개로 갈라진다.
              꽃잎은 붉고 5개이며 수술은 통처럼 합쳐져서 끝에 많은 꽃밥이
              달린다. 암술은 수술보다 길고 끝이 5개로 갈라진다. 여름부터 가을에
              걸쳐 꽃이 피지만 적당한 온도가 유지될 때는 연중 꽃이 핀다.
              겨울에는 저온으로 인해 개화가 중지된다. 16∼30℃에서 잘 생육하며 5℃
              이상에서 월동하며 광선을 좋아한다
            </p>
            <div className="flex flex-row gap-2 mt-5 flex-wrap">
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "항상 새로운 사랑"
              </div>
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "섬세한 아름다움"
              </div>
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "화려함"
              </div>
            </div>
          </div>
        </div>
      ) : flower === "작약꽃" ? (
        <div className="m-auto w-[900px] h-[600px] mt-10 flex flex-row gap-5 flex-wrap justify-between">
          <div className="w-[370px]">
            <Canvas className="canvas">
              <OrbitControls enableZoom={false} />
              <ambientLight intensity={3} />
              <directionalLight position={[-2, 5, 2]} intensity={1} />
              <Suspense fallback={null}>
                <Peony />
              </Suspense>
            </Canvas>
          </div>
          <div className="w-[370px] h-full">
            <p className="font-bold text-[2rem]">작약꽃(Paeony)</p>
            <p>개화시기: 5월 ~ 6월</p>
            <p className="font-light text-[0.9rem] mt-2">
              꽃은 5∼6월에 줄기 끝에 1개가 피는데 크고 아름다우며 재배한 것은
              지름 10cm 정도이다. 꽃색은 붉은색·흰색 등 다양하며 많은 원예
              품종이 있다. 꽃받침은 5개로 녹색이고 가장자리가 밋밋하며 끝까지
              붙어 있는데 가장 바깥쪽의 것은 잎 모양이다. 꽃잎은 10개 정도이나
              기본종은 8∼13개이고 달걀을 거꾸로 세운 듯한 모양이며 길이 5cm
              정도이다. 수술은 매우 많고 노란색이며 암술은 3∼5개로 암술머리가
              뒤로 젖혀지고 달걀 모양의 씨방에는 털이 없거나 약간 있다. 열매는
              달걀 모양으로 끝이 갈고리 모양으로 굽으며 내봉선을 따라 갈라지고
              종자는 구형이다.
            </p>
            <div className="flex flex-row gap-2 mt-5 flex-wrap">
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "사랑의 고백"
              </div>
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "행복한 사랑"
              </div>
              <div className="px-4 py-4 bg-primary7 rounded-lg text-grayscale1 font-light">
                "부끄러움"
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
