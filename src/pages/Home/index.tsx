import InventoryBarChart from "../../components/Admin/BarChart";
import { AnalyticsCard } from "../../components/Admin/Card";


const Home = () => {
  return (
    <div className="p-2">
      <AnalyticsCard />
      <InventoryBarChart />
    </div>
  );
}

export default Home