import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import CalendarToolbar from "./CalendarToolbar";
import moment from "moment";
import { useRecoilValue, useSetRecoilState } from "recoil";
import "../../css/react-big-calendar.css";
import SubscriptionInfoModal from "./modal/SubscriptionInfoModal";
import PickupInfoModal from "./modal/PickupInfoModal";
import { useQuery } from "react-query";
import { dateState, storeIdState } from "../../recoil/atom/common";
import { getScheduleInfo } from "../../apis/order";
import SchedulerCalendarFallback from "../fallbacks/SchedulerCalendarFallback";

interface dateInfo {
  year: number;
  month: number;
}
interface calendarEvents {
  id: string;
  title: string;
  start: Date;
  end: Date;
}

export default function SchedulerCalendar() {
  const setDate = useSetRecoilState<dateInfo>(dateState);
  const storeId = useRecoilValue<number>(storeIdState);

  const [events, setEvents] = useState<calendarEvents[]>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalState, setModalState] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("");

  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);

  const handleClickNavigate = (date: Date) => {
    setDate({ year: date.getFullYear(), month: date.getMonth() + 1 });
  };

  const eventHandlePropGetter = (event: any) => {
    const backgroundColor = event.title === "정기구독" ? "#A843D6" : "#DEA9F6";

    return { style: { backgroundColor } };
  };

  const { data, isLoading } = useQuery({
    queryKey: ["getScheduleInfo"],
    queryFn: () => getScheduleInfo(storeId),
  });

  const handleClickSelect = (select: any) => {
    setSelectedId(select.id);

    if (select.title === "정기구독") {
      setModalState(true);
      setIsModalOpen(true);
    } else {
      setModalState(false);
      setIsModalOpen(true);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (data) {
      let attendanceTmp: calendarEvents[] = [];

      data.data.forEach(function (item: string) {
        const date = item.split(" ")[0];
        const year = Number(date.split("-")[0]);
        const month = Number(date.split("-")[1]) - 1;
        const day = Number(date.split("-")[2]);
        attendanceTmp.push({
          id: item,
          title:
            item.split(" ")[1] === "SUBSCRIPTION" ? "정기구독" : "픽업예약",
          start: new Date(year, month, day),
          end: new Date(year, month, day),
        });
      });
      setEvents(attendanceTmp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (!data || isLoading) return <SchedulerCalendarFallback />;

  return (
    <div>
      <Calendar
        localizer={localizer}
        defaultView="month"
        components={{ toolbar: CalendarToolbar }}
        style={{ height: 800, marginTop: 5 }}
        events={events}
        onNavigate={handleClickNavigate}
        onSelectEvent={handleClickSelect}
        eventPropGetter={eventHandlePropGetter}
      />
      {isModalOpen && modalState ? (
        <SubscriptionInfoModal
          selectedId={selectedId}
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
        />
      ) : isModalOpen && !modalState ? (
        <PickupInfoModal
          selectedId={selectedId}
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
        />
      ) : (
        ""
      )}
    </div>
  );
}
