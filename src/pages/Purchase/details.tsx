import { useParams } from "react-router";
import { getPurchaseDetails } from "../../store/API/productApis";
import { useAppDispatch } from "../../store/hooks";
import { useEffect } from "react";
import PurchaseInfo from "../../components/Purchase/PurchaseInfo";

const PurchaseDetails = () => {


    const { id } = useParams();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (id) dispatch(getPurchaseDetails(id));
    }, [id, dispatch]);
    return (
        <div className="mx-3 my-8 flex justify-center">
            <PurchaseInfo />
        </div>
    );
};

export default PurchaseDetails;