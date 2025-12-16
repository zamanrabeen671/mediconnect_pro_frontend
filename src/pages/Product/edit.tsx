import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getProductDetails, productEdit } from "../../store/API/productApis";
import ProductCreateUpdateForm from "../../components/Product/ProductCreateUpdateForm";

const ProductEdit = () => {
  const { productDetails } = useAppSelector((state) => state.product);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (id) dispatch(getProductDetails(id));
  }, [id, dispatch]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log(data);
    dispatch(
      productEdit({
        postData: data,
        router: navigate,
      })
    );
  };

  return (
    <div className="flex flex-col gap-4 px-4 pt-6 text-start justify-center">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-gray-800 w-full">
        <div className="border-b border-stroke py-4 px-6 dark:border-strokedark">
          <h3 className="font-semibold text-black dark:text-white">
            Edit Product
          </h3>
        </div>
        <ProductCreateUpdateForm
          onSubmit={onSubmit}
          productDetailsProps={productDetails}
        />
      </div>
    </div>
  );
};

export default ProductEdit;
