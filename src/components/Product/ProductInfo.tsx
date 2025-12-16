import Barcode from "react-barcode";
import { useAppSelector } from "../../store/hooks";

const ProductInfo = () => {
  const { productDetails } = useAppSelector((state) => state.product);
  return (
    <div className="mr-3 flex direction-column shadow py-3 px-8 h-max w-2/3 lg:w-2/3 justify-center">
      <div>
        <img
          className=" w-36 h-36 mb-8 rounded-full border border-yellow-600 mx-auto"
          src={
            productDetails?.imageURL
              ? productDetails?.imageURL
              : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
          }
          alt=""
        />

        <div className="">
          <p>
            Name: <strong>{productDetails.name}</strong>
          </p>
          <p>
            Product Code: <strong>{productDetails.productCode}</strong>
            <Barcode value={productDetails.productCode || ''} width={1.5} height={100} format="CODE128"
              displayValue={true}
              font="monospace"
              textAlign="center"
              // size={200}
            />
          </p>
          <p>
            Description: <strong>{productDetails.description}</strong>
          </p>
          <p>
            Category: <strong>{productDetails?.category?.name}</strong>
          </p>
          <p>
            Brand: <strong>{productDetails?.brand?.name}</strong>
          </p>
          <p>
            Purchase Price: <strong>{productDetails.purchasePrice}</strong>
          </p>
          <p>
            Base Price: <strong>{productDetails.basePrice}</strong>
          </p>
          <p>
            Quantity: <strong>{productDetails.quantity}</strong>
          </p>
          <p>
            Discount: <strong>{productDetails.discount}</strong>
          </p>
          <p>
            Tax Amount: <strong>{productDetails.taxAmount}</strong>
          </p>
          <p>
            Unit: <strong>{productDetails.unit}</strong>
          </p>
          <p>
            Supplier: <strong>{productDetails.supplier}</strong>
          </p>
          <p>
            Supplier Phone: <strong>{productDetails.supplierPhone}</strong>
          </p>
          <p>
            Added By:{" "}
            <strong>
              {productDetails?.user?.first_name} {productDetails?.user?.last_name}
            </strong>
          </p>
          {/* <p>
          Active: <strong>{productDetails.is_active ? "True" : "False"}</strong>
          </p> */}
          <div className="flex justify-center my-3">
            {/* <Link href={``}>
            <button className="rounded py-2 px-5 text-white mr-2 bg-yellow-400">
            Edit
            </button>
          </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
