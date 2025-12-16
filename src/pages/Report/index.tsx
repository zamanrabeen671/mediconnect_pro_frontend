import React, { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
} from "recharts";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getGeneralizedReport } from "../../store/API/adminApi";
import moment from "moment";
import { FiRefreshCcw } from "react-icons/fi";
import { convertToCSVReport } from "../../utils/helperFunciton";

const ProfitAndLossReport: React.FC = () => {
    const dispatch = useAppDispatch();
    const { generalizedReport } = useAppSelector((state) => state.admin);
    const { isDarkMode } = useAppSelector((state) => state.darkMode)


    const [startDate, setStartDate] = useState<string>(moment().subtract(6, "months").format("YYYY-MM-DD"));
    const [endDate, setEndDate] = useState<string>(moment().add(1, "day").format("YYYY-MM-DD"));
    useEffect(() => {
        dispatch(getGeneralizedReport({ startDate, endDate }));
    }, [])

    const handleReportFilter = () => {
        dispatch(
            getGeneralizedReport({
                startDate: startDate,
                endDate: moment(endDate).add(1, "day").format("YYYY-MM-DD"),
            })
        );
    };
    

    const downloadCSV = async () => {

        const sanitizedData = {
            totalRevenue: generalizedReport.data?.totalRevenue.toFixed(2),
            totalCOGS: generalizedReport.data?.totalCOGS.toFixed(2),
            grossProfit: generalizedReport.data?.grossProfit.toFixed(2),
            totalExpenses: generalizedReport.data?.totalExpenses.toFixed(2),
            netProfit: generalizedReport.data?.netProfit.toFixed(2),
        }
        const csvData = convertToCSVReport(sanitizedData);
        const blob = new Blob([csvData], { type: "text/csv" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `report  ${moment().format('hhmmssddmmyy')}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

    };
    // Data for the bar chart (Revenue, COGS, Gross Profit, Expenses, Net Profit)
    const barChartData = [
        { name: "Revenue", value: generalizedReport.data?.totalRevenue || 0 },
        { name: "COGS", value: generalizedReport.data?.totalCOGS || 0 },
        { name: "Gross Profit", value: generalizedReport.data?.grossProfit || 0 },
        { name: "Expenses", value: generalizedReport.data?.totalExpenses || 0 },
        { name: "Net Profit", value: generalizedReport.data?.netProfit || 0 },
    ];

    // Data for the pie chart (Revenue, COGS, Expenses)
    const pieChartData = [
        { name: "Revenue", value: generalizedReport.data?.totalRevenue || 0 },
        { name: "COGS", value: generalizedReport.data?.totalCOGS || 0 },
        { name: "Expenses", value: generalizedReport.data?.totalExpenses || 0 },
    ];

    // Colors for the charts
    const COLORS = ["#4BC0C0", "#FF6384", "#36A2EB", "#FFCE56", "#9966FF"];

    return (
        <div style={{ padding: "20px" }}>
            <div className="mb-5 flex flex-wrap items-center gap-4">
                <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                    <span>Start Date:</span>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    />
                </label>

                <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                    <span>End Date:</span>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    />
                </label>

                <div onClick={handleReportFilter}
                    className="flex items-center gap-2 bg-lime-400 text-white px-4 py-3 
                    rounded-lg shadow-lg hover:bg-lime-500 transition active:scale-95 cursor-pointer"

                >
                   <FiRefreshCcw />

                </div>

                <div className="mx-2">

                    <button
                        onClick={downloadCSV}
                        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition active:scale-95">
                        Download</button>
                </div>
            </div>


            {/* Report Data */}
            {generalizedReport.data && (
                <div>
                    {/* Bar Chart */}
                    <div style={{ marginBottom: "40px" }}>
                        <h2>Financial Overview</h2>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={barChartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value" fill="#4BC0C0" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Pie Chart */}
                    <div style={{ marginBottom: "40px" }}>
                        <h2>Expenses Breakdown</h2>
                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart>
                                <Pie
                                    data={pieChartData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={150}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label
                                >
                                    {pieChartData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
                        <ul className="space-y-2">
                            <li className="flex justify-between border-b pb-2 border-opacity-50" style={{ borderColor: isDarkMode ? "#4A5568" : "#E2E8F0" }}>
                                <span className="opacity-80">Total Revenue:</span>
                                <span className="font-semibold text-green-400">৳{generalizedReport.data.totalRevenue.toFixed(2)}</span>
                            </li>
                            <li className="flex justify-between border-b pb-2 border-opacity-50" style={{ borderColor: isDarkMode ? "#4A5568" : "#E2E8F0" }}>
                                <span className="opacity-80">Total COGS:</span>
                                <span className="font-semibold text-red-400">৳{generalizedReport.data.totalCOGS.toFixed(2)}</span>
                            </li>
                            <li className="flex justify-between border-b pb-2 border-opacity-50" style={{ borderColor: isDarkMode ? "#4A5568" : "#E2E8F0" }}>
                                <span className="opacity-80">Gross Profit:</span>
                                <span className="font-semibold text-blue-400">৳{generalizedReport.data.grossProfit.toFixed(2)}</span>
                            </li>
                            <li className="flex justify-between border-b pb-2 border-opacity-50" style={{ borderColor: isDarkMode ? "#4A5568" : "#E2E8F0" }}>
                                <span className="opacity-80">Total Expenses:</span>
                                <span className="font-semibold text-orange-400">৳{generalizedReport.data.totalExpenses.toFixed(2)}</span>
                            </li>
                            <li className="flex justify-between border-b pb-2 border-opacity-50" style={{ borderColor: isDarkMode ? "#4A5568" : "#E2E8F0" }}>
                                <span className="opacity-80">Net Profit:</span>
                                <span className={`font-semibold ${generalizedReport.data.netProfit >= 0 ? "text-green-400" : "text-red-400"}`}>
                                    ৳{generalizedReport.data.netProfit.toFixed(2)}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfitAndLossReport;