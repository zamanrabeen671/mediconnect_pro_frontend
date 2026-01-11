"use client"

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { 
  deleteInstitute, 
  getInstituteList, 
  updateInstitute, 
  createInstitute 
} from "../../store/API/adminApi";
import { useEffect, useState } from "react";
import { FaTrash, FaPlus, FaSearch, FaChevronLeft, FaChevronRight, FaEdit, FaTimes, FaSave } from "react-icons/fa";

const ITEMS_PER_PAGE = 10;

interface InstituteType {
  id?: number;
  name?: string;
  address?: string;
}

export const Institute = () => {
  const dispatch = useAppDispatch();
  const [institutes, setInstitutes] = useState<InstituteType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInstitutes, setFilteredInstitutes] = useState<InstituteType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingInstitute, setEditingInstitute] = useState<InstituteType | null>(null);
  const [editFormData, setEditFormData] = useState<InstituteType>({});
  const [createFormData, setCreateFormData] = useState<InstituteType>({ name: "", address: "" });
  const [editLoading, setEditLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [editError, setEditError] = useState("");
  const [createError, setCreateError] = useState("");
  const [listLoading, setListLoading] = useState(false);

  // Fetch institutes on component mount
  useEffect(() => {
    fetchInstitutes();
  }, []);

  const fetchInstitutes = async () => {
    setListLoading(true);
    try {
      const result = await dispatch(getInstituteList(null));
      if (result.payload) {
        const insts = Array.isArray(result.payload) ? result.payload : [];
        setInstitutes(insts);
      }
    } catch (err: any) {
      console.error("Error fetching institutes:", err);
    } finally {
      setListLoading(false);
    }
  };

  // Filter institutes based on search term
  useEffect(() => {
    if (!institutes || institutes.length === 0) {
      setFilteredInstitutes([]);
      return;
    }
    const filtered = institutes.filter((inst: InstituteType) =>
      inst.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inst.address?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredInstitutes(filtered);
    setCurrentPage(1); // Reset to first page when search changes
  }, [institutes, searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredInstitutes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentInstitutes = filteredInstitutes.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle edit institute - open modal
  const handleEditClick = (institute: InstituteType) => {
    setEditingInstitute(institute);
    setEditFormData({ ...institute });
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

  // Handle update institute submission
  const handleUpdateInstitute = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditError("");

    if (!editingInstitute?.id || !editFormData.name?.trim()) {
      setEditError("Institute name is required");
      return;
    }

    setEditLoading(true);
    try {
      const payload = {
        name: editFormData.name?.trim(),
        address: editFormData.address?.trim() || null,
      };

      await dispatch(updateInstitute({ instituteId: editingInstitute.id, payload }));
      await fetchInstitutes();

      setShowEditModal(false);
      setEditingInstitute(null);
      setEditFormData({});
    } catch (err: any) {
      setEditError(err.message || "Failed to update institute");
    } finally {
      setEditLoading(false);
    }
  };

  // Handle create institute submission
  const handleCreateInstitute = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError("");

    if (!createFormData.name?.trim()) {
      setCreateError("Institute name is required");
      return;
    }

    setCreateLoading(true);
    try {
      const payload = {
        name: createFormData.name?.trim(),
        address: createFormData.address?.trim() || null,
      };

      await dispatch(createInstitute(payload));
      await fetchInstitutes();

      setShowCreateModal(false);
      setCreateFormData({ name: "", address: "" });
    } catch (err: any) {
      setCreateError(err.message || "Failed to create institute");
    } finally {
      setCreateLoading(false);
    }
  };

  // Handle close edit modal
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingInstitute(null);
    setEditFormData({});
    setEditError("");
  };

  // Handle close create modal
  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setCreateFormData({ name: "", address: "" });
    setCreateError("");
  };

  // Handle delete institute
  const handleDeleteInstitute = async (instituteId: number | undefined) => {
    if (!instituteId) return;
    
    if (window.confirm("Are you sure you want to delete this institute?")) {
      await dispatch(deleteInstitute(instituteId));
      await fetchInstitutes();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-muted-foreground mt-1">Manage institutes in the system</p>
        </div>
        <button 
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium" 
          onClick={() => setShowCreateModal(true)}
        >
          <FaPlus className="w-4 h-4" />
          Add Institute
        </button>
      </div>

      {/* Search Section */}
      <div className="relative">
        <FaSearch className="absolute left-3 top-3 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by name or address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-foreground"
        />
      </div>

      {/* Institute List Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {listLoading ? (
          <div className="p-8 text-center text-muted-foreground">
            Loading institutes...
          </div>
        ) : filteredInstitutes.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            {institutes.length === 0 ? "No institutes found. Add one to get started." : "No institutes match your search."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted border-b border-border">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Address</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentInstitutes.map((institute: InstituteType, index: number) => (
                  <tr
                    key={institute.id || index}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-foreground">{institute.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-foreground">
                      {institute.name || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {institute.address || "-"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEditClick(institute)}
                          className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
                          title="Edit institute"
                        >
                          <FaEdit className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteInstitute(institute.id)}
                          className="inline-flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium"
                          title="Delete institute"
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
            {filteredInstitutes.length > 0 ? (
              <span>
                Showing <strong>{startIndex + 1}</strong> to <strong>{Math.min(endIndex, filteredInstitutes.length)}</strong> of <strong>{filteredInstitutes.length}</strong> institutes
              </span>
            ) : (
              <span>No institutes found</span>
            )}
          </div>
        </div>

        {/* Pagination Controls */}
        {filteredInstitutes.length > ITEMS_PER_PAGE && (
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

      {/* Create Institute Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-100 border border-border rounded-lg shadow-lg max-w-md w-full">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-xl font-bold text-foreground">Create Institute</h3>
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

              <form onSubmit={handleCreateInstitute} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Institute Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={createFormData.name || ""}
                    onChange={handleCreateInputChange}
                    placeholder="e.g., City Medical Hospital"
                    disabled={createLoading}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-foreground disabled:opacity-50"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={createFormData.address || ""}
                    onChange={handleCreateInputChange}
                    placeholder="e.g., 123 Main Street, City"
                    disabled={createLoading}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-foreground disabled:opacity-50"
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

      {/* Edit Institute Modal */}
      {showEditModal && editingInstitute && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-100 border border-border rounded-lg shadow-lg max-w-md w-full">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-xl font-bold text-foreground">Edit Institute</h3>
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

              <form onSubmit={handleUpdateInstitute} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Institute Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name || ""}
                    onChange={handleEditInputChange}
                    placeholder="Enter institute name"
                    disabled={editLoading}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-foreground disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={editFormData.address || ""}
                    onChange={handleEditInputChange}
                    placeholder="Enter institute address"
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
