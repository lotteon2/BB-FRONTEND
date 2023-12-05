import ReviewList from "../components/manage/ReviewList";

export default function ManagePage() {
  return (
    <div className="w-[1620px] h-[897px] bg-grayscale3 flex flex-row gap-2 p-2">
      <div className="w-1/2 h-full bg-grayscale1 rounded-lg p-3">
        <ReviewList />
      </div>
      <div className="w-1/2 h-full bg-grayscale1 rounded-lg"></div>
    </div>
  );
}
