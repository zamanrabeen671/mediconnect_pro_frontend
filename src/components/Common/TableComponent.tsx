/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AiOutlineCheckCircle,
  AiOutlineEdit,
  AiOutlineEye,
  AiFillCloseCircle,
} from "react-icons/ai";
import { RiCloseCircleLine, RiDeleteBin6Line } from "react-icons/ri";
import { IoMdCash, IoMdCloudDownload } from "react-icons/io";
import moment from "moment";
import Modal from "react-modal";
import { useState } from "react";
import Barcode from "react-barcode";
import { useAppSelector } from "../../store/hooks";

Modal.setAppElement("#root"); // Important for accessibility

// Define the structure of a column
type Column = {
  header: string;
  accessor: any | ((row: any) => any);
};

// Define the props for the Table component
type TableProps<T> = {
  columns: Column[];
  data: T[];
  onEdit?: (data: T) => void;
  onDelete?: (id: number) => void;
  onView?: (id: number) => void;
  extraAction?: (data: T) => void;
  invoice?: (id: number) => void;
  isAction?: boolean;
  isWarn?: boolean;
  selectOrderStatus?:(data: any) => void;
  handlePaymentInfo?:(data: any) => void;
};

function Table<T>({
  columns,
  data,
  onEdit,
  onDelete,
  extraAction,
  onView,
  invoice,
  isAction,
  handlePaymentInfo
}: TableProps<T>) {
  const { isDarkMode } = useAppSelector((state) => state.darkMode);

  // Modal State
  const [modalIsOpen, setIsOpen] = useState(false);
  const [productCode, setProductCode] = useState("");

  // Open modal with product code
  function openModal(val: string) {
    setIsOpen(true);
    setProductCode(val);
  }

  // Close modal
  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      // height: '100%',
      padding: "0 20px",
      widht: "100%",
      backgroundColor: isDarkMode ? "#333" : "#fff", // Dark or light background
    },
    overlay: {
      backgroundColor: "transparent",
      // opacity: '0.9'
      // backgroundColor: "transparent"
    },
  };

  return (
    <div className="mt-4 rounded-md shadow-lg overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 text-black dark:text-white">
        {/* Table Header */}
        <thead className="bg-gray-200 py-2 dark:bg-gray-700">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="px-4 py-2 border text-left">
                {column.header}
              </th>
            ))}
            {isAction && (
              <th className="px-4 py-2 border text-center">Action</th>
            )}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.length > 0 ? (
            data.map((item: any, rowIndex) => (
              <tr
                key={rowIndex}
                className={`border`}
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-4 py-2 border">
                    <span
                      onClick={() =>
                        column.accessor === "productCode"
                          ? openModal((item as any)[column.accessor])
                          : console.log("Cell Clicked")
                      }
                    >
                      {typeof column.accessor === "function"
                        ? column.accessor(item)
                        : ["createdAt", "purchaseDate", "saleDate"].includes(
                            column.accessor
                          )
                        ? moment((item as any)[column.accessor]).format(
                            "YYYY-MM-DD"
                          )
                        : (item as any)[column.accessor]}
                    </span>
                  </td>
                ))}

                {/* Actions */}
                {isAction && (
                  <td className="px-4 py-2 border text-center">
                    {onEdit && onEdit !== undefined && (
                      <button onClick={() => onEdit(item)} className="mx-1">
                        <AiOutlineEdit className="text-yellow-500 text-xl" />
                      </button>
                    )}
                    {onDelete && onDelete !== undefined && (
                      <button
                        onClick={() => onDelete((item as any).id)}
                        className="mx-1"
                      >
                        <RiDeleteBin6Line className="text-red-500 text-xl" />
                      </button>
                    )}
                    {onView && onView !== undefined && (
                      <button
                        onClick={() => onView((item as any).id)}
                        className="mx-1"
                      >
                        <AiOutlineEye className="text-blue-500 text-xl" />
                      </button>
                    )}
                    {extraAction && extraAction !== undefined && (
                      <button
                        onClick={() => extraAction(item)}
                        className="mx-1"
                      >
                        {item.status ? (
                          <RiCloseCircleLine className="text-gray-500 text-xl" />
                        ) : (
                          <AiOutlineCheckCircle className="text-green-500 text-xl" />
                        )}
                      </button>
                    )}
                    {invoice && (
                      <button
                        onClick={() => invoice(item as any)}
                        className="mx-1"
                      >
                        <IoMdCloudDownload className="text-purple-500 text-xl" />
                      </button>
                    )}
                    {handlePaymentInfo && (
                      <button
                        onClick={() => handlePaymentInfo(item as any)}
                        className="mx-1"
                      >
                        <IoMdCash className="text-purple-500 text-xl" />
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + (isAction ? 1 : 0)}
                className="px-4 py-2 text-center text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Barcode Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Barcode Modal"
      >
        <button onClick={closeModal} className="float-right">
          <AiFillCloseCircle className="my-2 mx-2 text-red-500 text-lg" />
        </button>
        <div className="my-2 text-center">
          <Barcode
            value={productCode || ""}
            width={1.5}
            height={100}
            format="CODE128"
            displayValue={true}
          />
        </div>
      </Modal>
    </div>
  );
}

export default Table;
