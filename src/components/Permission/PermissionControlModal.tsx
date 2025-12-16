/* eslint-disable @typescript-eslint/no-explicit-any */
import {  useForm } from "react-hook-form";
import ModalContainer from "../Common/ModalContainer";


interface ModalProps {
  modelOpen: boolean;
  setModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (data: any) => void;
}

const PermissionControlModal: React.FC<ModalProps> = ({
  modelOpen,
  setModelOpen,
  onSubmit,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();


  return (
    <ModalContainer open={modelOpen} closeModal={() => setModelOpen(false)}>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
          {/* Close Button */}
          <button
            className="absolute top-3 right-3 bg-gray-800 text-white rounded-full p-1 hover:bg-gray-600"
            onClick={() => setModelOpen(false)}
          >
            ✕
          </button>

          <h1 className="text-xl font-semibold text-center mb-6">
            Create Permission
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Notes Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                {...register("name", { required: true })}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter name"
                type="text"
              ></input>
              {errors?.name && (
                <p className="text-red-500 text-sm">This field is required.</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-green-500 text-white font-medium py-2 px-4 rounded-md hover:bg-green-600 transition-all w-full"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </ModalContainer>
  );
};

export default PermissionControlModal;
