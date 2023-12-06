import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import FlowerMarker from "../../../assets/images/map/flower.png";
import ManMarker from "../../../assets/images/map/person.png";
import SquareFallback from "../../fallbacks/SquareFallback";
import { getFlowerShopsNearBy } from "../../../apis/store";
import { storeListNearByDto } from "../../../recoil/common/interfaces";
import { useRecoilState } from "recoil";
import { locationstate } from "../../../recoil/atom/common";

export default function KakaoMap() {
  const [state, setState] = useRecoilState(locationstate);
  const [markerList, setMarkerList] = useState<boolean[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ["getFlowerShopsNearBy", state],
    queryFn: () => getFlowerShopsNearBy(state.lat, state.lng, state.level),
  });

  const handleMarkerClose = (index: number) => {
    const markers = markerList;
    markers[index] = false;
    setMarkerList([...markers]);
  };

  const handleMapMarker = (index: number) => {
    const markers = markerList;
    markers[index] = true;
    setMarkerList([...markerList]);
  };

  useEffect(() => {
    if (data) {
      var markerList: boolean[] = [];
      data.stores.map(() => markerList.push(false));
      setMarkerList(markerList);
    }
  }, [data]);

  if (!data || isLoading) return <SquareFallback />;

  return (
    <div className="w-full h-full">
      <Map
        center={{ lat: state.lat, lng: state.lng }}
        style={{
          // 지도의 크기
          width: "100%",
          height: "100%",
        }}
        level={state.level}
        maxLevel={5}
        onClick={(_t, mouseEvent) => {
          setState((prev) => ({
            ...prev,
            lat: mouseEvent.latLng.getLat(),
            lng: mouseEvent.latLng.getLng(),
          }));
        }}
        isPanto={true}
      >
        <MapMarker
          position={{ lat: state.lat, lng: state.lng }}
          image={{
            src: ManMarker,
            size: {
              width: 48,
              height: 48,
            },
          }}
          draggable={true}
          onDragEnd={(mouseEvent) => {
            const center = {
              lat: mouseEvent.getPosition().getLat(),
              lng: mouseEvent.getPosition().getLng(),
            };
            setState((prev) => ({ ...prev, center: center }));
          }}
        />
        {data.stores.map((item: storeListNearByDto, index: number) => (
          <MapMarker
            key={item.storeId}
            position={{ lat: item.position.lat, lng: item.position.lon }}
            title={item.storeName}
            image={{
              src: FlowerMarker,
              size: {
                width: 32,
                height: 32,
              },
            }}
            onClick={() => {
              setState((prev) => ({
                ...prev,
                lat: item.position.lat,
                lng: item.position.lon,
              }));
            }}
            onMouseOver={() => {
              handleMapMarker(index);
            }}
            onMouseOut={() => {
              handleMarkerClose(index);
            }}
          >
            {markerList[index] && (
              <div className="px-1 min-w-[150px] max-w-[200px]">
                <div className="w-full h-full text-center px-2 py-4">
                  <p>{item.storeName}</p>
                </div>
              </div>
            )}
          </MapMarker>
        ))}
      </Map>
    </div>
  );
}
