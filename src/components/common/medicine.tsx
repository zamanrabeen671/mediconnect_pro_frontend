"use client"

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteMedicine, getMedicineList, updateMedicine } from "../../store/API/adminApi";
import { useEffect, useState } from "react";
import { MedicineType } from "../../models";
import { FaTrash, FaPlus, FaSearch, FaChevronLeft, FaChevronRight, FaEdit, FaTimes, FaSave } from "react-icons/fa";
import { useNavigate } from "react-router";

const ITEMS_PER_PAGE = 10;

export const Medicine = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { medicines, loading } = useAppSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMedicines, setFilteredMedicines] = useState<MedicineType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState<MedicineType | null>(null);
  const [editFormData, setEditFormData] = useState<MedicineType>({});
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");

  // Fetch medicines on component mount
  useEffect(() => {
    dispatch(getMedicineList({ skip: 0, limit: 1000 }));
  }, [dispatch]);

  // Filter medicines based on search term
  useEffect(() => {
    if (!medicines || medicines.length === 0) {
      setFilteredMedicines([]);
      return;
    }
    const filtered = medicines.filter((medicine: MedicineType) =>
      medicine.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.manufacturer?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMedicines(filtered);
    setCurrentPage(1); // Reset to first page when search changes
  }, [medicines, searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredMedicines.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentMedicines = filteredMedicines.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle edit medicine - open modal
  const handleEditClick = (medicine: MedicineType) => {
    setEditingMedicine(medicine);
    setEditFormData({ ...medicine });
    setShowEditModal(true);
    setEditError("");
  };

  // Handle edit form input change
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle update medicine submission
  const handleUpdateMedicine = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditError("");

    if (!editingMedicine?.id || !editFormData.name?.trim()) {
      setEditError("Medicine name is required");
      return;
    }

    setEditLoading(true);
    try {
      const payload = {
        name: editFormData.name?.trim(),
        strength: editFormData.strength?.trim() || null,
        form: editFormData.form?.trim() || null,
        manufacturer: editFormData.manufacturer?.trim() || null,
      };

      await dispatch(updateMedicine({ medicineId: editingMedicine.id, payload }));
      await dispatch(getMedicineList({ skip: 0, limit: 1000 }));

      setShowEditModal(false);
      setEditingMedicine(null);
      setEditFormData({});
    } catch (err: any) {
      setEditError(err.message || "Failed to update medicine");
    } finally {
      setEditLoading(false);
    }
  };

  // Handle close edit modal
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingMedicine(null);
    setEditFormData({});
    setEditError("");
  };

  // Handle delete medicine
  const handleDeleteMedicine = async (medicineId: number | undefined) => {
    if (!medicineId) return;
    
    if (window.confirm("Are you sure you want to delete this medicine?")) {
      await dispatch(deleteMedicine(medicineId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-muted-foreground mt-1">Manage medicines in the system</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium" onClick={() => navigate('/admin/create-medicine')}>
          <FaPlus className="w-4 h-4" />
          Add Medicine
        </button>
      </div>

      {/* Search Section */}
      <div className="relative">
        <FaSearch className="absolute left-3 top-3 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by name or manufacturer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-foreground"
        />
      </div>

      {/* Medicine List Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">
            Loading medicines...
          </div>
        ) : filteredMedicines.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            {medicines.length === 0 ? "No medicines found. Add one to get started." : "No medicines match your search."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted border-b border-border">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Strength</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Form</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Manufacturer</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentMedicines.map((medicine: MedicineType, index: number) => (
                  <tr
                    key={medicine.id || index}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-foreground">{medicine.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-foreground">
                      {medicine.name || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {medicine.strength || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {medicine.form || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {medicine.manufacturer || "-"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEditClick(medicine)}
                          className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
                          title="Edit medicine"
                        >
                          <FaEdit className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteMedicine(medicine.id)}
                          className="inline-flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium"
                          title="Delete medicine"
                        >
                          <FaTrash className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary and Pagination */}
      <div className="flex flex-col gap-4">
        {/* Summary Info */}
        <div className="bg-muted p-4 rounded-lg text-sm text-muted-foreground flex justify-between items-center">
          <div>
            {filteredMedicines.length > 0 ? (
              <span>
                Showing <strong>{startIndex + 1}</strong> to <strong>{Math.min(endIndex, filteredMedicines.length)}</strong> of <strong>{filteredMedicines.length}</strong> medicines
              </span>
            ) : (
              <span>No medicines found</span>
            )}
          </div>
        </div>

        {/* Pagination Controls */}
        {filteredMedicines.length > ITEMS_PER_PAGE && (
          <div className="flex items-center justify-between bg-card border border-border rounded-lg p-4">
            <div className="text-sm text-muted-foreground">
              Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
              >
                <FaChevronLeft className="w-4 h-4" />
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "border border-border hover:bg-muted text-foreground"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
              >
                Next
                <FaChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Medicine Modal */}
      {showEditModal && editingMedicine && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-100 border border-border rounded-lg shadow-lg max-w-md w-full">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-xl font-bold text-foreground">Edit Medicine</h3>
              <button
                onClick={handleCloseEditModal}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {editError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                  {editError}
                </div>
              )}

              <form onSubmit={handleUpdateMedicine} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Medicine Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name || ""}
                    onChange={handleEditInputChange}
                    placeholder="Enter medicine name"
                    disabled={editLoading}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-foreground disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Strength
                  </label>
                  <input
                    type="text"
                    name="strength"
                    value={editFormData.strength || ""}
                    onChange={handleEditInputChange}
                    placeholder="e.g., 500mg"
                    disabled={editLoading}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-foreground disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Form
                  </label>
                  <input
                    type="text"
                    name="form"
                    value={editFormData.form || ""}
                    onChange={handleEditInputChange}
                    placeholder="e.g., Tablet, Capsule"
                    disabled={editLoading}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-foreground disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Manufacturer
                  </label>
                  <input
                    type="text"
                    name="manufacturer"
                    value={editFormData.manufacturer || ""}
                    onChange={handleEditInputChange}
                    placeholder="e.g., ABC Pharma"
                    disabled={editLoading}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-foreground disabled:opacity-50"
                  />
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end gap-3 pt-4 border-t border-border">
                  <button
                    type="button"
                    onClick={handleCloseEditModal}
                    disabled={editLoading}
                    className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors font-medium disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={editLoading}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
                  >
                    <FaSave className="w-4 h-4" />
                    {editLoading ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


