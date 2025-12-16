import { useParams } from "react-router";
import { getExpenseDetails } from "../../store/API/productApis";
import { useAppDispatch } from "../../store/hooks";
import { useEffect } from "react";
import ExpenseInfo from "../../components/Expense/ExpenseInfo";

const ExpenseDetails = () => {


    const { id } = useParams();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (id) dispatch(getExpenseDetails(id));
    }, [id, dispatch]);
    return (
        <div className="mx-3 my-8 flex justify-center">
            <ExpenseInfo />
        </div>
    );
};

export default ExpenseDetails;