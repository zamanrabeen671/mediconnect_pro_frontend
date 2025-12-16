import { useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAnalyticsReport } from "../../store/API/adminApi";
import { FiDownload } from "react-icons/fi";

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
        <p className="font-semibold text-gray-700">{payload[0].payload.month}</p>
        <p className="text-blue-500">📦 Purchases: {payload[0].value}</p>
        <p className="text-green-500">💰 Sales: {payload[1].value}</p>
      </div>
    );
  }
  return null;
};
// Bar Chart Component
const InventoryBarChart = () => {

  const dispatch = useAppDispatch()
  const { report } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAnalyticsReport({ startDate: '', endDate: '' }));
  }, []);

  const handleDownload = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Month,Total Purchases,Total Sales"]
        .concat(report.data?.map((row: any) => `${row.month},${row.totalPurchase},${row.totalSale}`) ?? [])
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "monthly_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="p-6 bg-white dark:bg-gray-800 shadow-xl rounded-2xl w-full">
      <div className="flex justify-center items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">📊 Monthly Purchases & Sales</h2>
        <div className="ml-4">

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-blue-600  text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <FiDownload size={20} />
            Download Report
          </button>
        </div>
      </div>
      <div className="w-full h-[400px]">
        <ResponsiveContainer>
          <BarChart
            data={report.data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barSize={40}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" tick={{ fill: '#4B5563' }} className="text-sm" />
            <YAxis tick={{ fill: '#4B5563' }} className="text-sm" />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F3F4F6' }} />
            <Legend wrapperStyle={{ color: '#4B5563' }} />
            <Bar dataKey="totalPurchase" fill="#6366F1" radius={[5, 5, 0, 0]} name="Total Purchases" />
            <Bar dataKey="totalSale" fill="#10B981" radius={[5, 5, 0, 0]} name="Total Sales" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InventoryBarChart;
