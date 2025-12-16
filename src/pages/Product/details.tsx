import { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getProductDetails } from "../../store/API/productApis";
import ProductInfo from "../../components/Product/ProductInfo";

const ProductDetails = () => {
  const { productDetails } = useAppSelector((state) => state.product);
  console.log(productDetails);

  const { id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) dispatch(getProductDetails(id));
  }, [id, dispatch]);
  return (
    <div className="mx-3 my-8 flex justify-center">
      <ProductInfo />
    </div>
  );
};

export default ProductDetails;
