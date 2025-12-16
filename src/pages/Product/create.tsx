import { useNavigate } from "react-router";
import ProductCreateUpdateForm from "../../components/Product/ProductCreateUpdateForm";
import { useAppDispatch } from "../../store/hooks";
import { productCreate } from "../../store/API/productApis";

const ProductCreate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    // console.log(data);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('category', data.category);
    formData.append('brand', data.brand);
    formData.append('basePrice', data.basePrice);
    formData.append('purchasePrice', data.purchasePrice);
    formData.append('unit', data.unit);
    formData.append('discount', data.discount);
    formData.append('taxAmount', data.taxAmount);
    formData.append('productCode', data.productCode);
    formData.append('description', data.description);
    if (data.image[0]) {
      formData.append('image', data.image[0]);
    }

    dispatch(
      productCreate({
        postData: formData,
        router: navigate,
      })
    );
  };
  return (
    <div className="flex flex-col gap-4 px-4 pt-6 text-start justify-center">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-gray-800 w-full">
        <div className="border-b border-stroke py-4 px-6 dark:border-strokedark">
          <h3 className="font-semibold text-black dark:text-white">
            Create Product
          </h3>
        </div>
        <ProductCreateUpdateForm onSubmit={onSubmit}/>
      </div>
    </div>
  );
};

export default ProductCreate;
