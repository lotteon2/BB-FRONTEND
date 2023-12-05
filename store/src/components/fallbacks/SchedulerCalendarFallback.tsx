import { Skeleton } from "antd";

export default function SchedulerCalendarFallback() {
  return (
    <div className="mt-2">
      <Skeleton.Node active style={{ width: 1580, height: 800 }}>
        <div></div>
      </Skeleton.Node>
    </div>
  );
}
