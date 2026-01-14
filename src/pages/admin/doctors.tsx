"use client";

import {
  FaUserMd,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaEye,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { doctorUpdate, getDoctorList } from "../../store/API/doctorApi";
export default function AdminDoctors() {
  const dispatch = useAppDispatch();
  const { doctorList } = useAppSelector((state) => state.doctor);
  const [filter, setFilter] = useState<
    "all" | "approved" | "pending" | "rejected"
  >("all");

  useEffect(() => {
    // Fetch doctor list from API or store here if
    dispatch(getDoctorList({}));
  }, []);

  const filteredDoctors =
    filter === "all"
      ? doctorList
      : doctorList?.filter((doc) => doc.status.toLowerCase() === filter);

  const statusConfig = {
    approved: {
      icon: FaCheckCircle,
      color: "text-green-500",
      bg: "bg-green-50",
      label: "Approved",
    },
    pending: {
      icon: FaClock,
      color: "text-yellow-500",
      bg: "bg-yellow-50",
      label: "Pending",
    },
    rejected: {
      icon: FaTimesCircle,
      color: "text-red-500",
      bg: "bg-red-50",
      label: "Rejected",
    },
  };

  const updateProfileCompletion = async (doctorId: number, status: string) => {
    await dispatch(
      doctorUpdate({ postData: { id: doctorId, status }, router: () => {} })
    ).unwrap();

    dispatch(getDoctorList({}));
  };

  return (
    <div className="flex min-h-screen bg-background">
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Doctor Management
            </h1>
            <p className="text-muted-foreground">
              Manage and approve doctor registrations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Total Doctors
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {doctorList?.length}
                  </p>
                </div>
                <FaUserMd className="w-8 h-8 text-accent" />
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Approved</p>
                  <p className="text-3xl font-bold text-green-500">
                    {doctorList?.filter((d) => d.status === "approved").length}
                  </p>
                </div>
                <FaCheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Pending</p>
                  <p className="text-3xl font-bold text-yellow-500">
                    {doctorList?.filter((d) => d.status === "pending").length}
                  </p>
                </div>
                <FaClock className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Rejected</p>
                  <p className="text-3xl font-bold text-red-500">
                    {doctorList?.filter((d) => d.status === "rejected").length}
                  </p>
                </div>
                <FaTimesCircle className="w-8 h-8 text-red-500" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === "all"
                    ? "bg-accent text-blue-400"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                All Doctors
              </button>
              <button
                onClick={() => setFilter("approved")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === "approved"
                    ? "bg-accent text-blue-400"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                Approved
              </button>
              <button
                onClick={() => setFilter("pending")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === "pending"
                    ? "bg-accent text-blue-400"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter("rejected")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === "rejected"
                    ? "bg-accent text-blue-400"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                Rejected
              </button>
            </div>
          </div>

          {/* Doctors Table */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Doctor
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Specialization
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Institute
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Qualification
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      BMDC Number
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredDoctors?.map((doctor) => {
                    const status =
                      statusConfig[doctor.status as keyof typeof statusConfig];

                    // Join specialization names
                    const specializationNames =
                      doctor.specializations
                        ?.map((s: any) => s.name)
                        .join(", ") || "-";
                    const instituteNames =
                      doctor.institutes?.map((i: any) => i.name).join(", ") ||
                      "-";
                    const qualificationNames =
                      doctor.qualifications
                        ?.map((q: any) => q.name)
                        .join(", ") || "-";

                    return (
                      <tr
                        key={doctor.id}
                        className="hover:bg-muted/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-foreground">
                              {doctor.full_name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {doctor.email}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-foreground">
                          {specializationNames}
                        </td>
                        <td className="px-6 py-4 text-foreground">
                          {instituteNames}
                        </td>
                        <td className="px-6 py-4 text-foreground text-sm">
                          {qualificationNames}
                        </td>
                        <td className="px-6 py-4 text-foreground">
                          {doctor.bmdc_number}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${status.bg} ${status.color}`}
                          >
                            <status.icon className="w-3 h-3" />
                            {status.label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="p-2 hover:bg-muted rounded-lg transition-colors text-accent">
                              <FaEye className="w-4 h-4" />
                            </button>
                            {doctor.status === "pending" && (
                              <>
                                <button
                                  className="p-2 hover:bg-green-50 rounded-lg transition-colors text-green-600"
                                  onClick={() =>
                                    updateProfileCompletion(
                                      doctor.id,
                                      "approved"
                                    )
                                  }
                                >
                                  <FaCheck className="w-4 h-4" />
                                </button>
                                <button
                                  className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                                  onClick={() =>
                                    updateProfileCompletion(
                                      doctor.id,
                                      "rejected"
                                    )
                                  }
                                >
                                  <FaTimes className="w-4 h-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
