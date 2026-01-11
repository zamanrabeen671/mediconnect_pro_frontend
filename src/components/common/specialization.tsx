"use client"

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { 
  deleteSpecialization, 
  getSpecializationList, 
  updateSpecialization, 
  createSpecialization 
} from "../../store/API/adminApi";
import { useEffect, useState } from "react";
import { FaTrash, FaPlus, FaSearch, FaChevronLeft, FaChevronRight, FaEdit, FaTimes, FaSave } from "react-icons/fa";

const ITEMS_PER_PAGE = 10;

interface SpecializationType {
  id?: number;
  name?: string;
}

export const Specialization = () => {
  const dispatch = useAppDispatch();
  const [specializations, setSpecializations] = useState<SpecializationType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSpecializations, setFilteredSpecializations] = useState<SpecializationType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingSpecialization, setEditingSpecialization] = useState<SpecializationType | null>(null);
  const [editFormData, setEditFormData] = useState<SpecializationType>({});
  const [createFormData, setCreateFormData] = useState<SpecializationType>({ name: "" });
  const [editLoading, setEditLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [editError, setEditError] = useState("");
  const [createError, setCreateError] = useState("");
  const [listLoading, setListLoading] = useState(false);

  // Fetch specializations on component mount
  useEffect(() => {
    fetchSpecializations();
  }, []);

  const fetchSpecializations = async () => {
    setListLoading(true);
    try {
      const result = await dispatch(getSpecializationList(null));
      if (result.payload) {
        const specs = Array.isArray(result.payload) ? result.payload : [];
        setSpecializations(specs);
      }
    } catch (err: any) {
      console.error("Error fetching specializations:", err);
    } finally {
      setListLoading(false);
    }
  };

  // Filter specializations based on search term
  useEffect(() => {
    if (!specializations || specializations.length === 0) {
      setFilteredSpecializations([]);
      return;
    }
    const filtered = specializations.filter((spec: SpecializationType) =>
      spec.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSpecializations(filtered);
    setCurrentPage(1); // Reset to first page when search changes
  }, [specializations, searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredSpecializations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentSpecializations = filteredSpecializations.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle edit specialization - open modal
  const handleEditClick = (specialization: SpecializationType) => {
    setEditingSpecialization(specialization);
    setEditFormData({ ...specialization });
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

  // Handle create form input change
  const handleCreateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreateFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle update specialization submission
  const handleUpdateSpecialization = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditError("");

    if (!editingSpecialization?.id || !editFormData.name?.trim()) {
      setEditError("Specialization name is required");
      return;
    }

    setEditLoading(true);
    try {
      const payload = {
        name: editFormData.name?.trim(),
      };

      await dispatch(updateSpecialization({ specializationId: editingSpecialization.id, payload }));
      await fetchSpecializations();

      setShowEditModal(false);
      setEditingSpecialization(null);
      setEditFormData({});
    } catch (err: any) {
      setEditError(err.message || "Failed to update specialization");
    } finally {
      setEditLoading(false);
    }
  };

  // Handle create specialization submission
  const handleCreateSpecialization = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError("");

    if (!createFormData.name?.trim()) {
      setCreateError("Specialization name is required");
      return;
    }

    setCreateLoading(true);
    try {
      const payload = {
        name: createFormData.name?.trim(),
      };

      await dispatch(createSpecialization(payload));
      await fetchSpecializations();

      setShowCreateModal(false);
      setCreateFormData({ name: "" });
    } catch (err: any) {
      setCreateError(err.message || "Failed to create specialization");
    } finally {
      setCreateLoading(false);
    }
  };

  // Handle close edit modal
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingSpecialization(null);
    setEditFormData({});
    setEditError("");
  };

  // Handle close create modal
  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setCreateFormData({ name: "" });
    setCreateError("");
  };

  // Handle delete specialization
  const handleDeleteSpecialization = async (specializationId: number | undefined) => {
    if (!specializationId) return;
    
    if (window.confirm("Are you sure you want to delete this specialization?")) {
      await dispatch(deleteSpecialization(specializationId));
      await fetchSpecializations();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-muted-foreground mt-1">Manage specializations in the system</p>
        </div>
        <button 
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium" 
          onClick={() => setShowCreateModal(true)}
        >
          <FaPlus className="w-4 h-4" />
          Add Specialization
        </button>
      </div>

      {/* Search Section */}
      <div className="relative">
        <FaSearch className="absolute left-3 top-3 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-foreground"
        />
      </div>

      {/* Specialization List Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {listLoading ? (
          <div className="p-8 text-center text-muted-foreground">
            Loading specializations...
          </div>
        ) : filteredSpecializations.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            {specializations.length === 0 ? "No specializations found. Add one to get started." : "No specializations match your search."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted border-b border-border">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentSpecializations.map((specialization: SpecializationType, index: number) => (
                  <tr
                    key={specialization.id || index}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-foreground">{specialization.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-foreground">
                      {specialization.name || "-"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEditClick(specialization)}
                          className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
                          title="Edit specialization"
                        >
                          <FaEdit className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteSpecialization(specialization.id)}
                          className="inline-flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium"
                          title="Delete specialization"
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
            {filteredSpecializations.length > 0 ? (
              <span>
                Showing <strong>{startIndex + 1}</strong> to <strong>{Math.min(endIndex, filteredSpecializations.length)}</strong> of <strong>{filteredSpecializations.length}</strong> specializations
              </span>
            ) : (
              <span>No specializations found</span>
            )}
          </div>
        </div>

        {/* Pagination Controls */}
        {filteredSpecializations.length > ITEMS_PER_PAGE && (
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

      {/* Create Specialization Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-100 border border-border rounded-lg shadow-lg max-w-md w-full">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-xl font-bold text-foreground">Create Specialization</h3>
              <button
                onClick={handleCloseCreateModal}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {createError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                  {createError}
                </div>
              )}

              <form onSubmit={handleCreateSpecialization} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Specialization Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={createFormData.name || ""}
                    onChange={handleCreateInputChange}
                    placeholder="e.g., Cardiology"
                    disabled={createLoading}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-foreground disabled:opacity-50"
                    autoFocus
                  />
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end gap-3 pt-4 border-t border-border">
                  <button
                    type="button"
                    onClick={handleCloseCreateModal}
                    disabled={createLoading}
                    className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors font-medium disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={createLoading}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
                  >
                    <FaSave className="w-4 h-4" />
                    {createLoading ? "Creating..." : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Specialization Modal */}
      {showEditModal && editingSpecialization && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-100 border border-border rounded-lg shadow-lg max-w-md w-full">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-xl font-bold text-foreground">Edit Specialization</h3>
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

              <form onSubmit={handleUpdateSpecialization} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Specialization Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name || ""}
                    onChange={handleEditInputChange}
                    placeholder="Enter specialization name"
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
