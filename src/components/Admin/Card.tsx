import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getSummeryReport } from "../../store/API/adminApi";
import Card from "../Common/Card";
import { FaBox, FaDollarSign, FaShoppingCart } from "react-icons/fa";
import { formatCurrency } from "../../utils/helperFunciton";
import { AiOutlineStock } from "react-icons/ai";
import { BiSolidPurchaseTag } from "react-icons/bi";

export const AnalyticsCard = () => {
    const dispatch = useAppDispatch();

    const { summery } = useAppSelector((state) => state.admin);

    useEffect(() => {
        dispatch(getSummeryReport({}));
    }, [])
    return (
        <div className="p-6 bg-gray-50 dark:bg-gray-800 my-2">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card
                    title="Total Products"
                    value={Number(summery?.data?.totalProducts)}
                    icon={<FaBox className="w-8 h-8 text-blue-500" />}
                    gradient="linear-gradient(135deg, #6EE7B7 0%, #3B82F6 100%)"
                    link="/products/"
                />
                <Card
                    title="Total Purchases"
                    value={formatCurrency(Number(summery?.data?.totalPurchases))}
                    icon={<FaShoppingCart className="w-8 h-8 text-purple-500" />}
                    gradient="linear-gradient(135deg, #F9A8D4 0%, #9333EA 100%)"
                    link={'/purchase/'}
                />
                <Card
                    title="Total Sales"
                    value={formatCurrency(Number(summery?.data?.totalSales))}
                    icon={<FaDollarSign className="w-8 h-8 text-green-500" />}
                    gradient="linear-gradient(135deg, #32a852 0%,rgb(72, 124, 79) 100%)"
                    link="sale"
                />
                <Card
                    title="Low Stock"
                    value={(Number(summery?.data?.lowStockItems))}
                    icon={<AiOutlineStock className="w-8 h-8 text-green-500" />}
                    gradient="linear-gradient(135deg, #FDE68A 0%,rgb(245, 116, 11) 100%)"
                    link="/products/stock/"
                />
                 <Card
                    title="Due Purchase"
                    value={(Number(summery?.data?.duePurchaseItems))}
                    icon={<BiSolidPurchaseTag className="w-8 h-8 text-green-500" />}
                    gradient="linear-gradient(135deg,rgb(83, 136, 167) 0%,rgb(34, 74, 134) 100%)"
                    link="/purchase/"
                />
                 <Card
                    title="Due Sale"
                    value={(Number(summery?.data?.dueSaleItems))}
                    icon={<FaDollarSign className="w-8 h-8 text-green-500" />}
                    gradient="linear-gradient(135deg,rgb(143, 233, 228) 0%,rgb(40, 166, 175) 100%)"
                    link="sale"
                />
            </div>
        </div>
    )
}