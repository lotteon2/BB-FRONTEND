import LastMonthSettlementTable from "../components/dashbaord/LastMonthSettlementTable";
import MonthlyStoreSalesGraph from "../components/dashbaord/MonthlyStoreSalesGraph";
import RegisterRequestList from "../components/dashbaord/RegisterRequestList";

export default function DashboardPage() {
  return (
    <div className="w-[1620px] h-[897px] bg-grayscale3 flex flex-col gap-2 p-2">
      <div className="flex flex-row gap-2">
        <div className="w-[805px] h-[436px] bg-grayscale1 rounded-lg">
          <MonthlyStoreSalesGraph />
        </div>
        <div className="w-[805px] h-[436px] bg-grayscale1 rounded-lg">
          <RegisterRequestList />
        </div>
      </div>
      <div className="w-[1605px] h-[436px] bg-grayscale1 rounded-lg">
        <LastMonthSettlementTable />
      </div>
    </div>
  );
}
